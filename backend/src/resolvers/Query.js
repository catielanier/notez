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
    }
};

module.exports = Query;
