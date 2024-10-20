const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import router
const ruleRouter = require('./routes/rule');
const app = express();
const port = 8002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 
app.use('/rule', ruleRouter); 

mongoose.connect('mongodb://localhost:27017/rule_engine', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
