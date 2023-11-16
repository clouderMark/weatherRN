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
export interface Weather {
  coord: Coord;
  weather: WeatherElement[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: {[key: string]: number};
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
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
