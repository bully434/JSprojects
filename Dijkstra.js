var fs = require("fs");
var input = process.argv[2];
//INFIX TO POSTFIX
function InfixToPostfix(input)
{
	stack = [];
	postfix= [];
	changesign=0;
	multi=0;
	for(var i=0; i< input.length; i++)
	{
		if (input[i] == ' ' || input[i] == ',') continue;
		else if (input[i] == '-' && (input[i-1] == undefined || input[i-1] == '('))
		{
			changesign = 1;
		}
		else if (IsOperator(input[i]))
		{
			/*if (IsOperator(input[i-1])) {
				console.log("Mistake with operand "+input[i]);
				process.exit(-1);
			}*/
			
			while (stack.length > 0 && stack[stack.length-1] != '(' && HashPrecedence(stack[stack.length-1], input[i]))
			{
				postfix += stack[stack.length-1];
				stack.pop();	
			}
			stack.push(input[i]);
		}
		else if (IsOperand(input[i])){
			if(changesign!=undefined && changesign==1 && !(IsOperand(input[i+1])))
			{
				changesign=0;
				postfix += 0;
				postfix += input[i];
				postfix += "-";
				break;
			}
			if (IsOperand(input[i+1])){
				if (changesign==1) {
				postfix += 0;
				changesign=2;
				}
				if (multi==0){
				postfix += "'";
				multi=1;
				}
				postfix += input[i];
			}
			else if (IsOperand(input[i-1]) && IsOperand(input[i+1]))
			{
				postfix += input[i];
			}
			else if (!IsOperand(input[i+1]) && multi==1)
			{
				postfix += input[i];
				postfix += "'";	
				multi=0;
				if (changesign==2) {
				postfix += "-";
				multi=0;
				changesign=0;
				}
				
			}
			else postfix += input[i];
		}
		
		else if (input[i] == '(') 
		{
			if (IsOperand(input[i-1]))
			{
				console.log("You forgot about operand before '('");
				process.exit(-1);
			}
			else stack.push(input[i]);
		}

		else if (input[i] == ')') 
		{
			if (stack.indexOf('(') == -1) {
				console.log("You forgot about '('");
				process.exit(-1);
			}

			while(stack.length > 0 && stack[stack.length-1] != '(') 
			{
				postfix += stack[stack.length-1];
				stack.pop();
			}
			stack.pop();
			
		}

		
		
		
	}
	while(stack.length > 0)
	{
		postfix += stack[stack.length-1];
		stack.pop();
	}
	if (postfix.indexOf('(') != -1 ){
		console.log("You forgot about ')'")
		process.exit(-1);
	}
	return postfix;
} 

function IsOperand(c) 
{
	if(c >= '0' && c <= '9' ||c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') return true;
	return false;
}

function IsOperator(c)
{
	if(c == '+' || c == '-' || c == '*' || c == '/' || c== '^')
		return true;
	return false;
}

function IsRightAssociative(op)
{
	if (op == '^') return true;
	else return false;
}	

function GetWeight(op)
{
	var weight = -1;
	switch (op)
	{
		case '+':
		case '-':
			weight = 1;
		break;
		case '*':
		case '/':
			weight = 2;
		break;
		case '^':
			weight = 3;
		break;
	}
	return weight;
}
function HashPrecedence (op1, op2)
{
	var op1Weight = GetWeight(op1);
	var op2Weight = GetWeight(op2);
	if (op1Weight == op2Weight)
	{
		if(IsRightAssociative(op1)) return false;
		else return true;
	}
	if (op1Weight > op2Weight)
			return true;
	else return false;
}
//POSTFIX TO CALCULATE
function evaluate(tokens){
    var stack = [];
    var operators = "^+-*/"; 
    
    for (var i=0; i<tokens.length; i++) 
    {
        if (operators.indexOf(tokens[i]) == -1) 
        {
            stack.push(tokens[i]);
        } 
        else 
        {
			var a = "";
			var b = "";
			var firstcut = stack.pop();
			if (firstcut == "'") {
				var cut = "";
				while ( cut != "'")
				{
					a += cut;
					cut = stack.pop();
				}
				a=parseInt(a.split("").reverse().join(""));

			}
			else a = parseInt(firstcut);
			if (isNaN(a))
			{
				console.log("Mistake with operand "+input[i]);
				process.exit(-1);		
			}
			var secondcut = stack.pop();
			if (secondcut == "'") {
				var cut = "";
				while ( cut != "'")
				{
					b += cut;
					cut = stack.pop();
				}	
				b=parseInt(b.split("").reverse().join(""));
			}
            else b = parseInt(secondcut);
			if (isNaN(b))
			{
				console.log("Mistake with operand "+input[i]);
				process.exit(-1);		
			}
            switch (tokens[i]) 
            {
            case "+":    
                stack.push(a + b);
                break;
            case "-":
                stack.push(b - a);
                break;
            case "*":
                stack.push(a * b);
                break;
            case "/":
                stack.push(b / a);
                break;
			case "^":    
				stack.push(Math.pow(b, a));
				break;
            }
               
        }
    }
    return stack.pop();
};
console.log(InfixToPostfix(input));
console.log(evaluate(InfixToPostfix(input)));
