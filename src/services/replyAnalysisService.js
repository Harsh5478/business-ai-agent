const analyzeReply = async (message) => {
    console.log("Analyzing customer reply...");

    const text = message.toLowerCase().trim();

    let intent = "unknown";
    let sentiment = "neutral";

    // -------------------------
    // Intent detection
    // -------------------------

    if (
        text.includes("not interested") ||
        text.includes("no requirement") ||
        text.includes("don't need") ||
        text.includes("do not need") ||
        text.includes("not required")
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
        text.includes("looking for") ||
        text.includes("need") ||
        text.includes("required")
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
        text.includes("good") ||
        text.includes("great")
    ) {
        sentiment = "positive";
    }
    else if (
        text.includes("not interested") ||
        text.includes("no thanks") ||
        text.includes("don't need") ||
        text.includes("do not need")
    ) {
        sentiment = "negative";
    }

    // -------------------------
    // Project location
    // -------------------------

    let projectLocation = null;

    const locations = [
        "indore",
        "bhopal",
        "pithampur",
        "jabalpur",
        "ujjain",
        "dewas"
    ];

    const detectedLocation = locations.find((location) =>
        text.includes(location)
    );

    if (detectedLocation) {
        projectLocation =
            detectedLocation.charAt(0).toUpperCase() +
            detectedLocation.slice(1);
    }

    // -------------------------
    // Material
    // -------------------------

    let material = null;

    const materials = [
        "basalt",
        "limestone",
        "granite",
        "aggregate",
        "stone"
    ];

    const detectedMaterial = materials.find((item) =>
        text.includes(item)
    );

    if (detectedMaterial) {
        material = detectedMaterial;
    }

    // -------------------------
    // Expected volume
    // -------------------------

    let expectedVolume = null;

    const volumeMatch = text.match(
        /\b\d+(?:\.\d+)?\s*(?:tons?|tonnes?)(?:\s*\/\s*(?:day|month|week))?\b/i
    );

    if (volumeMatch) {
        expectedVolume = volumeMatch[0];
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
    else if (intent === "asking_price") {
        interestLevel = "medium";
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