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
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import Select from "react-select";
import QuickAddNote from "./QuickAddNote";
import PopulateNotes from "./PopulateNotes";
import SearchBar from "./SearchBar";
import GameNotesSearch from "./GameNotesSearch";
import dbLocale from "../services/dbLocale";
import { NoteContext } from "../contexts/NoteContext";
import { GameContext } from "../contexts/GameContext";
import { LanguageContext } from "../contexts/LanguageContext";

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

export default function GameNotes() {
	const { t } = useTranslation();
	const classes = useStyles();
	const {
		gameNotes,
		loading,
		error,
		noteEditor,
		toggleNoteEditor,
		editNote,
		gameNotesGame: game,
		myCharacter,
		opponentCharacter,
		gameNotesFilter: myFilter,
		displayedGameNotes: displayedNotes,
		setDisplayedGameNotes: setDisplayedNotes,
	} = useContext(NoteContext);
	const { filters } = useContext(GameContext);
	const { language } = useContext(LanguageContext);
	const [noteId, setNoteId] = useState("");
	const [editFilter, setEditFilter] = useState({});
	const [noteBody, setNoteBody] = useState("");
	const [noteDrawer, setNoteDrawer] = useState(false);
	const showNoteDrawer = () => {
		setNoteDrawer(!noteDrawer);
	};

	useEffect(() => {
		if (myCharacter !== "" && opponentCharacter !== "" && myFilter !== "") {
			const notes = [];
			gameNotes.forEach((note) => {
				if (
					game === note.game &&
					myCharacter === note.myCharacter &&
					opponentCharacter === note.opponentCharacter &&
					myFilter === note.filter._id
				) {
					notes.push(note);
				}
				if (
					game === note.game &&
					myCharacter === note.myCharacter &&
					note.universal === true &&
					myFilter === note.filter._id
				) {
					notes.push(note);
				}
			});
			setDisplayedNotes(notes);
		} else if (
			myCharacter !== "" &&
			opponentCharacter !== "" &&
			myFilter === ""
		) {
			const notes = [];
			gameNotes.forEach((note) => {
				if (
					game === note.game &&
					myCharacter === note.myCharacter &&
					opponentCharacter === note.opponentCharacter
				) {
					notes.push(note);
				}
				if (
					game === note.game &&
					myCharacter === note.myCharacter &&
					note.universal === true
				) {
					notes.push(note);
				}
			});
			setDisplayedNotes(notes);
		}
	}, [
		myFilter,
		myCharacter,
		opponentCharacter,
		gameNotes,
		game,
		setDisplayedNotes,
	]);

	return (
		<section className="game-notes">
			{game !== "" && myCharacter !== "" && opponentCharacter !== "" && (
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
								myCharacter={myCharacter}
								opponentCharacter={opponentCharacter}
								filters={filters}
								type="Game Note"
							/>
						</Container>
					</Drawer>
				</Hidden>
			)}
			<SearchBar noteType="game" />
			<Container>
				<Grid container spacing={2}>
					<Hidden xsDown>
						<Grid item md={6} xs={12}>
							<Typography variant="h5" className={classes.spaced}>
								{t("header.notes.game")}
							</Typography>
							<GameNotesSearch />
						</Grid>
					</Hidden>
					<Grid item md={6} xs={12}>
						<Hidden smUp>
							<Typography variant="h5" className={classes.spaced}>
								{t("header.notes.game")}
							</Typography>
							{(game === "" ||
								myCharacter === "" ||
								opponentCharacter === "") && (
								<Typography variant="subtitle">
									{t("notes.common.clickSearch")}
								</Typography>
							)}
						</Hidden>
						{game !== "" && myCharacter !== "" && opponentCharacter !== "" && (
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
										myCharacter={myCharacter}
										opponentCharacter={opponentCharacter}
										filters={filters}
										type="Game Note"
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
								"Game Note",
								noteId,
								editFilter.value,
								noteBody
							);
							if (result === true) {
								setNoteId("");
								setEditFilter({});
								setNoteBody("");
								toggleNoteEditor();
							}
						}}
					>
						{t("notes.common.edit")}
					</Button>
					<Button className={classes.button} onClick={toggleNoteEditor}>
						{t("notese.common.cancel")}
					</Button>
				</Container>
			</Modal>
		</section>
	);
}
