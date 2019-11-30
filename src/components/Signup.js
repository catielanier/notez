import React from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";

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

class Signup extends React.Component {
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
      loading: true,
      error: null
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
          },
          params: {
            language: this.props.language
          }
        });
        console.log(res);
        this.setState({
          loading: false,
          success: true
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: e.message
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
    const { classes } = this.props;
    return (
      <section className="signup">
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            {this.props.language === "ja"
              ? "サインアップ"
              : this.props.language === "ko"
              ? "가입하기"
              : this.props.language === "zh-CN"
              ? "注册"
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "註冊"
              : "Signup"}
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.signup}>
            {this.state.success && (
              <p>Registration success! Please check your email.</p>
            )}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
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
              required
              name="email"
              onChange={this.changeState}
              fullWidth
              value={this.state.email}
            />
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
              required
              name="password"
              onChange={this.changeState}
              fullWidth
              value={this.state.password}
              type="password"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "パスワードを照合します"
                  : this.props.language === "ko"
                  ? "비밀번호 확인"
                  : this.props.language === "zh-CN"
                  ? "验证密码"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "驗證密碼"
                  : "Verify Password"
              }
              required
              name="verifyPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.verifyPassword}
              type="password"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "ユーザー名"
                  : this.props.language === "ko"
                  ? "사용자 이름"
                  : this.props.language === "zh-CN"
                  ? "用户名"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "用户名"
                  : "Username"
              }
              required
              name="username"
              onChange={this.changeState}
              fullWidth
              value={this.state.username}
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "本名"
                  : this.props.language === "ko"
                  ? "실제 이름"
                  : this.props.language === "zh-CN"
                  ? "真正的名字"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "真正的名字"
                  : "Real Name"
              }
              name="realName"
              onChange={this.changeState}
              fullWidth
              value={this.state.realName}
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "国"
                  : this.props.language === "ko"
                  ? "국가"
                  : this.props.language === "zh-CN"
                  ? "国家"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "國家"
                  : "Country"
              }
              name="country"
              onChange={this.changeState}
              fullWidth
              value={this.state.country}
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button color="primary" variant="contained" type="submit">
                  {this.props.language === "ja"
                    ? "サインアップ"
                    : this.props.language === "ko"
                    ? "가입하기"
                    : this.props.language === "zh-CN"
                    ? "注册"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "註冊"
                    : "Signup"}
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
          </form>
        </Container>
      </section>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
