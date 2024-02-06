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
    alignItems: 'center',
    backgroundColor: '#17577a'
  },
  title: {
    color: 'white'
  }
});

export default Header;
