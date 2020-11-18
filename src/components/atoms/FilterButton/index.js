import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { Colors,Sizes } from '@styles';

export default class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity style={[styles.ContentView,{backgroundColor:this.props.FilterColor}]} onPress={this.props.onPress}>
            <View style={{position:'absolute',left:0,width:'60%',height:'100%',backgroundColor:'rgba(255,255,255,0.203)',zIndex:1,borderBottomRightRadius:40,borderTopRightRadius:40}}></View>
            <Text style={{ color: '#fff',fontSize:16,textAlign:'center' }}>{this.props.FilterName}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    ContentView: {
        justifyContent: "center",
        alignItems: "center",
        position:'relative',
        marginRight: 10,
        width:Dimensions.get('screen').width*0.2,
        height:Dimensions.get('screen').width*0.2,
        marginLeft:2,
        borderRadius:Dimensions.get('screen').width*0.2/2,
      },
});
