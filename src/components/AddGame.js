import React, { useState, useContext } from "react";
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
	const { loading, error, createGame, success } = useContext(GameContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [nameJa, setNameJa] = useState("");
	const [nameKo, setNameKo] = useState("");
	const [nameCn, setNameCn] = useState("");
	const [nameTw, setNameTw] = useState("");
	if (!user) {
		return <Redirect to="/" />;
	}
	return (
		<section className="add-game">
			<Typography className={classes.header} variant="h5">
				{t("header.game.add")}
			</Typography>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createGame(name, nameJa, nameKo, nameCn, nameTw);
				}}
				disabled={loading}
			>
				<Container maxWidth="sm">
					{success && <p>{t("game.add.created")}</p>}
					{error && (
						<p className="error">
							<span>Error:</span> {error}
						</p>
					)}
					<TextField
						label={t("game.add.title.en")}
						id="standard-name-required"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						fullWidth="true"
						placeholder="Game Title"
						required
					/>
					<TextField
						label={t("game.add.title.ja")}
						value={nameJa}
						onChange={(e) => {
							setNameJa(e.target.value);
						}}
						fullWidth="true"
						placeholder="ゲームタイトル"
					/>
					<TextField
						label={t("game.add.title.ko")}
						value={nameKo}
						onChange={(e) => {
							setNameKo(e.target.value);
						}}
						fullWidth="true"
						placeholder="게임 제목"
					/>
					<TextField
						label={t("game.add.title.cn")}
						value={nameCn}
						onChange={(e) => {
							setNameCn(e.target.value);
						}}
						fullWidth="true"
						placeholder="电子游戏标题"
					/>
					<TextField
						label={t("game.add.title.tw")}
						value={nameTw}
						onChange={(e) => {
							setNameTw(e.target.value);
						}}
						fullWidth="true"
						placeholder="電子遊戲標題"
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
