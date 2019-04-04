const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { hasPermission } = require ('../utils');

const mutations = {

    // Create front-facing mutation for creating new user.
    async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // check to make sure their passwords match
        if (args.password !== args.verifyPassword) {
            throw new Error("Your passwords do not match.");
        }
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the db
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    username: args.username,
                    email: args.email,
                    password,
                    permissions: { set: ['USER'] },
                },
            },
            info
        );
        // create the JWT token
        const token = jwt.sign({
            userId: user.id
        }, process.env.APP_SECRET);
        // set the jwt as a cookie on res
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });
        // return the user to the browser
        return user;
    }
};

module.exports = mutations;
