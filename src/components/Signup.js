import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import Select from "react-select";
import { UserContext } from "../contexts/UserContext";
import { CountryContext } from "../contexts/CountryContext";
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

export default function Signup() {
	const { t } = useTranslation();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const [realName, setRealName] = useState("");
	const [country, setCountry] = useState("");
	const [username, setUsername] = useState("");
	const { loading, success, error, signup: doSignup } = useContext(UserContext);
	const countries = useContext(CountryContext);
	return (
		<section className="signup">
			<Container maxWidth="xs">
				<Typography className={classes.header} variant="h5">
					{t("header.signup")}
				</Typography>
				<form
					disabled={loading}
					onSubmit={(e) => {
						e.preventDefault();
						setEmail(email.toLowerCase());
						doSignup(
							email,
							password,
							verifyPassword,
							username,
							realName,
							country
						);
					}}
				>
					{success && <p>{t("account.success.signup")}</p>}
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
						label={t("account.password")}
						required
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						fullWidth
						value={password}
						type="password"
						className={classes.input}
					/>
					<TextField
						label={t("account.verify")}
						required
						onChange={(e) => {
							setVerifyPassword(e.target.value);
						}}
						fullWidth
						value={verifyPassword}
						type="password"
						className={classes.input}
					/>
					<TextField
						label={t("account.username")}
						required
						name="username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						fullWidth
						value={username}
						className={classes.input}
					/>
					<TextField
						label={t("account.realname")}
						name="realName"
						onChange={(e) => {
							setRealName(e.target.value);
						}}
						fullWidth
						value={realName}
						className={classes.input}
					/>
					<Select
						options={countries}
						value={country}
						placeholder={t("account.country")}
						onChange={(e) => {
							setCountry(e.value);
						}}
						className="country-select"
					/>
					<Container className={classes.buttonRow}>
						<div className={classes.wrapper}>
							<Button color="primary" variant="contained" type="submit">
								{t("header.signup")}
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
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/" {...props} />
								))}
							>
								{t("common.goBack")}
							</Button>
						</div>
					</Container>
				</form>
			</Container>
		</section>
	);
}
