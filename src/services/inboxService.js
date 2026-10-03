const { ImapFlow } = require("imapflow");
const { simpleParser } = require("mailparser");

const Lead = require("../models/Lead");
const { analyzeReply } = require("./replyAnalysisService");
const { decideNextAction } = require("./decisionService");

const processIncomingEmail = async ({
    senderEmail,
    subject,
    message
}) => {

    try {

        console.log("Processing incoming email...");
        console.log("Sender:", senderEmail);
        console.log("Subject:", subject);

        // Find lead using sender's email
        const lead = await Lead.findOne({
            email: senderEmail.toLowerCase()
        });

        // If sender is not one of our leads
        if (!lead) {

            console.log(
                "No matching lead found for:",
                senderEmail
            );

            return;
        }

       console.log(
    `Matching lead found: ${lead.name}`
);

// Analyze customer reply using AI
const analysis = await analyzeReply(message);

console.log("AI Reply Analysis:");
console.log(analysis);

const decision = decideNextAction(analysis, lead);

console.log("Business Decision:");
console.log(decision);

// Update lead status
lead.status = "replied";

// Cancel automatic follow-ups
lead.nextFollowUpAt = null;

// Save AI analysis
lead.intent = analysis.intent;
lead.interestLevel = analysis.interestLevel;
lead.projectLocation = analysis.projectLocation;
lead.material = analysis.material;
lead.expectedVolume = analysis.expectedVolume;
lead.missingInformation = analysis.missingInformation;
lead.sentiment = analysis.sentiment;
lead.requiresHumanAttention = analysis.requiresHumanAttention;

await lead.save();

console.log(
    `Lead ${lead.name} marked as replied and AI analysis saved.`
);

        console.log(
            `Lead ${lead.name} marked as replied.`
        );

        return lead;

    } catch (error) {

        console.error(
            "Incoming email processing failed:",
            error.message
        );

        throw error;
    }
};


const checkInbox = async () => {

    const client = new ImapFlow({
        host: "imap.gmail.com",
        port: 993,
        secure: true,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },

        logger: false
    });

    try {

        await client.connect();

        console.log("Connected to Gmail inbox.");

        const lock = await client.getMailboxLock("INBOX");

        try {

            for await (const message of client.fetch(
                {
                    seen: false
                },
                {
                    source: true,
                    envelope: true
                }
            )) {

                const parsed = await simpleParser(
                    message.source
                );

                const senderEmail =
                    parsed.from?.value?.[0]?.address;

                console.log("--------------------------------");
                console.log("New email received");
                console.log("From:", senderEmail);
                console.log("Subject:", parsed.subject);
                console.log("--------------------------------");

                await processIncomingEmail({
                    senderEmail,
                    subject: parsed.subject,
                    message: parsed.text
                });
            }

        } finally {

            lock.release();
        }

        await client.logout();

    } catch (error) {

        console.error(
            "Inbox checking failed:",
            error.message
        );

        try {
            await client.logout();
        } catch (logoutError) {
            // Ignore logout errors
        }
    }
};


module.exports = {
    checkInbox,
    processIncomingEmail
};