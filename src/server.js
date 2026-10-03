require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { startFollowUpScheduler } = require("./services/followUpService");
const { processIncomingEmail } = require("./services/inboxService");
const { analyzeReply } = require("./services/replyAnalysisService");
const { decideNextAction } = require("./services/decisionService");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

            startFollowUpScheduler();
        });

        const testMessage = `
Yes, we need a crusher for our project in Indore.
We will be processing basalt, around 500 tons per day.
        `;

        const analysis = await analyzeReply(testMessage);
        const decision = decideNextAction(analysis);

console.log("Business Decision:");
console.log(decision);

        console.log("AI Reply Analysis:");
        console.log(analysis);

        await processIncomingEmail({
            senderEmail: "YOUR_TEST_LEAD_EMAIL",
            subject: "Interested in crusher service",
            message: testMessage
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();