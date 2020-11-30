import {StyleSheet, Dimensions} from 'react-native';
import Colors from './Colors';
import Sizes from './Sizes';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const AppStyles = StyleSheet.create({
  ButtonStyle: {
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.RadiusDegree,
  },
  tableHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  tableBody: {
    backgroundColor: '#fff',
    padding: 10,
    width: Dimensions.get('screen').width * 0.95,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: Colors.borderColor,
  },
  ButtonTextStyle: {
    color: '#fff',
    fontSize: 18,
  },
  FullImageView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  backView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  lightText: {
    color: '#fff',
    fontSize: 17,
  },
  fullScreenView: {
    backgroundColor: Colors.backColor,
    flex: 1,
    alignItems: 'center',
  },
  fullScreenView2: {
    backgroundColor: Colors.backColor,
    flex: 1,
  },
  cartNum: {
    color: Colors.DarkTextColor,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -7,
    elevation: 1,
    fontSize: 15,
    right: -14,
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontWeight: 'bold',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.DarkTextColor,
  },
  darkText: {
    color: Colors.DarkTextColor,
    fontSize: 19,
    marginVertical: 25,
  },
  TableHeaderText: {
    color: Colors.DarkTextColor,
    fontSize: 18,
    textAlign: 'center',
  },
  TableBodyText: {
    color: Colors.DarkTextColor,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  normalText: {
    color: Colors.normalTextColor,
    fontSize: 15,
  },
  AppFont: {
    color: Colors.primary,
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    left: 20,
  },
  headerView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.09,
    shadowColor: '#000',
    marginBottom: 25,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 2,
  },
  statusView: {
    backgroundColor: '#F45234',
    padding: 4,
    position: 'absolute',
    alignItems: 'center',
    transform: [{rotate: '-5deg'}],
    top: -10,
    zIndex: 10,
    elevation: 5,
    left: 8,
    width: 80,
  },
  statusText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default AppStyles;
