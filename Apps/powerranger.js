import React, {Component} from "react";
import {AppRegistry, Navigator, StyleSheet, TouchableOpacity, Text, View, AsyncStorage} from "react-native";

// Add Calculator component
import Calculator from "../Apps/calculator.js";

// Add Setting component
import Settings from "../Apps/settings.js";

// Add custom nav bar, just for make your code more clean
import CustomNavBar from "../Apps/customNavBar.js";

export default class PowerRanger extends Component {
  constructor(props) {
    super(props);
    this.state = {screnTransition: this.getSceneTransition()}
  }

  // get data from AsyncStorage
  async getSceneTransition(){
    try{
      let screnTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      this.setState({
        screnTransition : screnTransitionValue
      });
    }catch(error){
      return '';
    }
  }

  // Render
  render(){
    return (
      <Navigator
          initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          navigationBar={CustomNavBar}
          configureScene={this.configureScene.bind(this)}
         />
    );
  }

  // config scen transition
  configureScene(route, routeStack){
    this.getSceneTransition();
    switch (this.state.screnTransition) {
      case 'FloatFromRight':
        return Navigator.SceneConfigs.FloatFromRight;
        break;
      case 'FloatFromLeft':
        return Navigator.SceneConfigs.FloatFromLeft;
        break;
        case 'FloatFromBottom':
          return Navigator.SceneConfigs.FloatFromBottom;
          break;
        case 'FloatFromBottom':
          return Navigator.SceneConfigs.FloatFromBottom;
          break;
        case 'FloatFromBottomAndroid':
          return Navigator.SceneConfigs.FloatFromBottomAndroid;
          break;
        case 'SwipeFromLeft':
          return Navigator.SceneConfigs.SwipeFromLeft;
          break;
        case 'HorizontalSwipeJump':
          return Navigator.SceneConfigs.HorizontalSwipeJump;
          break;
        case 'HorizontalSwipeJumpFromRight':
          return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
          break;
      default:
        return Navigator.SceneConfigs.FloatFromBottom;
    }
  }

  // To navigate to page based on page ID
  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage':
        return (
          <Calculator navigator={navigator}/>
        );
        break;
      case 'SettingPage':
        return (
          <Settings navigator={navigator}/>
        );
        break;
      default:
        return (
          <Calculator navigator={navigator}/>
        );
    }
  }
};

module.exports = PowerRanger;
