import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AppStyles, Strings, Colors, Sizes} from '@styles';
import {MenuButton} from '@atoms';
import {connect} from 'react-redux';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {user} = this.props;
    return (
      <View style={{backgroundColor: '#17242D', flex: 1, paddingTop: 10}}>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={{color: '#fff', fontSize: 25}}>{user.Name}</Text>
          <Text style={{color: '#fff', fontSize: 21, marginVertical: 10}}>
            {user.Email}
          </Text>
          <Text style={{color: '#fff', fontSize: 21}}>{user.Phone}</Text>
        </View>
        <MenuButton
          onPress={() => {
            this.props.navigation.navigate('Main');
          }}
          IconType={'Entypo'}
          IconName={'home'}
          Title={Strings.Home}
        />
        <MenuButton
          onPress={() => {
            this.props.navigation.navigate('ProfileScreen');
          }}
          IconType={'Feather'}
          IconName={'user'}
          Title={Strings.Profile}
        />
        <MenuButton
          IconType={'Fontisto'}
          IconName={'car'}
          Title={Strings.MyOrders}
          onPress={() => {
            this.props.navigation.navigate('DriverOrders');
          }}
        />
        {user && (
          <MenuButton
            IconType={'SimpleLineIcons'}
            IconName={'logout'}
            Title={Strings.Logout}
            onPress={() => {
              this.props.Logout();
              this.props.navigation.navigate('Auth');
            }}
          />
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux/UserReducer');

  return {
    Logout: () => {
      actions.Login(dispatch);
    },
  };
};

const mapStateToProps = ({UserReducer}) => {
  return {
    user: UserReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
