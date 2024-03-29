import { StyleSheet, Text, View } from 'react-native';
import { IError } from '../types/data.types';
import colours from '../assets/colours.json';

interface ErrorScreenProps {
  errorInfo: IError;
}

const ErrorScreen: React.FC<ErrorScreenProps> = (
  props: ErrorScreenProps
): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.text}>{props.errorInfo.errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.spotGreyDark,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    color: colours.white,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default ErrorScreen;
