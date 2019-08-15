// imports
import React from 'react';

// default component functions
import { Image, Text, SafeAreaView, ScrollView, View } from 'react-native';

// weather icons
import WindSpeed from './../assets/weather/windSpeed.png';
import Humidity from './../assets/weather/humidity.png';

// accordian
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native';

// colours
import colours from './../assets/colours.json';

// icons
import weatherIcons from './../assets/icons.json';
import { Ionicons, Entypo } from '@expo/vector-icons';

// moment set up
var moment = require('moment');

// stylesheet
var styles = require('../styles.js');

// START week
class Week extends React.Component {
  // START week render
  render() {
    // new array for filtering
    var filteredWeather = [];

    // first filter function
    for (var i = 0; i < this.props.weather.length; i++) {
      var checkArray = this.props.weather[i].dt_txt.includes('12:00:00');
      if (checkArray === true) {
        filteredWeather.push(this.props.weather[i]);
      }
    }

    // add new data to filtered array
    for (i = 0; i < 5; i++) {
      Array.prototype.push.apply(filteredWeather[i].main, [this.props.skyWeather[i].temperatureMin]);
      Array.prototype.push.apply(filteredWeather[i].main, [this.props.skyWeather[i].temperatureMax]);
    }

    // set up colour bg variables
    var colourBg = this.props.weekBg;
    var colourBarBg = this.props.weekBarBg;

    // set current weather icon based on weather
    return (
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: colourBg,
          flex: 4,
          justifyContent: 'center',
          marginTop: 8
        }}>
        <ScrollView>
          {/* weekly weather heading and description */}
          <Text style={styles.weekHeading}>5 Day forecast</Text>
          <Text style={styles.weekText}>{this.props.skyWeather.summary}</Text>
          <View>
            {/* START map */}
            {filteredWeather.map((dailyWeather) => {
              // set up date VARIABLES
              var today = moment.unix(dailyWeather.dt);
              var day = moment(today).format('ddd');

              return (
                // START week display
                <View key={dailyWeather.dt}>
                  <Collapse
                    style={{
                      backgroundColor: colourBarBg,
                      marginTop: 3,
                      marginBottom: 3,
                      padding: 10
                    }}>
                    {/* collapse header */}
                    <CollapseHeader>
                      <View style={styles.weekIconTempWrap}>
                        {/* day */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekText}>{day}</Text>
                        </View>
                        {/* daily icon */}
                        <View style={styles.weekColWrap}>
                          <Text
                            style={{
                              fontFamily: 'weatherfont',
                              fontSize: 30,
                              textAlign: 'center',
                              color: colours.snow
                            }}>
                            {weatherIcons[dailyWeather.weather[0].id].code}
                          </Text>
                        </View>
                        {/* daily low temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekLowTemp}>
                            <Ionicons
                              name='ios-arrow-round-down'
                              size={25}
                              color={colours.snow}
                            />{' '}
                            {Math.round(dailyWeather.main[0])}°
                          </Text>
                        </View>
                        {/* daily high temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekHighTemp}>
                            <Ionicons
                              name='ios-arrow-round-up'
                              size={25}
                              color={colours.snow}
                            />{' '}
                            {Math.round(dailyWeather.main[1])}°
                          </Text>
                        </View>
                      </View>
                    </CollapseHeader>

                    {/* collapse body */}
                    <CollapseBody>
                      {/* START description */}
                      <Text style={styles.currentDesc}>
                        {dailyWeather.dt_txt.substring(11, 16)}
                        {'  '}/{'  '}
                        {dailyWeather.weather[0].description}
                      </Text>
                      {/* END description */}

                      {/* START wind and humidity */}
                      <View style={styles.currentWindHumWrap}>
                        {/* START wind speed */}
                        <View style={styles.currentWindWrap}>
                          <Image
                            style={styles.currentIconSmall}
                            source={WindSpeed}
                            resizeMode='contain'
                          />
                          <Text style={styles.currentDetails}>
                            {'  '}
                            {Math.round(dailyWeather.wind.speed)} km/h
                          </Text>
                        </View>
                        {/* END wind speed */}

                        {/* START humidity */}
                        <View style={styles.currentHumWrap}>
                          <Image
                            style={styles.currentIconSmall}
                            source={Humidity}
                            resizeMode='contain'
                          />
                          <Text style={styles.currentDetails}>
                            {'  '}
                            {dailyWeather.main.humidity}%
                          </Text>
                        </View>
                        {/* END humidity */}
                      </View>
                      {/* END wind and humidity */}
                    </CollapseBody>
                  </Collapse>
                </View>
                // END week display
              );
            })}
            {/* END map */}
          </View>
        </ScrollView>
      </View>
    );
  }
  // END week render
}
// END week

export default Week;
