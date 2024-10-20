// routes/rule.js
const express = require('express');
const router = express.Router();
const Rule = require('../models/rule'); // Import the Rule model

// API Endpoint to Add a Rule
router.post('/add_rule', async (req, res) => {
    const newRule = new Rule(req.body);
    await newRule.save();
    res.status(201).send(newRule);
});

module.exports = router; // Export the router
