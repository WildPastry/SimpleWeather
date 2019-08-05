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
              var percentage = JSON.stringify(dailyWeather.humidity);

              // set up weather display variable
              let dailyWeatherDisplay;

              // weather else if logic
              if (dailyWeather.icon === 'cloudy') {
                dailyWeatherDisplay = IconCloudy;
              } else if (dailyWeather.icon === 'partly-cloudy-day') {
                dailyWeatherDisplay = IconPartlyCloudy;
              } else if (dailyWeather.icon === 'fog') {
                dailyWeatherDisplay = IconFoggy;
              } else if (dailyWeather.icon === 'rain') {
                dailyWeatherDisplay = IconRainy;
              } else if (dailyWeather.icon === 'snow') {
                dailyWeatherDisplay = IconSnowy;
              } else if (dailyWeather.icon === 'clear-day') {
                dailyWeatherDisplay = IconSunny;
              } else if (dailyWeather.icon === 'wind') {
                dailyWeatherDisplay = IconWindy;
              } else if (dailyWeather.icon === 'sleet') {
                dailyWeatherDisplay = IconSnowy;
              } else if (dailyWeather.icon === 'clear-night') {
                dailyWeatherDisplay = IconSunny;
              } else {
                dailyWeatherDisplay = IconPartlyCloudy;
              }
              return (
                // START week display
                <View key={dailyWeather.time}>
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

                  {/* <View style={styles.weekFullWrap}> */}
                  <Text style={styles.weekText}>{dailyWeather.summary}</Text>
                  {/* </View> */}
                  <Text style={styles.weekText}>
                    Wind Speed: {dailyWeather.windSpeed} km/ph
                  </Text>
                  <Text style={styles.weekTextBot}>
                    Humidity: {percentage.substring(2, 6)}%
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
