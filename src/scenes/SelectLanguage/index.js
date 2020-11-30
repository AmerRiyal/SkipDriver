import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {AppLogo} from '@atoms';
import {AppStyles, Images, Strings, Colors, Constants} from '@styles';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SelectLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppLogo
          width={Dimensions.get('screen').width * 0.65}
          height={Dimensions.get('screen').width * 0.17}
        />
        <View style={{marginTop: 45}}>
          <TouchableOpacity
            style={styles.butonView}
            onPress={async () => {
              Strings.setLanguage('en');
              AsyncStorage.setItem('language', 'en', () => {
                I18nManager.forceRTL(false);
                RNRestart.Restart();
              });
            }}>
            <Text style={styles.title}>{'English'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.butonView}
            onPress={async () => {
              Strings.setLanguage('ar');
              AsyncStorage.setItem('language', 'ar', () => {
                I18nManager.forceRTL(true);
                RNRestart.Restart();
              });
            }}>
            <Text style={styles.title}>{'العربي'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  butonView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').height * 0.08,
    borderWidth: 1,
    marginBottom: 25,
    borderColor: Colors.primary,
  },
  title: {
    fontSize: 18,
    color: Colors.primary,
  },
});
