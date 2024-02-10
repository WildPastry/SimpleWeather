import { StyleSheet, Text, View } from 'react-native';

const Header: React.FC = (): JSX.Element => {
  const appName: string | undefined = process.env.SW_APP_NAME;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#17577a'
  },
  title: {
    color: 'white'
  }
});

export default Header;
