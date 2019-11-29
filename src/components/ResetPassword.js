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

class ResetPassword extends React.Component {
  state = {
    key: null,
    password: "",
    verifyPassword: ""
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <section className="signup">
        <Container maxWidth="sm">
          <Typography className={classes.header} variant="h5">
            {this.props.language === "ja"
              ? "パスワードを再設定する"
              : this.props.language === "ko"
              ? "암호를 다시 설정"
              : this.props.language === "zh-CN"
              ? "重设密码"
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "重設密碼"
              : "Reset Password"}
          </Typography>
          <form disabled={this.state.loading} onSubmit={this.resetPassword}>
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
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button color="primary" variant="contained" type="submit">
                  {this.props.language === "ja"
                    ? "パスワードを再設定する"
                    : this.props.language === "ko"
                    ? "암호를 다시 설정"
                    : this.props.language === "zh-CN"
                    ? "重设密码"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "重設密碼"
                    : "Reset Password"}
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetPassword);
