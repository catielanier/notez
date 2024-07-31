import React, { useState, useContext } from "react";
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

export default function AddGame() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { loading, error, createGame } = useContext(GameContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [success, setSuccess] = useState(false);
	if (!user) {
		return redirect('/');
	}
	return (
		<section className="add-game">
			<Typography className={classes.header} variant="h5">
				{t("header.game.add")}
			</Typography>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					await createGame(name);
					if (!error) setSuccess(true);
				}}
				disabled={loading}
			>
				<Container maxWidth="sm">
					{success && <p>{t("game.add.created")}</p>}
					{error && (
						<p className="error">
							<span>{t("common.error")}</span> {error}
						</p>
					)}
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
								{t("header.game.add")}
							</Button>
							{loading && (
								<CircularProgress
									size={20}
									color="secondary"
									className={classes.buttonProgress}
								/>
							)}
						</div>
						<div className={classes.wrapper}>
							<Button
								onClick={() => {
									setName("");
								}}
							>
								{t("common.clear")}
							</Button>
						</div>
					</Container>
				</Container>
			</form>
		</section>
	);
}
