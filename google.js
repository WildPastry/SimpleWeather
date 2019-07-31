// imports
import { StyleSheet } from "react-native";

// START stylesheet
const googleStylesheet = StyleSheet.create({
  // google
  container: {
    zIndex: 50
  },
  textInputContainer: {
    backgroundColor: "#fff",
    width: "100%"
  },
  textInput: {
    textAlign: "center"
  },
  description: {
    fontWeight: "700"
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  },
  listView: {
    backgroundColor: "#fff",
    color: "#000",
    position: "absolute",
    top: 44,
    elevation: 1
  },
});
// END stylesheet

module.exports = googleStylesheet;
