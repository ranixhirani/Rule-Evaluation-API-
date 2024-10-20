# Rule-Evaluation-API-
A Node.js and Express-based rule engine using Abstract Syntax Trees (AST) to evaluate user eligibility based on conditions (e.g., age, department). Supports adding, combining, and evaluating rules, with MongoDB for storage. Features a REST API for rule management and evaluation.
# Features:
Add New Rules: Define and store rules using logical conditions (e.g., age > 30 AND department == 'Sales').
Rule Evaluation: Evaluate user data against the rules using AST to determine eligibility.
REST API: Exposes endpoints to add and evaluate rules.
MongoDB: Rules are persisted and retrieved from a MongoDB database.
# Tech Stack:
Node.js: Backend runtime
Express.js: Web framework for API creation
MongoDB: NoSQL database for storing rules
Mongoose: Object Data Modeling (ODM) library for MongoDB
JavaScript (ES6+): Modern JavaScript syntax, including async/await
HTML : For frontend
# Endpoints:
1. POST /add_rule: Add a new rule to the database.
2. POST /evaluate_rule: Evaluate a rule against provided user data.

# GETTING STARTED:
1. Clone the Repo:
git clone https://github.com/your-username/Rule-Evaluation-API-.git
2. Install dependencies:
   npm install
3. Start the Server:
   npm start
4. Make sure the server is running locally on mongodb://localhost:27017
