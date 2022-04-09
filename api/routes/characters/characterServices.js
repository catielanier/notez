const { model: Character } = require("./characterModel");

exports.createCharacter = async (characterData) => {
	try {
		const character = new Character(characterData);
		return await character.save();
	} catch (e) {
		throw e;
	}
};

exports.getAllCharacters = async () => {
	try {
		const characters = await Character.find({});
		if (characters) {
			return characters;
		}
	} catch (e) {
		throw e;
	}
};

exports.updateCharacter = async (id, name, company) => {
	try {
		return await Character.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					name,
					company,
				},
			}
		);
	} catch (e) {
		throw e;
	}
};
