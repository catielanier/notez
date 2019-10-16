const { model: PlayerNote } = require("./playerNoteModel");
const { model: User } = require("../../users/userModel");

exports.createNote = async newNote => {
  try {
    const note = await new PlayerNote(newNote);
    return await note.save();
  } catch (e) {
    throw e;
  }
};

exports.linkNoteToUser = async (userId, noteId) => {
  try {
    return await User.findByIdAndUpdate(
      { _id: userId },
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

exports.getNoteById = async noteId => {
  try {
    return await PlayerNote.findById({ _id: noteId }).populate({
      path: "filter"
    });
  } catch (e) {
    throw e;
  }
};
