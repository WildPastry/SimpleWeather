// imports
import { StyleSheet } from 'react-native';

// START stylesheet
const myStylesheet = StyleSheet.create({
  // loading screen
  loader: {
    alignItems: 'center',
    backgroundColor: '#303030',
    flex: 1,
    justifyContent: 'center'
  },
  iconLoader: {
    height: 80,
    width: 80
  },

  // main container
  container: {
    alignItems: 'center',
    flex: 1
  },

  // header component
  brandIconSmall: {
    alignSelf: 'center',
    height: 35,
    width: 35
  },
  headerWrap: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#303030'
  },
  headerTopBar: {
    height: 22
  },

  // current component
  currentWrap: {
    alignSelf: 'stretch',
    flex: 1
  },
  currentIconWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 65
  },
  currentIconSmall: {
    alignSelf: 'center',
    height: 30,
    width: 30
  },
  currentTemp: {
    color: '#fff',
    fontSize: 70,
    fontFamily: 'allerDisplay',
    textAlign: 'center'
  },
  currentTempWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  currentWindHumWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4
  },
  currentWindWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currentHumWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currentDetailsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8
  },
  currentDetails: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerLt',
    paddingTop: 4
  },
  currentWindHumDetails: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerLt',
    paddingTop: 4
  },
  currentTempHigh: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'allerLt',
    paddingBottom: 12
  },
  currentTempLow: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'allerLt',
    paddingBottom: 12
  },
  currentDesc: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerRg',
    padding: 10,
    textAlign: 'center'
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'allerBd',
    padding: 10,
    paddingBottom: 0,
    textAlign: 'center',
    marginTop: 10
  },

  // week component
  weekIconTempWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between'
  },
  weekColWrap: {
    width: 50,
    height: 45,
    justifyContent: 'center'
  },
  weekColWrapLeft: {
    width: 75,
    height: 45,
    justifyContent: 'center'
  },
  weekIcon: {
    alignSelf: 'flex-start',
    height: 30,
    width: 30
  },
  weekLowTemp: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerLt',
  },
  weekHighTemp: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerLt',
  },
  weekHeading: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerLt',
    padding: 10,
    textAlign: 'center',
    marginTop: 2
  },
  weekText: {
    color: '#fff',
    fontSize: 19,
    textAlign: 'center'
  },
  weekTextBot: {
    color: '#fff',
    fontSize: 19,
    textAlign: 'left',
    marginBottom: 12
  },
  weekDesc: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'allerRg',
    padding: 10,
    textAlign: 'center'
  },

  // footer component
  footerText: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
    textAlign: 'center'
  },

  // dismiss list view
  dismissList: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
// END stylesheet

module.exports = myStylesheet;
