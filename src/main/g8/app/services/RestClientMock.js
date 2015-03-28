var Router = function () {
  var routes = [];

  var matchUrl = function (pattern, url) {
    var variableNames = [];
    var regex = new RegExp('^' + pattern.replace(/\{([^\}]+)\}/g, function (_, variableName) {
      variableNames.push(variableName);
      return '([^\\/]+)';
    }) + '\$');

    var match = url.match(regex);
    if (match) {
      var values = {};
      for (var i = 0, l = variableNames.length; i < l; i++) {
        values[variableNames[i]] = match[i + 1];
      }
      return values;
    }
    return null;
  };

  var addRoute = function (method, pattern, callback) {
    routes.push({
      method: method,
      pattern: pattern,
      callback: callback
    });
  };

  var handle = function (method, url, payload) {
    for (var i = 0, l = routes.length; i < l; i++) {
      if (routes[i].method == method) {
        var values = matchUrl(routes[i].pattern, url);
        if (values) {
          return routes[i].callback(values, payload);
        }
      }
    }

    return null;
  };

  return {
    addRoute: addRoute,
    handle: handle
  };
}


module.exports = function (method, url, payload) {
  var router = new Router();
  router.addRoute('GET', '/test', function () {
    return ['a', 'b'];
  });
  router.addRoute('GET', '/greet/{name}', function (values) {
    return { hello: values.name };
  });

  console.log(method + ' ' + url, payload);
  return new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      try {
        var result = router.handle(method, url, payload);
        if (result) {
          resolve(result);
        } else {
          reject('Not found');
        }
      } catch (ex) {
        reject('Internal server error');
      }
    }, 100);
  });
};
