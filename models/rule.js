// models/rule.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleString: String,
    createdAt: { type: Date, default: Date.now }
});

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule; // Export the model for use in other files
