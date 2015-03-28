var React = require('react');
    ReactRouter = require('react-router'),
    RouteHandler = ReactRouter.RouteHandler,
    ReactBootstrap = require('react-bootstrap'),
    Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    ReactRouterBootstrap = require('react-router-bootstrap'),
    NavItemLink = ReactRouterBootstrap.NavItemLink;

var Navigation = React.createClass({
  render: function () {
    return (
      <Navbar brand={this.props.brand}>
        <Nav>
          <NavItemLink to="home">Home</NavItemLink>
        </Nav>
      </Navbar>
    );
  }
});

module.exports = Navigation;
