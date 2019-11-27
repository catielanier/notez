import React from "react";
import axios from "axios";

class EditCharacter extends React.Component {
  state = {
    characters: [],
    character: "",
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
    await axios.get("/api/characters").then(res => {
      const characters = res.data.data;
      this.setState({
        characters
      });
    });
  }

  render() {
    return <h1>Edit Character</h1>;
  }
}

export default EditCharacter;
