const mongoose = require("mongoose");

const sampleRowSchema = new mongoose.Schema(
    {},
    { strict: false, _id: false }
);

const tableSchema = new mongoose.Schema({
    tableName: { type: String, required: true },
    columns: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true },
            _id: false,
        },
    ],
    sampleRows: [sampleRowSchema],
});

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy",
        },
        tables: [tableSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
