import { StyleSheet, Text, View } from 'react-native';

const Summary: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
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

export default Summary;
