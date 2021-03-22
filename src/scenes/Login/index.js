import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  I18nManager,
} from 'react-native';
import {AppStyles, Strings, Colors, Constants, Validate} from '@styles';
import {AppTextInput, AppButton, AppIcon, AppLogo, LoadingView} from '@atoms';
import KS from '@services/KSAPI';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  validateForm = () => {
    if (Validate.isEmpty(this.state.email, this.state.password)) {
      return Strings.CompleteForm;
    } else if (!Validate.isEmail(this.state.email)) {
      return Strings.InvalidEmail;
    } else if (!Validate.isPassword(this.state.password)) {
      return Strings.InvalidPassword;
    }
    return undefined;
  };

  setPushNotification(ID) {
    const _this = this;
    FCM = messaging();
    // check to make sure the user is authenticated
    // requests permissions from the user
    FCM.requestPermission();
    // gets the device's push token
    FCM.getToken().then((token) => {
      KS.SetUserToken({
        userid: ID,
        token: token,
      });
    });
  }

  loginVendor = async () => {
    if (this.validateForm() != undefined) {
      Toast.show(this.validateForm());
    } else {
      this.setState({loading: true});
      KS.Login({
        name: this.state.email,
        pass: this.state.password,
        langID: Strings.langID,
        isDriver: true,
      }).then((data) => {
        if (data.result === 1) {
          const user = data.User;
          let hasAccess = user.MemberOf.find(
            (g) => g.ID === Constants.DriverUser,
          );
          if (hasAccess) {
            this.setPushNotification(user.ID);
            this.props.Login(user);
            this.props.navigation.navigate('App');
          } else {
            this.setState({loading: false});
            Toast.show(Strings.UserExist);
          }
        } else if (data.result === 0) {
          this.setState({loading: false});
          Toast.show(Strings.WrongUser);
        } else {
          this.setState({loading: false});
          Toast.show(Strings.DriverisNotActive);
        }
      });
    }
  };

  render() {
    return (
      <View style={AppStyles.fullScreenView}>
        <TouchableOpacity
          style={AppStyles.backButton}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <AppIcon
            type={'AntDesign'}
            name={I18nManager.isRTL ? 'right' : 'left'}
            color={Colors.DarkTextColor}
            size={25}
          />
        </TouchableOpacity>
        {this.state.loading ? (
          <LoadingView />
        ) : (
          <View style={styles.pageMainView}>
            <AppLogo
              width={Dimensions.get('screen').width * 0.65}
              height={Dimensions.get('screen').width * 0.17}
            />
            <Text style={AppStyles.darkText}>{Strings.loginText}</Text>
            <AppTextInput
              containPhone={false}
              placeholder={Strings.Email}
              keyboardType={'default'}
              onChangeText={(text) => {
                this.setState({email: text});
              }}
            />
            <AppTextInput
              containPhone={false}
              placeholder={Strings.Password}
              keyboardType={'default'}
              secureTextEntry
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
            <AppButton
              containPhone={false}
              ButtonText={Strings.Login}
              ButtonColor={Colors.primary}
              onPress={() => {
                this.loginVendor();
              }}
            />
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}>
                <Text style={AppStyles.darkText}>
                  {Strings.DontHaveAccount}
                  <Text style={AppStyles.AppFont}>{' ' + Strings.Signup}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageMainView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
    position: 'relative',
  },
});

const mapDispatchToProps = (dispatch) => {
  const useractions = require('@redux/UserReducer');

  return {
    Login: (user) => {
      useractions.actions.Login(dispatch, user);
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
