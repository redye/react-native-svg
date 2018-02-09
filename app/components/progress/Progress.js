import React from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    Easing,
} from 'react-native';

import CircleComponent from './CircleComponent';
import BarComponent from './BarComponent';

const AnimatedCircleComponent = Animated.createAnimatedComponent(CircleComponent);
const AnimatedBarComponent = Animated.createAnimatedComponent(BarComponent);

class Progress extends React.Component {
    static propTypes = {
        progress: PropTypes.number.isRequired,
        duration: PropTypes.number,
        animation: PropTypes.bool,
    }

    static defaultProps = {
        progress: 0,
        duration: 1000,
        animation: true,
    }

    constructor(props) {
        super(props);

        this.state = {
            progress: new Animated.Value(0)
        }
    }

    componentWillUnmount() {
        this.stopAnimation();
    }

    componentDidMount() {
        let progress = this._progressValue(this.props.progress);
        this.setProgress(progress);
    }

    _progressValue = (progress) => {
        return Math.max(Math.min(progress, 100), 0);
    }

    setProgress = (progress) => {
        console.log('开始动画');
        progress = this._progressValue(progress);
        if (this.props.animation) {
            Animated.timing(this.state.progress, {
                duration: this.props.duration,
                toValue: progress,
                easing: Easing.linear,
                isInteraction: false,
            }).start(() => {
                this.state.progress.setValue(progress);
            });
        } else {
            this.state.progress.setValue(progress);
        }
    }

    stopAnimation = () => {
        this.state.progress.stopAnimation();
        this.state.progress.setValue(0);
    }

    render() {
        return null;
    }
}

class Circle extends Progress {

    render() {
        return (
            <AnimatedCircleComponent {...this.props} progress={this.state.progress} />
        );
    }
}

class Bar extends Progress {

    render() {
        return (
            <AnimatedBarComponent  {...this.props} progress={this.state.progress} />
        );
    }
}

export default Progress = {
    Circle: Circle,
    Bar: Bar,
}