import React from "react";
import Flag from "react-world-flags";
import axios from "axios";
import { getToken } from "../services/tokenService";

export default class AddCharacter extends React.Component {
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
    return (
      <section className="add-character">
        <h2>Add Character</h2>
        <form onSubmit={this.addCharacter}>
          <fieldset>
            {this.state.success && <p>Character created successfully.</p>}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <label htmlFor="name">
              <Flag code="GBR" height="18" />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.changeState}
                placeholder="Character name"
              />
            </label>
            <label htmlFor="name_ja">
              <Flag code="JPN" height="22" />
              <input
                type="text"
                name="name_ja"
                value={this.state.name_ja}
                onChange={this.changeState}
                placeholder="キャラクター名"
              />
            </label>
            <label htmlFor="name_ko">
              <Flag code="KOR" height="22" />
              <input
                type="text"
                name="name_ko"
                value={this.state.name_ko}
                onChange={this.changeState}
                placeholder="캐릭터 이름"
              />
            </label>
            <label htmlFor="name_zh-cn">
              <Flag code="CHN" height="22" />
              <input
                type="text"
                name="name_zh-cn"
                value={this.state["name_zh-cn"]}
                onChange={this.changeState}
                placeholder="角色名字"
              />
            </label>
            <label htmlFor="name_zh-tw">
              <Flag code="TWN" height="22" />
              <input
                type="text"
                name="name_zh-tw"
                value={this.state["name_zh-tw"]}
                onChange={this.changeState}
                placeholder="角色名字"
              />
            </label>
            <label htmlFor="name_zh-hk">
              <Flag code="HKG" height="22" />
              <input
                type="text"
                name="name_zh-hk"
                value={this.state["name_zh-hk"]}
                onChange={this.changeState}
                placeholder="角色名"
              />
            </label>
            <button type="submit">Add Character</button>
          </fieldset>
        </form>
      </section>
    );
  }
}
