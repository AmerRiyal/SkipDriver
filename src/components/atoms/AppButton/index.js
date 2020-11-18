import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AppStyles, Sizes} from '@styles';
import {AppIcon} from '@atoms';

export default class AppButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          AppStyles.ButtonStyle,
          this.props.ExtraStyle,
          {backgroundColor: this.props.ButtonColor},
        ]}
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        {this.props.ContainIcon && (
          <AppIcon
            type={this.props.IconType}
            name={this.props.IconName}
            size={Sizes.IconSizes}
            color={'#fff'}
          />
        )}
        <Text style={AppStyles.ButtonTextStyle}>{this.props.ButtonText}</Text>
      </TouchableOpacity>
    );
  }
}
