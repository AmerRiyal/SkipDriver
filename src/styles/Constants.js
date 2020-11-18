/**
 * Created by InspireUI on 20/12/2016.
 */

import {Dimensions} from 'react-native';
// const {height, width} = Dimensions.get('screen');
const {width, height} = Dimensions.get('window');

const Constants = {
  RTL: false,
  Language: 'en', // Arabic
  fontFamily: 'Cairo-Regular',
  fontHeader: 'Cairo-Bold',
  SingleChoice: 1,
  CheckBox: 2,
  fontHeaderAndroid: 'Cairo-Regular',
  NormalUser: '33333333-3333-3333-3333-333333333333',
  AdminUser: '22222222-2222-2222-2222-222222222222',
  DriverUser: '66666666-6666-6666-6666-666666666666',
  EmitCode: {
    SideMenuOpen: 'emit.side.open',
    SideMenuClose: 'emit.side.close',
    Toast: 'toast',
    MenuReload: 'menu.reload',
  },
  OrderStatus: {
    Cancelled: -10,
    NotConfirmed: 1,
    New: 2,
    Accepted: 3,
    Preparing: 4,
    PendingPickUp: 5,
    PendingDelivery: 6,
    InDelivery: 7,
    Completed: 9,
  },
};

export default Constants;
