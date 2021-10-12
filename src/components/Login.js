import React, { useContext, useState } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	Container,
	CircularProgress,
	makeStyles,
} from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
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

export default function Login() {
	const { t } = useTranslation();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { doLogin, loading, error, success } = useContext(UserContext);
	if (success) {
		return <Redirect to="/" />;
	}
	return (
		<section>
			<Container maxWidth="xs">
				<Typography className={classes.header} variant="h5">
					{t("header.login")}
				</Typography>
				<form
					disabled={loading}
					onSubmit={(e) => {
						e.preventDefault();
						setEmail(email.toLowerCase());
						doLogin(email, password);
					}}
					className={classes.container}
				>
					<Container maxWidth="xs">
						{error && (
							<p className="error">
								<span>Error:</span> {error}
							</p>
						)}
						<Container maxWidth="xs">
							<TextField
								label={t("account.email")}
								id="standard-name"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								fullWidth
							/>
						</Container>
						<Container maxWidth="xs">
							<TextField
								label={t("account.password")}
								value={password}
								id="standard-password-input"
								type="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								fullWidth
							/>
						</Container>
						<Container className={classes.buttonRow}>
							<div className={classes.wrapper}>
								<Button
									variant="contained"
									type="submit"
									color="primary"
									disabled={loading}
								>
									{t("header.login")}
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
						<Container className={classes.buttonRow}>
							<Button
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/forgot" {...props} />
								))}
							>
								{t("account.forgot")}
							</Button>
						</Container>
					</Container>
				</form>
			</Container>
		</section>
	);
}
