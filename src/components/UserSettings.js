import React from "react";
import axios from "axios";
import { getToken } from "../services/tokenService";

class UserSettings extends React.Component {
  state = {
    users: [],
    id: "",
    role: "",
    loading: false,
    success: false,
    error: null
  };

  async componentWillMount() {
    const token = getToken();
    console.log(token);
    const { user } = this.props;
    console.log(user);
    await axios
      .get("/api/users", {
        params: {
          token,
          user
        }
      })
      .then(res => {
        this.setState({
          users: res.data.data
        });
      });
  }

  render() {
    return <h1>User Settings</h1>;
  }
}

export default UserSettings;
