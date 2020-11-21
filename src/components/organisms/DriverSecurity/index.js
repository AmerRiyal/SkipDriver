import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  I18nManager,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SegmentedControl from 'rn-segmented-control';
import {AppStyles, Strings, Colors, Constants, Validate} from '@styles';
import {AppTextInput, AppButton, AppIcon} from '@atoms';
export default class DriverSecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: this.props.userType,
      numCitizen: this.props.numCitizen,
      numResident: this.props.numResident,
    };
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[AppStyles.darkText, {alignSelf: 'center'}]}>
            {Strings.DriverSecurity}
          </Text>
          <SegmentedControl
            tabs={[Strings.citizen, Strings.resident]}
            onChange={(index) => {
              this.props.setUserType(index);
              this.setState({userType: index});
            }}
            currentIndex={this.props.userType}
            paddingVertical={6}
            width={Dimensions.get('screen').width * 0.6}
            segmentedControlBackgroundColor={'#fff'}
            activeTextColor={'#fff'}
            textColor={'#333'}
            activeSegmentBackgroundColor={Colors.primary}
            isRTL={I18nManager.isRTL}
            containerStyle={styles.segmentControl}
          />
          {this.state.userType === 0 ? (
            <AppTextInput
              ExtraStyle={{marginTop: 20}}
              containPhone={false}
              placeholder={Strings.numCitizen}
              keyboardType={'default'}
              onChangeText={(text) => {
                this.setState({numCitizen: text});
                this.props.setNumCitizen(text);
              }}
              value={this.state.numCitizen}
            />
          ) : (
            <AppTextInput
              ExtraStyle={{marginTop: 20}}
              containPhone={false}
              placeholder={Strings.numResident}
              keyboardType={'default'}
              onChangeText={(text) => {
                this.setState({numResident: text});
                this.props.setNumResident(text);
              }}
              value={this.state.numResident}
            />
          )}
          <AppButton
            containPhone={false}
            ButtonText={Strings.Next}
            ButtonColor={Colors.primary}
            ExtraStyle={{
              width: Dimensions.get('screen').width * 0.25,
              marginTop: 20,
            }}
            onPress={() => {
              if (!this.state.userType) {
                if (this.state.numCitizen && this.state.numCitizen != '') {
                  this.props.changePage(1);
                } else {
                  alert(Strings.fillNumCitizen);
                }
              } else {
                if (this.state.numResident && this.state.numResident != '') {
                  this.props.changePage(1);
                } else {
                  alert(Strings.fillNumResident);
                }
              }
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  segmentControl: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 45,
  },
});
