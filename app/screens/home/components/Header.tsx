import { StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

const Header: React.FC = (): JSX.Element => {
  const appName: string | undefined = process.env.EXPO_PUBLIC_APP_NAME;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colours.thunderStorm
  },
  title: {
    color: colours.white
  }
});

export default Header;
