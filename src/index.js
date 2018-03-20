import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './application.css';
import App from './app/App';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.responseType = 'json';

ReactDOM.render(<App store={store({}, true)} />, document.getElementById('root'));
registerServiceWorker();
