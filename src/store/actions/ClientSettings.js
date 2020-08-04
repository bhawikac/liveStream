import * as actionTypes from "./actionTypes";
import { axios } from 'axios'
 
const reactAppStripeKey = process.env.REACT_APP_STRIPE_KEY;
const version = process.env.REACT_APP_VERSION;
export const checkLocalStorage = () => {
  try {
    var x = "_localstorage_test_" + Date.now();
    localStorage.setItem(x, x);
    var y = localStorage.getItem(x);
    localStorage.removeItem(x);
    if (x !== y) {
      throw new Error();
    } // check we get back what we stored
  } catch (e) {
    console.log("storage not working fine");
  }
};
export const GetConfigData = () => {
  let data = {};
  try {
    data = require("../../assets/config.json");
  } catch (e) {
    alert("Invalid url");
  }
  if (data != {}) {
    localStorage.setItem("clientId", data.name);
    console.log(`App Version ${version.toString()}`)
    if (localStorage.getItem("version") == null) {
      localStorage.setItem("version", version.toString());
    }

    localStorage.setItem("clientcolor", data.primaryColor);
    localStorage.setItem("clientStripeKey", reactAppStripeKey);
    localStorage.setItem("clientCurrency", data.currency);
    localStorage.setItem("isAccessCodeMandatory", data.AccessCodeMandatory);
    localStorage.setItem("barColor", data.barColor);
    localStorage.setItem("ClientDisplayName", data.ClientDisplayName);
  }
  return data;
  
};
export const GetSubdomainData = () => {
  let data = {};
  try {
    data = require("../../assets/config.json");
  } catch (e) {
    alert("Invalid url");
  }

  if (data != {}) {
    localStorage.setItem("clientId", data.name);
    localStorage.setItem("clientcolor", data.primaryColor);
    localStorage.setItem("clientStripeKey", reactAppStripeKey);
    localStorage.setItem("clientCurrency", data.currency);
    localStorage.setItem("isAccessCodeMandatory", data.AccessCodeMandatory);
    localStorage.setItem("barColor", data.barColor);
    localStorage.setItem("ClientDisplayName", data.ClientDisplayName);
  }
  return data;
  };

export const GetTranslationData = (Client, lang) => {
  let data = {};

  try {


    var enList = require(`../../assets/translations/${lang}.json`);
    data[lang] = enList;


  } catch (e) {
    console.log("Client translations not found");
  }
  return data;
};
