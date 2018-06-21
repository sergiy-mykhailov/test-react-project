
import Axios from 'axios';
import QueryString from 'querystring';
import { API_SERVICE_URL } from '../constants';

export default class api {
  static get = (url, data = null) => {
    const param = (data) ? `?${QueryString.encode(data)}` : '';
    const path = `${API_SERVICE_URL}/${url}${param}`;

    return new Promise((resolve, reject) => {
      const onSuccess = response => resolve(response);
      const onError = (response) => {
        console.error('Could not connect to api', response);
        return reject(response);
      };

      // getTestData(path).then(onSuccess).catch(onError);
      Axios.get(path).then(onSuccess).catch(onError);
    });
  };
}
