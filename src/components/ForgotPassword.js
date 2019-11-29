import React from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

class ForgotPassword extends React.Component {
  state = {
    email: "",
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

  requestReset = async e => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({
      loading: true
    });
    await axios
      .post("/api/users/forgot", { email })
      .then(_ => {
        this.setState({
          loading: false,
          success: true
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <section>
        <Container maxWidth="sm">
          <Typography className={classes.header} variant="h5">
            {this.props.language === "ja"
              ? "パスワードをお忘れです"
              : this.props.language === "ko"
              ? "비밀 번호를 잊으입니다"
              : this.props.language === "zh-CN"
              ? "忘记密码"
              : this.props.language === "zh-TW" ||
                this.props.language === "zh-HK"
              ? "忘記密碼"
              : "Forgot Password"}
          </Typography>
          <form
            disabled={this.state.loading}
            onSubmit={this.requestReset}
            className={classes.container}
          >
            <Container maxWidth="sm">
              {this.state.success && (
                <p>
                  {this.props.language === "ja"
                    ? "リセットリンクのメールを確認してください。"
                    : this.props.language === "ko"
                    ? "이메일에서 재설정 링크를 확인하십시오."
                    : this.props.language === "zh-CN"
                    ? "请检查您的电子邮件以获取重置链接。"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "請檢查您的電子郵件以獲取重置鏈接。"
                    : "Please check your email for your reset link."}
                </p>
              )}
              {this.state.error && (
                <p className="error">
                  <span>Error:</span> {this.state.error}
                </p>
              )}
              <Container maxWidth="sm">
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
                  fullWidth
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
                      ? "リセットをリクエスト"
                      : this.props.language === "ko"
                      ? "요청 재설정"
                      : this.props.language === "zh-CN"
                      ? "要求重设"
                      : this.props.language === "zh-TW" ||
                        this.props.language === "zh-HK"
                      ? "要求重設"
                      : "Request Reset"}
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
                      : this.props.language === "zh-CN" ||
                        this.props.language === "zh-TW" ||
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

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForgotPassword);
