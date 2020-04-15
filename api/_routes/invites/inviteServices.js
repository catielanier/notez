const { model: Invite } = require("./inviteModel");

exports.createInvite = async (newInvite) => {
  try {
    const invite = new Invite(newInvite);
    return await invite.save();
  } catch (e) {
    throw e;
  }
};

exports.getInvite = async (id) => {
  try {
    return await Invite.findById({ _id: id });
  } catch (e) {
    throw e;
  }
};
