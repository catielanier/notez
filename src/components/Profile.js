import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { getToken } from "../services/tokenService";

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

class Profile extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    verifyNewPassword: "",
    username: "",
    country: "",
    email: "",
    realName: "",
    loading: false,
    success: false,
    error: null
  };

  async componentWillMount() {
    const { user } = this.props;
    await axios.get(`/api/users/${user}`).then(res => {
      const { username, country, email, realName } = res.data.data;
      this.setState({
        username,
        country,
        email,
        realName
      });
    });
  }

  updateProfile = async e => {
    e.preventDefault();
    const {
      oldPassword,
      newPassword,
      verifyNewPassword,
      username,
      country,
      email,
      realName
    } = this.state;
    const { user } = this.props;
    const token = getToken();
    this.setState({
      loading: true,
      error: null
    });
    if (oldPassword !== "") {
      if (newPassword !== "" && newPassword === verifyNewPassword) {
        await axios
          .put(`/api/users/${user}`, {
            data: {
              username,
              email,
              country,
              realName,
              oldPassword,
              newPassword,
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
      } else {
        this.setState({
          loading: false,
          error: `Your new password is either invalid or doesn't match your password verification. (Note: If you don't want to change your password, leave the "Old Password" field blank.)`
        });
      }
    } else {
      await axios
        .put(`/api/users/${user}`, {
          data: {
            username,
            email,
            country,
            realName,
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
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <section>
        <Container maxWidth="xs">
          <Typography className={classes.header} variant="h5">
            {this.props.language === "ja"
              ? "プロフィール"
              : this.props.language === "ko"
              ? "프로필"
              : this.props.language === "zh-CN"
              ? "个人资料"
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "個人資料"
              : "Profile"}
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.updateProfile}>
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
                  ? "以前のパスワード"
                  : this.props.language === "ko"
                  ? "기존 비밀번호"
                  : this.props.language === "zh-CN"
                  ? "旧密码"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "舊密碼"
                  : "Old Password"
              }
              required
              name="oldPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.oldPassword}
              type="password"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "新しいパスワード"
                  : this.props.language === "ko"
                  ? "새 비밀번호"
                  : this.props.language === "zh-CN"
                  ? "新密码"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "新密碼"
                  : "New Password"
              }
              required
              name="newPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.newPassword}
              type="password"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "新しいパスワードを照合します"
                  : this.props.language === "ko"
                  ? "새 비밀번호 확인"
                  : this.props.language === "zh-CN"
                  ? "验证新密码"
                  : this.props.language === "zh-HK" ||
                    this.props.language === "zh-TW"
                  ? "驗證新密碼"
                  : "Verify New Password"
              }
              required
              name="verifyNewPassword"
              onChange={this.changeState}
              fullWidth
              value={this.state.verifyNewPassword}
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
                    ? "プロファイル編集"
                    : this.props.language === "ko"
                    ? "프로필 편집"
                    : this.props.language === "zh-CN"
                    ? "编辑个人资料"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "編輯個人資料"
                    : "Edit Profile"}
                </Button>
                {this.state.loading && (
                  <CircularProgress
                    size={20}
                    color="secondary"
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Container>
          </form>
        </Container>
      </section>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
