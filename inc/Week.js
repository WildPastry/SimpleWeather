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

// moment set up
var moment = require('moment');

// stylesheet
var styles = require('../styles.js');

// START week
class Week extends React.Component {
  // START week render
  render() {
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
          <View>
            {/* START map */}
            {this.props.weather.slice(1).map((dailyWeather) => {
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
                              fontFamily: 'weatherFont',
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
                            {Math.round(dailyWeather.main.temp_min)}°
                          </Text>
                        </View>
                        {/* daily high temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekHighTemp}>
                            {Math.round(dailyWeather.main.temp_max)}°
                          </Text>
                        </View>
                      </View>
                    </CollapseHeader>

                    {/* collapse body */}
                    <CollapseBody>
                      {/* START description */}
                      <Text style={styles.currentDesc}>
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
