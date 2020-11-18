import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {AppButton, AppLogo} from '@atoms';
import {AppStyles, Images, Strings, Colors} from '@styles';
import KS from '@services/KSAPI';
import ModalBox from 'react-native-modalbox';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={Images.backImage3}
        style={AppStyles.FullImageView}>
        <NavigationEvents
          onWillFocus={() => {
            if (global.NewRegister) this.refs.modalbox.open();
          }}
        />
        <View style={AppStyles.backView}></View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AppLogo
            light
            width={Dimensions.get('screen').width * 0.8}
            height={Dimensions.get('screen').width * 0.21}
            extraStyle={{position: 'relative', top: 45}}
          />
        </View>
        <View style={styles.ButtonView}>
          <AppButton
            ButtonText={Strings.Login}
            ButtonColor={Colors.primary}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
          />
          <View style={styles.orView}>
            <View style={{flex: 1, height: 1, backgroundColor: '#fff'}}></View>
            <Text
              style={[AppStyles.lightText, {flex: 0.5, textAlign: 'center'}]}>
              {Strings.or}
            </Text>
            <View style={{flex: 1, height: 1, backgroundColor: '#fff'}}></View>
          </View>
          <AppButton
            ButtonText={Strings.newDriver}
            ButtonColor={Colors.DarkTextColor}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          />
          <View
            style={{
              width: Dimensions.get('screen').width * 0.9,
              alignSelf: 'center',
              marginVertical: 15,
            }}>
            <Text style={[AppStyles.lightText, {textAlign: 'center'}]}>
              {Strings.loginSkip}
              <Text style={{textDecorationLine: 'underline'}}>
                {Strings.Terms}
              </Text>
              <Text>{Strings.and}</Text>
              <Text style={{textDecorationLine: 'underline'}}>
                {Strings.privacy}
              </Text>
            </Text>
          </View>
        </View>
        <ModalBox
          style={[styles.modalbox]}
          ref={'modalbox'}
          swipeToClose={false}
          onClosed={() => {
            global.NewRegister = false;
          }}
          position="center">
          <View style={styles.modalContent}>
            <Image
              source={require('@Images/Confirmed.gif')}
              style={{width: 220, height: 220}}
            />
            <Text
              style={[
                AppStyles.darkText,
                {marginTop: 0, fontWeight: 'bold', fontSize: 22},
              ]}>
              {Strings.ThankYouForRegister}
            </Text>
            <Text
              style={[
                AppStyles.darkText,
                {textAlign: 'center', marginVertical: 0, width: '85%'},
              ]}>
              {Strings.contactYouSoon}
            </Text>
          </View>
        </ModalBox>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 25,
  },
  ButtonView: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 30,
  },
  orView: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.9,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalbox: {
    height: Dimensions.get('screen').height * 0.5,
    borderRadius: 5,
    width: Dimensions.get('screen').width * 0.9,
    position: 'relative',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux/VendorReducer');

  return {
    SaveFeatures: (features) => {
      actions.SaveFeatures(dispatch, features);
    },
    SaveCategories: (categories) => {
      actions.SaveCategories(dispatch, categories);
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);
