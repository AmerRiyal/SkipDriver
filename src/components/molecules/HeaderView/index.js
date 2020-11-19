import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AppIcon} from '@atoms';
import {connect} from 'react-redux';
import {Colors, AppStyles} from '@styles';

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.headerView,
          this.props.light
            ? {backgroundColor: '#fff'}
            : {backgroundColor: Colors.DarkTextColor},
          this.props.extraStyle,
        ]}>
        {this.props.renderLeft()}
        <View style={{flex: 1, alignItems: 'center'}}>
          {this.props.renderTitle()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({UserReducer}) => {
  return {
    user: UserReducer.user,
  };
};

export default connect(mapStateToProps, null)(HeaderView);

const styles = StyleSheet.create({
  headerView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.08,
    alignItems: 'center',
    paddingHorizontal: 25,
    flexDirection: 'row',
  },
});
