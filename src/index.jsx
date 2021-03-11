import 'babel-polyfill';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import React from 'react';
import { IntlProvider }from '@edx/frontend-platform/node_modules/react-intl';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

// import appMessages from './i18n';
import DashboardPage from './containers/DashboardPage';
import store from './data/store';
import './index.scss';

const App = () => (
  <IntlProvider locale="en">
    <Provider store={store}>
      <Header />
      <DashboardPage />
      <Footer />
    </Provider>
  </IntlProvider>
);
subscribe(APP_READY, () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
/*
subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});
*/
initialize({
  messages: [
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
});
