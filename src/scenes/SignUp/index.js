import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {DriverInfo, DriverSecurity, DriverPhotos} from '@organisms';
import StepIndicator from 'react-native-step-indicator';
import {AppStyles, Strings, Colors, Constants, Validate} from '@styles';
import {AppTextInput, AppButton, AppIcon, AppLogo, LoadingView} from '@atoms';
import KS from '@services/KSAPI';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

//const labels = ["Cart","Delivery Address","Order Summary"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Colors.primary,
  stepStrokeUnFinishedColor: '#4D4D4D',
  separatorFinishedColor: Colors.primary,
  separatorUnFinishedColor: '#4D4D4D',
  stepIndicatorFinishedColor: Colors.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#4D4D4D',
  labelColor: '#4D4D4D',
  labelSize: 13,
  currentStepLabelColor: Colors.primary,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      userType: 0,
      DriverPhotos: [],
      numCitizen: null,
      numResident: null,
      loading: false,
      labels: [
        Strings.DriverSecurity,
        Strings.DriverInfo,
        Strings.DriverPhotos,
      ],
      user: {
        username: null,
        email: null,
        userPhone: null,
        password: null,
        dob: null,
        Iban: null,
      },
    };
  }

  onPageChange(position) {
    this.setState({currentPosition: position});
  }

  handSignUp = async () => {
    this.setState({loading: true});
    let driver = {};
    driver.driverType = this.state.userType;
    driver.DOB = this.state.user.dob;
    driver.driverNumber =
      this.state.userType === 0
        ? this.state.numCitizen
        : this.state.numResident;
    driver.Iban = this.state.user.Iban;
    KS.RegisterDrive({
      user: this.state.user,
      driver: driver,
    }).then((data) => {
      this.setState({loading: false});
      if (data.result) {
        this.state.DriverPhotos.map((img, index) => {
          KS.DriverPhotoAdd({
            userID: data.UserID,
            imagebase64: img.data,
            filename: img.Filename,
            fileextension: img.path
              .split('/')
              [img.path.split('/').length - 1].split('.')[1],
            photonumber: img.Key,
          });
        });
        global.NewRegister = true;
        this.props.navigation.replace('Home');
      } else if (data.result === -1) {
        if (this.state.userType === 0)
          Toast.show(Strings.numCitizen + ' ' + Strings.alreadyExsist);
        else Toast.show(Strings.numResident + ' ' + Strings.alreadyExsist);
      } else {
        Toast.show(Strings.UserExist);
      }
    });
  };

  renderViewPagerPage = (index) => {
    switch (index) {
      case 0:
        return (
          <DriverSecurity
            setUserType={(type) => {
              this.setState({userType: type});
            }}
            userType={this.state.userType}
            numCitizen={this.state.numCitizen}
            numResident={this.state.numResident}
            setNumCitizen={(text) => {
              this.setState({numCitizen: text});
            }}
            setNumResident={(text) => {
              this.setState({numResident: text});
            }}
            changePage={(page) => {
              this.onPageChange(page);
            }}
          />
        );
      case 1:
        return (
          <DriverInfo
            driver={this.state.user}
            changePage={(data, page) => {
              this.setState({user: data});
              this.onPageChange(page);
            }}
          />
        );
      case 2:
        return (
          <DriverPhotos
            changePage={(page) => {
              this.onPageChange(page);
            }}
            handSignUp={(data) => {
              this.setState({DriverPhotos: data}, () => {
                Alert.alert(Strings.Confirmation, Strings.DriverSignUpMessage, [
                  {text: Strings.Yes, onPress: () => this.handSignUp()},
                  {text: Strings.cancel, onPress: () => {}},
                ]);
              });
            }}
          />
        );
    }
  };

  render() {
    const {labels} = this.state;
    return (
      <View style={AppStyles.fullScreenView}>
        <TouchableOpacity
          style={AppStyles.backButton}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <AppIcon
            type={'AntDesign'}
            name={'left'}
            color={Colors.DarkTextColor}
            size={25}
          />
        </TouchableOpacity>
        {this.state.loading ? (
          <LoadingView />
        ) : (
          <View style={styles.pageMainView}>
            <View style={{alignItems: 'center'}}>
              <AppLogo
                width={Dimensions.get('screen').width * 0.65}
                height={Dimensions.get('screen').width * 0.17}
              />
              <Text style={[AppStyles.darkText]}>{Strings.loginText}</Text>
            </View>

            <StepIndicator
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              labels={labels}
              stepCount={3}
            />
            <Swiper
              activeDotColor={Colors.primary}
              style={{flexGrow: 1}}
              loop={false}
              ref={'swiper'}
              index={this.state.currentPosition}
              autoplay={false}
              onIndexChanged={(page) => {
                this.setState({currentPosition: page});
              }}>
              {this.renderViewPagerPage(this.state.currentPosition)}
            </Swiper>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageMainView: {
    flex: 1,
    marginTop: 20,
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

export default connect(null, mapDispatchToProps)(SignUp);
