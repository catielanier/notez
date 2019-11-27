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
import { Redirect } from "react-router-dom";
import { getToken } from "../services/tokenService";

class UserSettings extends React.Component {
  state = {
    users: [],
    id: "",
    role: "",
    loading: false,
    success: false,
    error: null,
    premium: false
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
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section>
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            Edit User Roles
          </Typography>
          <Typography variant="h6">
            {this.props.language === "ja"
              ? "ユーザーを選択："
              : this.props.language === "ko"
              ? "사용자를 선택하십시오:"
              : this.props.language === "zh-CN"
              ? "选择用户："
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "選擇用戶："
              : "Select User:"}
          </Typography>
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
              <Typography variant="h6">
                {this.props.language === "ja"
                  ? "役割の割り当て："
                  : this.props.language === "ko"
                  ? "역할 할당:"
                  : this.props.language === "zh-CN" ||
                    this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "分配角色："
                  : "Assign Role:"}
              </Typography>
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
                {this.props.language === "ja"
                  ? "ユーザーを更新"
                  : this.props.language === "ko"
                  ? "사용자 업데이트"
                  : this.props.language === "zh-CN"
                  ? "更新用户"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "更新用戶"
                  : "Update User"}
              </Button>
            </>
          )}
        </Container>
      </section>
    );
  }
}

export default UserSettings;
