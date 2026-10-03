const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            trim: true
        },

        company: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["new", "contacted", "replied", "converted", "lost"],
            default: "new"
        },

        lastContactedAt: {
            type: Date
        },

        nextFollowUpAt: {
            type: Date
        },

        followUpCount: {
            type: Number,
            default: 0
        },

        doNotContact: {
            type: Boolean,
            default: false
        },

        // AI reply analysis
        intent: {
            type: String
        },

        interestLevel: {
            type: String
        },

        projectLocation: {
            type: String
        },

        material: {
            type: String
        },

        expectedVolume: {
            type: String
        },

        missingInformation: {
            type: [String],
            default: []
        },

        sentiment: {
            type: String
        },

        requiresHumanAttention: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;