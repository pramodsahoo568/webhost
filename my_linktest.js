
"https://pramodsahoo568.github.io/webhost/dropdown_arrow_normal.svg"
var myObj, x;
myObj = {"name":"Path", "filename":"https://pramodsahoo568.github.io/webhost/dropdown_arrow_normal.svg"};
filepath = myObj.filename;

var a = document.getElementById('link2'); //or grab it by tagname etc
a.href = "https://pramodsahoo568.github.io/webhost/index1.html";

var b = document.getElementById('linkimage1'); //or grab it by tagname etc
b.href = filepath;



function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
  document.getElementById("demo").innerHTML = "" + randomInt(1,100);;
}

