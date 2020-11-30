import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  I18nManager,
} from 'react-native';
import {Sizes, Colors, Strings} from '@styles';
import {CountryPicker} from '@organisms';

export default class AppTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PhoneInput: this.props.containPhone,
      showCountryModal: false,
      cca2: 'JO',
    };
  }

  render() {
    return this.state.PhoneInput ? (
      <View style={[styles.phoneinput, this.props.ExtraStyle]}>
        <View style={{paddingHorizontal: 10}}>
          <CountryPicker
            showCallingCode={true}
            closeable={true}
            onChange={(value) => {
              this.setState({cca2: value.cca2, callingCode: value.callingCode});
            }}
            cca2={this.state.cca2}
            translation="eng"
          />
        </View>
        <TextInput
          style={styles.TextInputMainStyle2}
          placeholder={this.props.placeholder}
          placeholderTextColor={
            this.props.placeColor != null ? this.props.placeColor : '#97989B'
          }
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
        />
      </View>
    ) : (
      <TextInput
        style={[
          styles.TextInputMainStyle,
          this.props.ExtraStyle,
          I18nManager.isRTL ? {textAlign: 'right'} : {textAlign: 'left'},
        ]}
        placeholder={this.props.placeholder}
        placeholderTextColor={
          this.props.placeColor != null ? this.props.placeColor : '#97989B'
        }
        keyboardType={this.props.keyboardType}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={this.props.onChangeText}
        editable={this.props.editable}
        value={this.props.value}
      />
    );
  }
}

const styles = StyleSheet.create({
  TextInputMainStyle: {
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#fff',
    color: Colors.DarkTextColor,
    fontSize: 17,
    marginBottom: 10,
    borderRadius: Sizes.RadiusDegree,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  TextInputMainStyle2: {
    color: Colors.DarkTextColor,
    fontSize: 17,
    flex: 1,
  },
  phoneinput: {
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: '#fff',
    color: Colors.DarkTextColor,
    marginBottom: 10,
    borderRadius: Sizes.RadiusDegree,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    fontSize: 17,
  },
});
