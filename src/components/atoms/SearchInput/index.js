import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,TextInput,TouchableOpacity } from 'react-native';
import { Sizes,Colors,Strings } from '@styles';
import {AppIcon} from '@atoms';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.SearchView} onPress={this.props.onPress}>
        <View style={{flex:0.5,alignItems:'flex-end'}}>
            <AppIcon type={"Feather"} name={"search"} size={25} color={'#fff'}/>
        </View>
        <TextInput
            style={styles.SearchText}
            onChangeText={(a)=>{this.props.onChangeText(a)}}
            placeholder={Strings.SearchBy}
            placeholderTextColor={'#fff'}
            editable={false}
            value={this.props.value}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    SearchView:{
        width:Dimensions.get('screen').width*0.9,
        alignSelf:'center',
        alignItems:'center',
        marginBottom: 20,
        height: Dimensions.get('screen').height * 0.09,
        backgroundColor:Colors.primary,
        borderRadius:Sizes.RadiusDegree,
        padding: 15,
        flexDirection:'row',
    },
    SearchText: {
        flex: 1.4,
        color:Colors.DarkTextColor,
        fontSize:18,
        marginLeft: 5,
        backgroundColor: Colors.primary,
        height: Dimensions.get('screen').height * 0.09,
    },
});
