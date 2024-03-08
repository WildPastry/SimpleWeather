/* eslint-disable max-len */
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { setData } from '../redux/slices/dataSlice';
import { useAppDispatch } from '../redux/hooks';

export default function useCachedResources(): boolean {
  // Function settings
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useAppDispatch();

  // Load any resources or data that we need prior to rendering the app
  useEffect((): void => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          merriWeatherLt: require('../assets/fonts/MerriweatherSans-Light.ttf'),
          allerLt: require('../assets/fonts/Aller_Lt.ttf'),
          allerRg: require('../assets/fonts/Aller_Rg.ttf'),
          allerBd: require('../assets/fonts/Aller_Bd.ttf'),
          allerDisplay: require('../assets/fonts/AllerDisplay.ttf'),
          weatherfont: require('../assets/fonts/weathericons-regular-webfont.ttf')
        });
        // Set data
        await dispatch(setData());
      } finally {
        // Hide splash and set loading complete
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
