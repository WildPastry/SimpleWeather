// imports
import { StyleSheet } from 'react-native';

// START stylesheet
const googleStylesheet = StyleSheet.create({
  // google auto-complete
  container: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    overflow: 'visible',
  },
  textInputContainer: {
    alignContent: 'center',
    backgroundColor: '#303030',
    width: '100%'
  },
  textInput: {
    alignItems: 'center',
    backgroundColor: '#303030',
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    zIndex: 1
  },
  description: {
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center'
  },
  listView: {
    backgroundColor: '#303030',
    color: '#fff',
    position: 'absolute',
    top: 44,
    elevation: 1
  },
  separator: {
    backgroundColor: '#ffffff48',
    height: 0.5
  }
});
// END stylesheet

module.exports = googleStylesheet;
