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
import { Redirect } from "react-router-dom";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { CharacterContext } from "../contexts/CharacterContext";
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
	const { language } = useContext(LanguageContext);
	const { characters, loading, error, editCharacter, success, setSuccess } =
		useContext(CharacterContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [nameJa, setNameJa] = useState("");
	const [nameKo, setNameKo] = useState("");
	const [nameCn, setNameCn] = useState("");
	const [nameTw, setNameTw] = useState("");
	const [character, setCharacter] = useState("");
	useEffect(() => {
		return function cleanup() {
			setSuccess(false);
		};
	});
	if (!user) {
		return <Redirect to="/" />;
	}
	return (
		<section>
			<Typography variant="h5" className={classes.header}>
				{t("header.character.edit")}
			</Typography>
			<Container maxWidth="sm">
				<Select
					options={characters.map((character) => {
						return {
							label: dbLocale(language, character),
							value: character._id,
						};
					})}
					onChange={(e) => {
						setCharacter(e.value);
						const index = characters.findIndex((x) => x._id === e.value);
						setName(characters[index].name);
						setNameKo(characters[index].name_ko);
						setNameJa(characters[index].name_ja);
						setNameCn(characters[index]["name_zh-cn"]);
						setNameTw(characters[index]["name_zh-tw"]);
					}}
				/>
				{character !== "" && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							editCharacter(character, name, nameJa, nameKo, nameCn, nameTw);
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
						<TextField
							label={t("character.add.name.ja")}
							value={nameJa}
							onChange={(e) => {
								setNameJa(e.target.value);
							}}
							fullWidth="true"
							placeholder="キャラクター名"
						/>
						<TextField
							label={t("character.add.name.ko")}
							value={nameKo}
							onChange={(e) => {
								setNameKo(e.target.value);
							}}
							fullWidth="true"
							placeholder="캐릭터 이름"
						/>
						<TextField
							label={t("character.add.name.cn")}
							value={nameCn}
							onChange={(e) => {
								setNameCn(e.target.value);
							}}
							fullWidth="true"
							placeholder="角色名字"
						/>
						<TextField
							label={t("character.add.name.tw")}
							value={nameTw}
							onChange={(e) => {
								setNameTw(e.target.value);
							}}
							fullWidth="true"
							placeholder="角色名字"
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
