import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../ducks/reducer";
import { Redirect } from "react-router-dom";
import axios from "axios";

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      register: true
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register() {
    const { email, password, username } = this.state;
    const registerdUser = await axios.post("/auth/register", {
      email,
      username,
      password
    });

    this.props.setUser(registerdUser.data);
  }

  async login() {
    const { email, password } = this.state;
    const loggedInUser = await axios.post("/auth/login", {
      email,
      password
    });

    this.props.setUser(loggedInUser.data);
  }

  render() {
    //   destructured state values
    const { email, username, password, register } = this.state;
    console.log(this.props);
    return this.props.user ? (
      <Redirect to="/profile" />
    ) : (
      <div className="auth-container">
        <form
          onSubmit={e => {
            //   prevent default to stop form from refreshing
            e.preventDefault();
            if (register) {
              this.register();
            } else {
              this.login();
            }
          }}
        >
          {/* username input */}
          {register && (
            <div className="input-container">
              <label>username</label>
              <input
                value={username}
                onChange={e =>
                  this.setState({
                    username: e.target.value
                  })
                }
              />
            </div>
          )}
          {/* email input */}
          <div className="input-container">
            <label>email</label>
            <input
              type="email"
              value={email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
          </div>
          {/* password */}
          <div className="input-container">
            <label>password</label>
            <input
              type="password"
              value={password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
          </div>
          <button>{register ? "Register" : "Login"}</button>
        </form>
        {!register && (
          <button
            onClick={() =>
              this.setState({
                register: true
              })
            }
          >
            Go To Register
          </button>
        )}
        {register && (
          <button
            onClick={() =>
              this.setState({
                register: false
              })
            }
          >
            Go To Login
          </button>
        )}
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

const enhancedComponent = connect(
  mapReduxStateToProps,
  mapDispatchToProps
);

export default enhancedComponent(AuthComponent);
