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
    alignItems: 'center',
    backgroundColor: '#052c42'
  },
  title: {
    color: 'white'
  }
});

export default Icon;
