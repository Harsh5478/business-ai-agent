const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: message
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

        return info;

    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw error;
    }
};
const verifyEmailConnection = async () => {
    try {
        await transporter.verify();

        console.log("Gmail connection successful ✅");
    } catch (error) {
        console.error("Gmail connection failed ❌");
        console.error(error.message);
    }
};

module.exports = {
    sendEmail,
    verifyEmailConnection
};

