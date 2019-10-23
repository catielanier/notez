import React from "react";
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { setToken } from "../services/tokenService";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  header: {
    textAlign: "center"
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class Login extends React.Component {
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
    const { classes } = this.props;
    return (
      <section>
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            {this.props.language === "ja"
              ? "ログイン"
              : this.props.language === "ko"
              ? "로그인"
              : this.props.language === "zh-CN"
              ? "登录"
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "登錄"
              : "Login"}
          </Typography>
          <form
            disabled={this.state.loading}
            onSubmit={this.login}
            className={classes.container}
          >
            <Container maxWidth="xs">
              {this.state.error && (
                <p className="error">
                  <span>Error:</span> {this.state.error}
                </p>
              )}
              <Container maxWidth="xs">
                <TextField
                  label={
                    this.props.language === "ja"
                      ? "Eメールアドレス"
                      : this.props.language === "ko"
                      ? "이메일 주소"
                      : this.props.language === "zh-CN"
                      ? "电邮地址"
                      : this.props.language === "zh-HK" ||
                        this.props.language === "zh-TW"
                      ? "電郵地址"
                      : "Email Address"
                  }
                  id="standard-name"
                  value={this.state.email}
                  name="email"
                  onChange={this.changeState}
                  fullWidth="true"
                />
              </Container>
              <Container maxWidth="xs">
                <TextField
                  label={
                    this.props.language === "ja"
                      ? "パスワード"
                      : this.props.language === "ko"
                      ? "비밀번호"
                      : this.props.language === "zh-CN"
                      ? "密码"
                      : this.props.language === "zh-HK" ||
                        this.props.language === "zh-TW"
                      ? "密碼"
                      : "Password"
                  }
                  value={this.state.password}
                  id="standard-password-input"
                  type="password"
                  name="password"
                  onChange={this.changeState}
                  fullWidth="true"
                />
              </Container>
              <Container className={classes.buttonRow}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={this.login}
                    disabled={this.state.loading}
                  >
                    {this.props.language === "ja"
                      ? "ログイン"
                      : this.props.language === "ko"
                      ? "로그인"
                      : this.props.language === "zh-CN"
                      ? "登录"
                      : this.props.language === "zh-TW" ||
                        this.props.language === "zh-HK"
                      ? "登錄"
                      : "Login"}
                  </Button>
                  {this.state.loading && (
                    <CircularProgress
                      size={20}
                      color="secondary"
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
                <div className={classes.wrapper}>
                  <Button
                    component={React.forwardRef((props, ref) => (
                      <RouterLink innerRef={ref} to="/" {...props} />
                    ))}
                  >
                    {this.props.language === "ja"
                      ? "戻る"
                      : this.props.language === "ko"
                      ? "돌아가다"
                      : this.props.language === "zh-CN"
                      ? "回去"
                      : this.props.language === "zh-TW" ||
                        this.props.language === "zh-HK"
                      ? "回去"
                      : "Go Back"}
                  </Button>
                </div>
              </Container>
            </Container>
          </form>
        </Container>
      </section>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
