import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AppStyles, Strings, Colors, Constants, Validate} from '@styles';
import {AppButton} from '@atoms';
import ImagePicker from 'react-native-image-crop-picker';
import Toast, {DURATION} from 'react-native-easy-toast';
import Modal from 'react-native-modal';
export default class DriverPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licensePhoto: null,
      formPhoto: null,
      SelectImage: false,
      inCarPhoto: null,
      outCarPhoto: null,
    };
  }

  openPicker = (photoType) => {
    ImagePicker.openPicker({
      width: 370,
      height: 370,
      cropping: false,
      includeExif: true,
      includeBase64: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.6,
    }).then((image) => {
      if (photoType === 1)
        this.setState({licensePhoto: image, SelectImage: false});
      else if (photoType === 2)
        this.setState({formPhoto: image, SelectImage: false});
      else if (photoType === 3)
        this.setState({inCarPhoto: image, SelectImage: false});
      else this.setState({outCarPhoto: image, SelectImage: false});
    });
  };

  openCamera = (photoType) => {
    ImagePicker.openCamera({
      width: 370,
      height: 370,
      cropping: false,
      includeExif: true,
      includeBase64: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.6,
    }).then((image) => {
      if (photoType === 1)
        this.setState({licensePhoto: image, SelectImage: false});
      else if (photoType === 2)
        this.setState({formPhoto: image, SelectImage: false});
      else if (photoType === 3)
        this.setState({inCarPhoto: image, SelectImage: false});
      else this.setState({outCarPhoto: image, SelectImage: false});
    });
  };

  validateForm() {
    if (
      Validate.isEmpty(
        this.state.licensePhoto,
        this.state.formPhoto,
        this.state.inCarPhoto,
        this.state.outCarPhoto,
      )
    )
      return Strings.CompleteForm;
    else return undefined;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={[AppStyles.darkText, {alignSelf: 'center'}]}>
          {Strings.DriverPhotos}
        </Text>
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            style={styles.photoView}
            onPress={async () => {
              //this.openPicker(1);
              this.setState({SelectImage: true, photoNum: 1});
            }}>
            <Text style={styles.photoTitle}>{Strings.licensePhoto}</Text>
            <Image
              source={
                !this.state.licensePhoto
                  ? require('@Images/frameImage.png')
                  : {
                      uri: this.state.licensePhoto?.path,
                    }
              }
              style={{width: 100, height: 100, marginVertical: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoView}
            onPress={() => {
              //this.openPicker(2);
              this.setState({SelectImage: true, photoNum: 2});
            }}>
            <Text style={styles.photoTitle}>{Strings.formPhoto}</Text>
            <Image
              source={
                !this.state.formPhoto
                  ? require('@Images/frameImage.png')
                  : {
                      uri: this.state.formPhoto?.path,
                    }
              }
              style={{width: 100, height: 100, marginVertical: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoView}
            onPress={() => {
              //this.openPicker(3);
              this.setState({SelectImage: true, photoNum: 3});
            }}>
            <Text style={styles.photoTitle}>{Strings.inCarPhoto}</Text>
            <Image
              source={
                !this.state.inCarPhoto
                  ? require('@Images/frameImage.png')
                  : {
                      uri: this.state.inCarPhoto?.path,
                    }
              }
              style={{width: 100, height: 100, marginVertical: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoView}
            onPress={() => {
              this.setState({SelectImage: true, photoNum: 4});
            }}>
            <Text style={styles.photoTitle}>{Strings.outCarPhoto}</Text>
            <Image
              source={
                !this.state.outCarPhoto
                  ? require('@Images/frameImage.png')
                  : {
                      uri: this.state.outCarPhoto?.path,
                    }
              }
              style={{width: 100, height: 100, marginVertical: 25}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <AppButton
              containPhone={false}
              ButtonText={Strings.Back}
              ButtonColor={Colors.DarkTextColor}
              ExtraStyle={{
                width: Dimensions.get('screen').width * 0.25,
                marginRight: 20,
              }}
              onPress={() => {
                this.props.changePage(1);
              }}
            />
            <AppButton
              containPhone={false}
              ButtonText={Strings.send}
              ButtonColor={Colors.primary}
              ExtraStyle={{
                width: Dimensions.get('screen').width * 0.25,
                marginVertical: 20,
              }}
              onPress={() => {
                if (this.validateForm() != undefined) {
                  this.refs.toast.show(this.validateForm());
                } else {
                  let driverPhotos = [];
                  this.state.licensePhoto.Filename = 'licensePhoto';
                  this.state.formPhoto.Filename = 'formPhoto';
                  this.state.inCarPhoto.Filename = 'inCarPhoto';
                  this.state.outCarPhoto.Filename = 'outCarPhoto';
                  this.state.licensePhoto.Key = 1;
                  this.state.formPhoto.Key = 2;
                  this.state.inCarPhoto.Key = 4;
                  this.state.outCarPhoto.Key = 8;
                  driverPhotos.push(this.state.licensePhoto);
                  driverPhotos.push(this.state.formPhoto);
                  driverPhotos.push(this.state.inCarPhoto);
                  driverPhotos.push(this.state.outCarPhoto);
                  this.props.handSignUp(driverPhotos);
                }
              }}
            />
          </View>
        </ScrollView>
        <Toast
          ref="toast"
          style={{backgroundColor: Colors.DarkTextColor}}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={4000}
          opacity={0.8}
          textStyle={{color: '#fff'}}
        />
        <Modal
          isVisible={this.state.SelectImage}
          onBackdropPress={() => {
            this.setState({SelectImage: false});
          }}>
          <View style={[styles.popUpView, {alignItems: 'center'}]}>
            <TouchableOpacity
              style={{marginBottom: 15}}
              onPress={() => {
                this.openCamera(this.state.photoNum);
              }}>
              <Text style={{color: '#000', fontSize: 16}}>
                {Strings.OpenCamera}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.openPicker(this.state.photoNum);
              }}>
              <Text style={{color: Colors.primary, fontSize: 16}}>
                {Strings.ChooseLibrary}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoView: {
    marginVertical: 15,
    alignItems: 'center',
    textAlign: 'center',
  },
  photoTitle: {
    fontSize: 18,
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
  sendButton: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.08,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  popUpView: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width * 0.6,
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  filterTextView: {
    flexDirection: 'row',
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D7D7D7',
  },
});
