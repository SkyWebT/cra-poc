import axios from 'axios';

import Auth from './auth';
import history from './history';
import { T_AUTH_RESP, T_Device, T_Occurrence, T_Profile } from './types';

const proxy = 'https://thankful-newt.glitch.me/';

const instance = axios.create({ baseURL: proxy });
instance.interceptors.request.use(config => {
  config.headers['Sky-X-Forwarded-for'] = 'test';
  if (Auth.isAuthenticated) {
    config.headers['Sky-X-Access-Token'] = Auth.token;
  }
  return config;
});

instance.interceptors.response.use(
  resp => resp,
  err => {
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      Auth.reset();
      history.push('/login');
    }
    return Promise.reject(err);
  }
);

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
    const { data } = await instance.get<T_Profile>(
      `/users/v1/${profileId}?appName=awsTest`
    );
    return data;
  },
  devices: async () => {
    const { data } = await instance.get<{ data: T_Device[] }>(
      `/devices/v1?product=skygo`
    );
    return data.data;
  },
  occurrences: async () => {
    const { data } = await instance.get<{ occurrences: T_Occurrence[] }>(
      `/occurrences/v1`
    );
    return data.occurrences;
  },
  subscription: async () => {
    const { data } = await instance.get(
      `/entitlements/v2/onlineSubscriptions?profileId=whatever`
    );
    return data;
  },
  entitlements: async () => {
    const { data } = await instance.get(`/entitlements/v2`);
    return data;
  },
};

export default { auth, user };
