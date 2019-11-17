export interface Location {
  lat?: number;
  long?: number;
}

export interface Forecast {
  humidity: number;
  location?: Location;
  temperature: number;
  windSpeed: number;
}
