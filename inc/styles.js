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

  // header component
  headerWrap: {
    alignSelf: "stretch"
  },
  headerTopBar: {
    backgroundColor: "#66a9d7",
    height: 22,
    marginBottom: 8
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center"
  },

  // location component
  locationWrap: {
    alignSelf: "stretch",
    backgroundColor: "#525252",
    marginTop: 8
  },
  locationText: {
    color: "#fff",
    fontSize: 20,
    padding: 5,
    textAlign: "center"
  },

  // current component
  currentWrap: {
    alignSelf: "stretch",
    backgroundColor: "#525252",
    marginTop: 8
  },
  currentText: {
    color: "#fff",
    fontSize: 20,
    padding: 5,
    textAlign: "center"
  },

  // week component
  weekWrap: {
    alignSelf: "stretch",
    backgroundColor: "#525252",
    marginTop: 8
  },
  weekText: {
    color: "#fff",
    fontSize: 20,
    padding: 5,
    textAlign: "center"
  },

 // footer component
 footerWrap: {
  alignSelf: "stretch",
  backgroundColor: "#525252",
  marginTop: 8
},
footerText: {
  color: "#fff",
  fontSize: 20,
  padding: 5,
  textAlign: "center"
},

  // button
  button: {
    backgroundColor: "#fff",
    borderRadius: 15,
    color: "#114180",
    marginTop: 20,
    padding: 5
  },
  buttonBorder: {
    borderColor: "#114180",
    borderWidth: 1
  }
});
// END stylesheet

module.exports = myStylesheet;
