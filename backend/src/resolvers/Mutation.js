const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
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

    // Request a password reset

    async requestReset(parent, args, ctx, info) {
        // 1. Check if this is a real user
        const user = await ctx.db.query.user({ where: { email: args.email } });
        if (!user) {
            throw new Error(`No such user found for email ${args.email}`);
        }
        // 2. Set a reset token and expiry on that user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken, resetTokenExpiry },
        });
        // 3. Email them that reset token
        const mailRes = await transport.sendMail({
            from: 'NoteZ',
            to: user.email,
            subject: 'Your Password Reset Token',
            html: makeANiceEmail(`Your Password Reset Token is here!
            \n\n
            <a href="${process.env
                .FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
        });
    
        // 4. Return the message
        return { message: 'Thanks!' };
    },

    // Reset the password
    async resetPassword(parent, args, ctx, info) {
        // 1. check if the passwords match
        if (args.password !== args.verifyPassword) {
            throw new Error("Your passwords don't match!");
        }
        // 2. check if its a legit reset token
        // 3. Check if its expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000
            }
        });
        if (!user) {
            throw new Error('This token is either invalid or expired!');
        }
        // 4. Hash their new password
        const password = await bcrypt.hash(args.password, 10);
        // 5. Save the new password to the user and remove old resetToken fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null
            }
        });
        // 6. Generate JWT
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
        // 7. Set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // 8. return the new user
        return updatedUser;
    },

    // Sign the user out
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!' };
    },

    // Create front-facing mutation for updating permissions
    async updatePermissions(parent, args, ctx, info) {
        // 1. Check if they are logged in
        if (!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        // 2. Query the current user
        const currentUser = await ctx.db.query.user(
            {
                where: {
                    id: ctx.request.userId,
                },
            },
            info
        );
        // 3. Check if they have permissions to do this
        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
        // 4. Update the permissions
        return ctx.db.mutation.updateUser(
            {
                data: {
                    permissions: {
                        set: args.permissions,
                    },
                },
                where: {
                    id: args.userId,
                },
            },
            info
        );
    },

    // Create front-facing mutation to update user password
    async changePassword(parent, args, ctx, info) {
        // Check if they're logged in.
        if (!ctx.request.userId) {
            throw new Error('You must be logged in');
        }
        // Query the user
        const user = await ctx.db.query.user({ where: { email: ctx.request.user.email } });
        // Verify old password
        const valid = await bcrypt.compare(args.oldPassword, user.password);
        if (!valid) {
            throw new Error('Invalid Password!');
        }
        // Check if new passwords match
        if (args.newPassword !== args.verifyNewPassword) {
            throw new Error("Your passwords don't match!");
        }
        // Make sure new password is not the same as the old one
        if (args.newPassword === args.oldPassword) {
            throw new Error("You cannot make your new password the same as your current one!");
        }
        // Hash the new password
        const password = await bcrypt.hash(args.newPassword, 10);
        // Update the user's password
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: ctx.request.user.email },
            data: {
                password
            }
        }, info);
        // Return the user
        return updatedUser;
    },

    // Create a game
    async createGame(parent, args, ctx, info) {
        // Check if user is logged in.
        if (!ctx.request.userId) {
            throw new Error('You must be logged in');
        }
        // Get the arguments from the user.
        const game = {...args};

        const newGame = await ctx.db.mutation.createGame({
            data: {
                ...game
            }
        }, info);

        return newGame;
    }
};

module.exports = mutations;
