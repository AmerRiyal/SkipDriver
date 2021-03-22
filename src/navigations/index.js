import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {I18nManager} from 'react-native';
import HomeScreen from '@scenes/Home';
import LoginScreen from '@scenes/Login';
import SignUpScreen from '@scenes/SignUp';
import SplashScreen from '@scenes/SplashScreen';
import MainScreen from '@scenes/Main';
import SelectLanguage from '@scenes/SelectLanguage';
import ProfileScreen from '@scenes/Profile';
import DriverOrders from '@scenes/DriverOrders';
import Settings from '@scenes/Settings';
import {Drawer} from '@organisms';

const MyDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainScreen,
    }, 
    DriverOrders: {
      screen: DriverOrders,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    contentComponent: Drawer,
    initialRouteName: 'Main',
    drawerWidth: 300,
    drawerType: 'slide',
    unmountInactiveRoutes: false,
    overlayColor: 'rgba(0,0,0,0.4)',
    drawerBackgroundColor: 'transparent',
    drawerPosition: I18nManager.isRTL ? 'right' : 'left',
  },
);

const AppStack = createStackNavigator(
  {
    DrawerNavigator: {
      screen: MyDrawerNavigator,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const StartStack = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    SelectLanguage: {
      screen: SelectLanguage,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

// const AppStack = createStackNavigator(
// 	{
//     DrawerNavigator:{
//       screen:MyDrawerNavigator,
//     },
//   },
//       {
//         headerMode: 'none',
//         navigationOptions: {
//             headerVisible: false,
//         }
//       },
// );

export default createAppContainer(
  createSwitchNavigator(
    {
      Start: StartStack,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Start',
    },
  ),
);
