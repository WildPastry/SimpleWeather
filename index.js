// imports
import { AppLoading } from 'expo';
import { registerRootComponent } from 'expo';
import React, { Component, useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";

// default component functions
import { StatusBar, StyleSheet, View, Text } from 'react-native';

// font and icons
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// colours
import colours from './assets/colours.json';

// components
import App from './App';
// import AppNavigator from './navigation/AppNavigator';

// export const Alert = ({ visible, children }) => {
//   const [isVisible, setVisibility] = useState(null);

//   useEffect(() => {
//     setVisibility(visible); // update the state
//   }, [visible]); // hook is only triggered when value changes

//   if (!isVisible) return null;

//   return <View><Text style={indexStyles.text}>ffefe{children}</Text></View>;
// };

// Alert.propTypes = {
//   visible: PropTypes.bool.isRequired,
//   children: PropTypes.node.isRequired
// };

const Index = (props) => {

  // loading states
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [state, setState] = useState(false);
  console.log(state);

  // const [visible, setAlertVisibility] = useState(false);
  // const isMountedRef = useRef(null);
  // console.log('Index connected...');
  // {
  //   showDisplay && <View style={indexStyles.wrapper}>
  //     <Text style={indexStyles.text}>
  //       Run the App
  // </Text>
  //   </View>
  // }
  // useEffect(() => {
  //   console.log('Inside useEffect function...');
  //   isMountedRef.current = true;
  //   if (isMountedRef.current) {
  //     console.log(isMountedRef.current);
  //   } else {
  //     console.log(isMountedRef.current);
  //   }
  //   return () => isMountedRef.current = false;
  // });

  // set up app display
  let appDisplay;

  // set status bar text colour
  StatusBar.setBarStyle('light-content', true);

  if (state) {
    console.log(state);
    appDisplay = (
      <App />
    );
  } else {
    console.log(state);
    appDisplay = (
      <View style={indexStyles.wrapper}>
        <Text onPress={() => setState(true)} style={indexStyles.text}>
          Run the App
        </Text>
      </View>
    );
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      appDisplay
    );
  }
}

// load resources
async function loadResourcesAsync() {
  console.log('Inside loadResourcesAsync from Index');
  await Promise.all([
    Font.loadAsync({
      ...Ionicons.font,
      allerLt: require('./assets/fonts/Aller_Lt.ttf'),
      allerRg: require('./assets/fonts/Aller_Rg.ttf'),
      allerBd: require('./assets/fonts/Aller_Bd.ttf'),
      allerDisplay: require('./assets/fonts/AllerDisplay.ttf'),
      weatherfont: require('./assets/fonts/weathericons-regular-webfont.ttf')
    }),
  ]);
}

// errors
function handleLoadingError(error) {
  console.warn(error);
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
  text: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerLt',
    textAlign: 'center'
  }
});