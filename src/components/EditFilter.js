import React, { useContext, useState } from "react";
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

export default function EditFilter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { language } = useContext(LanguageContext);
	const { filters, loading, error, editFilter, success } =
		useContext(FilterContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState("");
	const [nameJa, setNameJa] = useState("");
	const [nameKo, setNameKo] = useState("");
	const [nameCn, setNameCn] = useState("");
	const [nameTw, setNameTw] = useState("");
	const [filter, setFilter] = useState("");
	if (!user) {
		return <Redirect to="/" />;
	}
	return (
		<section>
			<Typography variant="h5" className={classes.header}>
				{t("header.filter.edit")}
			</Typography>
			<Container maxWidth="sm">
				{success && <p>{t("filter.edit.success")}</p>}
				{error && (
					<p className="error">
						<span>{t("common.error")}</span> {error}
					</p>
				)}
				<Select
					options={filters.map((filter) => {
						return {
							label: dbLocale(language, filter),
							value: filter._id,
						};
					})}
					onChange={(e) => {
						setFilter(e.value);
						const index = filters.findIndex((x) => x._id === e.value);
						setName(filters[index].name);
						setNameKo(filters[index].name_ko);
						setNameJa(filters[index].name_ja);
						setNameCn(filters[index]["name_zh-cn"]);
						setNameTw(filters[index]["name_zh-tw"]);
					}}
				/>
				{filter !== "" && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							editFilter(filter, name, nameJa, nameKo, nameCn, nameTw);
						}}
					>
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
									{t("header.filter.edit")}
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
