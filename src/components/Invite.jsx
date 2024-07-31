import React, { useState } from "react";
import {
	Typography,
	Container,
	makeStyles,
	TextField,
	CircularProgress,
	Button,
} from "@material-ui/core";
import axios from "axios";
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

export default function Invite() {
	const { t } = useTranslation();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	return (
		<section className="invite-user">
			<Container maxWidth="sm">
				<Typography variant="h5" className={classes.header}>
					{t("account.invite")}
				</Typography>
				<form
					disabled={loading}
					className={classes.container}
					onSubmit={async (e) => {
						e.preventDefault();
						setError(null);
						setLoading(true);
						await axios
							.post("/api/invites", {
								data: {
									email,
								},
							})
							.then((res) => {
								setLoading(false);
								setSuccess(true);
							})
							.catch((err) => {
								console.error(err);
								setLoading(false);
								setError(err.message);
							});
					}}
				>
					<Container maxWidth="sm">
						{success && <p>{t("account.success.invite")}</p>}
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
									{t("header.invite")}
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
					</Container>
				</form>
			</Container>
		</section>
	);
}
