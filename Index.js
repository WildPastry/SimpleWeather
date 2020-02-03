// imports
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

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
  console.log('Inside handleFinishLoading from Index = ' + setLoadingComplete);
}

// register
export default registerRootComponent(Index);