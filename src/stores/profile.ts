import { observable, runInAction } from 'mobx';

import api from '../api';
import { T_Profile } from '../types';
import Auth from './auth';

class Profile {
  @observable values?: T_Profile;

  async fetch() {
    const data = await api.user.profile.get(Auth.profileId);
    runInAction(() => {
      this.values = data;
    });
  }
  async update(payload: Partial<T_Profile>) {
    await api.user.profile.update(payload);
    runInAction(() => {
      this.values = { ...(this.values as T_Profile), ...payload };
    });
  }
}

export default new Profile();
