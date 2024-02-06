import Constants from 'expo-constants';
import { IWeather } from '../types/data.types';

const getWeather = async (): Promise<IWeather> => {
  // Set up auth config
  const apiKey: string | undefined = Constants?.expoConfig?.extra?.apiKey;
  const apiUrl: string | undefined = Constants?.expoConfig?.extra?.apiUrl;
  const currentLat: string = '-41.2924';
  const currentLng: string = '174.7787';

  // Call API
  const response = await fetch(
    `${apiUrl + currentLat}&lon=${currentLng}&units=metric&APPID=${apiKey}`
  );

  // Return response
  const responseJSON = await response.json();

  const weatherData: IWeather = {
    temp: Math.round(responseJSON.current.temp),
    high: Math.round(responseJSON.daily[0].temp.max),
    low: Math.round(responseJSON.daily[0].temp.min),
    openWeatherId: responseJSON.current.weather[0].id,
    desc: responseJSON.current.weather[0].description,
    humidity: responseJSON.current.humidity,
    wind: responseJSON.current.wind_speed * 3.6,
    icon: responseJSON.current.weather[0].icon,
    sunset: responseJSON.current.sunset,
    sunrise: responseJSON.current.sunrise,
    feelsLike: responseJSON.current.feels_like,
    hourly: responseJSON.hourly,
    daily: responseJSON.daily
  };

  return weatherData;
};

export default getWeather;
