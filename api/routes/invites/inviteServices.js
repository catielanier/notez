import {model as Invite} from './inviteModel';

export const createInvite = async (newInvite) => {
	try {
		const invite = new Invite(newInvite);
		return await invite.save();
	} catch (e) {
		throw e;
	}
};

export const getInvite = async (id) => {
	try {
		return await Invite.findById({_id: id});
	} catch (e) {
		throw e;
	}
};

export const deleteInvite = async (id) => {
	try {
		return await Invite.findByIdAndDelete({_id: id});
	} catch (e) {
		throw e;
	}
};
