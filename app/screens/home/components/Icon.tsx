import { StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

interface ILocalData {
  data: string;
}

const Icon: React.FC<ILocalData> = (props: ILocalData): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colours.thunderStormDark
  },
  title: {
    color: colours.white
  }
});

export default Icon;
