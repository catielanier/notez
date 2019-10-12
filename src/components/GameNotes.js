import React from "react";
import axios from "axios";

class GameNotes extends React.Component {
  state = {
    games: [],
    myCharacter: "",
    opponentCharacter: "",
    filter: "",
    characters: [],
    filters: []
  };

  render() {
    return <p>Game Notes</p>;
  }
}

export default GameNotes;
