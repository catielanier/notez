import React, { useContext, useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	makeStyles,
} from "@material-ui/core";
import { redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { FilterContext } from "../contexts/FilterContext";
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

export default function AddFilter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { loading, success, error, createFilter } = useContext(FilterContext);
	const [name, setName] = useState("");
	const [nameJa, setNameJa] = useState("");
	const [nameKo, setNameKo] = useState("");
	const [nameCn, setNameCn] = useState("");
	const [nameTw, setNameTw] = useState("");
	const [playerFilter, setPlayerFilter] = useState(false);
	const togglePlayerFilter = () => {
		setPlayerFilter(!playerFilter);
	};
	if (!user) {
		return redirect('/');
	}
	return (
		<section className="add-character">
			<Typography className={classes.header} variant="h5">
				{t("header.filter.add")}
			</Typography>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createFilter(name, nameJa, nameKo, nameCn, nameTw, playerFilter);
				}}
				disabled={loading}
			>
				<Container maxWidth="sm">
					{success && <p>{t("filter.add.created")}</p>}
					{error && (
						<p className="error">
							<span>{t("common.error")}</span> {error}
						</p>
					)}
					<FormControlLabel
						control={
							<Checkbox
								checked={playerFilter}
								onChange={togglePlayerFilter}
								value={playerFilter}
								color="primary"
							/>
						}
						label={t("filter.add.player")}
					/>
					<TextField
						label={t("filter.add.type.en")}
						id="standard-name-required"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						fullWidth="true"
						placeholder="Filter Type"
						required
					/>
					<TextField
						label={t("filter.add.type.ja")}
						value={nameJa}
						onChange={(e) => {
							setNameJa(e.target.value);
						}}
						fullWidth="true"
						placeholder="フィルタータイプ"
					/>
					<TextField
						label={t("filter.add.type.ko")}
						value={nameKo}
						onChange={(e) => {
							setNameKo(e.target.value);
						}}
						fullWidth="true"
						placeholder="필터 타입"
					/>
					<TextField
						label={t("filter.add.type.cn")}
						value={nameCn}
						onChange={(e) => {
							setNameCn(e.target.value);
						}}
						fullWidth="true"
						placeholder="过滤器类型"
					/>
					<TextField
						label={t("filter.add.type.tw")}
						value={nameTw}
						onChange={(e) => {
							setNameTw(e.target.value);
						}}
						fullWidth="true"
						placeholder="過濾器類型"
					/>
					<Container className={classes.buttonRow}>
						<div className={classes.wrapper}>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								disabled={loading}
							>
								{t("header.filter.add")}
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
									setPlayerFilter(false);
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
