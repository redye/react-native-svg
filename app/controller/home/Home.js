import React from 'react';

import {
    View,
    ART,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import CircleComponent from '../../components/progress/CircleComponent';
import BarComponent from '../../components/progress/BarComponent';
import Progress from '../../components/progress/Progress';
import PieComponent from '../../components/progress/PieComponent';

const {
    Surface,
    Shape,
    Group,
    Path,
    // Text,
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
                    >Hello World</Text>
                    
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
            <View style={styles.container}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Progress.Circle 
                        style={{marginTop: 20, marginLeft: 20}} 
                        radius={50} 
                        strokeWidth={4} 
                        inactiveColor='#ddd' 
                        activeColor='#f00'
                        progress={20} 
                    />

                    <Progress.Circle  
                        style={{marginTop: 20, marginLeft: 20}} 
                        radius={50} 
                        strokeWidth={6} 
                        inactiveColor='#ddd' 
                        activeColor='#f00'
                        progress={90} 
                        duration={2 * 1000}
                        ref='progress'
                        animation={true}
                    />

                    <CircleComponent 
                        style={{marginTop: 20, marginLeft: 20}} 
                        radius={50} 
                        strokeWidth={8} 
                        inactiveColor='#ddd' 
                        activeColor='#f00'
                        progress={60} 
                    />

                    <CircleComponent 
                        style={{marginTop: 20, marginLeft: 20}} 
                        radius={50} 
                        strokeWidth={10} 
                        inactiveColor='#ddd' 
                        activeColor='#f00'
                        progress={85} 
                    />
                    <CircleComponent 
                        style={{marginTop: 20, marginLeft: 20}} 
                        radius={50} 
                        strokeWidth={7} 
                        inactiveColor='#ddd' 
                        activeColor='#f00'
                        progress={100} 
                    />

                    <TouchableOpacity onPress={() => {
                        this.refs.progress.setProgress(10);
                        this.refs.bar.setProgress(90);
                        this.refs.bar2.setProgress(30);
                        this.refs.pie.setProgress(65);
                    }}>
                        <Text style={{backgroundColor: '#ff0', padding: 20, margin: 10}}>点我</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Progress.Bar ref="bar" progress={10} animation={true} duration={3000} width={250}/>
                        <Text style={{marginLeft: 8, backgroundColor: 'orange'}}>test</Text>
                    </View>
                    <Progress.Bar ref="bar2" style={{marginTop: 20}} progress={80} animation={true} duration={3000}/>
                </View>
                <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row'}}>
                    <PieComponent radius={70} progress={70} />
                    <Progress.Pie ref='pie' style={{marginLeft: 20}} radius={70} progress={20} duration={500} strokeColor='orange' />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});