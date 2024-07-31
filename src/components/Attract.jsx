import React from "react";
import Particles from "react-particles";
import { Container, Typography, Grid, Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
	buttonRow: {
		display: "flex",
		alignItems: "center",
		marginTop: theme.spacing(2),
	},
	wrapper: {
		margin: theme.spacing(1),
		position: "relative",
	},
}));

function Attract(props) {
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<>
			<Particles
				params={{
					particles: {
						number: {
							value: 90,
						},
						size: {
							value: 5,
						},
					},
					interactivity: {
						events: {
							onhover: {
								enable: true,
								mode: "repulse",
							},
						},
					},
				}}
				className="particle"
			/>
			<Container className="attract">
				<Grid container spacing={2}>
					<Grid item md={6} xs={12}>
						<img className="main-logo" src={logo} alt={t("app.name")} />
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography variant="h3" gutterBottom>
							{t("home.title")}
						</Typography>
						<Typography variant="h5" gutterBottom>
							{t("home.subtitle")}
						</Typography>
						<Hidden xsDown>
							<Typography variant="body2" gutterBottom>
								{t("home.description.partOne")}
							</Typography>
							<Typography variant="body2" gutterBottom>
								{t("home.description.partTwo")}
							</Typography>
							<Typography variant="body2" gutterBottom>
								{t("home.description.partThree")}
							</Typography>
						</Hidden>
						<Container className={classes.buttonRow}>
							<Button
								variant="contained"
								color="primary"
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/login" {...props} />
								))}
								className={classes.wrapper}
							>
								{t("home.existing")}
							</Button>
							<Button
								variant="outlined"
								color="primary"
								className={classes.wrapper}
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/signup" {...props} />
								))}
							>
								{t("home.new")}
							</Button>
						</Container>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Attract;
