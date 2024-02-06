/* eslint-disable max-len */
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { setData, setError } from '../redux/slices/dataSlice';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
          merriWeatherRg: require('../assets/fonts/MerriweatherSans-Regular.ttf'),
          merriWeatherBd: require('../assets/fonts/MerriweatherSans-Bold.ttf'),
          allerLt: require('../assets/fonts/Aller_Lt.ttf'),
          allerRg: require('../assets/fonts/Aller_Rg.ttf'),
          allerBd: require('../assets/fonts/Aller_Bd.ttf'),
          allerDisplay: require('../assets/fonts/AllerDisplay.ttf'),
          weatherfont: require('../assets/fonts/weathericons-regular-webfont.ttf')
        });
        // Load data
        // await dispatch(setData());
      } catch (error) {
        // Set error screen if failed
        dispatch(setError(true));
      } finally {
        setLoadingComplete(true);
        // Hide splash
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
