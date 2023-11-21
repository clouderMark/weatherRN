export type TPosition = {
  latitude: number;
  longitude: number;
};

// That is customization error for rtk
export type ICustomError = {
  data: {
    message: string;
  };
  status: number;
};

// That is interface for data which get from wheater api
export interface IWeather {
  cod: string;
  message: number;
  cnt: number;
  list: IList[];
  city: ICity;
}

export interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ICoord {
  lat: number;
  lon: number;
}

export interface IList {
  dt: number;
  main: IMain;
  weather: IWeatherElement[];
  clouds: IClouds;
  wind: IWind;
  visibility: number;
  pop: number;
  rain?: IRain;
  sys: ISys;
  dt_txt: Date;
}

export interface IClouds {
  all: number;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface IRain {
  [key: string]: number;
}

export interface ISys {
  pod: string;
}

export interface IWeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

// position from city name

export interface Welcome {
  name: string;
  local_names?: {[key: string]: string};
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export enum ELang {
  RU = 'ru',
}
