/**
 * Created by Administrator on 2017-12-27.
 */
const axios = require("axios");
const StorageKey = '@token';
import AsyncStorage from '@react-native-community/async-storage';
// Save an authentacition token
function saveAuth(type: string, token: string, uid: string) {
  let authConfig = type + ":" + token;
  AsyncStorage.setItem("auth", authConfig);
  AsyncStorage.setItem("token", type + " " + token);  
  setAuth(type, token);
}

// Remove authorization token
function dropAuth() {
  AsyncStorage.removeItem("auth");
  AsyncStorage.removeItem("token");
  setAjax(null);
}

// Set an anthorization token
function setAuth(type: string, token: string) {
  let authString = type + " " + token;
  setAjax(authString);
}

// Set Authorization header for authentication
function setAjax(authString: string | null) {
  axios.defaults.headers.Authorization = authString;
}

async function  getAuthString() {  
  return await AsyncStorage.getItem("token");
}

export {saveAuth, dropAuth, getAuthString};
