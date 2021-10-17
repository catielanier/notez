import React, { useContext, useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
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

export default function AddCharacter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { loading, error, success, createCharacter } =
		useContext(CharacterContext);
	const [name, setName] = useState("");
	const [nameJa, setNameJa] = useState("");
	const [nameKo, setNameKo] = useState("");
	const [nameCn, setNameCn] = useState("");
	const [nameTw, setNameTw] = useState("");
	if (!user) {
		return <Redirect to="/" />;
	}
	return (
		<section className="add-character">
			<Typography className={classes.header} variant="h5">
				{t("header.character.add")}
			</Typography>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createCharacter(name, nameJa, nameKo, nameCn, nameTw);
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
									setNameJa("");
									setNameKo("");
									setNameCn("");
									setNameTw("");
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
