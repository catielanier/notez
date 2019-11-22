import React from "react";
import axios from "axios";
import Select from "react-select";
import {
  Container,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
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

  updateRole = async e => {
    e.preventDefault();
    const { id, role } = this.state;
    const { user } = this.props;
    const token = await getToken();
    this.setState({
      loading: true
    });
    await axios
      .put("/api/users/role", {
        data: {
          id,
          role,
          user,
          token
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          success: true
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  };

  render() {
    return (
      <section>
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            Edit User Roles
          </Typography>
          <Typography variant="h6">Select User:</Typography>
          <Select
            options={this.state.users.map(user => {
              return {
                label: `${user.username} (${user.realName} - ${user.country})`,
                value: user._id
              };
            })}
            onChange={this.setUser}
          />
          {this.state.id !== "" && this.state.role !== "" && (
            <>
              <Typography variant="h6">Assign Role:</Typography>
              <RadioGroup
                name="role"
                onChange={this.setRole}
                value={this.state.role}
              >
                <FormControlLabel
                  value="User"
                  control={<Radio color="primary" />}
                  label="User"
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio color="primary" />}
                  label="Admin"
                />
                <FormControlLabel
                  value="Banned"
                  control={<Radio color="primary" />}
                  label="Banned"
                />
              </RadioGroup>
              <Button
                color="primary"
                variant="contained"
                onClick={this.updateRole}
              >
                Update User
              </Button>
            </>
          )}
        </Container>
      </section>
    );
  }
}

export default UserSettings;