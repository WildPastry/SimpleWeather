// imports
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';
import { StatusBar, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// https://github.com/cawfree/react-native-basement/blob/master/docs/GETTING-STARTED.md

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize =
  (size) => Math.ceil((size * scale));

const size = {
  small: scaledSize(25),
  oneThird: scaledSize(125),
  fullScreen: scaledSize(375),
};

console.log(size);

// // iPhone 5s
// { small: 22, oneThird: 107, fullScreen: 320 }
// // iPhone 6s
// { small: 25, oneThird: 125, fullScreen: 375 }
// // iPhone 6s Plus
// { small: 28, oneThird: 138, fullScreen: 414 }

// START Index
const Index = (props) => {

  // hook loading states
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // set status bar text colour
  StatusBar.setBarStyle('light-content', true);

  // app loading check
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    console.log('Inside loading check from Index...');
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)} />
    );
  } else {
    return (
      <FirebaseProvider value={Firebase}>
        <AppContainer />
      </FirebaseProvider>
    );
  }
}
// END Index

// load resources
async function loadResourcesAsync() {
  console.log('Inside loadResourcesAsync from Index');
  await Promise.all([
    Asset.loadAsync([
      require('./assets/brand.png'),
      require('./assets/icon.png')
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      allerLt: require('./assets/fonts/Aller_Lt.ttf'),
      allerRg: require('./assets/fonts/Aller_Rg.ttf'),
      allerBd: require('./assets/fonts/Aller_Bd.ttf'),
      allerDisplay: require('./assets/fonts/AllerDisplay.ttf'),
      weatherfont: require('./assets/fonts/weathericons-regular-webfont.ttf')
    })
  ]);
}

// errors
function handleLoadingError(error) {
  console.log(error);
}

// finish loading
function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
  console.log('Device width: ' + width + ' Device height: ' + height);
  console.log('Inside handleFinishLoading from Index = ' + setLoadingComplete);
}

// register
export default registerRootComponent(Index);