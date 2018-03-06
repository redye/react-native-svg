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

export default class PieComponent extends React.Component {
    static propTypes = {
        radius: PropTypes.number,
        strokeWidth: PropTypes.number,
        strokeColor: PropTypes.string,
        progress: PropTypes.number,  // 取值 0~100, 百分制
        offset: PropTypes.number,
    }

    static defaultProps = {
        radius: 100,
        strokeWidth: 1,
        strokeColor: '#00f', 
        progress: 0,
        offset: 2,
    }

    constructor(props) {
        super(props);

        this._r = this.props.radius - this.props.offset - this.props.strokeWidth / 2.0;
        this._startX = this.props.radius;
        this._startY = this.props.offset + this.props.strokeWidth / 2.0;
        
        this.state = {
            progress: props.progress,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                progress: nextProps.progress,
            });
        }
    }

    _borderPath = () => {
        // // function(x, y, rx, ry, outer, counterClockwise, rotation)
        // 半圆点
        let y = this.props.radius * 2 - this.props.offset - this.props.strokeWidth / 2.0;
        return `M${this._startX} ${this._startY}
                A${this._r} ${this._r}, 0, 0, 1, ${this._startX} ${y}
                A${this._r} ${this._r}, 0, 0, 1, ${this._startX} ${this._startY}`;
    }

    _piePath = () => {
        let angle = 360 * this.state.progress / 100.0;
        let radian = (180 - angle) * Math.PI / 180;
        let endX = this.props.radius + this._r * Math.sin(radian);
        let endY = this.props.radius + this._r * Math.cos(radian);
        let outer = 180 - angle >= 0 ? 0 : 1;
        let path = null;
        if (angle > 0 && angle % 360 == 0) {
            let y = this.props.radius * 2 - this.props.offset - this.props.strokeWidth / 2.0;
            path = `M${this._startX} ${this._startY}
                    A${this._r} ${this._r}, 0, 0, 1, ${this._startX} ${y}
                    A${this._r} ${this._r}, 0, 0, 1, ${this._startX} ${this._startY}`;
        } else {
            path = `M${this.props.radius} ${this.props.radius}
                    L${this._startX} ${this._startY}
                    A${this._r} ${this._r}, 0, ${outer}, 1, ${endX} ${endY}
                    Z`;
        }
        
        return path;
    }

    render() {
        return(
            <View style={[styles.container, this.props.style]}>
                <Surface width={this.props.radius * 2} height={this.props.radius * 2}>
                    <Shape d={this._borderPath()} strokeWidth={this.props.strokeWidth} stroke={this.props.strokeColor} />
                    <Shape d={this._piePath()} strokeWidth={this.props.strokeWidth}  fill={this.props.strokeColor} />
                </Surface>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    }
});