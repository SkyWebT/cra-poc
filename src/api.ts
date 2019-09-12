import axios from 'axios';

const baseURL1 = 'https://my4qgjt3z4.execute-api.ap-southeast-2.amazonaws.com/prod/auth/skygo/token/v1/'
// const baseURL2 = 'https://stupendous-scilla.glitch.me/api/'
const instance = axios.create({ baseURL: baseURL1});
instance.interceptors.request.use(config => {
  config.headers['Sky-X-Forwarded-for'] = 'test';

  return config;
});
const auth = {
  login: async (payload: { username: string; password: string }) => {
    // you call your real backend here.
    const { data } = await instance.post('/authenticate', {
      ...payload,
      deviceDetails: 'test',
      deviceID: 'pvt-test',
      deviceIP: '127.0.0.1',
    });
    return data;

    // return Promise.resolve({
    //     code:'ok',
    //     token:'jwt token here'
    // })
  },
};
export default { auth };
