const decideNextAction = (analysis, lead) => {
    console.log("Deciding next action...");

    // 1. Customer is not interested
    if (analysis.intent === "not_interested") {
        return {
            action: "stop_followups",
            reason: "Customer is not interested"
        };
    }

    // 2. Customer is asking for pricing
    if (analysis.intent === "asking_price") {
        return {
            action: "human_attention",
            reason: "Customer is asking for pricing"
        };
    }

    // 3. Important information is missing
    if (
        analysis.missingInformation &&
        analysis.missingInformation.length > 0
    ) {
        return {
            action: "ask_missing_information",
            missingInformation: analysis.missingInformation,
            reason: "More information is required from the customer"
        };
    }

    // 4. High-interest customer
    if (analysis.interestLevel === "high") {
        return {
            action: "human_attention",
            reason: "Customer shows high interest"
        };
    }

    // 5. Customer is interested
    if (analysis.intent === "interested") {
        return {
            action: "continue_conversation",
            reason: "Customer is interested"
        };
    }

    // 6. Default
    return {
        action: "no_action",
        reason: "No specific action was identified"
    };
};

module.exports = {
    decideNextAction
};