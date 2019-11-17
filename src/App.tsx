import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'antd';

import logo from './logo.svg';
import {
  getOtherWeatherForecast,
  getWeatherForecast,
  InitialState,
} from './reducer';

import './App.scss';
import ForecastSearch from './components/ForecastSearch';
import { Forecast } from './types';

interface AppActions {
  getOtherWeatherForecast: typeof getOtherWeatherForecast;
  getWeatherForecast: typeof getWeatherForecast;
}

const getHighlightedValues = (first?: Forecast, second?: Forecast) => {
  if (first && second) {
    let highlightedValues: (keyof Omit<Forecast, 'location'>)[] = [];

    if (first.humidity > second.humidity) highlightedValues.push('humidity');
    if (first.temperature > second.temperature)
      highlightedValues.push('temperature');
    if (first.windSpeed > second.windSpeed) highlightedValues.push('windSpeed');

    return highlightedValues;
  }

  return [];
};

const App: React.FC<InitialState & AppActions> = ({
  error,
  forecast,
  getOtherWeatherForecast,
  getWeatherForecast,
  isLoading,
  isLoadingOther,
  otherForecast,
}) => {
  useEffect(() => {
    getWeatherForecast({});
  }, [getWeatherForecast]);

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
      </div>
      <div className="content">
        {error ? (
          <Alert type="error" message="Error" closable description={error} />
        ) : null}
        <Row gutter={20}>
          <Col span={12}>
            <ForecastSearch
              forecast={forecast}
              highlightedValues={getHighlightedValues(forecast, otherForecast)}
              isLoading={isLoading}
              onSubmit={(latitude, longitude) =>
                getWeatherForecast({
                  lat: latitude,
                  long: longitude,
                })
              }
            />
          </Col>
          <Col span={12}>
            <ForecastSearch
              forecast={otherForecast}
              highlightedValues={getHighlightedValues(otherForecast, forecast)}
              isLoading={isLoadingOther}
              onSubmit={(latitude, longitude) =>
                getOtherWeatherForecast({
                  lat: latitude,
                  long: longitude,
                })
              }
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(
  (state: { app: InitialState }) => ({
    error: state.app.error,
    forecast: state.app.forecast,
    isLoading: state.app.isLoading,
    isLoadingOther: state.app.isLoadingOther,
    otherForecast: state.app.otherForecast,
  }),
  { getOtherWeatherForecast, getWeatherForecast },
)(App);
