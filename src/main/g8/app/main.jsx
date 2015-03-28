var React = require('react'),
    ReactRouter = require('react-router'),
    Routes = require('./routes.jsx');

Promise.allProps = function(f) {
  if (f instanceof Promise) {
    return f;
  } else if (Array.isArray(f)) {
    return Promise.all(f);
  } else if (typeof f == 'object') {
    var keys = [];
    var valueFutures = [];
    for (key in f) {
      if (f.hasOwnProperty(key)) {
        keys.push(key);
        valueFutures.push(f[key]);
      }
    }
    return Promise.all(valueFutures).then(values => {
      var result = {};
      for (var i = 0, l = keys.length; i < l; i++) {
        result[keys[i]] = values[i];
      }
      return result;
    });
  } else {
    throw new Error('Not supported');
  }
};

var fetchData = function (routes, params) {
  var data = {};
  var fetch = routes
    .filter(r => r.handler.fetchData)
    .map(r => Promise.allProps(r.handler.fetchData(params)).then(d => data[r.name] = d));

  return Promise.all(fetch).then(() => data);
};

ReactRouter.run(Routes, ReactRouter.HistoryLocation, function (Handler, state) {
  fetchData(state.routes, state.params).then((data) => {
    React.render(<Handler params={state.params} data={data}/>, document.body);
  });
});
