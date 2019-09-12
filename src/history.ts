import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((location, action) => {
  // Google Analytics
  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }
});

export default history;