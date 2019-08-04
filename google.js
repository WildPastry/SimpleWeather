// imports
import { StyleSheet } from 'react-native';

// START stylesheet
const googleStylesheet = StyleSheet.create({
  // google
  container: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    overflow: 'visible',
    // flexGrow: 0,
    // flexShrink: 0
    // height: 60
  },
  textInputContainer: {
    alignContent: 'center',
    backgroundColor: '#1faadb',
    width: '100%'
  },
  textInput: {
    alignItems: 'center',
    backgroundColor: '#1faadb',
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
    backgroundColor: '#1faadb',
    color: '#fff',
    position: 'absolute',
    top: 44,
    elevation: 1
  },
  separator: {
    backgroundColor: '#66a9d7',
    height: 0.5
  }
});
// END stylesheet

module.exports = googleStylesheet;
