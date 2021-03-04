import 'babel-polyfill';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { ErrorPage } from '@edx/frontend-platform/react';
import React from 'react';
import Provider from 'react-redux';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

// import appMessages from './i18n';
import { DashboardPage } from './containers/DashboardPage';
import store from './data/store';
import './index.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <DashboardPage />
      <Footer />
    </Router>
  </Provider>
);
subscribe(APP_READY, () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
});
