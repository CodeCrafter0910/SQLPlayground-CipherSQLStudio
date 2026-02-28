const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
    {
        assignmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
        success: {
            type: Boolean,
            default: false,
        },
        rowCount: {
            type: Number,
            default: 0,
        },
        errorMessage: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Attempt", attemptSchema);
