const { forwardTo } = require('prisma-binding');
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
    },
    
    games: forwardTo('db'),
    
    async gameNotes(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to view notes.');
        }

        const { userId } = ctx.request;

        const { you, opponent, filter, game } = args;
        
        return ctx.db.query.gameNotes({
            where: {
                user: {
                    id: userId,
                    you,
                    opponent,
                    filter,
                    game
                }
            }
        }, info);
    },

    playerNotes: forwardTo('db'),
    
    characters: forwardTo('db'),

    gameFilters: forwardTo('db'),

    playerFilters: forwardTo('db')
};

module.exports = Query;
