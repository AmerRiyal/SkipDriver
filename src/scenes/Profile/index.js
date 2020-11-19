import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {HeaderView} from '@molecules';
import {AppStyles, Strings, Colors} from '@styles';
import {AppIcon, LoadingView} from '@atoms';
import ks from '@services/KSAPI';
import {connect} from 'react-redux';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    ks.ProviderStatusGet({
      providerID: this.props.user.ID,
      langID: Strings.langID,
    }).then((data) => {
      this.setState({loading: false});
      if (data.result) {
        this.setState({driver: data.driver});
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        }}>
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
                {Strings.Profile}
              </Text>
            );
          }}
        />
        {this.state.loading ? (
          <LoadingView />
        ) : (
          <View style={styles.cardView}>
            <Image
              source={require('@Images/taxi-driver.png')}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginBottom: 15,
              }}
            />
            <Text style={styles.titleText}>{this.state.driver?.Name}</Text>
            <Text style={styles.subTitle}>{this.state.driver?.Email}</Text>
            <Text style={styles.subTitle}>{this.state.driver?.Phone}</Text>
            <View style={{marginTop: 15}}>
              <Text style={styles.subTitle}>{Strings.TotalEarning}</Text>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center',
                    paddingHorizontal: 40,
                    paddingVertical: 6,
                  }}>
                  {this.state.driver?.TotalEarning + ' SAR'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.titleText}>
                  {this.state.driver?.TotalRejects}
                </Text>
                <Text style={styles.subTitle}>{Strings.TotalRejected}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: '#ccc',
                }}>
                <Text style={styles.titleText}>
                  {this.state.driver?.TotalAccepts}
                </Text>
                <Text style={styles.subTitle}>{Strings.TotalAccepted}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.titleText}>
                  {this.state.driver?.TotalAccepts +
                    this.state.driver?.TotalRejects}
                </Text>
                <Text style={styles.subTitle}>{Strings.TotalOrders}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: Dimensions.get('screen').width * 0.9,
    paddingVertical: 15,
    alignSelf: 'center',
  },
  titleText: {
    color: '#484848',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 18,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {
    user: UserReducer.user,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
