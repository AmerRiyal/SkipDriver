import React, {Component, Fragment} from 'react';
import SoundPlayer from 'react-native-sound-player';
import DeviceInfo from 'react-native-device-info';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Linking,
  Switch,
  AppState,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import Permissions, {PERMISSIONS, check} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {connect} from 'react-redux';
import {AppStyles, Sizes, Images, Strings, Colors} from '@styles';
import Constants from '../../styles/Constants';
import {AppButton, AppLogo, AppIcon} from '@atoms';
import ks from '@services/KSAPI';
import BackgroundTimer from 'react-native-background-timer';
import messaging from '@react-native-firebase/messaging';
import ModalBox from 'react-native-modalbox';
import BackgroundGeolocation from 'react-native-background-geolocation';
import getDirections from 'react-native-google-maps-directions';
import {NavigationEvents} from 'react-navigation';

let firstTime = true;
const serviceCallDelay = 60;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Timer: serviceCallDelay,
      driverLocation: {
        latitude: 21.4858128,
        longitude: 39.1925049,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      appState: AppState.currentState,
      notificationData: null,
      allowNewRequests: true,
      hasOrder: false,
      firstTime: true,
      active: true,
      allowLocation: false,
      markerShown: false,
      marginBottom: 20,
    };
  }

  AcceptNewRequest = (userAddress) => {
    let origins =
      this.state.driverLocation.latitude +
      ',' +
      this.state.driverLocation.longitude;
    let destinations = userAddress.Latitude + ',' + userAddress.Longitude;
    fetch(
      'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' +
        origins +
        '&destinations=' +
        destinations +
        '&key=AIzaSyCxuTDkt1YtNrx8sOhK-rI_3fUD117_3Xk',
    )
      .then((responseJson) => responseJson.json())
      .then((response) => {
        let time = 15;
        if (response.rows[0].elements[0].status !== 'ZERO_RESULTS')
          time = Math.ceil(response.rows[0].elements[0].duration.value / 60);
        if (response.status == 'OK') {
          ks.ProviderAcceptRequest({
            ProviderID: this.props.user.ID,
            OrderID: this.state.notificationData?.OrderID,
            DeliveryTime: time,
          }).then((data) => {
            if (data.result) {
              this.refs.modalbox.close();
              let myorder = data.Order;
              myorder.VendorLat = this.state.notificationData?.VendorLat;
              myorder.VendorLng = this.state.notificationData?.VendorLng;
              this.props.AddOrder(myorder);
              this.setState(() => ({
                markerPosition: {
                  latitude: parseFloat(myorder.VendorLat),
                  longitude: parseFloat(myorder.VendorLng),
                  latitudeDelta: 0.0055,
                  longitudeDelta: 0.0055,
                },
                markerShown: true,
                hasOrder: true,
                orderStatus: myorder.Status,
              }));
            }
          });
        }
      })
      .catch((reason) => {});
  };

  handleServiceNotification = (data, _this) => {
    this.setState((prevState) => ({
      markerPosition: {
        latitude: parseFloat(data.VendorLat),
        longitude: parseFloat(data.VendorLng),
        latitudeDelta: 0.0056,
        longitudeDelta: 0.0056,
      },
      markerShown: true,
    }));

    _this.refs.map.animateToRegion(
      {
        latitude: parseFloat(data.VendorLat) - 0.002,
        longitude: parseFloat(data.VendorLng),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000,
    );
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile('notification', 'mp3');
      // or play from url
      //  SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    // Geocoder.from({
    //   lat: data.lat,
    //   lng: data.lng,
    // })
    //   .then((json) => {
    //     //   console.log(JSON.stringify(Object.keys(json.results[0])));
    //     // console.log(json.results[0].address_components[0]);
    //     address = json.results[0].formatted_address;
    //     this.setState({serviceLocation: address});
    //   })
    //   .catch((error) => console.warn(error));

    setTimeout(() => {
      this.setState({notificationData: data}, () => this.refs.modalbox.open());
    }, 1000);
  };

  setupNotification() {
    const _this = this;
    this.removeNotificationOpenedListener = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        // Get the action triggered by the notification being opened
        //const action = notificationOpen.action;
        // Get information about the notification that was opened
        if (remoteMessage) {
          SoundPlayer.playSoundFile('notification', 'mp3');

          const notificationOpen = remoteMessage;
          if (notificationOpen.data && this.state.allowNewRequests) {
            this.handleServiceNotification(notificationOpen.data, _this);
          }
        }
      },
    );

    //App closed in background
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          SoundPlayer.playSoundFile('notification', 'mp3');

          // App was opened by a notification
          // Get the action triggered by the notification being opened
          //const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notificationOpen = remoteMessage;
          if (notificationOpen.data && this.state.allowNewRequests) {
            if (notificationOpen) {
              this.handleServiceNotification(notificationOpen.data, _this);
            }
          }
        }
      });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        //const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notificationOpen = remoteMessage;

        if (notificationOpen.data && this.state.allowNewRequests) {
          this.handleServiceNotification(notificationOpen.data, _this);
        }
      }
      try {
        // play the file tone.mp3
        // SoundPlayer.playSoundFile('notification', 'mp3')
        // or play from url
        //  SoundPlayer.playUrl('https://example.com/music.mp3')
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    });

    messaging().onMessage(async (remoteMessage) => {
      const notificationOpen = remoteMessage;

      try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile('notification', 'mp3');
        // or play from url
        //  SoundPlayer.playUrl('https://example.com/music.mp3')
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }

      if (remoteMessage) {
        if (remoteMessage.data && this.state.allowNewRequests) {
          this.handleServiceNotification(notificationOpen.data, _this);
        }
      }
    });
  }

  handleRejectedLocation = () => {
    if (!this.props.hasOrder) {
      BackgroundTimer.stopBackgroundTimer();
      this.setState({allowLocation: false, active: false});
    } else {
      Alert.alert(Strings.location, Strings.PermissionAlertActiveOrder, [
        {
          text: Strings.Ok,
          onPress: () => {
            this.checkPermission();
          },
        },
        {text: Strings.Cancel, onPress: () => {}},
      ]);
    }
  };

  getProviderData = () => {
    this.setupNotification();
    if (this.props.user && this.props.user.ID) {
      ks.ProviderStatusGet({
        providerID: this.props.user.ID,
        langID: Strings.langID,
      }).then((data) => {
        if (data.result) {
          this.props.ChangeDriverStatus(data.driver.isActive, () => {
            this.changeDriverStatus();
          });
        }
      });
    }
  };

  watchPosition = () => {
    this.watchID = Geolocation.watchPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        };
        this.setState({driverLocation: region}, () => {
          if (firstTime) {
            firstTime = false;
            this.refs.map.animateToRegion(
              {
                latitude: this.state.driverLocation.latitude,
                longitude: this.state.driverLocation.longitude,
                longitudeDelta: this.state.driverLocation.latitudeDelta,
                latitudeDelta: this.state.driverLocation.longitudeDelta,
              },
              2000,
            );
          }
          this.getProviderData();
        });
      },
      (error) => {
        this.handleRejectedLocation();
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );
  };

  AlertRequestPermission = () => {
    if (Platform.OS == 'android') {
      Permissions.check('android.permission.ACCESS_FINE_LOCATION').then(
        (response) => {
          if (response != 'granted') {
            Alert.alert(Strings.location, Strings.PermissionAlert, [
              {
                text: Strings.Ok,
                onPress: () => {
                  this.checkPermission();
                },
              },
              {text: Strings.Cancel, onPress: () => {}},
            ]);
          } else {
            this.setState({allowLocation: true});
          }
        },
      );
    } else {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((response) => {
        if (response != 'granted') {
          Alert.alert(Strings.location, Strings.PermissionAlert, [
            {
              text: Strings.Ok,
              onPress: () => {
                this.checkPermission();
              },
            },
            {text: Strings.Cancel, onPress: () => {}},
          ]);
        } else {
          this.setState({allowLocation: true});
        }
      });
    }
  };

  checkPermission = () => {
    if (Platform.OS == 'android') {
      Permissions.check('android.permission.ACCESS_FINE_LOCATION').then(
        (response) => {
          if (response != 'granted') {
            Permissions.request('android.permission.ACCESS_FINE_LOCATION')
              .then((value) => {
                if (value == 'granted') {
                  this.setState({allowLocation: true}, () => {
                    this.watchPosition();
                    this.activeBackgroundLocation();
                  });
                } else {
                  this.handleRejectedLocation();
                }
              })
              .catch((error) => {
                this.handleRejectedLocation();
              });
          } else if (response == 'granted') {
            this.setState({allowLocation: true}, () => {
              this.watchPosition();
              this.activeBackgroundLocation();
            });
          } else {
            this.handleRejectedLocation();
          }
        },
      );
    } else {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((response) => {
        if (response == 'blocked') {
          Alert.alert(Strings.location, Strings.enableLocation, [
            {
              text: Strings.Ok,
              onPress: () => {
                Linking.openURL('app-settings://');
              },
            },
            {text: Strings.Cancel, onPress: () => {}},
          ]);
        }
        if (response != 'granted') {
          Permissions.request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            .then((value) => {
              if (value == 'granted') {
                this.setState({allowLocation: true}, () => {
                  this.watchPosition();
                  this.activeBackgroundLocation();
                });
              }
            })
            .catch((error) => {
              Linking.openURL('app-settings://');
              this.handleRejectedLocation();
            });
        } else if (response == 'granted') {
          this.setState({allowLocation: true}, () => {
            this.watchPosition();
            this.activeBackgroundLocation();
          });
        }
      });
    }
  };

  activeBackgroundLocation = () => {
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);
    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready(
      {
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 1,
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true, // <-- Auto start tracking when device is powered-up.
        // HTTP / SQLite config
        url: 'http://yourserver.com/locations',
        batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
        headers: {
          // <-- Optional HTTP headers
          'X-FOO': 'bar',
        },
        params: {
          // <-- Optional HTTP params
          auth_token: 'maybe_your_server_authenticates_via_token_YES?',
        },
      },
      (state) => {
        console.log(
          '- BackgroundGeolocation is configured and ready: ',
          state.enabled,
        );

        if (!state.enabled) {
          ////
          // 3. Start tracking!
          //
          BackgroundGeolocation.start(function () {
            console.log('- Start success');
          });
        }
      },
    );
  };

  serviceTimer = () => {
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        Timer: prevState.Timer - 1,
      }));

      if (this.state.Timer <= 1) {
        this.setState({Timer: serviceCallDelay});
        this.recallAPI();
      }
    }, 1000);
  };

  recallAPI = () => {
    let ordercheck = this.getUpdatedOrderStatus();
    if (this.state.orderStatus != ordercheck.status) {
      // this.setState({orderStatus: ordercheck.status});
    } else {
    }
    ks.DriverCheckOrder({
      ProviderID: this.props.user.ID,
    }).then((data) => {
      if (data.result == 1) {
        if (data.Order.ID) {
        }
      }
    });
  };

  componentDidMount = async () => {
    this.serviceTimer(); // this service to call service every 60 seconds

    firstTime = true;
    AppState.addEventListener('change', this._handleAppStateChange);
    this.AlertRequestPermission();
    //  __DEV__&&alert(this.props.hasOrder);
    let orders = await ks.GetDriverOrders({
      DriverID: this.props.user.ID,
      PageNumber: 1,
      Pagesize: 1,
      langID: Strings.langID,
    });
    this.setupNotification();

    let reloaded = false;
    // console.log(JSON.stringify(orders));
    if (
      this.props.hasOrder ||
      (orders &&
        orders.orders &&
        orders.orders[0] &&
        orders.orders[0].Status > 0 &&
        orders.orders[0].Status <= 7)
    ) {
      if (!this.props.hasOrder) {
        reloaded = true;

        orders.orders[0].OrderAddress = {
          Latitude: orders.orders[0].OrderLat,
          Longitude: orders.orders[0].OrderLng,
          Label: orders.orders[0].AddressLabel,
          Address1: orders.orders[0].Address1,
          Phone1: orders.orders[0].Phone1,
        };
        this.props.AddOrder(orders.orders[0]);
        this.setState({
          markerPosition: {
            latitude: parseFloat(orders.orders[0].VendorLat),
            longitude: parseFloat(orders.orders[0].VendorLng),
            latitudeDelta: 0.0051,
            longitudeDelta: 0.0051,
          },
          notificationData: {
            VendorLat: orders.orders[0].VendorLat,
            VendorLng: orders.orders[0].VendorLng,
          },
          markerShown: true,
          hasOrder: true,
          orderStatus: orders.orders[0].Status,
        });
      }
      let order = await this.getUpdatedOrderStatus();

      if (
        order &&
        order.result &&
        order.status !== Constants.OrderStatus.Cancelled
      ) {
        this.props.ChangeDriverStatus(true, () => {
          this.setState({
            hasOrder: true,
            orderStatus: order.status,
            active: true,
          });
        });
        this.props.UpdateOrderStatus(order.status);
        this.changeDriverStatus();
        if (this.props.order.VendorLat) {
          if (order.status <= 6) {
            this.setState((prevState) => ({
              markerPosition: {
                latitude: parseFloat(this.props.order.VendorLat),
                longitude: parseFloat(this.props.order.VendorLng),
                latitudeDelta: 0.0052,
                longitudeDelta: 0.0052,
              },
              markerShown: true,
            }));

            this.refs.map.animateToRegion(
              {
                latitude: parseFloat(this.props.order.VendorLat) - 0.002,
                longitude: parseFloat(this.props.order.VendorLng),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              1000,
            );
          } else {
            this.setState((prevState) => ({
              markerPosition: {
                latitude: parseFloat(this.props.order.OrderAddress.Latitude),
                longitude: parseFloat(this.props.order.OrderAddress.Longitude),
                latitudeDelta: 0.0053,
                longitudeDelta: 0.0053,
              },
              markerShown: true,
            }));

            this.refs.map.animateToRegion(
              {
                latitude:
                  parseFloat(this.props.order.OrderAddress.Latitude) - 0.002,
                longitude: parseFloat(this.props.order.OrderAddress.Longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              1000,
            );
          }
        }
      } else {
        this.props.RemoveOrder();
        this.setState(
          {
            hasOrder: false,
            orderStatus: null,
            markerShown: false,
            markerPosition: null,
          },
          () => {
            this.refs.map.animateToRegion(
              {
                latitude: this.state.driverLocation.latitude,
                longitude: this.state.driverLocation.longitude,
                longitudeDelta: 0.009,
                latitudeDelta: 0.009,
              },
              2000,
            );
          },
        );
      }
    } else {
      this.props.RemoveOrder();
      this.setState(
        {
          hasOrder: false,
          orderStatus: null,
          markerShown: false,
          markerPosition: null,
        },
        () => {
          this.refs.map.animateToRegion(
            {
              latitude: this.state.driverLocation.latitude,
              longitude: this.state.driverLocation.longitude,
              longitudeDelta: 0.009,
              latitudeDelta: 0.009,
            },
            2000,
          );
        },
      );
      this.props.RemoveOrder();
      this.props.hasOrder = false;
    }
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackgroundGeolocation.removeListeners();
    Geolocation.clearWatch(this.watchID);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.AlertRequestPermission();
    }
    this.setState({appState: nextAppState});
  };

  getUpdatedOrderStatus = async () => {
    let orderStatus;
    try {
      orderStatus = await ks.getOrderStatus({
        orderID: this.props.order?.OrderID,
        DriverID: this.props.user.ID,
      });
    } catch (error) {
      orderStatus = null;
    }
    this.setState({orderStatus: orderStatus.status});
    return orderStatus;
  };
  updateProviderInfo = async () => {
    let data = await ks.ProviderActive({
      providerid: this.props.user.ID,
      active: this.props.isActive,
      lat: this.state.driverLocation.latitude,
      lng: this.state.driverLocation.longitude,
    });

    return data;
  };

  changeDriverStatus = () => {
    if (this.props.isActive) {
      this.activeBackgroundLocation();
      this.updateProviderInfo();
      BackgroundTimer.runBackgroundTimer(async () => {
        if (!this.props.isActive && !this.state.hasOrder) {
          BackgroundTimer.stopBackgroundTimer();
          BackgroundGeolocation.removeListeners();
        }

        //code that will be called every 10 seconds
        if (this.state.hasOrder && this.props.order) {
          let [provider, order] = await Promise.all([
            this.updateProviderInfo(),
            this.getUpdatedOrderStatus(),
          ]);
          if (order && order.result) {
            this.props.UpdateOrderStatus(order.status);
          }
        } else if (!this.props.isActive) {
          BackgroundTimer.stopBackgroundTimer();
          BackgroundGeolocation.removeListeners();
        } else {
          this.updateProviderInfo();
        }
      }, 10000);
    } else {
      console.log('l3');
      BackgroundTimer.stopBackgroundTimer();
      BackgroundGeolocation.removeListeners();
      this.updateProviderInfo();
    }
  };

  onLocation = (location) => {
    let loc = {};
    if (location != null && location != undefined) {
      loc.latitude = location?.coords?.latitude;
      loc.longitude = location?.coords?.longitude;
      loc.latitudeDelta = 0.009;
      loc.longitudeDelta = 0.009;
      this.setState({
        driverLocation: loc,
      });
    }
  };

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.state.driverLocation?.latitude,
        longitude: this.state.driverLocation?.longitude,
      },
      destination: {
        latitude: this.state.markerPosition?.latitude,
        longitude: this.state.markerPosition?.longitude,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  renderOrderSteps = () => {
    {
      console.log(JSON.stringify(this.state.orderStatus));
    }

    switch (this.state.orderStatus) {
      case 0: {
        this.props.RemoveOrder();
        this.setState(
          {
            hasOrder: false,
            orderStatus: null,
            markerShown: false,
            markerPosition: null,
          },
          () => {
            this.refs.map.animateToRegion(
              {
                latitude: this.state.driverLocation.latitude,
                longitude: this.state.driverLocation.longitude,
                longitudeDelta: 0.009,
                latitudeDelta: 0.009,
              },
              2000,
            );
          },
        );
      }
      case 9: {
        this.props.RemoveOrder();
        this.setState(
          {
            hasOrder: false,
            orderStatus: null,
            markerShown: false,
            markerPosition: null,
          },
          () => {
            this.refs.map.animateToRegion(
              {
                latitude: this.state.driverLocation.latitude,
                longitude: this.state.driverLocation.longitude,
                longitudeDelta: 0.009,
                latitudeDelta: 0.009,
              },
              2000,
            );
          },
        );
      }
      case Constants.OrderStatus.New:
      case Constants.OrderStatus.Accepted:
      case Constants.OrderStatus.Preparing:
      case Constants.OrderStatus.PendingDelivery:
        return (
          <>
            <View
              style={{
                paddingHorizontal: 15,
                height: 40,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,

                backgroundColor: Colors.DarkTextColor,
                position: 'absolute',
                alignSelf: 'center',
                marginTop: -1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  flex: 1,
                  textAlignVertical: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {Strings.OrderNumber}
                {this.props.order?.OrderID}
              </Text>
            </View>

            <AppButton
              ExtraStyle={{
                flex: 1,
                position: 'absolute',
                bottom: 90,
                width: Dimensions.get('screen').width * 0.5,
              }}
              ButtonText={Strings.GetDirection}
              ButtonColor={Colors.DarkTextColor}
              onPress={() => {
                this.handleGetDirections();
              }}
            />
            <View style={styles.contentView}>
              <AppButton
                ExtraStyle={{
                  flex: 1,
                  marginRight: 15,
                  width: '100%',
                  opacity:
                  this.state.orderStatus ==
                    Constants.OrderStatus.PendingDelivery
                      ? 1
                      : 0.5,
                }}
                disabled={
                  !(
                    this.state.orderStatus ==
                    Constants.OrderStatus.PendingDelivery
                  )
                }
                ButtonText={Strings.GotOrder}
                ButtonColor={Colors.primary}
                onPress={() => {
                  ks.UpdateCartStatus({
                    OrderID: this.props.order?.OrderID,
                    Status: Constants.OrderStatus.InDelivery,
                  }).then(async (data) => {
                    if (data.result) {
                      let updatedStatus = await this.getUpdatedOrderStatus();
                      this.props.UpdateOrderStatus(updatedStatus.status);

                      this.setState(
                        {
                          markerPosition: {
                            latitude: parseFloat(
                              this.props.order.OrderAddress.Latitude,
                            ),
                            longitude: parseFloat(
                              this.props.order.OrderAddress.Longitude,
                            ),
                            latitudeDelta: 0.0054,
                            longitudeDelta: 0.005,
                          },
                          markerShown: true,
                          hasOrder: true,
                          orderStatus: updatedStatus.status,
                        },
                        () => {
                          this.refs.map.animateToRegion(
                            {
                              latitude:
                                parseFloat(
                                  this.props.order.OrderAddress.Latitude,
                                ) - 0.002,
                              longitude: parseFloat(
                                this.props.order.OrderAddress.Longitude,
                              ),
                              latitudeDelta: 0.005,
                              longitudeDelta: 0.005,
                            },
                            1000,
                          );
                        },
                      );
                    }
                  });
                }}
              />
              <AppButton
                ExtraStyle={{
                  flex: 1,
                  width: '100%',
                }}
                ButtonText={Strings.Support}
                ButtonColor={'#990000'}
                onPress={() => {
                  Linking.openURL(`tel:${966583739502}`);
                }}
              />
            </View>
          </>
        );
      case Constants.OrderStatus.InDelivery:
        return (
          <View style={styles.userDetailsView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Image
                source={require('@Images/user.png')}
                style={{
                  width: 80,
                  height: 80,
                  marginRight: 15,
                  tintColor: Colors.DarkTextColor,
                }}
              />
              <View>
                <Text style={styles.userinfo}>
                  {this.props.order?.OwnerName}
                </Text>
                <Text style={styles.userinfo2}>
                  {this.props.order?.OrderAddress?.Label}
                </Text>
                <Text style={styles.userinfo2}>
                  {this.props.order?.OrderAddress?.Address1}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity
                style={styles.userDataView}
                onPress={() => {
                  Linking.openURL(
                    `tel:${this.props.order?.OrderAddress?.Phone1}`,
                  );
                }}>
                <AppIcon
                  type={'SimpleLineIcons'}
                  name={'phone'}
                  size={25}
                  color={Colors.borderColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.handleGetDirections();
                }}
                style={[
                  styles.userDataView,
                  {borderRightWidth: 0, paddingTop: 13},
                ]}>
                <AppIcon
                  type={'SimpleLineIcons'}
                  name={'location-pin'}
                  size={25}
                  color={Colors.borderColor}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentView}>
              <AppButton
                ExtraStyle={{
                  flex: 1,
                  marginRight: 15,
                  width: '100%',
                }}
                ButtonText={Strings.Complete}
                ButtonColor={Colors.primary}
                onPress={() => {
                  ks.UpdateCartStatus({
                    OrderID: this.props.order?.OrderID,
                    Status: Constants.OrderStatus.Completed,
                  }).then((data) => {
                    console.log('asd', JSON.stringify(data));
                    if (data.result) {
                      this.props.RemoveOrder();
                      this.setState(
                        {
                          hasOrder: false,
                          orderStatus: null,
                          markerShown: false,
                          markerPosition: null,
                        },
                        () => {
                          this.refs.map.animateToRegion(
                            {
                              latitude: this.state.driverLocation.latitude,
                              longitude: this.state.driverLocation.longitude,
                              longitudeDelta: 0.009,
                              latitudeDelta: 0.009,
                            },
                            2000,
                          );
                        },
                      );
                    }
                  });
                }}
              />
              <AppButton
                ExtraStyle={{
                  flex: 1,
                  width: '100%',
                }}
                ButtonText={Strings.Support}
                ButtonColor={'#990000'}
                onPress={() => {
                  Linking.openURL(`tel:${966583739502}`);
                }}
              />
            </View>
          </View>
        );
    }
  };

  renderContent = () => {
    if (this.state.hasOrder && this.props.order) {
      return this.renderOrderSteps();
    } else {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width * 0.9,
            alignSelf: 'center',
            flexDirection: 'row',
            paddingVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Sizes.RadiusDegree,
            position: 'absolute',
            bottom: 20,
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log(this.state.allowLocation);
              if (this.state.allowLocation) {
                this.props.ChangeDriverStatus(!this.props.isActive, () => {
                  this.changeDriverStatus();
                });
              } else {
                this.AlertRequestPermission();
              }
            }}>
            <Text
              style={{
                color: this.props.isActive ? '#fff' : '#f00',
                right: 15,
                fontSize: 20,
              }}>
              {Strings.becomeActive}
            </Text>
          </TouchableOpacity>
          <Switch
            trackColor={{false: '#fff', true: Colors.primary}}
            thumbColor={this.props.isActive ? '#fff' : '#f00'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              console.log(this.state.allowLocation);
              if (this.state.allowLocation) {
                this.props.ChangeDriverStatus(!this.props.isActive, () => {
                  this.changeDriverStatus();
                });
              } else {
                this.AlertRequestPermission();
              }
            }}
            value={this.props.isActive}
          />
          <TouchableOpacity
            onPress={() => {
              console.log(this.state.allowLocation);
              if (this.state.allowLocation) {
                this.props.ChangeDriverStatus(!this.props.isActive, () => {
                  this.changeDriverStatus();
                });
              } else {
                this.AlertRequestPermission();
              }
            }}>
            <Text
              style={{
                color: this.props.isActive ? Colors.primary : '#fff',
                left: 15,
                fontSize: 20,
              }}>
              {Strings.becomeInActive}
            </Text>
          </TouchableOpacity>
        </View>
        // <AppButton
        //   ExtraStyle={{
        //     position: 'absolute',
        //     bottom: 20,
        //     zIndex: 1,
        //   }}
        //   ButtonText={
        //     this.props.isActive ? Strings.becomeInActive+"    "  : Strings.becomeActive+"    "
        //   }
        //   ButtonColor={this.props.isActive ? 'gray' : Colors.primary}
        //   ContainIcon = {true}
        //   IconType = 'Fontisto'
        //   IconName = {this.props.isActive ? 'toggle-on'  :'toggle-off'}
        //   VColor = {this.props.isActive ? '#fff'  :'#F00'}
        // onPress={() => {
        //   console.log(this.state.allowLocation)
        //   if (this.state.allowLocation) {
        //     this.props.ChangeDriverStatus(!this.props.isActive, () => {
        //       this.changeDriverStatus();
        //     });
        //   } else {
        //     this.AlertRequestPermission();
        //   }
        // }}
        // />
      );
    }
  };

  render() {
    {
      //  alert(DeviceInfo.hasNotch() + '');
    }

    return (
      <View
        style={[
          {flex: 1},
          {width: '100%'},
          DeviceInfo.hasNotch() ? {marginTop: 35} : null,
        ]}>
        <MapView
          ref={'map'}
          initialRegion={this.state.driverLocation}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map, {marginBottom: this.state.marginBottom}]}
          loadingEnabled
          followsUserLocation
          onMapReady={() => this.setState({marginBottom: 0})}
          showsMyLocationButton={true}
          showsUserLocation>
          {this.state.markerPosition && this.state.markerShown && (
            <MapView.Marker coordinate={this.state.markerPosition} />
          )}
        </MapView>

        {this.renderContent()}

        <ModalBox
          useNativeDriver={true}
          style={[styles.modalbox]}
          ref={'modalbox'}
          backdropPressToClose={false}
          swipeToClose={false}
          onClosed={() => {
            this.setState({allowNewRequests: true});
          }}
          onOpened={() => {
            this.setState({allowNewRequests: false});
            // console.log("Notification" , JSON.stringify(notificationOpen))

            try {
              // play the file tone.mp3
              // SoundPlayer.playSoundFile('notification', 'mp3')
              // console.log(`cannot play qweqweqwe sound file`)
              // or play from url
              //  SoundPlayer.playUrl('https://example.com/music.mp3')
            } catch (e) {
              console.log(`cannot play the sound file`, e);
            }
          }}
          position="bottom">
          <View style={styles.modalContent}>
            <Text style={[styles.title, {marginBottom: 0}]}>
              {Strings.newRequest}
            </Text>
            <Image
              source={{
                uri:
                  'http://skiptheque.kensoftware.com/' +
                  this.state.notificationData?.BranchImagePath +
                  '/' +
                  this.state.notificationData?.BranchImage +
                  '_649x427.jpg',
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 80,
                marginVertical: 15,
              }}
            />
            <Text style={styles.title}>
              {this.state.notificationData?.BranchName}
            </Text>
            <Text style={styles.subtitle}>
              {this.state.notificationData?.UserAddress.Address1}
            </Text>
            <Text style={styles.subtitle}>
              {'Distance ' + this.state.notificationData?.Distance + 'KM'}
            </Text>
            <Text style={styles.subtitle}>
              {'Total ' + this.state.notificationData?.Shipping + 'SAR'}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  ks.ProviderRejectRequest({
                    ProviderID: this.props.user.ID,
                    OrderID: this.state.notificationData?.OrderID,
                  }).then((data) => {
                    if (data.result) {
                      this.refs.modalbox.close();
                      this.setState(
                        {markerPosition: null, markerShown: false},
                        () => {
                          this.refs.map.animateToRegion(
                            {
                              latitude: this.state.driverLocation.latitude,
                              longitude: this.state.driverLocation.longitude,
                              longitudeDelta: this.state.driverLocation
                                .latitudeDelta,
                              latitudeDelta: this.state.driverLocation
                                .longitudeDelta,
                            },
                            2000,
                          );
                        },
                      );
                    }
                  });
                }}
                style={[styles.acceptBut, {backgroundColor: '#DA0000'}]}>
                <Text style={{color: '#fff'}}>{Strings.Reject}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let userAddress = JSON.parse(
                    this.state.notificationData.UserAddress,
                  );
                  this.AcceptNewRequest(userAddress);
                }}
                style={[
                  styles.acceptBut,
                  {backgroundColor: Colors.primary, marginLeft: 25},
                ]}>
                <Text style={{color: '#fff'}}>{Strings.Accept}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalBox>

        <View style={this.props.isActive ? styles.Menu2 : styles.Menu3}>
          {this.props.isActive ? (
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'http://skiptheq.world/wsImages/led_blinksgreen.gif',
              }}
            />
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.Menu}
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}>
          <AppIcon type={'Feather'} name={'menu'} size={30} color={'#000'} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MapContainer: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.6,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  map: {
    flex: 1,
  },
  acceptBut: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
  },
  mapDisabled: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    elevation: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginBottom: 5,
  },
  Menu: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    zIndex: 200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    borderRadius: 30,
    left: 30,
  },
  Menu2: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    zIndex: 200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 95,
    borderRadius: 30,
    left: 40,
  },
  Menu3: {
    backgroundColor: '#f00',
    shadowColor: '#000',
    zIndex: 200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    borderRadius: 30,
    left: 45,
  },
  mapTypeButton: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: 38,
    height: 38,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 60,
    top: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    right: 10,
    zIndex: 1,
  },
  mapIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  modalbox: {
    height: Dimensions.get('screen').height * 0.48,
    width: Dimensions.get('screen').width,
    position: 'relative',
    zIndex: 30,
    elevation: 1,
  },
  userinfo: {
    color: Colors.DarkTextColor,
    fontSize: 19,
    fontWeight: 'bold',
  },
  userinfo2: {
    color: Colors.normalTextColor,
    fontSize: 17,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 120,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 30,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    zIndex: 1,
  },
  userDetailsView: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width * 0.9,
    padding: 20,
    position: 'absolute',
    bottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignSelf: 'center',
    zIndex: 2,
    height: Dimensions.get('screen').height * 0.34,
  },
  userDataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.borderColor,
  },
});

const mapStateToProps = ({UserReducer, OrderReducer}) => {
  return {
    user: UserReducer.user,
    order: OrderReducer.order,
    hasOrder: OrderReducer.hasOrder,
    orderStatus: OrderReducer.orderStatus,
    isActive: UserReducer.isActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux/UserReducer');
  const orderActions = require('@redux/OrderReducer');

  return {
    AddOrder: (order) => {
      orderActions.actions.AddOrder(dispatch, order);
    },
    UpdateOrderStatus: (status) => {
      orderActions.actions.UpdateOrderStatus(dispatch, status);
    },
    RemoveOrder: () => {
      orderActions.actions.RemoveOrder(dispatch);
    },
    ChangeDriverStatus: (isActive, callback) => {
      actions.ChangeDriverStatus(dispatch, isActive, callback);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
