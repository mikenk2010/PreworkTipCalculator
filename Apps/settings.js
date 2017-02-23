import React, {Component} from "react";
import {AppRegistry, Text, View, TextInput, StyleSheet, TouchableOpacity, Picker, AsyncStorage} from "react-native";

export default class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {screnTransition: ''};
    this.getSceneTransition();
  }

  // set data to AsyncStorage
  async setSceneTransition(screne){
    try{
      await AsyncStorage.setItem('SCENE_SELECTED', screne);
      this.setState({
        screnTransition : screne
      })
    }catch(error){
    }
  }

  // get data to AsyncStorage
  async getSceneTransition(){
    try{
      let screnTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      this.setState({
        screnTransition : screnTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong.." + error);
    }
  }

  // this method will be called when scence loaded
  componentDidMount(){
    this.getSceneTransition();
  }

  // action to set select value to AsyncStorage
  setSelectSceneTransition(scene){
    try {
      this.setSceneTransition(scene);
      this.setState({
        scene: scene
      });
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }

  // Render
  render(){
    return(
      <View style={{marginTop:50,padding:10}}>
        <View>
          <Text style={{fontSize:25}}>Scene Transitions</Text>
          <Picker
          selectedValue={this.state.screnTransition}
            onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>
      </View>
    )
  }
}

// StyleSheet
var stylesCSS = StyleSheet.create({
  billStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  billLabel: {
    fontSize: 20,
    marginRight: 10
  },
  header: {
    fontWeight:'bold',
    color:'black',
    textAlign:'center',
    fontSize:30,
    marginBottom:10
  },
  tipResult: {
    fontSize: 20
  },
  space: {
    marginTop: 20
  },
  inputAmount: {
    height: 30,
    padding:2,
    borderColor: 'black',
    borderWidth: 2,
    flex: 1,
  },
  inputResult: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

module.exports = Setting;
