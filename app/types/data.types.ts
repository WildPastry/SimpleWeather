export interface IData {
  weather: IWeather;
  loading: boolean;
  error: IError;
}

export interface IWeather {
  temp: number;
  high: number;
  low: number;
  id: number;
  desc: string;
  humidity: string;
  wind: number;
  icon: string;
  sunset: string;
  sunrise: string;
  feelsLike: number;
  hourly: IHourly[];
  daily: string;
}

export interface IHourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: IHourlyWeather[];
  pop: number;
}

export interface IHourlyWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IError {
  errorMessage?: string;
  errorState: boolean;
}
