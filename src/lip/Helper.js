import * as React from 'react';
// import { Alert, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
import Config from './config';
// import DeviceInfo from 'react-native-device-info';

export default class Helper extends React.Component {
  static UserData = '';
  static async makeRequest({ url, data, method }) {
    let finalUrl = Config.baseurl + url;

    let form;
    let methodnew;
    let token =  localStorage.getItem('token');
    console.log(finalUrl, '++++++++++++finalUrl');
    console.log(data, '++++++++++++data');
    console.log(token, '++++++++++++tokentoken');

    let varheaders;
    if (method == 'POSTUPLOAD') {
      methodnew = 'POST';
      varheaders = {
        Authorization: token
      };
      form = data;
    } else if (method == 'POST') {
      methodnew = 'POST';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
      form = JSON.stringify(data);
    }
    else if (method == 'DELETE') {
      methodnew = 'DELETE';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
    }
    else if (method === 'GET') {
      methodnew = 'GET';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
    } else if (method === 'PUT') {
      methodnew = 'PUT';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
      form = JSON.stringify(data);
      console.log('form =======+++++++++++++', form)
    }
    return fetch(finalUrl, {
      body: form,
      method: methodnew,
      headers: varheaders,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch((error, a) => {
        console.log('API_ERROR', error);
      });
  }
}
