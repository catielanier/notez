import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  render(props) {
    return (
      <section className="login">
        <p>Login</p>
      </section>
    );
  }
}
