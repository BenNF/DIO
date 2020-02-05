import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import configAndCreateStore from "./store/store"
import App from './App';

const store = configAndCreateStore()
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
 document.getElementById('root'));
