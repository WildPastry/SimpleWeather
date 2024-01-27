export interface IData {
  weather: IWeather;
  loading: boolean;
  error: boolean;
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
