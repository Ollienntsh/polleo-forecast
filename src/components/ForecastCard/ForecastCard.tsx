import React from 'react';
import { Card, Col, Icon, Row, Tag } from 'antd';

import { Forecast } from '../../types';

export interface ForecastCardProps extends Partial<Forecast> {
  highlightedValues: (keyof Omit<Forecast, 'location'>)[];
}

export default ({
  highlightedValues,
  humidity,
  location,
  temperature,
  windSpeed,
}: ForecastCardProps) => (
  <Card
    title={
      <span>
        <Icon type="cloud" />{' '}
        {(location && `${location.lat}, ${location.long}`) || 'Unknown'}
      </span>
    }
  >
    <Row>
      <Col span={12}>Temperature</Col>
      <Col span={12}>
        <Tag
          color={highlightedValues.includes('temperature') ? 'red' : undefined}
        >
          {temperature || '-'}
        </Tag>
      </Col>
    </Row>
    <Row>
      <Col span={12}>Humidity</Col>
      <Col span={12}>
        <Tag color={highlightedValues.includes('humidity') ? 'red' : undefined}>
          {humidity || '-'}%
        </Tag>
      </Col>
    </Row>
    <Row>
      <Col span={12}>Wind Speed</Col>
      <Col span={12}>
        <Tag
          color={highlightedValues.includes('windSpeed') ? 'red' : undefined}
        >
          {windSpeed || '-'} mps
        </Tag>
      </Col>
    </Row>
  </Card>
);
