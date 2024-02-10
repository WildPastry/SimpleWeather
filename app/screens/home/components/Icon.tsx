import { StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

interface IIcon {
  icon: string;
}

const Icon: React.FC<IIcon> = (props: IIcon): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.icon}</Text>
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
