import {model as PlayerNote} from "./playerNoteModel";
import {model as User} from "../../users/userModel";

export const createNote = async (newNote) => {
	try {
		const note = new PlayerNote(newNote);
		return await note.save();
	} catch (e) {
		throw e;
	}
};

export const linkNoteToUser = async (userId, noteId) => {
	try {
		return await User.findByIdAndUpdate(
			{_id: userId},
			{
				$push: {
					playerNotes: {
						_id: noteId
					}
				}
			}
		);
	} catch (e) {
		throw e;
	}
};

export const getNoteById = async (noteId) => {
	try {
		return await PlayerNote.findById({_id: noteId}).populate({
			path: "filter"
		});
	} catch (e) {
		throw e;
	}
};

export const deleteNote = async (noteId) => {
	try {
		return await PlayerNote.findByIdAndDelete({_id: noteId});
	} catch (e) {
		throw e;
	}
};

export const updateNote = async (id, note, filter) => {
	try {
		return await PlayerNote.findByIdAndUpdate(
			{_id: id},
			{
				$set: {
					filter: {
						_id: filter
					},
					note
				}
			}
		);
	} catch (e) {
		throw e;
	}
};

export const unlinkPlayerNote = async (userId, noteId) => {
	try {
		return await User.findByIdAndUpdate(
			{_id: userId},
			{$pull: {playerNotes: {_id: noteId}}}
		);
	} catch (e) {
		throw e;
	}
};
