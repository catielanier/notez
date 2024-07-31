import React, { useContext, useEffect, useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import Select from "react-select";
import { redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { CharacterContext } from "../contexts/CharacterContext";
import { useTranslation } from "react-i18next";
import { COMPANY_NAME } from "../services/constants";

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

export default function AddCharacter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { loading, error, success, createCharacter, setSuccess } =
		useContext(CharacterContext);
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	useEffect(() => {
		return function cleanup() {
			setSuccess(false);
		};
	});
	if (!user) {
		return redirect('/');
	}
	return (
		<section className="add-character">
			<Typography className={classes.header} variant="h5">
				{t("header.character.add")}
			</Typography>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createCharacter(name, company);
				}}
				disabled={loading}
			>
				<Container maxWidth="sm">
					{success && <p>{t("character.add.created")}</p>}
					{error && (
						<p className="error">
							<span>{t("common.error")}</span> {error}
						</p>
					)}
					<TextField
						label={t("character.add.name.locale")}
						id="standard-name-required"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						fullWidth="true"
						placeholder={t("character.add.name.locale")}
						required
					/>
					<Select
						options={COMPANY_NAME.map((company) => {
							return {
								label: company,
								value: company,
							};
						})}
						onChange={(e) => {
							setCompany(e.value);
						}}
						placeholder={t("character.add.name.company")}
					/>
					<Container className={classes.buttonRow}>
						<div className={classes.wrapper}>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								disabled={loading}
							>
								{t("header.character.add")}
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
									setCompany("");
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
