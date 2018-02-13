var fs = require('fs')
var line = process.argv[2];
var inputFile = process.argv[3];
//var text = fs.readFileSync(inputFile, 'utf8');
var count = 0;

if (process.argv[2] == "/?")
	console.log("Usage: node find.js 'lineToSearch' 'inputText'")

else
{
	//Slow Variant
	var text = fs.readFileSync(inputFile, 'utf8');
	var start = new Date().getTime();
	for (var i = 0; i < text.length; i++)
	{
		for (var j = 0; j < line.length; j++)
		{
			if (text[i] == line[j])
			{
				count = i;
				break;
			}
			else
			{
				break;
			}
		}
		if (count != 0)
				break;
	}
	console.log('Slow Test')
	console.log('ID of mathing symbol: '+count);
	var slowTest = new Date().getTime() - start;
	console.log('Duration Time of Slow Test: ' +slowTest+ " sec");
	console.log();
	
	
	
	//Fast Variant
	var text = fs.readFileSync(inputFile, 'utf8');
	var start = new Date().getTime();
	var search = function(string, substring) 
	{
		if(substring.length > string.length) 
		{
			return -1;
		}
		var Byte = 256; 
		var Q =1337; //Случайное число
		var Length = substring.length; //Длина подстроки
		var Digit = 1;
		
		for(var a = 1; a <= Length-1; a++) //Обработка числа, с учетом длины входящей подстроки 									
		{									//Высчитывается, для того чтобы убирать нужный эллемент.
			Digit = (Byte*Digit)%Q;
		}
		var substringHash = hash(substring, Length, Q, Byte); //Хеш-значение для подстроки
		var stringHash = hash(string, Length, Q, Byte); //Хеш-значение для строки
		
		for(var i = 1; i+Length-1 <= string.length-1; i++) {
			var resultHash = (stringHash + Q - string.charCodeAt(i-1)*Digit%Q) % Q; //Удаление начальной цифры
			resultHash = (resultHash*Byte%Q+string.charCodeAt(i+Length-1))%Q; //Добавление конечной цифры
			if(resultHash === substringHash) //Сравнение двух хеш-функций.
			{
				return i;
			}
			stringHash = resultHash;
		}
		return -1;
	};

	var hash = function(string, length, Q, Byte) //Расчет некой хеш функции.
	{
		var h = 0;
		for(var i = 0; i < length; i++) 
		{
			h = (h*Byte+string.charCodeAt(i))%Q;
		}
		return h;
	};
	console.log('Fast Test')
	console.log('ID of mathing symbol: ' +search(text,line))
	var FastTest = new Date().getTime() - start;
	console.log('Duration Time of Slow Test: ' +FastTest+ " sec");
	//Вывод в excel'чик
	console.log();
	console.log('Result for graph bulder:');
	var data = [slowTest, FastTest]
	console.log(data);
	var csv = require('fast-csv');
	var ws = fs.createWriteStream('data.txt', {flags: 'a'});
	csv.
	  write([
		[data[0], data [1]],
		[""]
	], {headers:true})
	.pipe(ws);
	
}



