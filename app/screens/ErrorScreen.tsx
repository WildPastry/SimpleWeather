import { StyleSheet, Text, View } from "react-native";

const ErrorScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ErrorScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  title: {
    fontSize: 20,
  },
});

export default ErrorScreen;
