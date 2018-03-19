import React from 'react';
import ReactDOM from 'react-dom';
import './application.css';
import App from './app/App';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App store={store({}, true)} />, document.getElementById('root'));
registerServiceWorker();
