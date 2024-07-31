import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	Typography,
	Grid,
	Button,
	makeStyles,
	IconButton,
	CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Select from "react-select";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { CharacterContext } from "../contexts/CharacterContext";
import { redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
	spaced: {
		marginBottom: theme.spacing(2),
	},
	wrapper: {
		margin: theme.spacing(1),
		position: "relative",
	},
	buttonProgress: {
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
}));

export default function LinkCharacter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { games, loading, error, success, connectCharacters, setSuccess } =
		useContext(GameContext);
	const { characters } = useContext(CharacterContext);
	const [game, setGame] = useState("");
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [renderedSelectedCharacters, setRenderedSelectedCharacters] = useState(
		[]
	);
	const [unselectedCharacters, setUnselectedCharacters] = useState([]);
	useEffect(() => {
		return function cleanup() {
			setSuccess(false);
		};
	});
	if (!user) {
		return redirect('/');
	}
	return (
		<section className="link-character">
			<Container maxWidth="sm">
				<Typography variant="h5">{t("character.link.title")}</Typography>
				{error && (
					<p className="error">
						<span>{t("common.error")}</span> {error}
					</p>
				)}
				{success && <p>{t("character.link.success")}</p>}
				<Select
					className={classes.spaced}
					options={games.map((game) => {
						return {
							label: t(game.name),
							value: game._id,
						};
					})}
					onChange={(e) => {
						setGame(e.value);
						const selected = [];
						const selectedRender = [];
						const index = games.findIndex((x) => x._id === e.value);
						games[index].characters.forEach((character) => {
							selected.push(character._id);
							selectedRender.push({
								label: `${t(character.name)} (${character.company})`,
								value: character._id,
							});
						});
						const unselected = [];
						characters.forEach((character) => {
							const index = selected.findIndex((id) => character._id === id);
							if (index === -1) {
								unselected.push(character);
							}
						});
						setSelectedCharacters(selected);
						selectedRender.sort((x, y) => x.label.localeCompare(y.label));
						setRenderedSelectedCharacters(selectedRender);
						setUnselectedCharacters(unselected);
					}}
				/>
			</Container>
			<Container maxWidth="md">
				{game !== "" && (
					<>
						<Container maxWidth="sm" className={classes.spaced}>
							<Typography variant="h6">{t("character.link.select")}</Typography>
							<Select
								className={classes.spaced}
								options={unselectedCharacters.map((character) => {
									return {
										value: character._id,
										label: `${t(character.name)} (${character.company})`,
									};
								})}
								onChange={(e) => {
									setSelectedCharacters([...selectedCharacters, e.value]);
									const renderedSelected = [...renderedSelectedCharacters];
									renderedSelected.push(e);
									renderedSelected.sort((x, y) =>
										x.label.localeCompare(y.label)
									);
									setRenderedSelectedCharacters(renderedSelected);
									const unselected = [];
									unselectedCharacters.forEach((character) => {
										if (character._id !== e.value) {
											unselected.push(character);
										}
									});
									setUnselectedCharacters(unselected);
								}}
							/>
							<Typography variant="h6">
								{t("character.link.selected")}
							</Typography>
							{renderedSelectedCharacters.map((character) => (
								<Grid
									container
									spacing={2}
									key={character.value}
									alignItems="center"
								>
									<Grid item md={11}>
										<Typography>{character.label}</Typography>
									</Grid>
									<Grid item md={1}>
										<IconButton
											color="secondary"
											onClick={(e) => {
												e.preventDefault();
												const selected = [];
												const renderedSelected = [];
												selectedCharacters.forEach((id) => {
													if (character.value !== id) {
														selected.push(id);
													}
												});
												renderedSelectedCharacters.forEach((render) => {
													if (render.value !== character.value) {
														renderedSelected.push(render);
													}
												});
												const unselected = [...unselectedCharacters];
												const index = characters.findIndex(
													(x) => x._id === character.value
												);
												unselected.push(characters[index]);
												unselected.sort((x, y) =>
													`${t(x.name)} (${x.company})`.localeCompare(
														`${t(y.name)} (${y.company})`
													)
												);
												setUnselectedCharacters(unselected);
												setSelectedCharacters(selected);
												setRenderedSelectedCharacters(renderedSelected);
											}}
										>
											<ClearIcon />
										</IconButton>
									</Grid>
								</Grid>
							))}
						</Container>
						<Container maxWidth="sm">
							<div className={classes.wrapper}>
								<Button
									variant="contained"
									color="primary"
									disabled={loading}
									onClick={(e) => {
										e.preventDefault();
										connectCharacters(game, selectedCharacters);
									}}
								>
									{t("header.character.link")}
								</Button>
								{loading && (
									<CircularProgress
										size={20}
										color="secondary"
										className={classes.buttonProgress}
									/>
								)}
							</div>
						</Container>
					</>
				)}
			</Container>
		</section>
	);
}
