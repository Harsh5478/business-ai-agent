const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateEmail = async (lead) => {
    try {
        const response = await client.responses.create({
            model: "gpt-5.6-luna",

            input: `
You are a professional business sales assistant.

Write a short, friendly and professional email to a potential customer.

Customer information:
Name: ${lead.name}
Company: ${lead.company || "their company"}
Lead status: ${lead.status}

Business information:
Business name: B.L.M Infra
Service: Crusher services
Service area: Across India

Purpose of the email:
- Thank the customer for their inquiry.
- Understand their crusher service requirement.
- Ask for the project location.
- Ask what type of material they need to process.
- Ask for the expected volume.
- Tell them these details will help us recommend the right solution and provide accurate pricing.
- Encourage them to reply.

Important:
- Address the customer by their first name.
- Keep the email concise.
- Be professional and natural.
- Do not make claims that were not provided.
- Do not invent pricing, project details, or company information.
- Do not use excessive marketing language.
- Return only the email body.
            `
        });

        return response.output_text;

    } catch (error) {
        console.error("AI email generation failed:", error.message);
        throw error;
    }
};
const generateFollowUpEmail = async (lead) => {
    try {
        const response = await client.responses.create({
            model: "gpt-5.6-luna",

            input: `
You are a professional business sales assistant.

Write a short and polite follow-up email to a potential customer.

Customer information:
Name: ${lead.name}
Company: ${lead.company || "their company"}

Business information:
Business name: B.L.M Infra
Service: Crusher services
Service area: Across India

This is a follow-up to a previous email.

Purpose:
- Politely follow up regarding their crusher requirement.
- Ask whether they have had a chance to review the previous message.
- Remind them that we need the project location, material type, and expected volume to recommend the appropriate solution and provide accurate pricing.
- Encourage them to reply if they are still interested.

Important:
- Address the customer by their first name.
- Keep the email short.
- Be professional and natural.
- Do not sound pushy.
- Do not invent pricing, project details, or company information.
- Do not make unsupported claims.
- Return only the email body.
            `
        });

        return response.output_text;

    } catch (error) {
        console.error(
            "AI follow-up email generation failed:",
            error.message
        );

        throw error;
    }
};

module.exports = {
    generateEmail,
    generateFollowUpEmail
};