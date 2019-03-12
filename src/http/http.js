import qs from 'qs';
import axios from 'axios';


/**
 * 封装axios的通用请求
 * @param  {string}   method     get\post\put\delete
 * @param  {string}   url       请求的接口URL
 * @param  {object}   param     传的参数，没有则传空对象
 */

// let url='http://9.bjletu.com';
//   let url='http://s9.bjletu.com';
// let url='http://ylou.bjletu.com';
 let url='http://x.zbxg123.com';
function http (method, url1, param) {
  param = param && typeof param === 'object' ? param : {};
  const config = {
    url: url+url1,
    method: method,
    transformRequest: [function (param) {
      return qs.stringify(param);
    }],
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // post请求时需要设定Content-Type
  if (method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.data = param;
  } else if (method === 'get') {
    config.params = param;
  }

  return axios(config);
}

function http1 (method, url1, param) {
  param = param && typeof param === 'object' ? param : {};
  const config = {
    url: url+url1,
    method: method,
    transformRequest: [function (param) {
      return qs.stringify(param);
    }],
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest'
    // }
  };

  // post请求时需要设定Content-Type
  if (method === 'post') {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.data = param;
  } else if (method === 'get') {
    config.params = param;
  }

  return axios(config);
}

export {
  http
};
