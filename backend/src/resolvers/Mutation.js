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
    },

    // Create front-facing sign-in call

    async signin(parent, { email, password }, ctx, info) {
        // 1. check if there is a user with that email
        const user = await ctx.db.query.user({ where: { email } });
        if (!user) {
          throw new Error(`No such user found for email ${email}`);
        }
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Invalid Password!');
        }
        // 3. generate the JWT Token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // 4. Set the cookie with the token
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // 5. Return the user
        return user;
    },
};

module.exports = mutations;
