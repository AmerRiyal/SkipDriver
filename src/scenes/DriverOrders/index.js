import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {HeaderView} from '@molecules';
import {AppIcon, LoadingView} from '@atoms';
import {AppStyles, Strings, Colors} from '@styles';
import ks from '@services/KSAPI';
import {connect} from 'react-redux';
import moment from 'moment';

class DriverOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageCount: 0,
      orders: [],
      loading: true,
      isFetchingMore: false,
    };
  }

  getOrders = (isFetchingMore = false) => {
    this.setState({isFetchingMore: isFetchingMore});
    ks.GetDriverOrders({
      DriverID: this.props.user.ID,
      LangID: Strings.langID,
      PageNumber: this.state.page,
    }).then((data) => {
      this.setState({loading: false});
      if (data.result === 1) {
        this.setState({
          orders: this.state.orders.concat(data.orders),
          pageCount: data.PageCount,
        });
      }
    });
  };

  componentDidMount() {
    this.getOrders();
  }

  renderDriverOrders = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          marginRight: 15,
        }}>
        <View style={{flex: 0.3}}>
          <Text style={{color: '#717171', fontSize: 19, textAlign: 'center'}}>
            {moment(item.OrderDate).format('MMM    Do     YYYY')}
          </Text>
        </View>

        <View style={styles.orderMainView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.titleText}>{item.BranchName}</Text>
            <Text style={styles.subTitle}>
              {moment(item.OrderDate).format('h:mm a')}
            </Text>
          </View>
          <Text style={styles.subTitle}>
            {Strings.orderTotal + ': ' + item.Total + ' SAR'}
          </Text>
          <Text style={styles.subTitle}>
            {Strings.distance + ': ' + item.Distance + ' KM'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.subTitle}>{Strings.Earning}</Text>
            <View
              style={{
                backgroundColor: Colors.primary,
                position: 'relative',
                right: -16,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingHorizontal: 40,
                  paddingVertical: 6,
                }}>
                {item.DriverEarnings + ' SAR'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
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
                  color={Colors.DarkTextColor}
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
                  {color: Colors.primary, fontSize: 20},
                ]}>
                {Strings.MyOrders}
              </Text>
            );
          }}
        />
        {this.state.loading ? (
          <LoadingView />
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={this.state.orders}
              contentContainerStyle={{flexGrow: 1}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderDriverOrders.bind(this)}
              onEndReached={() => {
                this.setState({page: this.state.page + 1}, () => {
                  if (this.state.page <= this.state.pageCount) {
                    this.getOrders(true);
                  }
                });
              }}
            />
            {this.state.isFetchingMore && (
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator color={Colors.primary} size="small" />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderMainView: {
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    flex: 1,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleText: {
    color: '#484848',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#717171',
    fontSize: 16,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {
    user: UserReducer.user,
  };
};

export default connect(mapStateToProps, null)(DriverOrders);
