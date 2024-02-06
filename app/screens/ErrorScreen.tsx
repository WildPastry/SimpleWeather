import { StyleSheet, Text, View } from 'react-native';

const ErrorScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error with API call</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    color: 'white'
  }
});

export default ErrorScreen;
