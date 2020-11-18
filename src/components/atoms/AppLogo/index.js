import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';

export default class Applogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if(this.props.light){
        return (
            <Image source={require('../../../assets/Images/light_logo.png')} style={[{
                width:this.props.width,
                height:this.props.height,
            },this.props.extraStyle]}/>
        );
    }
    else{
        return (
            <Image source={require('../../../assets/Images/logo.png')} style={[{
                width:this.props.width,
                height:this.props.height,
            },this.props.extraStyle]}/>
        );
    }
  }
}
