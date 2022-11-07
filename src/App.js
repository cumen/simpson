import React, { Component } from 'react';
import AppContainer from './navigation'
//import LoadingContainer from './components/PageLoadingComponent';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import NativeBaseTheme from './styles/native-base-style';
import './i18n'
import NavigationService from './navigation/NavigationService';


export default class App extends Component {
  render() {
    return (
        <NativeBaseProvider theme={NativeBaseTheme}>
          <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
            <AppContainer />
            {/* {ApplicationStore.pageLoadingStatus && <LoadingContainer />} */}
          </NavigationContainer>
        </NativeBaseProvider>
    );
  }
}