import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors,Sizes } from '@styles';

export default class AppIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      if(this.props.type === "SimpleLineIcons"){
        return (
            <SimpleLineIcons name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        );
      }
      else if(this.props.type === "AntDesign"){
          return(
            <AntDesign name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
          ) 
      }
      else if(this.props.type === "Entypo"){
          return(
            <Entypo name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
          )
    }
    else if(this.props.type === "EvilIcons"){
        return(
            <EvilIcons name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else if(this.props.type === "Feather"){
        return(
            <Feather name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else if(this.props.type === "FontAwesome"){
        return(
            <FontAwesome name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else if(this.props.type === "Fontisto"){
        return(
            <Fontisto name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else if(this.props.type === "Foundation"){
        return(
            <Foundation name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else if(this.props.type === "Ionicons"){
        return(
            <Ionicons name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
  }
  else if(this.props.type === "MaterialCommunityIcons"){
      return(
        <MaterialCommunityIcons name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
      )
  }
    else if(this.props.type === "MaterialIcons"){
        return(
            <MaterialIcons name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else if(this.props.type === "Octicons"){
        return(
            <Octicons name={this.props.name} color={this.props.color} size={this.props.size} style={this.props.style}/>
        )
    }
    else{
        return null
    }
  }
}
