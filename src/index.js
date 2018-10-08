import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './app/App';
import './application.css';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.responseType = 'json';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
