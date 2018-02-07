import React from 'react';

import {
    View,
    ART,
} from 'react-native';
import CircleProgress from '../../components/CircleProgress';

const {
    Surface,
    Shape,
    Group,
    Path,
    Text,
    Transform,
    ClippingRectangle,
} = ART;

export default class Home extends React.Component {

    _path = () => {

    }

    _test = () => {
        // function(sx, sy, ex, ey, cx, cy, rx, ry, sa, ea, ccw, rotation)
        // function(x, y, rx, ry, outer, counterClockwise, rotation)
        // counterClockwise 逆时针
        // rotation 方向
        // outer 弧度
        let path = new Path()
        .moveTo(130, 54)
        .arcTo(230, 54, 50, 50, 0, 0, 0)
        // .moveTo(230, 54)
        // .arcTo(130, 54, 50, 50, 0, 0, 0)
        .close();

        return (
            <View style={{flex: 1,}}>
                <Surface width={250} height={250} style={{backgroundColor: '#ddd',  marginTop: 20, marginLeft: 15}}>
                    <Shape d="M2 54 A50 50, 0, 0, 1, 104 54 M104 54 A50 50, 0, 0, 1, 2 54" strokeWidth="4" stroke="#f00" fill="#ff0" />
                    <Shape d="M2 150  L102 150 L 102 245 Z" strokeWidth="4" stroke="#0f0" />
                    <Shape d={path} strokeWidth="4" stroke="#f00" fill="#0ff" />
                </Surface>

                <Surface width="300" height="300" style={{backgroundColor: '#ddd', marginTop: 20, marginLeft: 15}}>
                    <Shape d="M2 52 A50 50, 0, 0, 1, 52 2 L52 52 Z" strokeWidth="4" stroke="#f00" fill="#ff0" onPress={() => {
                        console.log('hflkdjf');
                    }}/>
                    <Shape d="M58 2 A50 50, 0, 0, 1, 110 52 L58 52 Z" strokeWidth="4" stroke="#0f0" fill="#ff0"/>
                    <Shape d="M104 52 A50 50, 0, 0, 1, 52 104 L52 52 Z" strokeWidth="4" stroke="#00f" fill="#ff0"/>
                    <Shape d="M52 104 A50 50, 0, 0, 1, 2 52 L52 52 Z" strokeWidth="4" stroke="#0ff" fill="#ff0"/>

                    <Text
                        // font={`20px "Helvetica Neue", "Helvetica", Arial`}
                        font={{
                            fontStyle: "italic",
                            fontWeight: "bold",
                            fontSize: 23,
                            fontFamily:'Helvetica, Neue Helvetica, Arial',
                        }}
                        
                        /* Another way to define font property
                        * font = {{
                        *   fontFamily:'Helvetica, Neue Helvetica, Arial',
                        *   fontSize:23,
                        *   fontWeight:"bold", // or "normal"
                        *   fontStyle:"italic" // or "normal"
                        * }}
                        **/
                        d="M200 0 L0 200"
                        fill="#000000"
                        alignment="center"
                        x={100}
                        y={150}
                        transform={new Transform().rotateTo(72)}
                    >
                        Hello World
                    </Text>
                    <Shape d="M250 0 L 200 250" fill="#f00" alignment="center">dfhlhgiowerjfsdlkfesjfld</Shape>
                    <Shape d={ new Path().moveTo(0,0).lineTo(200,200) } stroke="#0f0" strokeWidth={10}/>

                    <ClippingRectangle
                        width={ 20 }
                        height={ 20 }
                        x={ 100 }
                        y={ 100 }
                        fill="#f00"
                    >
                        <Shape d={ new Path().moveTo(0,0).lineTo(200,200) } stroke="black" strokeWidth={10}/>
                    </ClippingRectangle>
                </Surface>
            </View>
        );
    }

    render() {
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <CircleProgress 
                    style={{marginTop: 20, marginLeft: 20}} 
                    radius={50} 
                    progressWidth={4} 
                    inactiveColor='#ddd' 
                    activeColor='#f00'
                    progress={25} 
                />

                <CircleProgress 
                    style={{marginTop: 20, marginLeft: 20}} 
                    radius={50} 
                    progressWidth={6} 
                    inactiveColor='#ddd' 
                    activeColor='#f00'
                    progress={40} 
                />

                <CircleProgress 
                    style={{marginTop: 20, marginLeft: 20}} 
                    radius={50} 
                    progressWidth={8} 
                    inactiveColor='#ddd' 
                    activeColor='#f00'
                    progress={60} 
                />

                <CircleProgress 
                    style={{marginTop: 20, marginLeft: 20}} 
                    radius={50} 
                    progressWidth={10} 
                    inactiveColor='#ddd' 
                    activeColor='#f00'
                    progress={85} 
                />
                <CircleProgress 
                    style={{marginTop: 20, marginLeft: 20}} 
                    radius={50} 
                    progressWidth={7} 
                    inactiveColor='#ddd' 
                    activeColor='#f00'
                    progress={100} 
                />
            </View>
        );
    }
}