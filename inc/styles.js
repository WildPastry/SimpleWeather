import { StyleSheet } from "react-native";

// START stylesheet
const myStylesheet = StyleSheet.create({
  // loading page
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

  // main container
  container: {
    flex: 1,
    backgroundColor: "#114180",
    alignItems: "center"
    // justifyContent: "center"
  },

  // heading component
  headingWrap: {
    alignSelf: "stretch"
  },
  headingTopBar: {
    backgroundColor: "#66a9d7",
    height: 22,
    marginBottom: 8
  },
  heading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center"
  },

  // current component
  currentWrap: {
    backgroundColor: "red",
    marginTop: 8
  },
  currentText: {
    color: "#fff",
    padding: 5,
    fontSize: 20,
    textAlign: "center"
  },

  // button
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
  }
});
// END stylesheet

module.exports = myStylesheet;
