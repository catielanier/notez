import React from "react";
import Flag from "react-world-flags";
import axios from "axios";

export default class AddGame extends React.Component {
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
  render() {
    return (
      <section className="add-game">
        <h2>Add Game</h2>
        <form>
          <fieldset>
            <label htmlFor="name">
              <Flag code="GBR" height="18" />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.changeState}
                placeholder="Game name"
              />
            </label>
            <label htmlFor="name_ja">
              <Flag code="JPN" height="22" />
              <input
                type="text"
                name="name_ja"
                value={this.state.name_ja}
                onChange={this.changeState}
                placeholder="ゲームタイトル"
              />
            </label>
            <label htmlFor="name_ko">
              <Flag code="KOR" height="22" />
              <input
                type="text"
                name="name_ko"
                value={this.state.name_ko}
                onChange={this.changeState}
                placeholder="게임 제목"
              />
            </label>
            <label htmlFor="name_zh-cn">
              <Flag code="CHN" height="22" />
              <input
                type="text"
                name="name_zh-cn"
                value={this.state["name_zh-cn"]}
                onChange={this.changeState}
                placeholder="电子游戏标题"
              />
            </label>
            <label htmlFor="name_zh-tw">
              <Flag code="TWN" height="22" />
              <input
                type="text"
                name="name_zh-tw"
                value={this.state["name_zh-tw"]}
                onChange={this.changeState}
                placeholder="電子遊戲標題"
              />
            </label>
            <label htmlFor="name_zh-hk">
              <Flag code="HKG" height="22" />
              <input
                type="text"
                name="name_zh-hk"
                value={this.state["name_zh-hk"]}
                onChange={this.changeState}
                placeholder="電子遊戲標題"
              />
            </label>
            <button type="submit">Add Game</button>
          </fieldset>
        </form>
      </section>
    );
  }
}
