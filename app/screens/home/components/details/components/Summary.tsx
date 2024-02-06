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
    alignItems: 'center',
    backgroundColor: '#17577a'
  },
  title: {
    color: 'white'
  }
});

export default Summary;
