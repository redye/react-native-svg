import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    View,
    ART,
    Text
} from 'react-native';


const {
    Surface,
    Shape,
    Group,
    Path,
    Transform,
    ClippingRectangle,
} = ART;

export default class CircleProgress extends React.Component {

    static propTypes = {
        radius: PropTypes.number,
        progressWidth: PropTypes.number,
        activeColor: PropTypes.string,
        inactiveColor: PropTypes.string,
        progress: PropTypes.number,  // 取值 0~100, 百分制
        showProgress: PropTypes.bool,
        fontSize: PropTypes.number,
        textColor: PropTypes.string,
    }

    static defaultProps = {
        radius: 100,
        progressWidth: 2,
        activeColor: '#0f0',
        inactiveColor: '#ddd',
        progress: 0,
        showProgress: true,
        fontSize: 14,
        textColor: '#333'
    }

    constructor(props) {
        super(props);

        // 起点和半径
        this._x = this.props.radius;
        this._y = this.props.progressWidth / 2.0;
        this._r = this.props.radius - this.props.progressWidth / 2.0;
        // 内切正方形的半径
        let cr = this.props.radius - this.props.progressWidth;
        // 内切正方向的宽度
        this._cw = cr / Math.sqrt(2) * 2;
        // 内切正方形的起点
        this_cx = this._cy = this._cr;
    }

    _inactivePath = () => {
        let path = new Path();
        // function(x, y, rx, ry, outer, counterClockwise, rotation)
        // 第一个半圆终点
        let x = this._x;
        let y =  this.props.radius * 2 - this.props.progressWidth / 2.0;
        path
        .moveTo(this._x, this._y)
        .arcTo(x, y, this._r, this._r, 0, 1, 0)
        // 第二个半圆
        .moveTo(x, y)
        .arcTo(this._x, this._y, this._r, this._r, 0, 1, 0);
        return path;
    }

    _radian = (angle) => {
        return angle * Math.PI / 180;
    }

    _activePath = () => {
        // 角度
        let angle = 360 * this.props.progress / 100;
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
            let x = this.props.radius - this._r * Math.sin(radian);
            let y = this.props.radius + this._r * Math.cos(radian);
            path.moveTo(this._x, this._y).arcTo(x, y, this._r, this._r, 1, 0, 0);
        } else if (angle < 360) {
            let delta = 360 - angle;
            let radian = this._radian(delta);
            let x = this.props.radius - this._r * Math.sin(radian);
            let y = this.props.radius - this._r * Math.cos(radian);
            path.moveTo(this._x, this._y).arcTo(x, y, this._r, this._r, 1, 0, 0);
        } else {
            let x = this._x;
            let y =  this.props.radius * 2 - this.props.progressWidth / 2.0;
            path
            .moveTo(this._x, this._y)
            .arcTo(x, y, this._r, this._r, 0, 1, 0)
            .moveTo(x, y)
            .arcTo(this._x, this._y, this._r, this._r, 0, 1, 0);
        }
        return path;
    }

    _textArea = () => {
        return (
            <View style={{position: 'absolute', top: this._cx, left: this._cy, width: this._cw, height: this._cw, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: this.props.fontSize, color: this.props.textColor}}>{`${this.props.progress}%`}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Surface width={this.props.radius * 2} height={this.props.radius * 2}>
                    <Shape d={this._inactivePath()} strokeWidth={this.props.progressWidth} stroke={this.props.inactiveColor} />
                    <Shape d={this._activePath()} strokeWidth={this.props.progressWidth} stroke={this.props.activeColor} />
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