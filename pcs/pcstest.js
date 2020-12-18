

var xmlhttp_vpn = new XMLHttpRequest();
var vpn_url = "vpn_url.txt";

xmlhttp_vpn.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
	//console.log(this.responseText);
    var myArr = JSON.parse(this.responseText);
    processVpnUrl(myArr);
  }
};
xmlhttp_vpn.open("GET", DanaUrl(vpn_url), true);
xmlhttp_vpn.send();

function processVpnUrl(arr) {
  console.log("#################processVpnUrl##############");
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    var directUrl ="";
   try {
    directUrl=  DanaOrigUrl(arr[i].url); 
   } catch (error) {
     console.log("vpn URL:"+arr[i].url);
     console.log("Error:" + error);
   }
   console.log("VPN URL:"+ arr[i].url);
   if(directUrl.indexOf("DanaInfo")>0) {
     console.error("URL contains Danainfo URL not constructed properly");
   }
   
   
  }
  //document.getElementById("id01").innerHTML = out;
  
}


var xmlhttp_direct = new XMLHttpRequest();
var direct_url = "direct_url.txt";

xmlhttp_direct.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
	//console.log(this.responseText);
    var myArr = JSON.parse(this.responseText);
    processDirectUrl(myArr);
  }
};
xmlhttp_direct.open("GET", DanaUrl(direct_url), true);
xmlhttp_direct.send();

function processDirectUrl(arr) {
console.log("###########processDirectUrl#########");
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    console.log("Direct Url: "+arr[i].url);
  }  
}



var winpath = window.location
