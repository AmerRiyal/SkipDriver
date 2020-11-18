import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { AppStyles,Strings,Colors,Sizes } from '@styles';
import { AppIcon } from '@atoms';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.ButtonMainView}>
        <AppIcon type={this.props.IconType} name={this.props.IconName} size={25} color={Colors.primary}/>
        <Text style={styles.Titlestyles}>{this.props.Title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  ButtonMainView:{
    paddingHorizontal: 10,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  Titlestyles:{
    color:"#fff",
    fontSize:17,
    marginLeft: 15,
    
  }
});
