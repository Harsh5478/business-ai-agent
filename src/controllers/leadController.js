const Lead = require("../models/Lead");
const { sendEmail } = require("../services/emailService");
const { generateEmail } = require("../services/aiService");

const createLead = async (req, res) => {
    try {
        const { name, email, phone, company } = req.body;

        const lead = await Lead.create({
            name,
            email,
            phone,
            company
        });

        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            leads
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
            lead
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const sendLeadEmail = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        const { subject, message } = req.body;

        if (!subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Subject and message are required"
            });
        }

        await sendEmail(
            lead.email,
            subject,
            message
        );

        const nextFollowUpDate = new Date();

// First follow-up after 2 days
nextFollowUpDate.setDate(nextFollowUpDate.getDate() + 2);

await Lead.findByIdAndUpdate(
    lead._id,
    {
        status: "contacted",
        lastContactedAt: new Date(),
        nextFollowUpAt: nextFollowUpDate,
        followUpCount: 0
    },
    {
        new: true
    }
);

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
            email: lead.email
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const generateLeadEmail = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        const email = await generateEmail(lead);

        res.status(200).json({
            success: true,
            message: "Email generated successfully",
            email
        });

    } catch (error) {
        console.error("Generate email error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    sendLeadEmail,
    generateLeadEmail
};