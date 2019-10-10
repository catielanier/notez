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
    const games = await Game.find({});
    if (games) {
      return games;
    }
  } catch (e) {
    throw e
  }
}