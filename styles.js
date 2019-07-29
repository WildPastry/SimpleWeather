// imports
import { StyleSheet } from "react-native";

// START stylesheet
const myStylesheet = StyleSheet.create({
  // slider
  swiperWrap: {
    flex: 8
  },
  slide1: {
    backgroundColor: "#114180",
    flex: 1,
    justifyContent: "center"
  },
  slide2: {
    backgroundColor: "#114180",
    flex: 1,
    justifyContent: "center"
  },

  // loading screen
  loader: {
    alignItems: "center",
    backgroundColor: "#303030",
    flex: 1,
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
    alignItems: "center",
    backgroundColor: "#114180",
    flex: 1
  },

  // header component
  headerWrap: {
    alignSelf: "stretch",
    flex: 1
  },
  headerTopBar: {
    backgroundColor: "#66a9d7",
    height: 22,
    marginBottom: 8
  },
  headerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    padding: 5,
    textAlign: "center"
  },

  // user input component
  locationWrap: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#303030",
    flex: 1,
    justifyContent: "center",
    marginTop: 8
  },
  locationText: {
    color: "#ff6666",
    fontSize: 20,
    fontWeight: "700",
    padding: 5,
    textAlign: "center",
    textTransform: "uppercase"
  },
  dateText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    padding: 5,
    textAlign: "center"
  },

  // current component
  currentWrap: {
    alignSelf: "stretch",
    backgroundColor: "#303030",
    flex: 2.5,
    marginTop: 8
  },
  currentIconTempWrap: {
    flexDirection: "row",
    height: 80,
    justifyContent: "space-around"
  },
  currentIcon: {
    alignSelf: "center",
    height: 80,
    width: 80
  },
  currentTemp: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "700",
    padding: 5,
    textAlign: "center"
  },
  currentDescTempWrap: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  currentTempHigh: {
    color: "#ff6666",
    fontSize: 20,
    fontWeight: "300",
    padding: 5,
    textAlign: "center"
  },
  currentTempLow: {
    color: "#66a9d7",
    fontSize: 20,
    fontWeight: "300",
    padding: 5,
    textAlign: "center"
  },
  currentDesc: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    padding: 5,
    textAlign: "center"
  },

  // week component
  weekWrap: {
    alignSelf: "stretch",
    backgroundColor: "#303030",
    flex: 4,
    justifyContent: "center",
    marginTop: 8,
    padding: 10
  },
  weekIconTempWrap: {
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between"
  },
  weekColWrap: {
    width: 50
  },
  weekIcon: {
    alignSelf: "flex-start",
    height: 30,
    width: 30
  },
  weekLowTemp: {
    color: "#66a9d7",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "right"
  },
  weekHighTemp: {
    color: "#ff6666",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "right"
  },
  weekHeading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 15,
    padding: 5,
    textAlign: "center"
  },
  weekText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "left"
  },

  // footer component
  footerWrap: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    marginTop: 8
  },
  footerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    padding: 5,
    textAlign: "center"
  }

  // button
  // button: {
  //   backgroundColor: "#fff",
  //   borderRadius: 15,
  //   color: "#114180",
  //   marginTop: 20,
  //   padding: 5
  // },
  // buttonBorder: {
  //   borderColor: "#114180",
  //   borderWidth: 1
  // }
});
// END stylesheet

module.exports = myStylesheet;
