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

  render() {
    return <h1>Edit Character</h1>;
  }
}

export default EditCharacter;
