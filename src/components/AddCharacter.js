import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";
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

class AddCharacter extends React.Component {
  state = {
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": ""
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  clearForm = e => {
    e.preventDefault();
    this.setState({
      name: "",
      name_ja: "",
      name_ko: "",
      "name_zh-cn": "",
      "name_zh-tw": "",
      "name_zh-hk": ""
    });
  };

  addCharacter = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    const character = {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    };
    for (let x in character) {
      if (character[x].length === 0) {
        delete character[x];
      }
    }
    try {
      const res = await axios.post("/api/characters/new", {
        user,
        token,
        character
      });
      if (res) {
        this.setState({
          success: true,
          loading: false
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
    const { classes } = this.props;
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section className="add-character">
        <Typography className={classes.header} variant="h5">
          {this.props.language === "ja"
            ? "キャラクターを追加"
            : this.props.language === "ko"
            ? "캐릭터 추가"
            : this.props.language === "zh-CN"
            ? "新增角色"
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "新增角色"
            : "Add Character"}
        </Typography>
        <form onSubmit={this.addCharacter} disabled={this.state.loading}>
          <Container maxWidth="sm">
            {this.state.success && <p>Character created successfully.</p>}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label={
                this.props.language === "ja"
                  ? "英語のキャラクター名"
                  : this.props.language === "ko"
                  ? "영어 캐릭터 이름"
                  : this.props.language === "zh-CN" ||
                    this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "英文角色名字"
                  : "English Character Name"
              }
              id="standard-name-required"
              value={this.state.name}
              name="name"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="Character Name"
              required
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "日本語のキャラクター名"
                  : this.props.language === "ko"
                  ? "일본어 캐릭터 이름"
                  : this.props.language === "zh-CN"
                  ? "日语角色名字"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "日語角色名字"
                  : "Japanese Character Name"
              }
              value={this.state.name_ja}
              name="name_ja"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="キャラクター名"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "韓国語のキャラクター名"
                  : this.props.language === "ko"
                  ? "한국어 캐릭터 이름"
                  : this.props.language === "zh-CN"
                  ? "朝鲜语角色名字"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "朝鮮語角色名字"
                  : "Korean Character Name"
              }
              value={this.state.name_ko}
              name="name_ko"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="캐릭터 이름"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "簡体字中国語のキャラクター名"
                  : this.props.language === "ko"
                  ? "중국어 간체 캐릭터 이름"
                  : this.props.language === "zh-CN"
                  ? "简体中文角色名字"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "簡體中文角色名字"
                  : "Mandarin (Simplified) Character Name"
              }
              value={this.state["name_zh-cn"]}
              name="name_zh-cn"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="角色名字"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "繁体字中国語のキャラクター名"
                  : this.props.language === "ko"
                  ? "중국어 번체 캐릭터 이름"
                  : this.props.language === "zh-CN"
                  ? "繁体中文角色名字"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "繁體中文角色名字"
                  : "Mandarin (Traditional) Character Name"
              }
              value={this.state["name_zh-tw"]}
              name="name_zh-tw"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="角色名字"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "広東語のキャラクター名"
                  : this.props.language === "ko"
                  ? "광동어 캐릭터 이름"
                  : this.props.language === "zh-CN"
                  ? "广东话角色名字"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "廣東話角色名字"
                  : "Cantonese Character Name"
              }
              value={this.state["name_zh-hk"]}
              name="name_zh-hk"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="角色名字"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={this.addCharacter}
                  disabled={this.state.loading}
                >
                  {this.props.language === "ja"
                    ? "キャラクターを追加"
                    : this.props.language === "ko"
                    ? "캐릭터 추가"
                    : this.props.language === "zh-CN"
                    ? "新增角色"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "新增角色"
                    : "Add Character"}
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
                <Button onClick={this.clearForm}>
                  {this.props.language === "ja"
                    ? "明確な形"
                    : this.props.language === "ko"
                    ? "명확한 형태"
                    : this.props.language === "zh-CN" ||
                      this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "清除表格"
                    : "Clear Form"}
                </Button>
              </div>
            </Container>
          </Container>
        </form>
      </section>
    );
  }
}

AddCharacter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddCharacter);
