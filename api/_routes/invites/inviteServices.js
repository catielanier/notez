const { model: Invite } = require("./inviteModel");

exports.createInvite = async (newInvite) => {
  try {
    const invite = new Invite(newInvite);
    return await invite.save();
  } catch (e) {
    throw e;
  }
};
