import { useEffect, useState } from "react";
import { IWeather } from "../types/data.types";

const getWeather = async (): Promise<IWeather> => {
  console.log("getWeather");
  // Set up auth config
  const apiKey: string | undefined = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl: string | undefined = process.env.EXPO_PUBLIC_API_URL;
  const currentLat: string = "-41.2924";
  const currentLng: string = "174.7787";

  try {
    const response = await fetch(
      `${apiUrl + currentLat}&lon=${currentLng}&units=metric&APPID=${apiKey}`,
    );
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
      daily: responseJSON.daily,
    };
    
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log('getWeather', error);
    throw error; // Throw the error to be caught in the setData function
  }



  // const [weatherData, setWeatherData] = useState<IWeather>({
  //   temp: 0,
  //   high: 0,
  //   low: 0,
  //   openWeatherId: "",
  //   desc: "",
  //   humidity: "",
  //   wind: 0,
  //   icon: "",
  //   sunset: "",
  //   sunrise: "",
  //   feelsLike: "",
  //   hourly: "",
  //   daily: "",
  // });

  // // Fetch data
  // Promise.all([
  //   fetch(
  //     `${apiUrl + currentLat}&lon=${currentLng}&units=metric&APPID=${apiKey}`,
  //   ),
  // ])
  //   .then(([response]) => {
  //     // Convert response to JSON
  //     return Promise.all([response.json()]);
  //   })
  //   .then(([responseJSON]) => {
  //     // Set response locally
  //     const weatherData: IWeather = {
  //       temp: Math.round(responseJSON.current.temp),
  //       high: Math.round(responseJSON.daily[0].temp.max),
  //       low: Math.round(responseJSON.daily[0].temp.min),
  //       openWeatherId: responseJSON.current.weather[0].id,
  //       desc: responseJSON.current.weather[0].description,
  //       humidity: responseJSON.current.humidity,
  //       wind: responseJSON.current.wind_speed * 3.6,
  //       icon: responseJSON.current.weather[0].icon,
  //       sunset: responseJSON.current.sunset,
  //       sunrise: responseJSON.current.sunrise,
  //       feelsLike: responseJSON.current.feels_like,
  //       hourly: responseJSON.hourly,
  //       daily: responseJSON.daily,
  //     };
  //     setWeatherData(weatherData);
  //   });

  //   console.log(weatherData)
  // return weatherData;
};

export default getWeather;
