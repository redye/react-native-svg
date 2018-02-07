/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Router,
  Scene,
  Tabs,
  Stack,
  Reducer,
} from 'react-native-router-flux';

import {
  THEME_COLOR,
  TEXT_MAIN_COLOR,
} from './app/common/Configure';
import backImage from './app/images/navigtionbar_back.png'

import Home from './app/controller/home/Home';
import Mine from './app/controller/mine/Mine';
import TabIcon from './app/components/TabIcon';

getSceneStyle = () => {
  return ({
    backgroundColor: '#FFF',
    shadowRadius: 3,
    shadowOpacity: 1,
  });
}

createReducer = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION: ', action);
    return defaultReducer(state, action);
  };
}


export default class App extends Component<{}> {
  render() {
    return (
      <Router
        getSceneStyle={getSceneStyle}
        uriPrefix="redye.com"
        createReduce={createReducer}
      >
        <Stack
          navigationBarStyle={styles.navigationBarStyle}
          titleStyle={styles.titleStyle}
          backButtonImage={backImage}
        >
          <Tabs
            key='tabbar'
            swipeEnabled={false}
            showLabel={true}
            tabBarStyle={styles.tabBarStyle}
            activeBackgroundColor="rgba(236, 236, 236, 1)"
            inactiveBackgroundColor="rgba(236, 236, 236, 1)"
            activeTintColor={THEME_COLOR}
            inactiveTintColor={TEXT_MAIN_COLOR}
            labelStyle={styles.labelStyle}
            hideNavBar
            initial
          >
            <Stack
              key="home_tab"
              title="home"
              tabBarLabel="首页"
              inactiveBackgroundColor="#FFF"
              activeBackgroundColor="#DDD"
              icon={TabIcon}
              initial
            >
              <Scene key="home" component={Home} title="首页_scene" hideNavBar={false} />
            </Stack>

            <Stack
              key="mine_tab"
              title="mine"
              tabBarLabel="我的"
              inactiveBackgroundColor="#FFF"
              activeBackgroundColor="#DDD"
              icon={TabIcon}
            >
              <Scene key="mine" component={Mine} title="我的_scene" hideNavBar={false} />
            </Stack>
          </Tabs>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabBarStyle: {
    backgroundColor: '#EEE',
  },
  navigationBarStyle: {
    backgroundColor: THEME_COLOR,
    borderBottomColor: THEME_COLOR,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#DDD',
  },
  titleStyle: {
    color: '#FFF',
    alignSelf: 'center'
  },
  labelStyle:{
    fontSize: 15
  }
});
