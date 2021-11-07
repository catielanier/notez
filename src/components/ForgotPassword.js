import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
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

export default function ForgotPassword() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { loading, error, success, requestReset } = useContext(UserContext);
	const [email, setEmail] = useState("");
	return (
		<section>
			<Container maxWidth="sm">
				<Typography className={classes.header} variant="h5">
					{t("account.forgot")}
				</Typography>
				<form
					disabled={loading}
					onSubmit={(e) => {
						e.preventDefault();
						requestReset(email);
					}}
					className={classes.container}
				>
					<Container maxWidth="sm">
						{success && <p>{t("account.checkEmail")}</p>}
						{error && (
							<p className="error">
								<span>{t("common.error")}</span> {error}
							</p>
						)}
						<Container maxWidth="sm">
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
						<Container className={classes.buttonRow}>
							<div className={classes.wrapper}>
								<Button
									variant="contained"
									type="submit"
									color="primary"
									disabled={loading}
								>
									{t("account.requestReset")}
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
										<RouterLink innerRef={ref} to="/login" {...props} />
									))}
								>
									{t("common.goBack")}
								</Button>
							</div>
						</Container>
					</Container>
				</form>
			</Container>
		</section>
	);
}
