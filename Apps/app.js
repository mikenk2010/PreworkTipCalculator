import React, {Component} from "React";
import {AppRegistry,  Text, View, TextInput, StyleSheet} from "react-native"

// External plugins
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {billAmount : '', 'tipAmount' : 0.00, tipPercent : 0, 'result': 0}

    // Bind data selectd segment
    this.handleSegmentChange = this.handleSegmentChange.bind(this);
  }

  handleSegmentChange(index) {
    this.setState({
        tipPercent: index
    });

    // Update result when segment was changed
    this.conChangeCalculateTotal(this.state.billAmount, index);
  }

  // Mail function,
  conChangeCalculateTotal(bill, index){
    if(!index && index != 0){
      index = this.state.tipPercent;
    }

    // Check bill is not a number
    if(isNaN(bill) || !bill){
      bill = 0;
    }

    bill = parseFloat(bill);

    var tip = this.calculateTipTotal(bill, index);
    this.setState({
      tipAmount: tip.toFixed(2),
      billAmount: bill + "", // !!! Do you know why I have to plus ""
      result: parseFloat(bill + tip)
    })
  }

  // Multiply billAmount and percet to get tip amount
  calculateTipTotal(billAmount, tipPercent){
    return billAmount * this.convertTipPercet(tipPercent);
  }

  // Convert Tip index to percent
  convertTipPercet(tipIndex){
    var percents = this.returnTipPercet();
    return parseFloat(percents[tipIndex])/100;
  }

  // Defined percent
  returnTipPercet(){
    return ['10%', '15%', '50%'];
  }

  render(){
    return (
      <View style={{marginTop:30,padding:10}}>
        <View><Text style={stylesCSS.header}>Tip Calculator</Text></View>
        <View>
          {/*Bill amount field*/}
          <View style={stylesCSS.space, stylesCSS.billStyle}>
            <Text style={stylesCSS.billLabel}>Bill amount</Text>
            <TextInput
              style={stylesCSS.inputAmount}
              onChangeText={(billAmount) => this.conChangeCalculateTotal(billAmount)}
              value={this.state.billAmount}
              keyboardType='numeric'
              maxLength={10}
            />
          </View>
          {/*End Bill amount field*/}

          {/*Tip amount field*/}
          <View style={stylesCSS.space, stylesCSS.billStyle}>
            <Text style={stylesCSS.billLabel}>Tip amount</Text>
            <Text style={stylesCSS.tipResult}>{this.state.tipAmount}</Text>
          </View>
          {/*End Bill amount field*/}

          {/*Segment Control*/}
          <View style={stylesCSS.space}>
          <SegmentedControlTab values={this.returnTipPercet()}
            onTabPress= {index => this.handleSegmentChange(index) }
          />
          {/*End Segment Control*/}
          </View>
        </View>

        <View style={stylesCSS.space}>
          <Text>Bill amount: {this.state.billAmount}</Text>
          <Text>Tip amount: {this.state.tipAmount}</Text>
          <Text>Percent: {this.convertTipPercet(this.state.tipPercent)}</Text>
        </View>

        <View style={stylesCSS.space}>
          <Text style={stylesCSS.inputResult}>Result: {this.state.result}</Text>
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
    height: 40,
    padding:10,
    borderColor: 'black',
    borderWidth: 2,
    flex: 1,
  },
  inputResult: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

// Export Compoment
module.exports = App;
