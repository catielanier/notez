const { model: Game } = require("./gameModel");

exports.createGame = async gameData => {
  try {
    const game = new Game(gameData);
    return await game.save();
  } catch (e) {
    throw e;
  }
};

exports.getAllGames = async () => {
  try {
    const games = await Game.find({})
      .populate("characters")
      .populate("filters");
    if (games) {
      return games;
    }
  } catch (e) {
    throw e;
  }
};

exports.linkCharacters = async (game, characters) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(game, {
      $set: {
        characters
      }
    });
    if (updatedGame) {
      return updatedGame;
    }
  } catch (e) {
    throw e;
  }
};

exports.linkFilters = async (game, filters) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(game, {
      $set: {
        filters
      }
    });
    if (updatedGame) {
      return updatedGame;
    }
  } catch (e) {
    throw e;
  }
};
