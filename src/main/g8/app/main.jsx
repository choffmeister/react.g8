var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    Redirect = ReactRouter.Redirect,
    Bluebird = require('bluebird'),
    extend = require('extend');

var App = require('./views/App.jsx'),
    Home = require('./views/Home.jsx');

var routes = (
  <Route name="app" handler={App} path="/">
    <Route name="home" handler={Home} path="/"/>
  </Route>
);

var fetchData = function (routes, params) {
  var fetches = routes
    .filter(r => r.handler.fetchData)
    .map(r => Bluebird.props(r.handler.fetchData(params)));

  return Bluebird.reduce(fetches, (data, fetch) => extend(data, fetch), {});
};

ReactRouter.run(routes, function (Handler, state) {
  fetchData(state.routes, state.params).then((data) => {
    React.render(<Handler data={data}/>, document.body);
  });
});
