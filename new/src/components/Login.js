import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { setToken } from "../services/tokenService";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    success: false,
    error: null
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  login = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    try {
      const res = await axios.post("/api/users/login", {
        data: {
          email,
          password
        }
      });
      if (res) {
        const { token, id } = res.data.data;
        await setToken(token);
        await localStorage.setItem("notezId", id);
        await this.props.setUser(id);
        this.setState({
          loading: false,
          success: true
        });
      }
    } catch (e) {
      this.setState({
        error: e,
        loading: false
      });
    }
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/" />;
    }
    return (
      <section className="login">
        <h2>Login</h2>
        <form disabled={this.state.loading} onSubmit={this.login}>
          <fieldset aria-busy={this.state.loading}>
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.changeState}
                placeholder="Email Address"
              />
            </label>
            <label htmlFor="password">
              <FontAwesomeIcon icon={faKey} />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.changeState}
                placeholder="Password"
              />
            </label>
            <button type="submit">Login</button>
          </fieldset>
        </form>
      </section>
    );
  }
}
