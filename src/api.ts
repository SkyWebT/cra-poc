import axios from 'axios';

const instance = axios.create({ baseURL: '' });

const auth = {
  login: async (payload: { name: string; pwd: string }) => {
    // you call your real backend here.
    // const { data } = await instance.post('/login', payload);
    // return data;

    
    return Promise.resolve({
        code:'ok',
        token:'jwt token here'
    })

  },
};
export default {auth};
