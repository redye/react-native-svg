import React from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
    Easing,
} from 'react-native';

import CircleComponent from './CircleComponent';

const AnimatedCircleComponent = Animated.createAnimatedComponent(CircleComponent);

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

        let progress = this._progressValue(this.props.progress);
        this.state = {
            progress: new Animated.Value(progress)
        }
    }

    componentWillUnmount() {
        this.stopAnimation();
    }

    componentDidMount() {
        let progress = this._progressValue(this.props.progress);
        this.setProgress(progress);
        console.log('开始动画，==>', progress);
    }

    _progressValue = (progress) => {
        return Math.max(Math.min(progress, 100), 0);
    }

    setProgress = (progress) => {
        progress = this._progressValue(progress);
        console.log('开始动画2，==>', progress);
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

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        return (
            <AnimatedCircleComponent ref={(c) => this.c = c} {...this.props} progress={this.state.progress} />
        );
    }
}

export default Progress = {
    Circle: Circle,
}