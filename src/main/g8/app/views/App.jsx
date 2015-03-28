var React = require('react'),
    ReactRouter = require('react-router'),
    Navigation = require('../components/Navigation.jsx'),
    RestClient = require('../services/RestClient');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation brand="$name$"/>
        <div className="container">
          <ReactRouter.RouteHandler data={this.props.data}/>
        </div>
        <hr/>
        <div className="container">
          &copy; 2015 Your name here
        </div>
      </div>
    );
  }
});

module.exports = App;
