
"https://pramodsahoo568.github.io/webhost/dropdown_arrow_normal.svg"
var myObj, x;
myObj = {"name":"Path", "filename":"https://pramodsahoo568.github.io/webhost/dropdown_arrow_normal.svg"};
filepath = myObj.filename;

var a = document.getElementById('link2'); //or grab it by tagname etc
a.href = "/webhost/cookie_redirect1.html";

var b = document.getElementById('linkimage1'); //or grab it by tagname etc


//Access_Token={"User_ID":"129892","Token":"2459592165236-1022959-37688923"}


function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
	
	var date = new Date();
	date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
	var expires = date.toGMTString();
	name='Access_Token';
	value='{"User_ID":"129892","Token":"2459592165236-1022959-37688923"}'
    console.log("1:"+document.cookie);
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
	console.log("2:"+document.cookie);
    document.getElementById("demo").innerHTML = "" + "Cookie is Set";;
}



function myRedirect() {
	
	var date = new Date();
	date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
	var expires = date.toGMTString();
	name='Access_Token';
	value='{"User_ID":"129892","Token":"2459592165236-1022959-37688923"}'
    console.log("1:"+document.cookie);
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
	console.log("2:"+document.cookie);
    document.getElementById("demo2").innerHTML = "" + "Cookie is Set";
	window.location.replace("/webhost/cookie_redirect1.html");
}