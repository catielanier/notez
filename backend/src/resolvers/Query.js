const { hasPermission } = require ('../utils');

const Query = {

    // Grab the current user if logged in.
    me(parent, args, ctx, info) {
        // check if current user id
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({
            where: { id: ctx.request.userId }
        }, info);
    },

    // Grab all of the users and their permissions
    async users(parent, args, ctx, info) {
        // Check if they're logged in
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do this.')
        }
        // Check if the user has permission to query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

        // If they do, query all the users
        return ctx.db.query.users({}, info);
    }
};

module.exports = Query;
