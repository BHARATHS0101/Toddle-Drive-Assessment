import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../src/components/home';

import {Provider} from 'react-redux';
import Store from './redux/store';

import './index.css';

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Home/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
