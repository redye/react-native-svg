import React from 'react';
import {
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

const tabImages = {
    home: {
        normal: require('../images/tab_btn_home_normal.png'),
        selected: require('../images/tab_btn_home_selected.png')
    }, 
    mine:{
        normal: require('../images/tab_btn_profile_normal.png'),
        selected: require('../images/tab_btn_profile_selected.png')
    }
};

export default class TabIcon extends React.Component {

    static propTypes = {
        focused: PropTypes.bool,
        title: PropTypes.string
    }

    render() {
        let obj = tabImages[this.props.title];
        let image = this.props.focused ? obj.selected : obj.normal;
        return (
            <Image style={{width: 24, height: 24, resizeMode:'contain'}} source={image} />
        );
    }
}