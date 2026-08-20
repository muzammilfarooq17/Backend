const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required For Creating an Account"],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email Address"],
        unique: true, // Custom error message not supported directly here; handle via duplicate key error (code 11000)
    },
    name: {
        type: String,
        required: [true, "Name Is Required For Creating an Account"],
    },
    password: {
        type: String,
        required: [true, "Password Is Required For Creating an Account"],
        minlength: [6, "Password Should Contain 6 Or More Characters"],
        select: false,
    },
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;