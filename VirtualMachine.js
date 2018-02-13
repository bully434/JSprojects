function main() {
 var fs = require('fs')
 var file = process.argv[2];
 var value1 = process.argv[3];
 var value2 = process.argv[4];
 var inputData = fs.readFileSync(file, 'utf8');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (inputData.length === 0){
	console.log('Wrong input file!')
	return;
}
inputData += ' x170';

mem = inputData.split(/\s+/);
id = 0;
foo = 0;
bar = 0;
elseExist=0;
var elsereg=[];
//var comands = ['input', 'var', 'output', 'increase', 'multiply','mod', 'sqrt', 'plus', 'pow', 'minus','ifNegative', 'until', 'dif', 'repeat', 'if', 'else', 'check', 'replace'];
var comands = ['x100', '1', 'x101','2', 'x102','1', 'x110','1', 'x111','3','x112','3', 'x113','2', 'x114','3', 'x118','3', 'x115','3','x150','1', 'x151','0', 'x153','2', 'x152','0', 'x160','0', 'x161','0', 'x162','1', 'x163','2', 'x170', '0'];
for ( i = 0; i < mem.length-1; i++){
	console.log('Cage ', i, ' Value ', mem[i]);
	if (comands.indexOf(mem[i]) != -1) {
		arguements=comands[comands.indexOf(mem[i])+1];
		if (mem[i] == 'x161'){
			elseExist=1;
			elsereg.push(i+1);
		}
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
var register=[];
while(mem[id] !== 'x170'){
	switch (mem[id]){
		case 'x100':
			if (mem[id+1] == "10"){
					register[mem[id + 1]] = parseFloat(value1);
					
					id += 2;
			}
                if (mem[id+1] == "11"){
                register[mem[id + 1]] = parseFloat(value2);
                id += 2;
            }
                break; 
		case 'x162':
			if (register[mem[id+1]]<0)
				register[mem[id+1]]*=-1;
			id+=2;
			break;
		case 'x102':
			console.log('Result: ' + register[mem[id + 1]]);
			id += 2;
			break;
		case 'x150':
			if (register[mem[id+1]] < 0){
				process.exit(-1);
			}
			else
				id+=2;
			break;

		case 'x114':
			register[mem[id + 1]] = register[mem[id + 3]] + register[mem[id + 2]];
			id += 4;
			break;
		case 'x115':
			mem[mem[id + 1]] = mem[mem[id + 3]] - mem[mem[id + 2]];
			id += 4;
			break;
		case 'x111':
			register[mem[id + 1]] = register[mem[id + 3]] * register[mem[id + 2]];
			id += 4;
			break;
		case 'x118':
			mem[mem[id + 1]] = Math.pow(mem[mem[id + 2]],mem[mem[id + 3]]);
			id += 4;
			break;
		case 'x113':
			mem[mem[id + 1]] = Math.sqrt(mem[mem[id + 2]]);
			id += 3;
			break;
		case 'x110':
			register[mem[id + 1]]++;
			id += 2;
			break;
		case 'x101':
			register[mem[id + 1]] = Number(mem[id + 2]);
			id += 3;
			break;
		case 'x153':
			foo = register[mem[id + 1]] -  register[mem[id + 2]];
			id += 3;
			break;
		case 'x152':
			if (foo > 0){
				id = bar;
			}
			else
			{
				id += 1;
			}
			break;
		case 'x160':
			if (foo === 0){
				if (elseExist == 1)
				{
					id = elsereg.pop();
				}
			}
			else
			{
				id += 1;
			}
			break;
		case 'x151':
			bar = id;
			id+=1;
			break;
		case 'x170':
			return;
		case 'x163':
			register[mem[id + 1]] = register[mem[id + 2]];
			id += 3;
			break;
		case 'x112':
			register[mem[id + 1]] = register[mem[id + 2]] % register[mem[id + 3]];
			id += 4;
			break;
		case 'x161':
			id = bar;
			id+=1;
			break;
	}

}
}
main();