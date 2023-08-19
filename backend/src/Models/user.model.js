const { Schema, model } = require("mongoose");

// Importing user middleware for password hashing
const middleware = require("../Middleware/user.middleware");

// Define the user schema
const userSchema = new Schema({
    user_id: {
        type: String,
        unique: true,   // Ensure unique user IDs
        required: true  // User ID is required
    },
    password: {
        type: String,
        required: true  // Password is required
    },
    user_roles: {
        type: String,
        enum: ["Employee", "Employer", "Admin", "CEO"] // User roles should be one of these options
    }
});

// Apply middleware to hash the user password before saving
userSchema.pre("save", middleware.hashUserPassword);

// Create the User model
const User = model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
