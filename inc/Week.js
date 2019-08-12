// imports
import React from 'react';

// default component functions
import { Image, Text, SafeAreaView, ScrollView, View } from 'react-native';

// weather icons
import IconCloudy from './../assets/weather/cloudy.png';
import IconPartlyCloudy from './../assets/weather/partlycloudy.png';
import IconFoggy from './../assets/weather/foggy.png';
import IconRainy from './../assets/weather/rainy.png';
import IconSnowy from './../assets/weather/snowy.png';
import IconSunny from './../assets/weather/sunny.png';
import IconWindy from './../assets/weather/windy.png';
import WindSpeed from './../assets/weather/windSpeed.png';
import Humidity from './../assets/weather/humidity.png';

// accordian
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native';

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
        }}
      >
        <ScrollView>
          {/* weekly weather heading and description */}
          <Text style={styles.weekHeading}>5 Day forecast</Text>
          <Text style={styles.weekDesc}>{this.props.summary}</Text>
          <View>
            {/* START map */}
            {this.props.weather.slice(1).map(dailyWeather => {
              // set up date constants
              var today = moment.unix(dailyWeather.time);
              var day = moment(today).format('ddd');

              // set up humidity percentage
              var toFixed = dailyWeather.humidity.toFixed(2);
              var percentage = toFixed.toString();

              // set up weather display variable
              let dailyWeatherDisplay;

              // weather else if logic
              if (dailyWeather.icon === 'cloudy') {
                dailyWeatherDisplay = IconCloudy;
                // colourBg = colours.scatteredClouds;
              } else if (dailyWeather.icon === 'partly-cloudy-day') {
                dailyWeatherDisplay = IconPartlyCloudy;
                // colourBg = colours.fewClouds;
              } else if (dailyWeather.icon === 'fog') {
                dailyWeatherDisplay = IconFoggy;
                // colourBg = colours.mist;
              } else if (dailyWeather.icon === 'rain') {
                dailyWeatherDisplay = IconRainy;
                // colourBg = colours.rain;
              } else if (dailyWeather.icon === 'snow') {
                dailyWeatherDisplay = IconSnowy;
                // colourBg = colours.snow;
              } else if (dailyWeather.icon === 'clear-day') {
                dailyWeatherDisplay = IconSunny;
                // colourBg = colours.clearSky;
              } else if (dailyWeather.icon === 'wind') {
                dailyWeatherDisplay = IconWindy;
                // colourBg = colours.mist;
              } else if (dailyWeather.icon === 'sleet') {
                dailyWeatherDisplay = IconSnowy;
                // colourBg = colours.snow;
              } else if (dailyWeather.icon === 'clear-night') {
                dailyWeatherDisplay = IconSunny;
                // colourBg = colours.night;
              } else {
                dailyWeatherDisplay = IconPartlyCloudy;
                // colourBg = colours.fewClouds;
              }
              return (
                // START week display
                <View key={dailyWeather.time}>
                  <Collapse
                    style={{
                      backgroundColor: colourBarBg,
                      marginTop: 3,
                      marginBottom: 3,
                      padding: 10
                    }}
                  >
                    {/* collapse header */}
                    <CollapseHeader>
                      <View style={styles.weekIconTempWrap}>
                        {/* day */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekText}>{day}</Text>
                        </View>
                        {/* daily icon */}
                        <View style={styles.weekColWrap}>
                          <Image
                            style={styles.weekIcon}
                            source={dailyWeatherDisplay}
                            resizeMode="contain"
                          />
                        </View>
                        {/* daily low temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekLowTemp}>
                            {Math.round(dailyWeather.temperatureLow)}°
                          </Text>
                        </View>
                        {/* daily high temp */}
                        <View style={styles.weekColWrap}>
                          <Text style={styles.weekHighTemp}>
                            {Math.round(dailyWeather.temperatureHigh)}°
                          </Text>
                        </View>
                      </View>
                    </CollapseHeader>

                    {/* collapse body */}
                    <CollapseBody>
                      {/* START description */}
                      <Text style={styles.currentDesc}>
                        {dailyWeather.summary}
                      </Text>
                      {/* END description */}

                      {/* START wind and humidity */}
                      <View style={styles.currentWindHumWrap}>
                        {/* START wind speed */}
                        <View style={styles.currentWindWrap}>
                          <Image
                            style={styles.currentIconSmall}
                            source={WindSpeed}
                            resizeMode="contain"
                          />
                          <Text style={styles.currentDetails}>
                            {'  '}
                            {Math.round(dailyWeather.windSpeed)} km/h
                          </Text>
                        </View>
                        {/* END wind speed */}

                        {/* START humidity */}
                        <View style={styles.currentHumWrap}>
                          <Image
                            style={styles.currentIconSmall}
                            source={Humidity}
                            resizeMode="contain"
                          />
                          <Text style={styles.currentDetails}>
                            {'  '}
                            {percentage.substring(2)}%
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
