import Home from "./screens/Home";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import store from "./redux/store";
import useCachedResources from "./hooks/useCachedResources";
import { Text, StyleSheet, View } from "react-native";

const AppWithProvider: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App: React.FC = (): JSX.Element | null => {
  // Loading settings
  const isLoadingComplete: boolean = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar />
      <Text style={styles.text}>APP</Text>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#6e859e",
  },
});

export default registerRootComponent(AppWithProvider);
