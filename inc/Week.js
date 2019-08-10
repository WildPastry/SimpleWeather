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
    // set current weather icon based on weather
    return (
      <View style={styles.weekWrap}>
        <ScrollView>
          {/* weekly weather heading and description */}
          <Text style={styles.weekHeading}>7 Day forecast</Text>
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

              // set up colour bg variable
              let colourBg;

              // weather else if logic
              if (dailyWeather.icon === 'cloudy') {
                dailyWeatherDisplay = IconCloudy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'partly-cloudy-day') {
                dailyWeatherDisplay = IconPartlyCloudy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'fog') {
                dailyWeatherDisplay = IconFoggy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'rain') {
                dailyWeatherDisplay = IconRainy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'snow') {
                dailyWeatherDisplay = IconSnowy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'clear-day') {
                dailyWeatherDisplay = IconSunny;
                colourBg = '#ff6666';
              } else if (dailyWeather.icon === 'wind') {
                dailyWeatherDisplay = IconWindy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'sleet') {
                dailyWeatherDisplay = IconSnowy;
                colourBg = '#5e7596';
              } else if (dailyWeather.icon === 'clear-night') {
                dailyWeatherDisplay = IconSunny;
                colourBg = '#5e7596';
              } else {
                dailyWeatherDisplay = IconPartlyCloudy;
                colourBg = '#5e7596';
              }
              return (
                // START week display
                <View key={dailyWeather.time}>
                  <Collapse
                    style={{
                      backgroundColor: colourBg,
                      marginTop: 3,
                      marginBottom: 3,
                      padding: 10
                    }}
                  >
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

                    <CollapseBody>
                      {/* <View style={styles.weekFullWrap}> */}
                      <Text style={styles.weekText}>
                        {dailyWeather.summary}
                      </Text>
                      {/* </View> */}
                      <Text style={styles.weekText}>
                        Wind Speed: {dailyWeather.windSpeed} km/ph
                      </Text>
                      <Text style={styles.weekTextBot}>
                        Humidity: {percentage.substring(2)}%
                      </Text>
                      {/* <View style={styles.weekIconTempWrap}>
                    <View style={styles.weekFullWrap}>
                      <Text style={styles.weekText}>
                        Wind Speed: {dailyWeather.windSpeed} km/ph
                      </Text>
                    </View>
                    <View style={styles.weekFullWrap}>
                      <Text style={styles.weekText}>
                        Humidity: {dailyWeather.humidity}%
                      </Text>
                    </View>
                  </View> */}
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
