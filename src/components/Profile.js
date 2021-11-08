import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import Select from "react-select";
import dbLocale from "../services/dbLocale";
import countries from "../data/countries";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
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
	input: {
		marginTop: "10px",
	},
}));

export default function Profile() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { user, loading, error, success, updateProfile } = useContext(
		UserContext
	);
	const { language } = useContext(LanguageContext);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [verifyNewPassword, setVerifyNewPassword] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState({});
	const [username, setUsername] = useState("");
	const [realName, setRealName] = useState("");
	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(`/api/users/${user}`);
			setUsername(res.data.data.username);
			setEmail(res.data.data.email);
			setRealName(res.data.data.realName);
			const index = countries.findIndex(
				(x) => x.value === res.data.data.country
			);
			setCountry({
				label: dbLocale(language, countries[index]),
				value: countries[index].value,
			});
		}
		fetchData();
	}, [user]);
	return (
		<section>
			<Container maxWidth="xs">
				<Typography className={classes.header} variant="h5">
					{t("header.profile")}
				</Typography>
				<form
					disabled={loading}
					onSubmit={(e) => {
						e.preventDefault();
						updateProfile(
							email,
							oldPassword,
							newPassword,
							verifyNewPassword,
							username,
							realName,
							country.value
						);
					}}
				>
					{success && <p>{t("account.success.profile")}</p>}
					{error && (
						<p className="error">
							<span>{t("common.error")}</span> {error}
						</p>
					)}
					<TextField
						label={t("account.email")}
						required
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						fullWidth
						value={email}
						className={classes.input}
					/>
					<TextField
						label={t("account.oldPassword")}
						required
						onChange={(e) => {
							setOldPassword(e.target.value);
						}}
						fullWidth
						value={oldPassword}
						type="password"
						className={classes.input}
					/>
					<TextField
						label={t("account.newPassword")}
						required
						onChange={(e) => {
							setNewPassword(e.target.value);
						}}
						fullWidth
						value={newPassword}
						type="password"
						className={classes.input}
					/>
					<TextField
						label={t("account.verifyNew")}
						required
						onChange={(e) => {
							setVerifyNewPassword(e.target.value);
						}}
						fullWidth
						value={verifyNewPassword}
						type="password"
						className={classes.input}
					/>
					<TextField
						label={t("account.username")}
						required
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						fullWidth
						value={username}
						className={classes.input}
					/>
					<TextField
						label={t("account.realname")}
						onChange={(e) => {
							setRealName(e.target.value);
						}}
						fullWidth
						value={realName}
						className={classes.input}
					/>
					<Select
						options={countries.map((x) => {
							return {
								value: x.value,
								label: dbLocale(language, x),
							};
						})}
						value={country}
						onChange={(e) => {
							setCountry({
								label: e.label,
								value: e.value,
							});
						}}
						placeholder={t("account.country")}
						className="country-select"
					/>
					<Container className={classes.buttonRow}>
						<div className={classes.wrapper}>
							<Button
								color="primary"
								variant="contained"
								type="submit"
								disabled={loading}
							>
								{t("account.editProfile")}
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
			</Container>
		</section>
	);
}
