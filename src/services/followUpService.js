const cron = require("node-cron");

const Lead = require("../models/Lead");
const { generateFollowUpEmail } = require("./aiService");
const { sendEmail } = require("./emailService");

const startFollowUpScheduler = () => {

    // Run every minute
    cron.schedule("* * * * *", async () => {

        try {
            console.log("Checking for follow-ups...");

            const now = new Date();

            const leads = await Lead.find({
                status: "contacted",
                doNotContact: false,
                nextFollowUpAt: {
                    $lte: now
                },
                followUpCount: {
                    $lt: 2
                }
            });

            if (leads.length === 0) {
                console.log("No follow-ups due.");
                return;
            }

            console.log(`${leads.length} follow-up(s) due.`);

            for (const lead of leads) {

                try {

                    console.log(`Processing follow-up for ${lead.email}`);

                    // Generate follow-up email using AI
                    let message;

if (process.env.DRY_RUN === "true") {

    console.log(
        `[DRY RUN] Would generate and send follow-up to ${lead.email}`
    );

    message = `Hi ${lead.name},

This is a test follow-up message from the B.L.M Infra automation system.

We are following up regarding your crusher requirement.

Regards,
B.L.M Infra`;

} else {

    message = await generateFollowUpEmail(lead);

    await sendEmail(
        lead.email,
        "Following Up on Your Crusher Requirement",
        message
    );
}

                    // Update follow-up information
                    lead.followUpCount += 1;
                    lead.lastContactedAt = new Date();

                    // Schedule next follow-up
                    if (lead.followUpCount < 2) {

                        const nextDate = new Date();

                        // Next follow-up after 3 days
                        nextDate.setDate(nextDate.getDate() + 3);

                        lead.nextFollowUpAt = nextDate;

                    } else {

                        // No more automatic follow-ups
                        lead.nextFollowUpAt = null;
                    }
                       await lead.save();

if (process.env.DRY_RUN === "true") {
    console.log(
        `[DRY RUN] Follow-up processed successfully for ${lead.email}`
    );
} else {
    console.log(
        `Follow-up sent successfully to ${lead.email}`
    );
}

                } catch (error) {

                    console.error(
                        `Follow-up failed for ${lead.email}:`,
                        error.message
                    );

                }
            }

        } catch (error) {

            console.error(
                "Follow-up scheduler error:",
                error.message
            );

        }

    });

    console.log("Follow-up scheduler started.");
};

module.exports = {
    startFollowUpScheduler
};