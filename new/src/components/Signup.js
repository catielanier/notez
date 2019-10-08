import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faUser,
  faUserTie,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";

export default class Signup extends React.Component {
  state = {
    loading: false,
    success: false,
    error: null,
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
    realName: "",
    country: ""
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  signup = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const {
      email,
      username,
      password,
      verifyPassword,
      realName,
      country
    } = this.state;
    if (password === verifyPassword) {
      try {
        const res = await axios.post("/api/users/signup", {
          data: {
            email,
            username,
            password,
            realName,
            country
          }
        });
        console.log(res);
        this.setState({
          loading: false,
          success: true
        });
      } catch (e) {
        this.setState({
          error: e
        });
      }
    } else {
      this.setState({
        loading: false,
        error: "Your passwords do not match."
      });
    }
  };

  render() {
    return (
      <section className="signup">
        <h2>Signup</h2>
        <form disabled={this.state.loading} onSubmit={this.signup}>
          <fieldset aria-busy={this.state.loading}>
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
            <label htmlFor="verifyPassword">
              <FontAwesomeIcon icon={faKey} />
              <input
                type="password"
                name="verifyPassword"
                value={this.state.verifyPassword}
                onChange={this.changeState}
                placeholder="Verify Password"
              />
            </label>
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.changeState}
                placeholder="Username"
              />
            </label>
            <label htmlFor="realName">
              <FontAwesomeIcon icon={faUserTie} />
              <input
                type="text"
                name="realName"
                value={this.state.realName}
                onChange={this.changeState}
                placeholder="Real Name"
              />
            </label>
            <label htmlFor="country">
              <FontAwesomeIcon icon={faGlobe} />
              <input
                type="text"
                name="country"
                value={this.state.country}
                onChange={this.changeState}
                placeholder="Country"
              />
            </label>
            <button type="submit">Signup</button>
          </fieldset>
        </form>
      </section>
    );
  }
}
