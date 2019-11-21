import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
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

class Profile extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    verifyNewPassword: "",
    username: "",
    country: "",
    email: "",
    realName: ""
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
