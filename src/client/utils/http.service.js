import axios from 'axios';
import CONFIG from './config';

const REQUEST = config => {
  const HTTP = axios.create({
    baseURL: CONFIG.API.url,
  });

  // for request
  HTTP.interceptors.request.use(request => {
    request.url = {};
    request.headers = {};

    // url
    request.url = request.baseURL + config.url;

    // header
    request.headers = {
      'content-type': 'application/json',
    };

    request.data = config.data;
    request.method = config.method;

    return request;
  });

  // for response
  HTTP.interceptors.response.use(
    response => {
      if (response?.status === 200 || response?.status === 201) {
        return response;
      }
    },
    error => {
      if (error?.response?.status === 401 || error?.response?.status === 302) {
        return { data: { status: false, message: 'Session Expire', statusCode: 401 } };
      }
      if (
        error?.response?.status === 400 ||
        error?.response?.status === 404 ||
        error?.response?.status === 412 ||
        error?.response?.status === 500 ||
        error?.response?.status === 422 ||
        error?.response?.status === 428 ||
        error?.response?.status === 403 ||
        error?.response?.status === 406
      ) {
        return (
          error?.response || { data: { status: false, message: 'Something went wrong', data: {} } }
        );
      }
    },
  );
  return HTTP();
};

export default REQUEST;
