let token_ = localStorage.getItem('token');
let profileId_ = localStorage.getItem('profileId');
const Auth = {
  get token() {
    return token_ || '';
  },
  set token(token: string) {
    token_ = token;
    localStorage.setItem('token', token);
  },
  get profileId() {
    return profileId_ || '';
  },
  set profileId(profileId: string) {
    profileId_ = profileId;
    localStorage.setItem('profileId', profileId);
  },
  get isAuthenticated() {
    const token = this.token;
    return token && token.length > 0;
  },
  reset() {
    this.token = '';
    this.profileId = '';
  },
};

export default Auth;
