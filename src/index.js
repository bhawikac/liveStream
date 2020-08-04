import 'react-app-polyfill/ie11';
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./AppWrapper";
import registerServiceWorker from "./registerServiceWorker";
import { IntlProvider, addLocaleData } from "react-intl";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import locale_en from "react-intl/locale-data/en";
import locale_de from "react-intl/locale-data/de";
import { flattenMessages } from "./utils/flattenMessages";
import onDemandClassesReducer from "./store/reducers/ondemand";
import authReducer from "./store/reducers/auth";
import workoutReducer from "./store/reducers/workout";
import subscriptionReducer from "./store/reducers/subscription";
import clientSettingsReducer from "./store/reducers/clientSettings";
import {
  GetSubdomainData,
  GetTranslationData,
  checkLocalStorage,
  GetConfigData
} from "./store/actions/ClientSettings";
import WebFont from "webfontloader";
import Localytics from "./Localytics";
import UnsupportedBrowser from "./components/UnsupportedBrowser";

const config = require('./assets/config.json')

registerServiceWorker();

addLocaleData([...locale_en, ...locale_de]);
checkLocalStorage();
var clientData = GetConfigData();
const language = clientData.language;
const message = GetTranslationData(clientData.name, language);
var title = clientData.appTitle;
document.getElementById("title").innerHTML = title;

var style = document.createElement("style");
style.innerHTML = `.vjs-play-progress , .vjs-volume-level    {background-color: ${localStorage.getItem(
  "clientcolor"
)} !important;}`;
style.innerHTML = `.dynamiclinks   {color: ${localStorage.getItem(
  "clientcolor"
)} !important;}`;

document.documentElement.style.setProperty('--main-primary-color', config.primaryColor);
document.documentElement.style.setProperty('--hover-secondary-color', config.secondaryColor);
document.documentElement.style.setProperty('--hover-color', config.accentColor);
document.documentElement.style.setProperty('--bg-theme-color', config.backgroundTheme);
document.documentElement.style.setProperty('--bar-color', config.barColor);


var ref = document.querySelector("script");
ref.parentNode.insertBefore(style, ref);
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ != undefined
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
    : null || compose;

const rootReducer = combineReducers({
  // orm:schema.reducer(),
  onDemand: onDemandClassesReducer,
  workout: workoutReducer,
  auth: authReducer,
  subscription: subscriptionReducer,
  client: clientSettingsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


/**
 * nikhil gupta
 * 22th june 2020
 * check for internet explorer
 * edge without chromium (Edge/)
 */
var ua = window.navigator.userAgent;
var isIE = /MSIE|Trident|Edge\//.test(ua);

const app = (

  isIE ? <UnsupportedBrowser /> : (
    <Provider store={store}>
      <IntlProvider
        locale={"en"}
        messages={flattenMessages(message[language])}
        defaultLocale="en"
        defaultMessages={flattenMessages(message["en"])}
      >
        <App />
      </IntlProvider>
    </Provider>)

);

ReactDOM.render(app, document.getElementById("root"));


