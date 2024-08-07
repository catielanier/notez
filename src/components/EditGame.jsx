import React, { useState, useContext } from "react";
import Select from "react-select";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import { redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
	},
	header: {
		textAlign: "center",
	},
	buttonRow: {
		display: "flex",
		alignItems: "center",
		marginTop: theme.spacing(2),
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

export default function EditGame() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { games, loading, error, editGame, success } = useContext(GameContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [game, setGame] = useState("");
	if (!user) {
		return redirect('/');
	}
	return (
		<section>
			<Typography variant="h5" className={classes.header}>
				{t("header.game.edit")}
			</Typography>
			<Container maxWidth="sm">
				{success && <p>{t("game.edit.success")}</p>}
				{error && (
					<p className="error">
						<span>{t("common.error")}</span> {error}
					</p>
				)}
				<Select
					options={games.map((game) => {
						return {
							label: t(game.name),
							value: game._id,
						};
					})}
					onChange={(e) => {
						setGame(e.value);
						const index = games.findIndex((x) => x._id === e.value);
						setName(games[index].name);
					}}
				/>
				{game !== "" && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							editGame(game, name);
						}}
					>
						<TextField
							label={t("game.add.title.locale")}
							id="standard-name-required"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							fullWidth="true"
							placeholder={t("game.add.title.locale")}
							required
						/>
						<Container className={classes.buttonRow}>
							<div className={classes.wrapper}>
								<Button
									variant="contained"
									type="submit"
									color="primary"
									disabled={loading}
								>
									{t("header.game.edit")}
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
					</form>
				)}
			</Container>
		</section>
	);
}
