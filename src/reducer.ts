import { combineReducers } from 'redux';
import { createSelector, createSlice, PayloadAction } from 'redux-starter-kit';

const initialState = {};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    getOptions() {},
  },
});

const { reducer: appReducer } = appSlice;

export default combineReducers({ app: appReducer });
