import { StyleSheet, Text, View } from 'react-native';

const Icon: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Icon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#052c42',
    alignItems: 'center'
  },
  title: {
    color: 'white'
  }
});

export default Icon;
