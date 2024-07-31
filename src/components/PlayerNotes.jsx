import React, { useContext, useState, useEffect } from "react";
import {
	Container,
	Typography,
	Grid,
	Button,
	Modal,
	TextField,
	Hidden,
	Fab,
	Drawer,
	makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Select from "react-select";
import { redirect } from "react-router-dom";
import QuickAddNote from "./QuickAddNote";
import PopulateNotes from "./PopulateNotes";
import PlayerNoteSearch from "./PlayerNoteSearch";
import SearchBar from "./SearchBar";
import dbLocale from "../services/dbLocale";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { NoteContext } from "../contexts/NoteContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "50%",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	button: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
	spaced: {
		marginBottom: theme.spacing(2),
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	wrapper: {
		padding: theme.spacing(3),
	},
	noteList: {
		marginLeft: `-${theme.spacing(2)}px`,
		marginBottom: theme.spacing() * 8,
	},
}));

export default function PlayerNotes() {
	const { t } = useTranslation();
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const { language } = useContext(LanguageContext);
	const {
		playerNotes,
		loading,
		error,
		editNote,
		toggleNoteEditor,
		noteEditor,
		player,
		playerNotesFilter: filter,
		playerNotesGame: game,
		playerFilters: filters,
		displayedPlayerNotes: displayedNotes,
		setDisplayedPlayerNotes: setDisplayedNotes,
	} = useContext(NoteContext);
	const [editFilter, setEditFilter] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [noteId, setNoteId] = useState("");
	const [noteDrawer, setNoteDrawer] = useState(false);
	const showNoteDrawer = () => {
		setNoteDrawer(!noteDrawer);
	};
	useEffect(() => {
		if (game !== "" && player !== "" && filter !== "") {
			const notes = [];
			playerNotes.forEach((note) => {
				if (
					game === note.game &&
					player === note.player &&
					filter === note.filter._id
				) {
					notes.push(note);
				}
			});
			setDisplayedNotes(notes);
		} else if (game !== "" && player !== "" && filter === "") {
			const notes = [];
			playerNotes.forEach((note) => {
				if (game === note.game && player === note.player) {
					notes.push(note);
				}
			});
			setDisplayedNotes(notes);
		}
	}, [playerNotes, game, player, filter]);
	if (!user) {
		return redirect('/');
	}
	return (
		<section className="player-notes">
			{game !== "" && player !== "" && (
				<Hidden smUp>
					<Fab
						className={classes.fab}
						color="primary"
						dark
						aria-label={t("notes.common.quickAdd")}
						onClick={showNoteDrawer}
					>
						<AddIcon />
					</Fab>
					<Drawer anchor="bottom" open={noteDrawer} onClose={showNoteDrawer}>
						<Container className={classes.wrapper}>
							<QuickAddNote
								game={game}
								player={player}
								filters={filters}
								type="Player Note"
							/>
						</Container>
					</Drawer>
				</Hidden>
			)}
			<SearchBar noteType="player" />
			<Container>
				<Grid container spacing={2}>
					<Hidden xsDown>
						<Grid item md={6} xs={12}>
							<Typography variant="h5" className={classes.spaced}>
								{t("header.notes.player")}
							</Typography>
							<PlayerNoteSearch />
						</Grid>
					</Hidden>
					<Grid item md={6} xs={12}>
						<Hidden smUp>
							<Typography variant="h5" className={classes.spaced}>
								{t("header.notes.player")}
							</Typography>
							{(game === "" || player === "") && (
								<Typography variant="subtitle">
									{t("notes.common.clickSearch")}
								</Typography>
							)}
						</Hidden>
						{game !== "" && player !== "" && (
							<Container>
								<Hidden xsDown>
									<Typography variant="h5" className={classes.spaced}>
										{t("notes.common.notes")}
									</Typography>
								</Hidden>
								<Grid container className={classes.noteList}>
									{displayedNotes.length > 0 ? (
										displayedNotes.map((note) => {
											return (
												<PopulateNotes
													key={note._id}
													id={note._id}
													note={note.note}
													filter={dbLocale(language, note.filter)}
													filterId={note.filter._id}
													setEditFilter={setEditFilter}
													setNoteBody={setNoteBody}
													setNoteId={setNoteId}
												/>
											);
										})
									) : (
										<PopulateNotes
											filter={t("notes.common.notice")}
											note={t("notes.common.noNotes")}
										/>
									)}
								</Grid>
								<Hidden xsDown>
									<QuickAddNote
										game={game}
										player={player}
										filters={filters}
										type="Player Note"
									/>
								</Hidden>
							</Container>
						)}
					</Grid>
				</Grid>
			</Container>
			<Modal
				aria-labelledby="editor-title"
				open={noteEditor}
				onClose={() => {
					setNoteId("");
					setEditFilter({});
					setNoteBody("");
					toggleNoteEditor();
				}}
			>
				<Container className={classes.paper}>
					<Typography variant="h5" id="editor-title" className={classes.spaced}>
						{t("notes.common.editing")}
					</Typography>
					{error && <Typography variant="body1">Error: ${error}</Typography>}
					<Typography variant="h6">{t("notes.common.filter")}</Typography>
					<Select
						options={filters.map((filter) => {
							return {
								label: dbLocale(language, filter),
								value: filter._id,
							};
						})}
						onChange={(e) => {
							setEditFilter({ label: e.label, value: e.value });
						}}
						defaultValue={editFilter}
						className={classes.spaced}
					/>
					<TextField
						multiline
						name="note"
						value={noteBody}
						onChange={(e) => {
							setNoteBody(e.target.value);
						}}
						fullWidth
					/>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={() => {
							const result = editNote(
								"Player Note",
								noteId,
								editFilter.value,
								noteBody
							);
							if (result === true) {
								setNoteBody("");
								setNoteId("");
								setEditFilter("");
								toggleNoteEditor();
							}
						}}
					>
						{t("notes.common.edit")}
					</Button>
					<Button
						className={classes.button}
						onClick={() => {
							setNoteId("");
							setEditFilter({});
							setNoteBody("");
							toggleNoteEditor();
						}}
					>
						{t("notes.common.cancel")}
					</Button>
				</Container>
			</Modal>
		</section>
	);
}
