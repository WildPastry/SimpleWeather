// imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// prop types
import PropTypes from 'prop-types';

// icons
import { Ionicons } from '@expo/vector-icons';

// colours
import colours from './../assets/colours.json';

// START saved locations list
class SavedLocations extends Component {
  // default class savedlocations constructor
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

  // START render saved locations list
  render() {
    return (
      <View>
        {this.props.savedLocations.map((location, index) => {
          return (
            <View style={savedLocationStyles.locationListWrapper} key={index}>
              <Text style={savedLocationStyles.locationListText}>{location.location}</Text>
              <Ionicons
                onPress={this.handleDelete.bind(this, location.key)}
                name='ios-close-circle'
                size={25}
                color={colours.white}
              />
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
  locationListWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationListText: {
    fontSize: 19,
    fontFamily: 'allerLt',
    color: colours.white,
    padding: 8,
    marginBottom: 2
  }
});