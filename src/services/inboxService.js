const { ImapFlow } = require("imapflow");
const { simpleParser } = require("mailparser");

const Lead = require("../models/Lead");
const { analyzeReply } = require("./replyAnalysisService");
const { decideNextAction } = require("./decisionService");


// ======================================================
// PROCESS ONE INCOMING EMAIL
// ======================================================

const processIncomingEmail = async ({
    senderEmail,
    subject,
    message
}) => {

    try {

        console.log("Processing incoming email...");
        console.log("Sender:", senderEmail);
        console.log("Subject:", subject);

        // --------------------------------------------------
        // Find lead using sender's email
        // --------------------------------------------------

        const lead = await Lead.findOne({
            email: senderEmail.toLowerCase()
        });

        // --------------------------------------------------
        // If sender is not one of our leads
        // --------------------------------------------------

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


        // --------------------------------------------------
        // Analyze customer reply
        // --------------------------------------------------

        const analysis = await analyzeReply(message);

        console.log("AI Reply Analysis:");
        console.log(analysis);


        // --------------------------------------------------
        // Decide next business action
        // --------------------------------------------------

        const decision = decideNextAction(
            analysis,
            lead
        );

        console.log("Business Decision:");
        console.log(decision);


        // --------------------------------------------------
        // Update lead status
        // --------------------------------------------------

        lead.status = "replied";


        // --------------------------------------------------
        // Cancel automatic follow-ups
        // --------------------------------------------------

        lead.nextFollowUpAt = null;


        // --------------------------------------------------
        // Save reply analysis
        // --------------------------------------------------

        lead.intent = analysis.intent;

        lead.interestLevel =
            analysis.interestLevel;

        lead.projectLocation =
            analysis.projectLocation;

        lead.material =
            analysis.material;

        lead.expectedVolume =
            analysis.expectedVolume;

        lead.missingInformation =
            analysis.missingInformation;

        lead.sentiment =
            analysis.sentiment;

        lead.requiresHumanAttention =
            analysis.requiresHumanAttention;


        // --------------------------------------------------
        // Save changes to MongoDB
        // --------------------------------------------------

        await lead.save();


        console.log(
            `Lead ${lead.name} marked as replied and analysis saved.`
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



// ======================================================
// CHECK GMAIL INBOX
// ======================================================

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

        // --------------------------------------------------
        // Connect to Gmail
        // --------------------------------------------------

        await client.connect();

        console.log(
            "Connected to Gmail inbox."
        );


        // --------------------------------------------------
        // Lock INBOX
        // --------------------------------------------------

        const lock =
            await client.getMailboxLock("INBOX");


        try {

            // --------------------------------------------------
            // Fetch unread emails
            // --------------------------------------------------

            for await (
                const message of client.fetch(
                    {
                        seen: false
                    },
                    {
                        source: true,
                        envelope: true
                    }
                )
            ) {

                // --------------------------------------------------
                // Parse email
                // --------------------------------------------------

                const parsed =
                    await simpleParser(
                        message.source
                    );


                // --------------------------------------------------
                // Get sender email
                // --------------------------------------------------

                const senderEmail =
                    parsed.from?.value?.[0]?.address;


                console.log("--------------------------------");

                console.log(
                    "New email received"
                );

                console.log(
                    "From:",
                    senderEmail
                );

                console.log(
                    "Subject:",
                    parsed.subject
                );

                console.log("--------------------------------");


                // --------------------------------------------------
                // Process email
                // --------------------------------------------------

                await processIncomingEmail({

                    senderEmail,

                    subject: parsed.subject,

                    message: parsed.text
                });
            }


        } finally {

            // --------------------------------------------------
            // Release mailbox lock
            // --------------------------------------------------

            lock.release();
        }


        // --------------------------------------------------
        // Logout from Gmail
        // --------------------------------------------------

        await client.logout();

        console.log(
            "Disconnected from Gmail."
        );


    } catch (error) {

        // ==================================================
        // DETAILED IMAP ERROR
        // ==================================================

        console.error(
            "========== INBOX ERROR =========="
        );

        console.error(
            "message:",
            error?.message
        );

        console.error(
            "name:",
            error?.name
        );

        console.error(
            "code:",
            error?.code
        );

        console.error(
            "command:",
            error?.command
        );

        console.error(
            "response:",
            error?.response
        );

        console.error(
            "responseCode:",
            error?.responseCode
        );

        console.error(
            "stack:",
            error?.stack
        );

        console.error(
            "================================="
        );


        // --------------------------------------------------
        // Try to logout safely
        // --------------------------------------------------

        try {

            await client.logout();

        } catch (logoutError) {

            console.error(
                "Logout failed:",
                logoutError?.message
            );
        }
    }
};



// ======================================================
// EXPORT FUNCTIONS
// ======================================================

module.exports = {

    checkInbox,

    processIncomingEmail
};