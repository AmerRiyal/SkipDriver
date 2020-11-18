import {combineReducers} from 'redux';
// You have to import every reducers and combine them.
import {reducer as OrderReducer} from './OrderReducer';
import {reducer as UserReducer} from './UserReducer';
import {reducer as VendorReducer} from './VendorReducer';

export default combineReducers({
  OrderReducer: OrderReducer,
  UserReducer: UserReducer,
  VendorReducer: VendorReducer,
});
