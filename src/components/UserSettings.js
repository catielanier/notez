import React from "react";
import axios from "axios";
import Select from "react-select";
import { Container, Button, Typography } from "@material-ui/core";
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
    const { user } = this.props;
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

  setUser = e => {
    const id = e.value;
    const { users } = this.state;
    const index = users.findIndex(user => user._id === id);
    const { role } = users[index];
    this.setState({
      id,
      role
    });
  };

  render() {
    return (
      <section>
        <Container maxWidth="sm">
          <Typography variant="h5">Edit User Roles</Typography>
          <Select
            options={this.state.users.map(user => {
              return {
                label: `${user.username} (${user.realName} - ${user.country})`,
                value: user._id
              };
            })}
            onChange={this.setUser}
          />
        </Container>
      </section>
    );
  }
}

export default UserSettings;
