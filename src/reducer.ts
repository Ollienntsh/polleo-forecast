import { combineReducers } from 'redux';
import { createSlice, PayloadAction } from 'redux-starter-kit';

import { Forecast, Location } from './types';

export interface InitialState {
  forecast?: Forecast;
  error: string;
  isLoading?: boolean;
  isLoadingOther?: boolean;
  otherForecast?: Forecast;
}

const initialState: InitialState = {
  error: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getWeatherForecast(state, _: PayloadAction<Location>) {
      state.error = '';
      state.isLoading = true;
    },
    getWeatherForecastSuccess(state, { payload }: PayloadAction<Forecast>) {
      state.isLoading = false;
      state.forecast = payload;
    },
    getWeatherForecastFail(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
    getOtherWeatherForecast(state, _: PayloadAction<Location>) {
      state.error = '';
      state.isLoadingOther = true;
    },
    getOtherWeatherForecastSuccess(
      state,
      { payload }: PayloadAction<Forecast>,
    ) {
      state.isLoadingOther = false;
      state.otherForecast = payload;
    },
    getOtherWeatherForecastFail(state, { payload }: PayloadAction<string>) {
      state.isLoadingOther = false;
      state.error = payload;
    },
  },
});

const { actions, reducer: appReducer } = appSlice;

export const {
  getWeatherForecast,
  getWeatherForecastFail,
  getWeatherForecastSuccess,
  getOtherWeatherForecast,
  getOtherWeatherForecastFail,
  getOtherWeatherForecastSuccess,
} = actions;

export default combineReducers({ app: appReducer });
