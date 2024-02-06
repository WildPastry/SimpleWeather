import { StyleSheet, Text, View } from 'react-native';

const Header: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17577a',
    alignItems: 'center'
  },
  title: {
    color: 'white'
  }
});

export default Header;
