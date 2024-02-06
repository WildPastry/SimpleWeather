import { StyleSheet, Text, View } from 'react-native';
import Icons from './components/Icons';
import Summary from './components/Summary';

const Details: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Icons />
      <Summary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#052c42',
    flex: 1
  },
  title: {
    color: 'white'
  }
});

export default Details;
