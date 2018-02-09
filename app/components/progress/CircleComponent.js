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

export default class CircleComponent extends React.Component {

    static propTypes = {
        radius: PropTypes.number,
        strokeWidth: PropTypes.number,
        activeColor: PropTypes.string,
        inactiveColor: PropTypes.string,
        progress: PropTypes.number,  // 取值 0~100, 百分制
        showProgress: PropTypes.bool,
        fontSize: PropTypes.number,
        textColor: PropTypes.string,
        offset: PropTypes.number,
        strokeCap: PropTypes.string,
    }

    static defaultProps = {
        radius: 100,
        strokeWidth: 2,
        activeColor: '#0f0',
        inactiveColor: '#ddd',
        progress: 0,
        showProgress: true,
        fontSize: 14,
        textColor: '#333',
        offset: 2,
        strokeCap: 'round',
    }

    constructor(props) {
        super(props);

        // 起点和半径
        this._x = this.props.radius;
        this._y = this.props.strokeWidth / 2.0 + this.props.offset;
        this._r = this.props.radius - this.props.strokeWidth / 2.0 - this.props.offset;
        // 内切正方形的半径
        let cr = this.props.radius - this.props.strokeWidth - this.props.offset;
        // 内切正方向的宽度
        this._cw = cr / Math.sqrt(2) * 2;
        // 内切正方形的起点
        this_cx = this._cy = this.props.radius - this._cw / 2.0;
        this.state = {
            progress: props.progress,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            let progress = nextProps.progress;
            this.setProgress(progress);
        }
    }

    setProgress = (progress) => {
        this.setState({
            progress: progress,
        });
    }

    _inactivePath = () => {
        let path = new Path();
        // function(x, y, rx, ry, outer, counterClockwise, rotation)
        // 第一个半圆终点
        let x = this._x;
        let y =  this.props.radius * 2 - this.props.strokeWidth / 2.0 - this.props.offset;
        path
        .moveTo(this._x, this._y)
        .arcTo(x, y, this._r, this._r, 0, 1, 0)
        // 第二个半圆
        .arcTo(this._x, this._y, this._r, this._r, 0, 1, 0);
        return path;
    }

    _radian = (angle) => {
        return angle * Math.PI / 180;
    }

    _activePath = () => {
        // 角度
        let angle = 360 * this.state.progress / 100;
        let path = new Path();
        if (angle <= 90) {
            let radian = this._radian(angle);
            let x = this.props.radius + this._r * Math.sin(radian);
            let y = this.props.radius - this._r * Math.cos(radian);
            path.moveTo(this._x, this._y).arcTo(x, y, this._r, this._r, 0, 0, 0);
        } else if (angle <= 180) {
            let delta = 180 - angle;
            let radian = this._radian(delta);
            let x = this.props.radius + this._r * Math.sin(radian);
            let y = this.props.radius + this._r * Math.cos(radian);
            path.moveTo(this._x, this._y).arcTo(x, y, this._r, this._r, 0, 0, 0);
        } else if (angle <= 270) {
            let delta = 270 - angle;
            let radian = this._radian(delta);
            let x = this.props.radius - this._r * Math.cos(radian);
            let y = this.props.radius + this._r * Math.sin(radian);
            path.moveTo(this._x, this._y).arcTo(x, y, this._r, this._r, 1, 0, 0);
        } else if (angle < 360) {
            let delta = 360 - angle;
            let radian = this._radian(delta);
            let x = this.props.radius - this._r * Math.sin(radian);
            let y = this.props.radius - this._r * Math.cos(radian);
            path.moveTo(this._x, this._y).arcTo(x, y, this._r, this._r, 1, 0, 0);
        } else {
            let x = this._x;
            let y =  this.props.radius * 2 - this.props.strokeWidth / 2.0 - this.props.offset;
            path
            .moveTo(this._x, this._y)
            .arcTo(x, y, this._r, this._r, 0, 1, 0)
            .arcTo(this._x, this._y, this._r, this._r, 0, 1, 0);
        }
        return path;
    }

    _textArea = () => {
        return (
            <View style={{position: 'absolute', top: this._cx, left: this._cy, width: this._cw, height: this._cw, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: this.props.fontSize, color: this.props.textColor}}>{`${parseInt(this.state.progress)}%`}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Surface width={this.props.radius * 2} height={this.props.radius * 2}>
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
        alignItems: 'center',
        justifyContent: 'center',
    }
});