import React from "react";
import axios from "axios";

class GameNotes extends React.Component {
  state = {
    games: [],
    myCharacter: "",
    opponentCharacter: "",
    filter: "",
    characters: [],
    filters: [],
    allGameNotes: [],
    fullGameNotes: [],
    gameNotes: []
  };

  async componentDidMount() {
    const { user } = this.props;
    const resUser = await axios.get(`/api/users/${user}`);
    const resGames = await axios.get("/api/games");
    const games = resGames.data.data;
    this.setState({
      games
    });
  }

  render() {
    return <p>Game Notes</p>;
  }
}

export default GameNotes;
