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
    height: 30,
    width: 30
  },
  headerWrap: {
    alignSelf: 'stretch',
    flex: 1
  },
  headerTopBar: {
    height: 22,
    marginBottom: 8
  },

  // current component
  currentWrap: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 8
  },
  currentIconWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 55
  },
  currentIconSmall: {
    alignSelf: 'center',
    height: 30,
    width: 30
  },
  currentTemp: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '700',
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
    marginBottom: 8
  },
  currentDetailsWrap: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  currentDetails: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    paddingTop: 2
  },
  currentTempHigh: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
    paddingBottom: 12
  },
  currentTempLow: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
    paddingBottom: 12
  },
  currentDesc: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    padding: 10,
    textAlign: 'center'
  },
  dateText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
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
    fontSize: 20,
    fontWeight: '300'
  },
  weekHighTemp: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300'
  },
  weekHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    padding: 10,
    textAlign: 'center'
  },
  weekText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  weekTextBot: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 12
  },
  weekDesc: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
    padding: 10,
    textAlign: 'center',
    marginBottom: 8
  },

  // footer component
  footerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
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
