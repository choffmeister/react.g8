var RestClient = {};

var request = function (method, url, payload) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        switch (xhr.status) {
          case 200:
            try {
              result = JSON.parse(xhr.responseText);
              resolve(result);
            } catch (ex) {
              reject(ex);
            }
            break;
          default:
            reject(new Error(xhr.statusText));
            break;
        }
      }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(payload));
  });
};

// override actual implementation with mock
request = require('./RestClientMock');

RestClient.get = function(url) {
  return request('GET', url, null);
};

RestClient.post = function(url, payload) {
  return request('POST', url, payload);
};

RestClient.put = function(url, payload) {
  return request('PUT', url, payload);
};

RestClient.del = function(url) {
  return request('DELETE', url);
};

module.exports = RestClient;
