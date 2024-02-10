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
    backgroundColor: colours.thunderStormDark,
    alignItems: 'center'
  },
  title: {
    color: colours.white
  }
});

export default Icon;
