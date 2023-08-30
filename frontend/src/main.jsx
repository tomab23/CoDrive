import './app/assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './app/redux-store/store';

import App from './app/App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
