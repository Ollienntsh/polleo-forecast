import React, { useCallback, useState } from 'react';
import { Button, Col, Row, InputNumber, Spin } from 'antd';

import ForecastCard from '../ForecastCard';
import { Forecast } from '../../types';

import './index.scss';

interface ForecastSearchProps {
  forecast?: Forecast;
  highlightedValues: (keyof Omit<Forecast, 'location'>)[];
  isLoading?: boolean;
  onSubmit(latitude: number, longitude: number): void;
}

export default ({
  forecast,
  highlightedValues,
  isLoading,
  onSubmit,
}: ForecastSearchProps) => {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const handleSubmit = useCallback(() => {
    if (latitude !== undefined && longitude !== undefined) {
      onSubmit(latitude, longitude);
    }
  }, [latitude, longitude, onSubmit]);

  return (
    <>
      <Row className="submit-section">
        <Col span={4}>
          <InputNumber
            max={90}
            min={-90}
            onChange={setLatitude}
            placeholder="Latitude"
            value={latitude}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            max={180}
            min={-180}
            onChange={setLongitude}
            placeholder="Longitude"
            value={longitude}
          />
        </Col>
        <Col span={4}>
          <Button onClick={handleSubmit}>Submit</Button>
        </Col>
        <Col span={12} />
      </Row>
      <Row>
        <Col className="forecast-card-container" span={24}>
          {isLoading ? <Spin className="spinner" size="large" /> : null}
          <ForecastCard {...forecast} highlightedValues={highlightedValues} />
        </Col>
      </Row>
    </>
  );
};
