const { model: Game } = require("./gameModel");

exports.createGame = async gameData => {
  try {
    const game = new Game(gameData);
    return await game.save();
  } catch (e) {
    throw e;
  }
};
