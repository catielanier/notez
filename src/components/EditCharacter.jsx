import React, { useContext, useEffect, useState } from "react";
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
import { CharacterContext } from "../contexts/CharacterContext";
import { COMPANY_NAME } from "../services/constants";
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

export default function EditCharacter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { characters, loading, error, editCharacter, success, setSuccess } =
		useContext(CharacterContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [character, setCharacter] = useState("");
	useEffect(() => {
		return function cleanup() {
			setSuccess(false);
		};
	});
	if (!user) {
		return redirect('/');
	}
	return (
		<section>
			<Typography variant="h5" className={classes.header}>
				{t("header.character.edit")}
			</Typography>
			<Container maxWidth="sm">
				{success && <p>{t("character.edit.success")}</p>}
				{error && (
					<p className="error">
						<span>{t("common.error")}</span> {error}
					</p>
				)}
				<Select
					options={characters.map((character) => {
						return {
							label: `${t(character.name)} (${character.company})`,
							value: character._id,
						};
					})}
					onChange={(e) => {
						setCharacter(e.value);
						const index = characters.findIndex((x) => x._id === e.value);
						setName(characters[index].name);
						setCompany(characters[index].company);
					}}
				/>
				{character !== "" && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							editCharacter(character, name, company);
						}}
					>
						<TextField
							label={t("character.add.name.en")}
							id="standard-name-required"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							fullWidth="true"
							placeholder="Character Name"
							required
						/>
						<Select
							options={COMPANY_NAME.map((company) => {
								return {
									label: company,
									value: company,
								};
							})}
							value={{ label: company, value: company }}
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
									{t("header.character.edit")}
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
