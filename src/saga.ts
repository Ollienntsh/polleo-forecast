import axios from 'axios';
import { all, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import queryString from 'query-string';

import {
  getOtherWeatherForecastFail,
  getOtherWeatherForecastSuccess,
  getWeatherForecastFail,
  getWeatherForecastSuccess,
} from './reducer';

import { Forecast, Location } from './types';

function* fetchWeatherForecast(lat?: number, long?: number) {
  const params = queryString.stringify({ lat, long });
  const response = yield axios.get(`/api/weather-forecast?${params}`);
  const { location, forecast } = response.data;
  const { temperature, humidity, windSpeed } = forecast[0];

  const weatherForecast: Forecast = {
    location: location,
    temperature: Number.parseFloat(temperature.value),
    humidity: Number.parseFloat(humidity.value),
    windSpeed: Number.parseFloat(windSpeed.mps),
  };

  return weatherForecast;
}

function* getWeatherForecast({
  payload: { lat, long },
}: PayloadAction<Location>) {
  try {
    const forecast: Forecast = yield fetchWeatherForecast(lat, long);

    yield put(getWeatherForecastSuccess(forecast));
  } catch (e) {
    yield put(getWeatherForecastFail(e.message));
  }
}

function* getOtherWeatherForecast({
  payload: { lat, long },
}: PayloadAction<Location>) {
  try {
    const forecast: Forecast = yield fetchWeatherForecast(lat, long);

    yield put(getOtherWeatherForecastSuccess(forecast));
  } catch (e) {
    yield put(getOtherWeatherForecastFail(e.message));
  }
}

function* watchForGetWeatherForecast() {
  yield takeEvery('app/getWeatherForecast', getWeatherForecast);
  yield takeEvery('app/getOtherWeatherForecast', getOtherWeatherForecast);
}

export default function* rootSaga() {
  yield all([watchForGetWeatherForecast()]);
}
