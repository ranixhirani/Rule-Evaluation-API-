// controllers/ruleController.js
const parseRule = (ruleString) => {
    const tokens = ruleString.match(/(\w+|[()<>!=]+|AND|OR)/g);
    const stack = [];
    const output = [];

    tokens.forEach(token => {
        if (/\w+/.test(token)) {
            output.push({ type: "operand", value: { field: token, operator: undefined, compareValue: undefined } });
        } else if (["AND", "OR"].includes(token)) {
            stack.push({ type: "operator", value: token });
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); // Remove the '('
        } else {
            // Assuming the token is a comparison operator (e.g., >, <, =)
            const operand = output.pop();
            operand.value.operator = token; 
            output.push(operand);
        }
    });

    while (stack.length) {
        output.push(stack.pop());
    }

    return buildAST(output);
};

const buildAST = (output) => {
    const stack = [];

    output.forEach(token => {
        if (token.type === "operand") {
            stack.push(token);
        } else if (token.type === "operator") {
            const right = stack.pop();
            const left = stack.pop();
            stack.push({ type: "operator", value: token.value, left, right });
        }
    });

    return stack[0]; // The root of the AST
};

const create_rule = (rule_string) => {
    return parseRule(rule_string);
};

const combine_rules = (rules) => {
    const asts = rules.map(create_rule);
    
    if (asts.length === 0) return null;

    // Combine using an AND operator for demonstration purposes
    let combinedAST = { type: "operator", value: "AND", left: asts[0], right: asts[1] };

    for (let i = 2; i < asts.length; i++) {
        combinedAST = { type: "operator", value: "AND", left: combinedAST, right: asts[i] };
    }

    return combinedAST;
};

// Existing evaluate_rule logic
const evaluate_rule_logic = (ast_node, user_data) => {
    if (ast_node.type === "operand") {
        const { field, operator, compareValue } = ast_node.value;
        switch (operator) {
            case '>':
                return user_data[field] > compareValue;
            case '<':
                return user_data[field] < compareValue;
            case '=':
                return user_data[field] === compareValue;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }

    // For operators (AND, OR)
    const leftResult = evaluate_rule_logic(ast_node.left, user_data);
    const rightResult = evaluate_rule_logic(ast_node.right, user_data);

    switch (ast_node.value) {
        case "AND":
            return leftResult && rightResult;
        case "OR":
            return leftResult || rightResult;
        default:
            throw new Error(`Unknown node type: ${ast_node.type}`);
    }
};

// API Endpoint to Evaluate Combined Rules
router.post('/evaluate_rule', async (req, res) => {
    const { rules, user_data } = req.body;

    try {
        const combinedAST = combine_rules(rules);
        const result = evaluate_rule_logic(combinedAST, user_data);
        res.status(200).send({ eligible: result });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
