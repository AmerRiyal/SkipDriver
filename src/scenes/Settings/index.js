import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  I18nManager,
} from 'react-native';
import {AppIcon, AppTextInput, AppButton} from '@atoms';
import {HeaderView} from '@molecules';
import {AppStyles, Images, Strings, Colors} from '@styles';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {LoadingView} from '@atoms';
import KS from '@services/KSAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.Name,
      email: this.props.user.Email,
      phone: this.props.user.Phone,
      loading: true,
    };
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('language');
    this.setState({lang: value});
    KS.ProviderStatusGet({
      providerID: this.props.user.ID,
      langID: Strings.langID,
    }).then((data) => {
      this.setState({loading: false});
      if (data.result) {
        this.setState({Iban: data.driver.Iban});
      }
    });
  };

  handelUpdateUser = () => {
    const {email, name, phone} = this.state;
    if (name == '' || name == null) {
      Toast.show(Strings.CorrectName);
    } else if (email == '' || email == null || !this.validateEmail(email)) {
      Toast.show(Strings.CorrectEmail);
    } else if (phone == '' || phone == null) {
      Toast.show(Strings.CorrectPhone);
    } else {
      this.setState({loading: true});
      KS.UpdateDriverInfo({
        userID: this.props.user.ID,
        email: email,
        name: name,
        phone: phone,
        Iban: this.state.Iban,
      }).then((data) => {
        this.setState({loading: false});
        if (data.result && data.User != null) {
          this.props.Login(data.User);
        }
      });
    }
  };

  changeLang = (lang) => {
    Alert.alert(Strings.Confirmation, Strings.changeLang, [
      {
        text: Strings.Yes,
        onPress: async () => {
          Strings.setLanguage(lang);
          if (lang === 'en') {
            AsyncStorage.setItem('language', 'en', () => {
              I18nManager.forceRTL(false);
              RNRestart.Restart();
            });
          } else {
            AsyncStorage.setItem('language', 'ar', () => {
              I18nManager.forceRTL(true);
              RNRestart.Restart();
            });
          }
        },
      },
      {
        text: Strings.cancel,
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  render() {
    return (
      <View style={AppStyles.fullScreenView2}>
        <HeaderView
          navigation={this.props.navigation}
          renderLeft={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}>
                <AppIcon
                  type={'SimpleLineIcons'}
                  name={'menu'}
                  color={'#fff'}
                  size={25}
                />
              </TouchableOpacity>
            );
          }}
          renderTitle={() => {
            return (
              <Text
                style={[
                  AppStyles.darkText,
                  {color: '#fff', marginVertical: 0, fontSize: 20},
                ]}>
                {Strings.Settings}
              </Text>
            );
          }}
        />
        {this.state.loading ? (
          <LoadingView />
        ) : (
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                borderColor: Colors.borderColor,
              }}>
              <Text
                style={[
                  AppStyles.darkText,
                  {
                    fontWeight: 'bold',
                    marginTop: 25,
                    fontSize: 22,
                    marginBottom: 2,
                  },
                ]}>
                {Strings.profileDetails}
              </Text>
            </View>
            <View style={styles.InputView}>
              <Text style={{color: '#97989B'}}>{Strings.Name}</Text>
              <AppTextInput
                containPhone={false}
                ExtraStyle={styles.InputProfilestyle}
                placeColor={'#000'}
                keyboardType={'default'}
                onChangeText={(text) => {
                  this.setState({name: text});
                }}
                value={this.state.name}
              />
            </View>
            <View style={styles.InputView}>
              <Text style={{color: '#97989B'}}>{Strings.Email}</Text>
              <AppTextInput
                containPhone={false}
                ExtraStyle={styles.InputProfilestyle}
                placeColor={'#000'}
                keyboardType={'default'}
                onChangeText={(text) => {
                  this.setState({email: text});
                }}
                value={this.state.email}
              />
            </View>
            <View style={[styles.InputView, {padding: 0}]}>
              <Text style={{color: '#97989B', paddingLeft: 10, paddingTop: 10}}>
                {Strings.Phone}
              </Text>
              <AppTextInput
                containPhone={false}
                ExtraStyle={styles.InputProfilestyle}
                placeColor={'#000'}
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  this.setState({phone: text});
                }}
                value={this.state.phone}
              />
            </View>
            <View style={[styles.InputView, {padding: 0}]}>
              <Text style={{color: '#97989B', paddingLeft: 10, paddingTop: 10}}>
                {Strings.Iban}
              </Text>
              <AppTextInput
                containPhone={false}
                ExtraStyle={styles.InputProfilestyle}
                placeColor={'#000'}
                keyboardType={'default'}
                onChangeText={(text) => {
                  this.setState({Iban: text});
                }}
                value={this.state.Iban}
              />
            </View>
            <AppButton
              ButtonText={Strings.save}
              ButtonColor={Colors.primary}
              ExtraStyle={{marginTop: 20}}
              onPress={() => {
                this.handelUpdateUser();
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                borderColor: Colors.borderColor,
              }}>
              <Text
                style={[
                  AppStyles.darkText,
                  {
                    fontWeight: 'bold',
                    marginTop: 25,
                    fontSize: 22,
                    marginBottom: 2,
                  },
                ]}>
                {Strings.SelectLanguage}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
                alignSelf: 'center',
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.lang !== 'en') {
                    this.changeLang('en');
                  }
                }}
                style={[
                  styles.langView,
                  this.state.lang === 'en'
                    ? {backgroundColor: Colors.primary}
                    : {},
                ]}>
                <Text
                  style={[
                    styles.langText,
                    this.state.lang === 'en'
                      ? {color: '#fff'}
                      : {color: Colors.primary},
                  ]}>
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.lang !== 'ar') {
                    this.changeLang('ar');
                  }
                }}
                style={[
                  styles.langView,
                  this.state.lang === 'ar'
                    ? {backgroundColor: Colors.primary}
                    : {},
                ]}>
                <Text
                  style={[
                    styles.langText,
                    this.state.lang === 'ar'
                      ? {color: '#fff'}
                      : {color: Colors.primary},
                  ]}>
                  العربية
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputView: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
  },
  InputProfilestyle: {
    width: Dimensions.get('screen').width,
    elevation: 0,
    borderRadius: 0,
    padding: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    marginBottom: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  langView: {
    borderColor: Colors.primary,
    marginRight: 25,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 45,
    paddingVertical: 8,
  },
  langText: {
    color: Colors.primary,
    fontSize: 17,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {
    user: UserReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux/UserReducer');

  return {
    Login: (user) => {
      actions.Login(dispatch, user);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
