import {model as PlayerNote} from "./playerNoteModel.js";
import {model as User} from "../../users/userModel.js";

export const createNote = async (newNote) => {
	try {
		const note = new PlayerNote(newNote);
		return await note.save();
	} catch (e) {
		throw e;
	}
};

export const getUserNotes = async id => {
	try {
		return await PlayerNote.find({
			$or: [
				{ author: id },
				{ sharedWith: id }
			]
		});
	} catch (e) {
		throw e;
	}
};

export const removeShare = async (noteid, userId) => {
	try {
		return await PlayerNote.findByIdAndUpdate(
			noteId,
			{
				$pull: {
					sharedWith: {
						_id: userId
					}
				}
			}
		)
	} catch (e) {
		throw e;
	}
}

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
					filter,
					note
				}
			}
		);
	} catch (e) {
		throw e;
	}
};
