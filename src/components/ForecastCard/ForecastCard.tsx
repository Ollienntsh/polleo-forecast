import React from 'react';
import { Card, Col, Icon, Row, Tag } from 'antd';

export interface ForecastCardProps {
  city: string;
  temperature: number;
}

export default ({ city, temperature }: ForecastCardProps) => (
  <Card
    title={
      <span>
        <Icon type="cloud" /> {city}
      </span>
    }
  >
    <Row>
      <Col span={12}>Temperature</Col>
      <Col span={12}>
        <Tag color="red">{temperature}</Tag>
      </Col>
    </Row>
  </Card>
);
