import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { AppIcon } from '@atoms';
import { AppStyles,Strings,Colors,Sizes } from '@styles';

export default class StarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={[this.props.mainStyle,styles.outerView]}>
        <AppIcon type={"SimpleLineIcons"} name={"star"} color={'#fff'} size={35}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    outerView:{
        padding: 15,
        borderRadius:Sizes.RadiusDegree,
    }
});
