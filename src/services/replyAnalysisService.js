const analyzeReply = async (message) => {
    console.log("Analyzing customer reply...");

    const text = message.toLowerCase();

    let intent = "unknown";
    let sentiment = "neutral";

    // -------------------------
    // Intent detection
    // -------------------------

    if (
        text.includes("not interested") ||
        text.includes("no requirement") ||
        text.includes("don't need") ||
        text.includes("do not need")
    ) {
        intent = "not_interested";
    }
    else if (
        text.includes("price") ||
        text.includes("pricing") ||
        text.includes("cost") ||
        text.includes("quotation") ||
        text.includes("quote")
    ) {
        intent = "asking_price";
    }
    else if (
        text.includes("interested") ||
        text.includes("requirement") ||
        text.includes("need crusher") ||
        text.includes("looking for")
    ) {
        intent = "interested";
    }

    // -------------------------
    // Sentiment detection
    // -------------------------

    if (
        text.includes("thanks") ||
        text.includes("thank you") ||
        text.includes("interested") ||
        text.includes("good")
    ) {
        sentiment = "positive";
    }
    else if (
        text.includes("not interested") ||
        text.includes("no thanks") ||
        text.includes("don't need")
    ) {
        sentiment = "negative";
    }

    // -------------------------
    // Information extraction
    // -------------------------

    let projectLocation = null;
    let material = null;
    let expectedVolume = null;

    if (text.includes("indore")) {
        projectLocation = "Indore";
    }

    if (text.includes("basalt")) {
        material = "basalt";
    }

    if (text.includes("500 tons")) {
        expectedVolume = "500 tons/day";
    }

    // -------------------------
    // Missing information
    // -------------------------

    const missingInformation = [];

    if (!projectLocation) {
        missingInformation.push("projectLocation");
    }

    if (!material) {
        missingInformation.push("material");
    }

    if (!expectedVolume) {
        missingInformation.push("expectedVolume");
    }

    // -------------------------
    // Interest level
    // -------------------------

    let interestLevel = "low";

    if (intent === "interested") {
        interestLevel = "high";
    }

    // -------------------------
    // Human attention
    // -------------------------

    const requiresHumanAttention =
        intent === "asking_price" ||
        interestLevel === "high";

    return {
        intent,
        interestLevel,
        projectLocation,
        material,
        expectedVolume,
        missingInformation,
        sentiment,
        requiresHumanAttention
    };
};

module.exports = {
    analyzeReply
};