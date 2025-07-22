import {model as GameNote} from './gameNoteModel.js';
import {model as User} from '../../users/userModel.js';

export const createNote = async newNote => {
	try {
		const note = new GameNote(newNote);
		return await note.save();
	} catch (e) {
		throw e;
	}
};

export const getUserNotes = async id => {
	try {
		return await GameNote.find({
			$or: [
				{ author: id },
				{ sharedWith: id }
			]
		});
	} catch (e) {
		throw e;
	}
};

export const deleteNote = async noteId => {
	try {
		return await GameNote.findByIdAndDelete(noteId);
	} catch (e) {
		throw e;
	}
};

export const removeShare = async (noteid, userId) => {
	try {
		return await GameNote.findByIdAndUpdate(
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

export const getNoteById = async noteId => {
	try {
		return await GameNote.findById(noteId);
	} catch (e) {
		throw e;
	}
};

export const updateNote = async (id, note, filter) => {
	try {
		return await GameNote.findByIdAndUpdate(
			id,
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
