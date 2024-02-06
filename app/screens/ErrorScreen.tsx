import { StyleSheet, Text, View } from 'react-native';
import { IError } from '../types/data.types';
import colours from '../assets/colours.json';

interface ErrorScreenProps {
  errorInfo: IError;
}

const ErrorScreen: React.FC<ErrorScreenProps> = (
  props: ErrorScreenProps
): JSX.Element => {
  const appName: string | undefined = process.env.EXPO_PUBLIC_APP_NAME;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{appName}</Text>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.text}>{props.errorInfo.errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colours.spotGreyDark,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 10
  },
  text: {
    color: colours.white,
    fontSize: 16
  }
});

export default ErrorScreen;
