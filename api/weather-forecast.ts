import { NowRequest, NowResponse } from '@now/node';

const ipapi = require('ipapi.co');

const yrno = require('yr.no-forecast')({
  version: '1.9',
  request: {
    timeout: 15000,
  },
});

interface IpLocation {
  latitude: number;
  longitude: number;
}

const getWeather = (lat: number, lon: number, res: NowResponse) => {
  yrno.getWeather({ lat, lon }).then((weather: any) => {
    weather.getFiveDaySummary().then((data: any) =>
      res.json({
        location: { lat, long: lon },
        forecast: data,
      }),
    );
  });
};

export default (req: NowRequest, res: NowResponse) => {
  try {
    const { lat, long } = req.query as any;

    if (lat && long) {
      getWeather(lat, long, res);
    } else {
      ipapi.location(({ latitude, longitude }: IpLocation) => {
        getWeather(latitude, longitude, res);
      });
    }
  } catch (e) {
    res.json(e.message);
  }
};
