const { model: GameNote } = require("./gameNoteModel");
const { model: User } = require("../../users/userModel");

exports.createNote = async newNote => {
  try {
    const note = await new GameNote(newNote);
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
