import React, {Component} from "React";
import {Navigator, Text, StyleSheet, TouchableOpacity} from "react-native";


// Defined controls
var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.id != 'CalculatorPage'){
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.pop()}>
          <Text>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.push({id: 'SettingPage'})}>
          <Text style={stylesCSS.headerFontSize}>Setting</Text>
        </TouchableOpacity>
      );
    }

  },
  Title: (route, navigator, index, navState) => {
    return;
  },
}

module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
)


var stylesCSS = StyleSheet.create({
  tabbarHeadr: {
    margin:10,
  },
  headerFontSize: {
    fontSize: 15
  }
})
