import React from 'react';
import PropTypes, { number } from 'prop-types';

import {
    StyleSheet,
    View,
    ART,
    Text,
    Animated
} from 'react-native';


const {
    Surface,
    Shape,
    Group,
    Path,
    Transform,
    ClippingRectangle,
} = ART;

export default class BarComponent extends React.Component {
    static propTypes = {
        strokeWidth: PropTypes.number,
        activeColor: PropTypes.string,
        inactiveColor: PropTypes.string,
        progress: PropTypes.number,  // 取值 0~100, 百分制
        showProgress: PropTypes.bool,
        fontSize: PropTypes.number,
        textColor: PropTypes.string,
        offset: PropTypes.number,
        strokeCap: PropTypes.string,
        width: PropTypes.number,
    }

    static defaultProps = {
        strokeWidth: 10,
        activeColor: '#f00',
        inactiveColor: '#ddd',
        progress: 10,
        showProgress: true,
        fontSize: 14,
        textColor: '#333',
        offset: 2,
        strokeCap: 'round',
        width: 200,
    }

    constructor(props) {
        super(props);

        this._startX = this._startY = this.props.offset + this.props.strokeWidth / 2.0;
        this._endY = this.props.offset + this.props.strokeWidth / 2.0;
        this._innerWidth = this.props.width - this.props.offset * 2 - this.props.strokeWidth; 
        this.state = {
            progress: props.progress,
        }
    }

    _inactivePath = () => {
        let endX = this._startX + this._innerWidth;
        let path = `M${this._startX} ${this._startY} 
                    L${endX} ${this._endY}`;
        return path;
    }
    
    _activePath = () => {
        let length = this._innerWidth * this.state.progress / 100.0;
        let endX = this._startX + length;
        let path = `M${this._startX} ${this._startY} 
                    L${endX} ${this._endY}`;
        return path;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setProgress(nextProps.progress);
        }
    }
    
    setProgress = (progress) => {
        this.setState({
            progress: progress,
        });
    }

    _textArea = () => {
        return (
            <View style={{marginLeft: 8, marginRight: 8}}>
                <Text style={{fontSize: this.props.fontSize, color: this.props.textColor}}>{`${parseInt(this.state.progress)}%`}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Surface width={this.props.width} height={this.props.strokeWidth + this.props.offset * 2}>
                    <Shape d={this._inactivePath()} strokeWidth={this.props.strokeWidth} stroke={this.props.inactiveColor} strokeCap={this.props.strokeCap} />
                    <Shape d={this._activePath()} strokeWidth={this.props.strokeWidth} stroke={this.props.activeColor} strokeCap={this.props.strokeCap} />
                </Surface>
                {this.props.showProgress ? this._textArea() : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});