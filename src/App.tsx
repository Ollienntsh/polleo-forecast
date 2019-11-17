import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Select } from 'antd';

import logo from './logo.svg';
import ForecastCard from './components/ForecastCard';

import './App.scss';

const { Option } = Select;

const options = [
  {
    id: 0,
    city: 'Zagreb',
  },
  { id: 1, city: 'Prague' },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
      </div>
      <div className="content">
        <Row gutter={20}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Select
                  allowClear
                  dropdownMatchSelectWidth={false}
                  placeholder="Search forecasts..."
                  showSearch
                  style={{ minWidth: 300, paddingBottom: 20 }}
                >
                  {options.map(({ id, city }) => (
                    <Option key={id}>{city}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ForecastCard city="Zagreb" temperature={20.21} />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Select
                  allowClear
                  dropdownMatchSelectWidth={false}
                  placeholder="Search forecasts..."
                  showSearch
                  style={{ minWidth: 300, paddingBottom: 20 }}
                >
                  {options.map(({ id, city }) => (
                    <Option key={id}>{city}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ForecastCard city="Prague" temperature={11.8} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
