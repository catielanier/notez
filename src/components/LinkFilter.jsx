import React, { useContext, useState } from "react";
import {
	Container,
	Typography,
	Grid,
	Button,
	makeStyles,
	IconButton,
	CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { redirect } from "react-router-dom";
import Select from "react-select";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { FilterContext } from "../contexts/FilterContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
	spaced: {
		marginBottom: theme.spacing(2),
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

export default function LinkFilter() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { language } = useContext(LanguageContext);
	const { user } = useContext(UserContext);
	const { games, loading, error, success, connectFilters } = useContext(
		GameContext
	);
	const { gameFilters } = useContext(FilterContext);
	const [game, setGame] = useState("");
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [renderedSelectedFilters, setRenderedSelectedFilters] = useState([]);
	const [unselectedFilters, setUnselectedFilters] = useState([]);
	if (!user) {
		return redirect('/');
	}
	return (
		<section className="link-filter">
			<Container maxWidth="sm">
				<Typography variant="h5">{t("filter.link.title")}</Typography>
				{error && (
					<p className="error">
						<span>{t("common.error")}</span> {error}
					</p>
				)}
				{success && <p>{t("filter.link.success")}</p>}
				<Select
					options={games.map((game) => {
						return {
							label: dbLocale(language, game),
							value: game._id,
						};
					})}
					onChange={(e) => {
						setGame(e.value);
						const selected = [];
						const selectedRender = [];
						const index = games.findIndex((x) => x._id === e.value);
						games[index].filters.forEach((filter) => {
							selected.push(filter._id);
							selectedRender.push({
								label: dbLocale(language, filter),
								value: filter._id,
							});
						});
						const unselected = [];
						gameFilters.forEach((filter) => {
							const index = selected.findIndex((id) => filter._id === id);
							if (index === -1) {
								unselected.push(filter);
							}
						});
						setSelectedFilters(selected);
						selectedRender.sort((x, y) => x.label.localeCompare(y.label));
						setRenderedSelectedFilters(selectedRender);
						setUnselectedFilters(unselected);
					}}
				/>
			</Container>
			<Container maxWidth="md">
				{game !== "" && (
					<>
						<Container maxWidth="sm" className={classes.spaced}>
							<Typography variant="h6">{t("filter.link.select")}</Typography>
							<Select
								className={classes.spaced}
								options={unselectedFilters.map((filter) => {
									return {
										value: filter._id,
										label: dbLocale(language, filter),
									};
								})}
								onChange={(e) => {
									setSelectedFilters([...selectedFilters, e.value]);
									const renderedSelected = [...renderedSelectedFilters];
									renderedSelected.push(e);
									renderedSelected.sort((x, y) =>
										x.label.localeCompare(y.label)
									);
									setRenderedSelectedFilters(renderedSelected);
									const unselected = [];
									unselectedFilters.forEach((filter) => {
										if (filter._id !== e.value) {
											unselected.push(filter);
										}
									});
									setUnselectedFilters(unselected);
								}}
							/>
							<Typography variant="h6">{t("filter.link.selected")}</Typography>
							{renderedSelectedFilters.map((filter) => (
								<Grid
									container
									spacing={2}
									key={filter.value}
									alignItems="center"
								>
									<Grid item md={11}>
										<Typography>{filter.label}</Typography>
									</Grid>
									<Grid item md={1}>
										<IconButton
											color="secondary"
											onClick={(e) => {
												e.preventDefault();
												const selected = [];
												const renderedSelected = [];
												selectedFilters.forEach((id) => {
													if (filter.value !== id) {
														selected.push(id);
													}
												});
												renderedSelectedFilters.forEach((render) => {
													if (render.value !== filter.value) {
														renderedSelected.push(render);
													}
												});
												const unselected = [...unselectedFilters];
												const index = gameFilters.findIndex(
													(x) => x._id === filter.value
												);
												unselected.push(gameFilters[index]);
												unselected.sort((x, y) => {
													return dbLocale(language, x).localeCompare(
														dbLocale(language, y)
													);
												});
												setUnselectedFilters(unselected);
												setSelectedFilters(selected);
												setRenderedSelectedFilters(renderedSelected);
											}}
										>
											<ClearIcon />
										</IconButton>
									</Grid>
								</Grid>
							))}
						</Container>
						<Container maxWidth="sm">
							<div className={classes.wrapper}>
								<Button
									variant="contained"
									color="primary"
									disabled={loading}
									onClick={(e) => {
										e.preventDefault();
										connectFilters(game, selectedFilters);
									}}
								>
									{t("header.filter.link")}
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
					</>
				)}
			</Container>
		</section>
	);
}
