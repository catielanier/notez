import {model as GameNote} from './gameNoteModel';
import {model as User} from '../../users/userModel';

export const createNote = async newNote => {
	try {
		const note = new GameNote(newNote);
		return await note.save();
	} catch (e) {
		throw e;
	}
};

export const linkNoteToUser = async (userId, noteId) => {
	try {
		return await User.findByIdAndUpdate(
			userId,
			{
				$push: {
					gameNotes: {
						_id: noteId
					}
				}
			}
		);
	} catch (e) {
		throw e;
	}
};

export const unlinkGameNote = async (userId, noteId) => {
	try {
		return await User.findByIdAndUpdate(
			userId,
			{$pull: {gameNotes: {_id: noteId}}}
		);
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

export const getNoteById = async noteId => {
	try {
		return await GameNote.findById(noteId).populate({
			path: 'filter'
		});
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
