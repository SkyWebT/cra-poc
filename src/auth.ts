let KEY = 'token';

let token_ = localStorage.getItem(KEY);
const Auth = {
  get token() {
    return token_ || '';
  },
  set token(token: string) {
    token_ = token;
    localStorage.setItem(KEY, token);
  },
  get isAuthenticated() {
    const token = this.token;
    return token && token.length > 0;
  },
  reset(){
      this.token = ''
  }
};

export default Auth;
