import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Strings} from '@styles';
const minDisplayTime = 4500;

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(this.prepareData, minDisplayTime);
  }

  prepareData = async () => {
    const value = await AsyncStorage.getItem('language');
    console.log(value);
    if (value != undefined) {
      Strings.setLanguage(value);
      if (this.props.user && this.props.user.ID) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    } else {
      this.props.navigation.navigate('SelectLanguage');
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('@Images/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

const mapStateToProps = ({UserReducer}) => {
  return {
    user: UserReducer.user,
  };
};

export default connect(mapStateToProps, null)(SplashScreen);

const styles = StyleSheet.create({
  logo: {
    width: Dimensions.get('screen').width * 0.8,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
