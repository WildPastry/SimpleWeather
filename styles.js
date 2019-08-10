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
  headingLoader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
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
    backgroundColor: '#66a9d7',
    height: 22,
    marginBottom: 8
  },
  headerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    padding: 5,
    textAlign: 'center'
  },



  // current component
  currentWrap: {
    alignSelf: 'stretch',
    backgroundColor: '#303030',
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
    fontSize: 60,
    fontWeight: '700',
    padding: 5,
    textAlign: 'center'
  },
  currentDescTempWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  currentTempHigh: {
    color: '#ff6666',
    fontSize: 20,
    fontWeight: '300',
    padding: 5,
    textAlign: 'center'
  },
  currentTempLow: {
    color: '#66a9d7',
    fontSize: 20,
    fontWeight: '300',
    padding: 5,
    textAlign: 'center'
  },
  currentDesc: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    padding: 5,
    textAlign: 'center'
  },
  dateText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    padding: 5,
    textAlign: 'center',
    marginTop: 60,
  },
  
  // week component
  weekWrap: {
    alignSelf: 'stretch',
    backgroundColor: '#303030',
    flex: 4,
    justifyContent: 'center',
    marginTop: 8,
    padding: 10
  },
  weekIconTempWrap: {
    alignItems: 'center',
    // borderTopWidth : 0.5,
    // borderTopColor: '#66a9d7',
    flexDirection: 'row',
    height: 70,
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
    color: '#66a9d7',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'right'
  },
  weekHighTemp: {
    color: '#ff6666',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'right'
  },
  weekHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 15,
    padding: 5,
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
    padding: 5,
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
    padding: 5,
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
