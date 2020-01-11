// imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// prop types
import PropTypes from 'prop-types';

// colours
import colours from './../assets/colours.json';

// START saved locations list
class SavedLocations extends Component {
  static propTypes = {
    savedLocations: PropTypes.array.isRequired
  };

  // START render saved locations list
  render() {
    return (
      <View>
        {this.props.savedLocations.map((location, index) => {
          return (
            <View key={index}>
              <Text style={savedLocationStyles.locationListText}>{location.location}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  // END render saved locations list
}
// END saved locations list

export default SavedLocations;

// style
const savedLocationStyles = StyleSheet.create({
  locationListText: {
    fontSize: 19,
    fontFamily: 'allerLt',
    textAlign: 'center',
    color: colours.simpleWeather
  }
});