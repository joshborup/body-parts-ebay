import React from "react";
import logo from "./logo.png";
import { Switch, NavLink, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import AuthComponent from "./components/AuthComponent";
import Profile from "./components/Profile";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header>
          {/* inner double container */}
          <div>
            {/* logo container */}
            <div>
              <img src={logo} />
            </div>
            {/* nav container */}
            <nav>
              {this.props.user || (
                <NavLink activeClassName="active" exact to="/">
                  Login
                </NavLink>
              )}
              {this.props.user && (
                <div>
                  <NavLink activeClassName="active" to="/store">
                    Store
                  </NavLink>
                  <NavLink activeClassName="active" to="/profile">
                    Profile
                  </NavLink>
                </div>
              )}
              {this.props.user && (
                <button
                  onClick={() => {
                    axios.delete("/auth/logout").then(() => {
                      this.props.setUser(null);
                    });
                  }}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={AuthComponent} />
          {this.props.user && (
            <div>
              <Route
                exact
                path="/store"
                render={() => {
                  return <div>Store</div>;
                }}
              />
              <Route exact path="/profile" component={Profile} />
              <Route
                exact
                path="*"
                render={() => {
                  return <div>GET THAT SPOOOKY BUTT OUTTA HERE!!!</div>;
                }}
              />
            </div>
          )}
        </Switch>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}
const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapReduxStateToProps,
  mapDispatchToProps
);

export default invokedConnect(withRouter(App));
