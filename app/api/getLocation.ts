import * as ExpoLocation from 'expo-location';
import { ILocation } from '../types/data.types';

const getLocation = async (): Promise<ILocation> => {
  const fallBack: ILocation = {
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: '-41.2924',
      longitude: '174.7787',
      speed: 0
    },
    location: 'Wellington, New Zealand',
    mocked: false,
    timestamp: 0
  };

  const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return fallBack;
  }

  const location: ExpoLocation.LocationObject =
    await ExpoLocation.getCurrentPositionAsync({});

  const locationData: ILocation = {
    coords: {
      accuracy: location.coords.accuracy ?? 0,
      altitude: location.coords.altitude ?? 0,
      altitudeAccuracy: location.coords.altitudeAccuracy ?? 0,
      heading: location.coords.heading ?? 0,
      latitude: location.coords.latitude.toString() ?? '-41.2924',
      longitude: location.coords.longitude.toString() ?? '174.7787',
      speed: location.coords.speed ?? 0
    },
    location: '',
    mocked: location.mocked ?? false,
    timestamp: location.timestamp ?? 0
  };

  return locationData;
};

export default getLocation;
