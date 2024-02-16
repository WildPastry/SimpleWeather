export interface IData {
  error: IError;
  loading: boolean;
  weather: IWeather;
}

export interface IWeather {
  daily: string;
  desc: string;
  feelsLike: number;
  high: number;
  hourly: IHourly[];
  humidity: string;
  icon: string;
  id: number;
  low: number;
  sunrise: string;
  sunset: string;
  temp: number;
  wind: number;
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
  weather: IHourlyWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface IHourlyWeather {
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
