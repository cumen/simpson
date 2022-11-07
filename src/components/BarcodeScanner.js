import { Text, View, StyleSheet, Vibration } from 'react-native'
import React, { Component } from 'react'
import { Image, Pressable } from 'native-base';
import { RNCamera as Camera } from 'react-native-camera';

const deviceHeight = 500;
const deviceWidth = 500;

export default class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
      temp: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          style={[styles.preview]}
          onBarCodeRead={this.onBarCodeRead}
          autoFocus={Camera.Constants.AutoFocus.on}
          flashMode={
            this.state.torchOn
              ? Camera.Constants.FlashMode.torch
              : Camera.Constants.FlashMode.off
          }
          captureAudio={false}
          defaultTouchToFocus
          ref={cam => (this.camera = cam)}>
          <View style={[styles.rectangle]}>
            <View style={styles.rectangleColor} />
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
          </View>

        </Camera>
        <View style={styles.lightButton}>
          <Pressable onPress={this.handleTourch}>
            <Image
              style={styles.lightImageStyle}
              source={require('../img/lamp.png')}
            />
          </Pressable>
        </View>

        <Pressable
          onPress={() => this.closeCamera()}
          style={{ position: 'absolute', top: 35, right: 20 }}>
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>X</Text>
        </Pressable>
      </View>
    );
  }

  intervalRef = null;
  componentDidMount() {
    //Aynı barkodu tekrar okutmak isterse 3 saniyede bir sıfırlanıyor.
    this.intervalRef = setInterval(() => {
      this.setState({ temp: '' }, () => { this.cameraResume(); });
    }, 3000);
  }

  onBarCodeRead = e => {
    if (this.state.temp != e.data && !this.state.cameraPause) {
      Vibration.vibrate()
      this.setState({ temp: e.data }, () => {
        this.cameraResume()
        this.closeCamera();
        this.props.ParentCallBack(e.data);

      });
    }
  };

  cameraResume() {
    this.camera.resumePreview();
    this.setState({ cameraPause: false })
  }

  cameraPause() {
    this.camera.pausePreview();
    this.setState({ cameraPause: true })
  }

  closeCamera() {
    this.setState({ temp: '', torchOn: false })
    this.props.cameraClose(false);
    clearInterval(this.intervalRef)
  }

  handleTourch() {
    this.setState(x => ({ torchOn: !x.torchOn }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  lightButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%'
  },
  lightImageStyle: {
    height: 32,
    width: 32,
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    left: '45%',
    bottom: 0,
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBg: {
    width: '100%',
    position: 'absolute',
    height: 70,
    justifyContent: 'center',
    backgroundColor: '#43474a',
    marginTop: deviceHeight / 7,
  },
  textBgButton: {
    width: '100%',
    position: 'absolute',
    height: 30,
    justifyContent: 'center',
    marginTop: deviceHeight / 3.3,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanText: {
    color: 'white',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    width: deviceWidth,
    borderLeftColor: 'rgba(0, 0, 0, .75)',
    borderRightColor: 'rgba(0, 0, 0, .75)',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    position: 'absolute',
    borderLeftColor: 'rgba(0, 0, 0, .6)',
    borderRightColor: 'rgba(0, 0, 0, .6)',
    borderTopColor: 'rgba(0, 0, 0, .6)',
    borderBottomColor: 'rgba(0, 0, 0, .6)',
    borderLeftWidth: deviceWidth / 1,
    borderRightWidth: deviceWidth / 1,
    borderTopWidth: deviceHeight / 2.5,
    borderBottomWidth: deviceHeight / 1,
  },
  rectangleColor: {
    height: 250,
    width: 325,
    backgroundColor: 'transparent',
  },
  topLeft: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    top: -1,
    borderLeftColor: 'green',
    borderTopColor: 'green',
  },
  topRight: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    top: -1,
    borderRightColor: 'green',
    borderTopColor: 'green',
  },
  bottomLeft: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    bottom: -1,
    borderLeftColor: 'green',
    borderBottomColor: 'green',
  },
  bottomRight: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    bottom: -1,
    borderRightColor: 'green',
    borderBottomColor: 'green',
  },
  close: {
    width: deviceWidth,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: deviceHeight / 7,
  },
  cameraStatusButtonStyle: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    width: '20%'
  }
});