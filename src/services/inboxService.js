
const { ImapFlow } = require("imapflow");
const { simpleParser } = require("mailparser");

const Lead = require("../models/Lead");
const { analyzeReply } = require("./replyAnalysisService");
const { decideNextAction } = require("./decisionService");

let inboxCheckRunning = false;

// Process one incoming email
const processIncomingEmail = async ({
    senderEmail,
    subject,
    message
}) => {
    try {
        console.log("Processing incoming email...");
        console.log("Sender:", senderEmail);
        console.log("Subject:", subject);

        // Validate sender and message
        if (!senderEmail) {
            console.log("Email has no sender address. Skipping.");
            return null;
        }

        if (typeof message !== "string" || !message.trim()) {
            console.log("Email has no readable text. Skipping.");
            return null;
        }

        // Find the matching lead
        const normalizedEmail = senderEmail.trim().toLowerCase();

        const lead = await Lead.findOne({
            email: normalizedEmail
        });

        if (!lead) {
            console.log("No matching lead found:", normalizedEmail);
            return null;
        }

        console.log(`Matching lead found: ${lead.name}`);

        // Analyze the reply
        const analysis = await analyzeReply(message);

        console.log("Reply analysis:", analysis);

        // Decide the next business action
        const decision = decideNextAction(analysis, lead);

        console.log("Business decision:", decision);

        // Save reply details
        lead.status = "replied";

        // Stop scheduled follow-ups after a reply
        lead.nextFollowUpAt = null;

        lead.intent = analysis.intent;
        lead.interestLevel = analysis.interestLevel;
        lead.projectLocation = analysis.projectLocation;
        lead.material = analysis.material;
        lead.expectedVolume = analysis.expectedVolume;
        lead.missingInformation = analysis.missingInformation;
        lead.sentiment = analysis.sentiment;

        lead.requiresHumanAttention =
            analysis.requiresHumanAttention ||
            decision.action === "human_attention";

        // Respect an explicit opt-out
        if (decision.action === "stop_followups") {
            lead.doNotContact = true;
            console.log("Opt-out detected. Future contact is disabled.");
        }

        await lead.save();

        console.log(`Lead ${lead.name} updated successfully.`);
        console.log("Next action:", decision.action);

        return lead;
    } catch (error) {
        console.error(
            "Incoming email processing failed:",
            error.message
        );
        throw error;
    }
};

// Check Gmail inbox for unread messages
const checkInbox = async () => {
    // Prevent overlapping inbox checks
    if (inboxCheckRunning) {
        console.log("Inbox check already running. Skipping.");
        return;
    }

    inboxCheckRunning = true;

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

    let connected = false;

    try {
        await client.connect();
        connected = true;

        console.log("Connected to Gmail inbox.");

        const lock = await client.getMailboxLock("INBOX");

        try {
            for await (const email of client.fetch(
                { seen: false },
                { source: true, envelope: true, uid: true }
            )) {
                try {
                    const parsed = await simpleParser(email.source);

                    const senderEmail =
                        parsed.from?.value?.[0]?.address;

                    console.log("--------------------------------");
                    console.log("Unread email received");
                    console.log("From:", senderEmail);
                    console.log("Subject:", parsed.subject);
                    console.log("--------------------------------");

                    await processIncomingEmail({
                        senderEmail,
                        subject: parsed.subject,
                        message: parsed.text || ""
                    });

                    // Mark as read only after processing completes
                    await client.messageFlagsAdd(
                        email.uid,
                        ["\\Seen"],
                        { uid: true }
                    );

                    console.log("Email marked as read.");
                } catch (emailError) {
                    // Leave failed messages unread so they can be retried
                    console.error(
                        `Failed to process email UID ${email.uid}:`,
                        emailError.message
                    );
                }
            }
        } finally {
            lock.release();
        }
    } catch (error) {
        console.error("Inbox check failed:", error.message);
    } finally {
        if (connected) {
            try {
                await client.logout();
                console.log("Disconnected from Gmail.");
            } catch (logoutError) {
                console.error(
                    "Gmail logout failed:",
                    logoutError.message
                );
            }
        }

        inboxCheckRunning = false;
    }
};

module.exports = {
    checkInbox,
    processIncomingEmail
};
