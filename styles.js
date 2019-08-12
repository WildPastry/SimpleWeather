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
  headerWrap: {
    alignSelf: 'stretch',
    flex: 1
  },
  headerTopBar: {
    height: 22,
    marginBottom: 8
  },
  headerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    padding: 10,
    textAlign: 'center'
  },

  // current component
  currentWrap: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 8
  },
  currentIconTempWrap: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around'
  },
  currentIcon: {
    alignSelf: 'center',
    height: 80,
    width: 80
  },
  currentTemp: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 12,
    width: 80
  },
  currentDescTempWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  currentTempHigh: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    width: 80
  },
  currentTempLow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    width: 80
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
    fontWeight: '300',
    padding: 10,
    textAlign: 'center',
    marginTop: 60
  },

  // week component
  weekWrap: {
    alignSelf: 'stretch',
    flex: 4,
    justifyContent: 'center',
    marginTop: 8
  },
  weekIconTempWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    marginTop: 5
  },
  weekColWrap: {
    width: 50
  },
  weekIcon: {
    alignSelf: 'flex-start',
    height: 30,
    width: 30
  },
  weekLowTemp: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'right'
  },
  weekHighTemp: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'right'
  },
  weekHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 15,
    padding: 10,
    textAlign: 'center'
  },
  weekText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left'
  },
  weekTextBot: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 12
  },
  weekDesc: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    padding: 10,
    textAlign: 'center'
  },

  // footer component
  footerWrap: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8
  },
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
