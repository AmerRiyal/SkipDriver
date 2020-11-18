import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { AppStyles,Strings,Colors,Sizes } from '@styles';
import { AppTextInput,AppButton,AppIcon } from '@atoms';


export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checked:this.props.checked,
    };
  }

  render() {
    return (
      <View style={{flexDirection:'row',alignItems:'center'}}>
        {this.props.checked ? (
            <TouchableOpacity onPress={this.props.onPress}>
            <AppIcon type={"MaterialCommunityIcons"} name={"checkbox-marked"} size={Sizes.IconSizes} color={Colors.primary}/>
            </TouchableOpacity>
        ):(
            <TouchableOpacity onPress={this.props.onPress}>
            <AppIcon type={"MaterialCommunityIcons"} name={"checkbox-blank-outline"} size={Sizes.IconSizes} color={Colors.primary}/>
            </TouchableOpacity>
        )}
        <Text style={[AppStyles.darkText,{marginLeft:10}]}>{this.props.text}{this.props.Terms && <Text style={AppStyles.AppFont}>{" "+Strings.Terms}</Text>}</Text>
      </View>
    );
  }
}
