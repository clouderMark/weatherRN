export type TLocation = {
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

// That is interface for API Yandex geocoder https://yandex.ru/dev/geocode/doc/ru/response
export interface IWelcome {
  response: Response;
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GeoObjectCollection {
  metaDataProperty: GeoObjectCollectionMetaDataProperty;
  featureMember: FeatureMember[];
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObject {
  metaDataProperty: GeoObjectMetaDataProperty;
  description: string;
  name: string;
  boundedBy: BoundedBy;
  Point: Point;
}

export interface Point {
  pos: string;
}

export interface BoundedBy {
  Envelope: Envelope;
}

export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export interface GeoObjectMetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeocoderMetaData {
  kind: string;
  text: string;
  precision: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export interface Address {
  country_code: string;
  postal_code: string;
  formatted: string;
  Components: Component[];
}

export interface Component {
  kind: string;
  name: string;
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality: Locality;
}

export interface Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

export interface Thoroughfare {
  ThoroughfareName: string;
  Premise: Premise;
}

export interface Premise {
  PremiseNumber: string;
  PostalCode: PostalCode;
}

export interface PostalCode {
  PostalCodeNumber: string;
}

export interface GeoObjectCollectionMetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface GeocoderResponseMetaData {
  request: string;
  found: string;
  results: string;
}
