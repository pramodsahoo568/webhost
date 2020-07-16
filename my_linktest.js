
var a = document.getElementById('link2'); //or grab it by tagname etc
a.href = "https://in.yahoo.com/?p=us";

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
  document.getElementById("demo").innerHTML = "" + randomInt(1,100);;
}

