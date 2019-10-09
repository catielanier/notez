const { model: Character } = require("./characterModel");

exports.createCharacter = async characterData => {
  try {
    const character = new Character(characterData);
    return await character.save();
  } catch (e) {
    throw e;
  }
};
