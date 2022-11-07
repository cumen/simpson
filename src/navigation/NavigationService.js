//import { StackActions} from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigate = async (routeName, params, key) => {
  // await screenLog(routeName, routeName)
  navigator.dispatch(
    CommonActions.navigate({
      name:routeName,
      params,
      key: Math.random() * 10000,
    }),
  );
};

const navigateTab = async (routeName, params, key) => {
  // firebase.analytics().setCurrentScreen(routeName, routeName)
  // await analytics().logScreenView({
  //   screen_name: routeName,
  //   screen_class: routeName,
  // });
  navigator.dispatch(
    CommonActions.navigate({
      name:routeName,
      params,
      key,
    }),
  );
};

const navigateAndReset = (routeName, params) => {
  // navigator.dispatch(
  //   StackActions.reset({
  //     index: 0,
  //     actions: [
  //       CommonActions.navigate({
  //         routeName,
  //         params,
  //       }),
  //     ],
  //   }),
  // );
};

const goBack = params => {
  navigator.dispatch(CommonActions.goBack(params));
};

const getCurrentRoute = _nav => {
  const nav = _nav || navigator.state.nav;

  if (Array.isArray(nav.routes) && nav.routes.length > 0) {
    return getCurrentRoute(nav.routes[nav.index]);
  } else {
    return nav.routeName;
  }
};

export default {
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
  goBack,
  getCurrentRoute,
  navigateTab,
};
