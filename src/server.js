
require("dotenv").config();

const { checkInbox } = require("./services/inboxService");
const app = require("./app");
const connectDB = require("./config/db");
const { startFollowUpScheduler } = require("./services/followUpService");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

            // Start the existing follow-up scheduler
            startFollowUpScheduler();

            // Check inbox immediately when the server starts
            checkInbox();

            // Check inbox again every 60 seconds
            setInterval(() => {
                checkInbox();
            }, 60 * 1000);

            console.log("Inbox checker scheduled every 60 seconds");
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();
