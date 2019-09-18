import { action, autorun, computed, observable } from 'mobx';

class Auth {
  constructor() {
    // read
    for (let key in this.values) {
      this.values[key] = localStorage.getItem(key) || '';
    }
    // write
    autorun(() => {
      for (let key in this.values) {
        localStorage.setItem(key, this.values[key]);
      }
    },{
      delay:100
    });
  }
  @observable values: { [index: string]: string } = {
    token: '',
    profileId: '',
  };

  set token(token: string) {
    this.values.token = token;
  }
  set profileId(profileId: string) {
    this.values.profileId = profileId;
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
export default new Auth();
