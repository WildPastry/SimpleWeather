// imports
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';
import { StatusBar, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import colours from './assets/colours.json';

const Index = (props) => {

  // hook loading states
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // set status bar text colour
  StatusBar.setBarStyle('light-content', true);

  // app loading check
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        style={indexStyles.loader}
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

// style
const indexStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: colours.simpleWeather,
    flex: 1,
    justifyContent: 'center'
  },
  loader: {
    alignItems: 'center',
    backgroundColor: colours.simpleWeather,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerLt',
    textAlign: 'center'
  },
  simpleWeather: {
    color: colours.white,
    fontSize: 22,
    fontFamily: 'allerDisplay',
    textAlign: 'center',
    paddingTop: 4,
    marginBottom: 4
  }
});