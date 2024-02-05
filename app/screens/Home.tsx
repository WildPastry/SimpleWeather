import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppState } from "../redux/store";
import ErrorScreen from "./ErrorScreen";
import { IWeather } from "../types/data.types";
import { useAppSelector } from "../redux/hooks";

const Home: React.FC = (): JSX.Element => {
  // Data from store
  const appError: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  const appLoading: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.loading;
  });

  const appData: IWeather = useAppSelector((state: AppState): IWeather => {
    return state.data.weather;
  });

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  useEffect((): void => {
    console.log(
      "appLoading",
      appLoading,
      "appError",
      appError,
      "appData",
      appData,
    );
  }, []);

  // Render home page
  const renderHome = () => {
    return (
      <View>
        <Text style={styles.text}>HOME</Text>
      </View>
    );
  };
  // Check for error state
  return appError ? errorScreen() : renderHome();
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#2485c7",
  },
});

export default Home;
