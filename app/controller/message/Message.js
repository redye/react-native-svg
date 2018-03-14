import React from 'react';

import {
    View,
    ART,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

// import Svg, {
//     Circle,
//     Ellipse,
//     G,
//     LinearGradient,
//     RadialGradient,
//     Line,
//     Path,
//     Polygon,
//     Polyline,
//     Rect,
//     Symbol,
//     Text,
//     Use,
//     Defs,
//     Stop
// } from 'react-native-svg';

const {
    Surface,
    Shape,
    Group,
    Path,
    Transform,
    ClippingRectangle,
    LinearGradient,
    RadialGradient,
} = ART;


export default class Message extends React.Component {

    // function LinearGradient(stops, x1, y1, x2, y2)
    _lineGradientColor = () => {
        let colors = {
            '.3': 'blue', // blue in 1% position
            '1': 'rgba(255, 255, 0, 1)' // opacity white in 100% position
            };
        return new LinearGradient(colors, 0, 0, 100, 100);
    }

    // function RadialGradient(stops, fx, fy, rx, ry, cx, cy)
    /* Create radial gradient
     * @param stops Object linear gradient stops
     * @demo {'0.1':'green', '1':'blue'}
     * @param fx Number x-axis coordinate of the focal point
     * @param fy Number y-axis coordinate of the focal point
     * @param rx Number x-axis coordinate direction radius length
     * @param ry Number y-axis coordinate direction radius length
     * @param cx Number x-axis coordinate of the origin point
     * @param cy Number y-axis coordinate of the origin point
    */
    _radialGradientColor = () => {
        return new RadialGradient({
            '.3': 'blue', 
            '1': 'rgba(255, 255, 0, 1)' 
        }, 10, 10, 50, 50, 50, 50);
    }

    render() {
        return(
            <View style={{flex: 1, paddingTop: 20, paddingLeft: 20}}>
                <Surface width={100} height={100}>
                    <Shape d='M0 0 L100 0 L100 100 L0 100 Z' stroke='#f00' strokeWidth={10} fill={this._radialGradientColor()} />
                    <Shape d='M50 50 L52 50' stroke='#000' strokeWidth={4} />
                    <Shape d='M20 20 L22 20' stroke='#000' strokeWidth={4} />
                </Surface>
            </View>
        );
    }
}