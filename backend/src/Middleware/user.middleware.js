const bcrypt = require("bcryptjs");

/**
 * Middleware function to hash the user's password before saving.
 * @param {Function} next - The next function in the middleware chain.
 */

async function hashUserPassword(next) {
    try {
        if (this.isModified("password")) {
            // Hash the password asynchronously using bcrypt
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    hashUserPassword
};
