import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import RootNavigator from './navigations';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {StackActions} from 'react-navigation';
import {compose, createStore} from 'redux';
import reducers from '@redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = compose(createStore(persistedReducer));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToScreen = (routeName, params, isReset = false, isForTabs = false) => {
    const {navigator} = this.refs;
    if (!navigator) {
      return toast('Cannot navigate');
    }
    if (isForTabs) {
      navigator._navigation.navigate(routeName, params);
    } else {
      const pushAction = StackActions.push({
        routeName: routeName,
        params: {
          ...params,
        },
      });
      navigator._navigation.dispatch(pushAction);
    }

    //navigator.dispatch({ type: "Navigation/PUSH", routeName, params });
  };

  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{flex: 1}}>
            <RootNavigator ref={'navigator'} persistor={persistor} />
            <StatusBar
              backgroundColor={'#000'}
              animated={true}
              barStyle="light-content"
            />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
