/* eslint-disable */
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { IWeatherData } from "./types/data.types";
import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";

const App: React.FC = (): JSX.Element => {
  // Set up auth config
  const apiKey: string | undefined = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl: string | undefined = process.env.EXPO_PUBLIC_API_URL;
  const currentLat: string = "-41.2924";
  const currentLng: string = "174.7787";

  const [weatherData, setWeatherData] = useState<IWeatherData>({
    temp: 0,
    high: 0,
    low: 0,
    openWeatherId: "",
    desc: "",
    humidity: "",
    wind: 0,
    icon: "",
    sunset: "",
    sunrise: "",
    feelsLike: "",
    hourly: "",
    daily: "",
  });

  useEffect((): void => {
    if (apiUrl && apiKey) {
      // Fetch data
      Promise.all([
        fetch(
          `${apiUrl + currentLat}&lon=${currentLng}&units=metric&APPID=${apiKey}`
        ),
      ])
        .then(([response]) => {
          // Convert response to JSON
          return Promise.all([response.json()]);
        })
        .then(([responseJSON]) => {
          // Set response locally
          const weatherData: IWeatherData = {
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
          setWeatherData(weatherData);
        })
        .catch((error) => {
          // Error state
        });
    }
  }, [apiUrl, apiKey, currentLat, currentLng]);

  useEffect((): void => {
    console.log(weatherData.temp, weatherData.desc);
  }, [weatherData]);

  return (
    <View style={styles.container}>
      <Text>SimpleWeather</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(App);
