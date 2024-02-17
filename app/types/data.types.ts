export interface IData {
  error: IError;
  loading: boolean;
  location: ILocation;
  weather: IWeather;
}

export interface ILocation {
  coords: ICoords;
  mocked: boolean;
  timestamp: number;
}

export interface ICoords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: string;
  longitude: string;
  speed: number;
}

export interface IWeather {
  daily: IDaily[];
  desc: string;
  feelsLike: number;
  high: number;
  hourly: IHourly[];
  humidity: number;
  icon: string;
  id: number;
  low: number;
  sunrise: number;
  sunset: number;
  temp: number;
  wind: number;
}

export interface IDaily {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: IDailyFeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  summary: number;
  sunrise: number;
  sunset: number;
  temp: IDailyTemp;
  uvi: number;
  weather: IWeatherDetails;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface IDailyTemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface IDailyFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface IHourly {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: IWeatherDetails[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface IWeatherDetails {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IError {
  errorMessage?: string;
  errorState: boolean;
}

export interface IWeatherBg {
  weatherBg: string;
  weatherBgDark: string;
  weatherBgDarkest: string;
}
