var val=0;
function randomInt(min, max) {
	val = min + Math.floor((max - min) * Math.random())
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
  document.getElementById("demo").innerHTML = "" + randomInt(1,100);;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
    }
  };
  xhttp.open("GET", "images/Circle.png", true);
  xhttp.send(); 
}

  


