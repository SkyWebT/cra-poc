import axios from 'axios';

import { T_AUTH_RESP } from './types';

// const baseURL1 = 'https://my4qgjt3z4.execute-api.ap-southeast-2.amazonaws.com/prod/auth/skygo/token/v1/'
const baseURL2 = 'https://stupendous-scilla.glitch.me/';
// const baseURL3 = 'https://981ht5pcch.execute-api.ap-southeast-2.amazonaws.com/prod/auth/skygo/token/v1'

// const baseURL4 = 'https://981ht5pcch.execute-api.ap-southeast-2.amazonaws.com/iop/auth/skygo/token/v1'
const instance = axios.create({ baseURL: baseURL2 });
instance.interceptors.request.use(config => {
  console.log(config.method);
  config.headers['Sky-X-Forwarded-for'] = 'test';
  return config;
});
const auth = {
  login: async (payload: { username: string; password: string }) => {
    const { data } = await instance.post<T_AUTH_RESP>(
      '/authenticate',
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
export default { auth };
