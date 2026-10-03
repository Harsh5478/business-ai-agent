const express = require("express");
const { createLead,getLeads,getLeadById,updateLead,deleteLead,sendLeadEmail,generateLeadEmail} = require("../controllers/leadController");

const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

router.post("/:id/send-email", sendLeadEmail);
router.post("/:id/generate-email", generateLeadEmail);

module.exports = router;

