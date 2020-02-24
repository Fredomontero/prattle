import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";

import { IntlProvider } from "react-intl"
import Spanish from "./languages/es.json";
import English from "./languages/en.json";
import Portuguese from "./languages/por.json";

const local = navigator.language;
let lang;

if(local === "en-US"){
    lang = English;
}else{
    lang = Spanish;
}

ReactDOM.render(
    <IntlProvider locale={local} messages={Portuguese}>
        <Provider store={store}>
            <App />
        </Provider>
    </IntlProvider>, 
    document.getElementById('root')
);

