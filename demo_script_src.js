var val=0;
function randomInt(min, max) {
	val = min + Math.floor((max - min) * Math.random())
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
  document.getElementById("demo").innerHTML = "" + randomInt(1,100);;
}

