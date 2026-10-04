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

            startFollowUpScheduler();
            checkInbox();
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();