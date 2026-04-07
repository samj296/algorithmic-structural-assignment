const mongoose = require("mongoose");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            match: emailRegex
        },
        passwordHash: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);