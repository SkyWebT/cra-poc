import { action, autorun, computed, observable, runInAction } from 'mobx';

class AuthStore {
  constructor() {
    // read
    for (let key in this.values) {
      this.values[key] = localStorage.getItem(key) || '';
    }
    // write
    autorun(
      () => {
        for (let key in this.values) {
          localStorage.setItem(key, this.values[key]);
        }
      },
      {
        delay: 100,
      }
    );
  }
  @observable values: { [index: string]: string } = {
    token: '',
    profileId: '',
  };

  set token(token: string) {
    runInAction(() => {
      this.values.token = token;
    });
  }
  set profileId(profileId: string) {
    runInAction(() => {
      this.values.profileId = profileId;
    });
  }
  get token() {
    return this.values.token;
  }
  get profileId() {
    return this.values.profileId;
  }
  @computed get isAuthenticated() {
    const token = this.values.token;
    return token && token.length > 0;
  }
  @action reset() {
    this.values = {
      token: '',
      profileId: '',
    };
  }
}

const authStore = new AuthStore();
export default authStore;
