var React = require('react'),
    RestClient = require('../services/RestClient');

var Home = React.createClass({
  statics: {
    fetchData: function (params) {
      return {
        test: RestClient.get('/test')
      };
    }
  },

  render: function () {
    var lines = this.props.data.test.map((line) =>
      <div>
        {line}
      </div>
    )

    return (
      <div>
        {lines}
      </div>
    );
  }
});

module.exports = Home;
