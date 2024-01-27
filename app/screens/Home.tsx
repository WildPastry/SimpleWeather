import { Text, StyleSheet, View } from "react-native";
import { AppState } from "../redux/store";
import ErrorScreen from "./ErrorScreen";
import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { IWeather } from "../types/data.types";

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
    backgroundColor: "#ffc82e",
  },
});

export default Home;
