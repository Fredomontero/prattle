import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";

import { IntlWrapper } from './components/IntlWrapper/IntlWrapper.component';

ReactDOM.render(
    <IntlWrapper>
        <Provider store={store}>
            <App />
        </Provider>
    </IntlWrapper>, 
    document.getElementById('root')
);

