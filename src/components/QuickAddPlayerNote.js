import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Typography, TextField, Button } from "@material-ui/core";
import Select from "react-select";
import axios from "axios";
import { getToken } from "../services/tokenService";

const styles = theme => ({
  spaced: {
    marginBottom: theme.spacing(2)
  }
});

class QuickAddPlayerNote extends React.Component {
  state = {
    filter: "",
    note: "",
    universal: false,
    loading: false,
    success: false,
    error: null
  };

  setFilter = e => {
    const filter = e.value;
    this.setState({
      filter
    });
  };

  setNote = e => {
    const note = e.target.value;
    this.setState({
      note
    });
  };

  postNote = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    const { filter, note: noteBody } = this.state;
    const { player, game, user } = this.props;
    const note = {
      filter,
      note: noteBody,
      player,
      game
    };
    const token = await getToken();
    try {
      const res = await axios.post("/api/notes/player", {
        token,
        user,
        note
      });
      await this.props.addToNotes(res.data.data);
      if (res) {
        this.setState({
          loading: false,
          success: true
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="quick-add">
        <Typography variant="h5" className={classes.spaced}>
          {this.props.language === "ja"
            ? "クイック追加："
            : this.props.language === "ko"
            ? "빠른 추가:"
            : this.props.language === "zh-CN"
            ? "快速添加："
            : this.props.language === "zh-TW"
            ? "快速添加："
            : this.props.language === "zh-HK"
            ? "赶添加："
            : "Quick Add:"}
        </Typography>
        <Typography variant="h6">
          {this.props.language === "ja"
            ? "新しいノートフィルター："
            : this.props.language === "ko"
            ? "새로운 노트 필터:"
            : this.props.language === "zh-CN"
            ? "新笔记过滤器："
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "新筆記過濾器："
            : "New note filter:"}
        </Typography>
        <Select
          options={
            this.props.language === "ja"
              ? this.props.filters.map(filter => {
                  return { label: filter.name_ja, value: filter._id };
                })
              : this.props.language === "ko"
              ? this.props.filters.map(filter => {
                  return { label: filter.name_ko, value: filter._id };
                })
              : this.props.language === "zh-CN"
              ? this.props.filters.map(filter => {
                  return {
                    label: filter["name_zh-cn"],
                    value: filter._id
                  };
                })
              : this.props.language === "zh-TW"
              ? this.props.filters.map(filter => {
                  return {
                    label: filter["name_zh-tw"],
                    value: filter._id
                  };
                })
              : this.props.language === "zh-HK"
              ? this.props.filters.map(filter => {
                  return {
                    label: filter["name_zh-hk"],
                    value: filter._id
                  };
                })
              : this.props.filters.map(filter => {
                  return { label: filter.name, value: filter._id };
                })
          }
          onChange={this.setFilter}
          className={classes.spaced}
        />
        <Typography variant="h6">
          {this.props.language === "ja"
            ? "新しいノート："
            : this.props.language === "ko"
            ? "새로운 노트:"
            : this.props.language === "zh-CN"
            ? "新笔记："
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "新筆記："
            : "Note:"}
        </Typography>
        <TextField
          multiline
          name="note"
          value={this.state.note}
          onChange={this.setNote}
          fullWidth
          className={classes.spaced}
        />
        <Button onClick={this.postNote} variant="contained" color="primary">
          {this.props.language === "ja"
            ? "ノートを追加"
            : this.props.language === "ko"
            ? "노트를 추가"
            : this.props.language === "zh-CN"
            ? "加笔记"
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "加筆記"
            : "Create Note"}
        </Button>
      </div>
    );
  }
}

QuickAddPlayerNote.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuickAddPlayerNote);
