import React from "react";
import axios from "axios";

class VerifyUser extends React.Component {
  async componentWillMount() {
    const key = window.location.pathname.replace("/verify/", "");
    console.log(key);
  }
  render() {
    return <h1>Reset Password</h1>;
  }
}

export default VerifyUser;
