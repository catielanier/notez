import React from "react";
import axios from "axios";
import Select from "react-select";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
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

class EditFilter extends React.Component {
  state = {
    filters: [],
    filter: "",
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": "",
    loading: false,
    success: false,
    error: null
  };

  async componentDidMount() {
    await axios.get("/api/filters").then(res => {
      const filters = res.data.data;
      this.setState({
        filters
      });
    });
  }

  setFilter = e => {
    const filter = e.value;
    const { filters } = this.state;
    const index = filters.findIndex(x => x._id === filter);
    const { name, name_ja, name_ko } = filters[index];
    const name_cn = filters[index]["name_zh-cn"];
    const name_tw = filters[index]["name_zh-tw"];
    const name_hk = filters[index]["name_zh-hk"];
    this.setState({
      filter,
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    });
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateFilter = async e => {
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
      "name_zh-hk": name_hk,
      filter
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    try {
      const res = await axios.put(`/api/filters/${filter}`, {
        data: {
          token,
          user,
          name,
          name_ja,
          name_ko,
          name_cn,
          name_tw,
          name_hk
        }
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
      <section>
        <Typography variant="h5" className={classes.header}>
          {this.props.language === "ja"
            ? "フィルターを編集"
            : this.props.language === "ko"
            ? "필터 편집"
            : this.props.language === "zh-CN"
            ? "编辑过滤器"
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "編輯過濾器"
            : "Edit Filter"}
        </Typography>
        <Container maxWidth="sm">
          <Select
            options={this.state.filters.map(filter => {
              return {
                label: filter.name,
                value: filter._id
              };
            })}
            onChange={this.setFilter}
          />
          {this.state.filter !== "" && (
            <form onSubmit={this.updateFilter}>
              <TextField
                label={
                  this.props.language === "ja"
                    ? "英語のフィルタータイプ"
                    : this.props.language === "ko"
                    ? "영어 필터 타입"
                    : this.props.language === "zh-CN"
                    ? "英文过滤器类型"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "英文過濾器類型"
                    : "English Filter Type"
                }
                id="standard-name-required"
                value={this.state.name}
                name="name"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="Filter Type"
                required
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "日本語のフィルタータイプ"
                    : this.props.language === "ko"
                    ? "일본어 필터 타입"
                    : this.props.language === "zh-CN"
                    ? "日语过滤器类型"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "日語過濾器類型"
                    : "Japanese Filter Type"
                }
                value={this.state.name_ja}
                name="name_ja"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="フィルタータイプ"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "韓国語のフィルタータイプ"
                    : this.props.language === "ko"
                    ? "한국어 필터 타입"
                    : this.props.language === "zh-CN"
                    ? "朝鲜语过滤器类型"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "朝鮮語過濾器類型"
                    : "Korean Filter Type"
                }
                value={this.state.name_ko}
                name="name_ko"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="필터 타입"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "簡体字中国語のフィルタータイプ"
                    : this.props.language === "ko"
                    ? "중국어 간체 필터 타입"
                    : this.props.language === "zh-CN"
                    ? "简体中文过滤器类型"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "簡體中文過濾器類型"
                    : "Mandarin (Simplified) Filter Type"
                }
                value={this.state["name_zh-cn"]}
                name="name_zh-cn"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="过滤器类型"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "繁体字中国語のフィルタータイプ"
                    : this.props.language === "ko"
                    ? "중국어 번체 필터 타입"
                    : this.props.language === "zh-CN"
                    ? "繁体中文过滤器类型"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "繁體中文過濾器類型"
                    : "Mandarin (Traditional) Filter Type"
                }
                value={this.state["name_zh-tw"]}
                name="name_zh-tw"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="過濾器類型"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "広東語のフィルタータイプ"
                    : this.props.language === "ko"
                    ? "광동어 필터 타입"
                    : this.props.language === "zh-CN"
                    ? "广东话过滤器类型"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "廣東話過濾器類型"
                    : "Cantonese Filter Type"
                }
                value={this.state["name_zh-hk"]}
                name="name_zh-hk"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="過濾器類型"
              />
              <Container className={classes.buttonRow}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={this.state.loading}
                  >
                    {this.props.language === "ja"
                      ? "フィルターを編集"
                      : this.props.language === "ko"
                      ? "필터 편집"
                      : this.props.language === "zh-CN"
                      ? "编辑过滤器"
                      : this.props.language === "zh-TW" ||
                        this.props.language === "zh-HK"
                      ? "編輯過濾器"
                      : "Edit Filter"}
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
          )}
        </Container>
      </section>
    );
  }
}

EditFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditFilter);
