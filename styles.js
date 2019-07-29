import { StyleSheet } from "react-native";

// get phone width and height
// const { width, height } = Dimensions.get('window');

// START stylesheet
const myStylesheet = StyleSheet.create({
  // loading page
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
    // justifyContent: "center"
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
    textAlign: "center"
  },

  // user input component
  locationWrap: {
    alignSelf: "stretch",
    backgroundColor: "#303030",
    flex: 1,
    marginTop: 8
  },
  locationText: {
    color: "#ff6666",
    fontSize: 20,
    fontWeight: "700",
    padding: 5,
    textTransform: "uppercase",
    textAlign: "center"
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
    flex: 2.5,
    backgroundColor: "#303030",
    marginTop: 8
  },
  currentIconTempWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 80
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
    padding: 10,
    marginTop: 8
  },
  weekIconTempWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40
  },
  // weekColWrapDay: {
  //   width: 150
  // },
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
    fontSize: 20,
    fontWeight: "300",
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
