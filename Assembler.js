var fs = require('fs')
var inputFile = process.argv[2];
var inputData = fs.readFileSync(inputFile, 'utf8');

function main() {
   
    if (inputData.length === 0){
        console.log('Your file is empty!')
        return;
    }

 
     mem = inputData.split(/\s+/);
 
    ip = 0;
    dif = 0;
    gg = 0;
    wp = 0;
	//var comands = ['input', 'var', 'output', 'increase', 'multiply','mod', 'sqrt', 'plus', 'pow', 'minus','ifNegative', 'until', 'dif', 'repeat', 'if', 'else', 'check', 'replace'];
	var comands = ['input', '1', 'var','2', 'output','1', 'increase','1', 'multiply','3','mod','3', 'sqrt','2', 'plus','3', 'pow','3', 'minus','3','ifNegative','1', 'until','0', 'dif','2', 'repeat','0', 'if','0', 'else','0', 'check','1', 'replace','2'];
	for ( i = 0; i < mem.length-1; i++){
	console.log('Cage ', i, ' Value ', mem[i]);
	if (comands.indexOf(mem[i]) != -1) {
		arguements=comands[comands.indexOf(mem[i])+1];
		for (var k = 1; k < arguements; k++)
		{
			if (isNaN(parseInt(mem[i+k]))){
				console.log("Arguement exception")
				process.exit(-1)
			}
			
		}
		i+=parseInt(arguements);
	}
	else{
		console.log("Command exception")
		process.exit(-1)
	}
		
}
    for ( i = 0; i < mem.length; i++)
    {
		if (comands.indexOf(mem[i]) == -1 && isNaN(parseInt(mem[i]))) {
			console.log(mem[i])
			console.log("Wrong command")
			process.exit(-1);
		}
        if (mem[i] == "input")
            mem[i] = "x100";
        if (mem[i] == "var")
            mem[i] = "x101";
        if (mem[i] == "output")
            mem[i] = "x102";
        if (mem[i] == "increase")
            mem[i] = "x110";
        if (mem[i] == "multiply")
            mem[i] = "x111";
        if (mem[i] == "mod")
            mem[i] = "x112"
        if (mem[i] == "sqrt")
            mem[i] = "x113";
        if (mem[i] == "plus")
            mem[i] = "x114";
        if (mem[i] == "minus")
            mem[i] = "x115";
        if (mem[i] == "pow")
            mem[i] = "x118";
        if (mem[i] == "ifNegative")
            mem[i] = "x150";
        if (mem[i] == "until")
            mem[i] = "x151";
        if (mem[i] == "dif")
            mem[i] = "x153";
        if (mem[i] == "repeat")
            mem[i] = "x152";
        if (mem[i] == "if")
            mem[i] = "x160";
        if (mem[i] == "else")
            mem[i] = "x161";
        if (mem[i] == "check")
            mem[i] = "x162";
        if (mem[i] == "replace")
        mem[i] = "x163";


    }

    for ( i = 0; i < mem.length; i++){
        console.log('in cage ', i, ' value ', mem[i]);
    }
    fs.writeFileSync("assemlerCode.txt", mem.join(" "),  "utf8")
    
    
}
 
main();