import axios from 'axios';

import Auth from './auth';
import { T_AUTH_RESP, T_Profile } from './types';

const proxy = 'https://thankful-newt.glitch.me/';

const instance = axios.create({ baseURL: proxy });
instance.interceptors.request.use(config => {
  console.log(config.method);
  config.headers['Sky-X-Forwarded-for'] = 'test';
  if (Auth.isAuthenticated) {
    config.headers['Sky-X-Access-Token'] = Auth.token;
  }
  return config;
});
const auth = {
  login: async (payload: { username: string; password: string }) => {
    const { data } = await instance.post<T_AUTH_RESP>(
      '/auth/skygo/token/v1/authenticate',
      {
        ...payload,
        deviceDetails: 'test',
        deviceID: 'pvt-test',
        deviceIP: '127.0.0.1',
      },
      {}
    );
    return data;
  },
};
const user = {
  profile: async (profileId: string) => {
    const { data } = await instance.get<T_Profile>(`/users/v1/${profileId}?appName=awsTest`);
    return data;
  },
};

export default { auth, user };
