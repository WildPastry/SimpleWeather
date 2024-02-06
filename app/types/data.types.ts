export interface IData {
  weather: IWeather;
  loading: boolean;
  error: IError;
}

export interface IWeather {
  temp: number;
  high: number;
  low: number;
  openWeatherId: string;
  desc: string;
  humidity: string;
  wind: number;
  icon: string;
  sunset: string;
  sunrise: string;
  feelsLike: string;
  hourly: string;
  daily: string;
}

export interface IError {
  errorMessage?: string;
  errorState: boolean;
}
