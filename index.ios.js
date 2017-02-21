import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

import App from './Apps/app.js';

export default class PreworkTipCalculator extends Component {
  render() {
    return (
    <App />
    );
  }
}

AppRegistry.registerComponent('PreworkTipCalculator', () => PreworkTipCalculator);
