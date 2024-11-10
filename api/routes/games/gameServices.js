import {model as Game} from './gameModel.js';

export const createGame = async (gameData) => {
	try {
		const game = new Game(gameData);
		return await game.save();
	} catch (e) {
		throw e;
	}
};

export const getAllGames = async () => {
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

export const linkCharacters = async (game, characters) => {
	try {
		const updatedGame = await Game.findByIdAndUpdate(game, {
			$set: {
				characters,
			},
		});
		if (updatedGame) {
			return updatedGame;
		}
	} catch (e) {
		throw e;
	}
};

export const linkFilters = async (game, filters) => {
	try {
		const updatedGame = await Game.findByIdAndUpdate(game, {
			$set: {
				filters,
			},
		});
		if (updatedGame) {
			return updatedGame;
		}
	} catch (e) {
		throw e;
	}
};

export const updateGame = async (id, name) => {
	try {
		return await Game.findByIdAndUpdate(
			{_id: id},
			{
				$set: {
					name,
				},
			}
		);
	} catch (e) {
		throw e;
	}
};
