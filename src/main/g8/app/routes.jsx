var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    Redirect = ReactRouter.Redirect;

var App = require('./views/App.jsx'),
    Home = require('./views/Home.jsx');

module.exports = (
  <Route name="app" handler={App} path="/">
    <Route name="home" handler={Home} path="/"/>
  </Route>
);
