// imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// START SavedLocations
class SavedLocations extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  // static proptypes
  static propTypes = {
    savedLocations: PropTypes.array.isRequired
  };

  // handle delete
  handleDelete = (val) => {
    let mounted = true;
    if (mounted) {
      this.props.handleDelete(val);
    }
    return () => mounted = false;
  }

  // START render SavedLocations
  render() {
    console.log('Inside render from SavedLocations...');
    return (
      <View>
        {this.props.savedLocations.map((location, index) => {
          return (
            <View style={savedLocationStyles.locationListWrapper} key={index}>
              <Text style={savedLocationStyles.locationListText}>{location.location}</Text>
              <Ionicons
                onPress={this.handleDelete.bind(this, location.key)}
                name='ios-close-circle'
                size={30}
                color={colours.white}
              />
            </View>
          );
        })}
      </View>
    );
  }
  // END render SavedLocations
}
// END SavedLocations

export default SavedLocations;

// style
const savedLocationStyles = StyleSheet.create({
  locationListWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationListText: {
    fontSize: 19,
    fontFamily: 'allerLt',
    color: colours.white,
    padding: 9,
    marginBottom: 3
  }
});