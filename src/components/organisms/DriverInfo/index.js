import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AppStyles, Strings, Colors, Sizes, Validate} from '@styles';
import {AppTextInput, AppButton, AppIcon, CheckBox, AppLogo} from '@atoms';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class DriverInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverName: this.props.driver.username,
      driverEmail: this.props.driver.email,
      driverPhone: this.props.driver.userPhone,
      password: this.props.driver.password,
      Iban: this.props.driver.Iban,
      ShowDate: false,
      DriverDob:
        this.props.driver.dob != null ? this.props.driver.dob : new Date(),
      addDate: false,
    };
  }

  setDriverDob = (event, date) => {
    if (date != undefined) {
      let dob = new Date(date);
      this.setState({DriverDob: dob, ShowDate: false, addDate: true});
    }
  };

  validateForm() {
    if (
      Validate.isEmpty(
        this.state.driverName,
        this.state.driverEmail,
        this.state.driverPhone,
        this.state.password,
        this.state.DriverDob,
        this.state.Iban,
      )
    ) {
      return Strings.CompleteForm;
    } else if (!Validate.isEmail(this.state.driverEmail)) {
      return Strings.InvalidEmail;
    } else if (!Validate.isName(this.state.driverName)) {
      return Strings.InvalidName;
    } else if (!Validate.isPhone(this.state.driverPhone)) {
      return Strings.InvalidPhone;
    } else if (!Validate.isPassword(this.state.password)) {
      return Strings.InvalidPassword;
    } else if (this.state.Iban.length < 24) {
      return Strings.WrongIban;
    }
    return undefined;
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[AppStyles.darkText, {alignSelf: 'center'}]}>
            {Strings.DriverInfo}
          </Text>
          <AppTextInput
            containPhone={false}
            placeholder={Strings.Name}
            keyboardType={'default'}
            onChangeText={(text) => {
              this.setState({driverName: text});
            }}
            value={this.state.driverName}
          />
          <AppTextInput
            containPhone={false}
            placeholder={Strings.Email}
            keyboardType={'default'}
            onChangeText={(text) => {
              this.setState({driverEmail: text});
            }}
            value={this.state.driverEmail}
          />
          <AppTextInput
            containPhone={false}
            placeholder={Strings.Phone}
            keyboardType={'number-pad'}
            onChangeText={(text) => {
              this.setState({driverPhone: text});
            }}
            value={this.state.driverPhone}
          />
          <AppTextInput
            containPhone={false}
            secureTextEntry={true}
            placeholder={Strings.Password}
            keyboardType={'default'}
            onChangeText={(text) => {
              this.setState({password: text});
            }}
            value={this.state.password}
          />
          <AppTextInput
            containPhone={false}
            placeholder={Strings.Iban}
            keyboardType={'default'}
            onChangeText={(text) => {
              this.setState({Iban: text});
            }}
            value={this.state.Iban}
          />

          <TouchableOpacity
            style={styles.timeBut}
            onPress={() => {
              this.setState({ShowDate: true});
            }}>
            <Text
              style={[
                styles.TextInputMainStyle2,
                this.state.addDate
                  ? {color: Colors.DarkTextColor}
                  : {color: '#97989B'},
              ]}>
              {!this.state.addDate
                ? Strings.DriverDOB
                : moment(this.state.DriverDob).format('L')}
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.ShowDate && (
          <DateTimePicker
            testID="dateTimePicker"
            mode={'date'}
            value={this.state.DriverDob}
            is24Hour={false}
            display="default"
            onChange={this.setDriverDob}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <AppButton
            containPhone={false}
            ButtonText={Strings.Back}
            ButtonColor={Colors.DarkTextColor}
            ExtraStyle={{
              width: Dimensions.get('screen').width * 0.25,
              marginRight: 20,
            }}
            onPress={() => {
              let driverInfo = {};
              driverInfo.username = this.state.driverName;
              driverInfo.email = this.state.driverEmail;
              driverInfo.userPhone = this.state.driverPhone;
              driverInfo.password = this.state.password;
              driverInfo.dob = this.state.DriverDob;
              driverInfo.Iban = this.state.Iban;
              this.props.changePage(driverInfo, 0);
            }}
          />
          <AppButton
            containPhone={false}
            ButtonText={Strings.Next}
            ButtonColor={Colors.primary}
            ExtraStyle={{
              width: Dimensions.get('screen').width * 0.25,
              marginVertical: 20,
            }}
            onPress={() => {
              if (this.validateForm() != undefined) {
                this.refs.toast.show(this.validateForm());
              } else {
                let driverInfo = {};
                driverInfo.username = this.state.driverName;
                driverInfo.email = this.state.driverEmail;
                driverInfo.userPhone = this.state.driverPhone;
                driverInfo.password = this.state.password;
                driverInfo.dob = this.state.DriverDob;
                driverInfo.Iban = this.state.Iban;
                this.props.changePage(driverInfo, 2);
              }
            }}
          />
        </View>

        <Toast
          ref="toast"
          style={{backgroundColor: Colors.DarkTextColor}}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={4000}
          opacity={0.8}
          textStyle={{color: '#fff'}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  timeBut: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: Sizes.RadiusDegree,
    padding: 12,
    width: '90%',
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
});
