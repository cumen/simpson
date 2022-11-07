import React, { Component } from 'react';
import { HStack, Box} from 'native-base';
import LottieView from 'lottie-react-native';

export default class PageLoadingComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HStack position={'absolute'} height={'full'} width={'full'} bg={'loadingBg'} justifyContent="center"  alignItems={'center'}>
        <Box width={'full'} height={'1/5'}>
          <LottieView source={require('../styles/animation/loading.json')} autoPlay loop speed={1} />
        </Box>
      </HStack>
    );
  }
}
