import { StyleSheet } from 'react-native';

// START stylesheet
const myStylesheet = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center"
  },
  headingLoader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#114180",
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "900",
    textAlign: "center"
  },
  button: {
    color: "#114180",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    marginTop: 20
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: "#114180"
  },
  info: {
    marginTop: 20
  },
  text: {
    color: "#fff",
    padding: 5,
    fontSize: 20,
    textAlign: "center"
  }
});
// END stylesheet

module.exports = myStylesheet;