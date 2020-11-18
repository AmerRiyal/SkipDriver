import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@styles';
import Spinner from 'react-native-spinkit'

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Spinner  isVisible={true} size={80} type={"ChasingDots"} color={Colors.primary}/>
      </View>
    );
  }
}
