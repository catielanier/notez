import React, { useContext, useEffect } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import Select from "react-select";
import { LanguageContext } from "../contexts/LanguageContext";
import { GameContext } from "../contexts/GameContext";
import dbLocale from "../services/dbLocale";
import { NoteContext } from "../contexts/NoteContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
	spaced: {
		marginBottom: theme.spacing(2),
	},
}));

export default function GameNotesSearch() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { language } = useContext(LanguageContext);
	const { games, updateDropdowns, characters, filters } =
		useContext(GameContext);
	const {
		gameNotesGame: game,
		setGameNotesGame: setGame,
		setMyCharacter,
		setOpponentCharacter,
		gameNotesFilter: myFilter,
		setGameNotesFilter: setMyFilter,
		setDisplayedGameNotes: setDisplayedNotes,
	} = useContext(NoteContext);

	// Effect called to grab characters and filters from chosen game, and set them to state.
	useEffect(() => {
		if (game !== "") {
			setMyCharacter("");
			setMyFilter("");
			setOpponentCharacter("");
			setDisplayedNotes([]);
			updateDropdowns(game, "game");
		}
	}, [
		game,
		games,
		language,
		setMyCharacter,
		setMyFilter,
		setOpponentCharacter,
		setDisplayedNotes,
		updateDropdowns,
	]);

	return (
		<>
			<Typography variant="h6">{t("notes.common.game")}</Typography>
			<Select
				options={games.map((game) => {
					return {
						label: t(game.name),
						value: game._id,
					};
				})}
				onChange={(e) => {
					setGame(e.value);
				}}
				className={classes.spaced}
			/>
			<Typography variant="h6">{t("notes.character.you")}</Typography>
			<Select
				options={characters.map((character) => {
					return {
						label: t(character.name),
						value: character._id,
					};
				})}
				onChange={(e) => {
					setMyCharacter(e.value);
				}}
				className={classes.spaced}
			/>
			<Typography variant="h6">{t("notes.character.opponent")}</Typography>
			<Select
				options={characters.map((character) => {
					return {
						label: t(character.name),
						value: character._id,
					};
				})}
				onChange={(e) => {
					setOpponentCharacter(e.value);
				}}
				className={classes.spaced}
			/>
			<Typography variant="h6">{t("notes.filter.choose")}</Typography>
			<Select
				options={filters.map((x) => {
					return {
						label: dbLocale(language, x),
						value: x._id,
					};
				})}
				onChange={(e) => {
					setMyFilter(e.value);
				}}
				className={classes.spaced}
			/>
			{myFilter !== "" && (
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => {
						setMyFilter("");
					}}
				>
					{t("notes.filter.clear")}
				</Button>
			)}
		</>
	);
}
