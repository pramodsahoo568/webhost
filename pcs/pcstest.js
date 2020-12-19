

var xmlhttp = new XMLHttpRequest();
var vpn_direct_url_path = "direct_vpn_url_list.txt";

var unwritten_direct_from_vpn_url_list = [];
var direct_url_list = [];
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
	  console.log(this.responseText);
    var responsedata = JSON.parse(this.responseText);
    processUrl(responsedata);
  }
};
xmlhttp.open("GET", DanaUrl(vpn_direct_url_path), true);
xmlhttp.send();


function processUrl(responsedata) {
  console.log("#################processUrl##############");
  console.log("direct_urls:"+responsedata.direct_urls);
  /*out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    var directUrl ="";
   try {
    directUrl=  DanaOrigUrl(arr[i].url); 
   } catch (error) {
     console.log("vpn URL:"+arr[i].url);
     console.log("Error:" + error);
   }
   if(directUrl.length>5) { 
    unwritten_direct_from_vpn_url_list.push(directUrl);
   }
   checkValidVPNUrl(directUrl);
   
  } */
  //document.getElementById("id01").innerHTML = out;
  
}




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
   if(directUrl.length>5) { 
    unwritten_direct_from_vpn_url_list.push(directUrl);
   }
   checkValidVPNUrl(directUrl);
   
  }
  //document.getElementById("id01").innerHTML = out;
  
}

function checkValidVPNUrl(url) {
  console.log("VPN URL:"+ url);
  if(directUrl.indexOf("DanaInfo")>0) {
    console.error("URL contains Danainfo URL not constructed properly");
  }
}
/*
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
*/
function processDirectUrl(arr) {
console.log("###########processDirectUrl#########");
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    console.log("Direct Url: "+arr[i].url);
    direct_url_list(arr[i].url);
    checkForValidDirectUrl(arr[i].url);
  }  
}

function checkForValidDirectUrl(url) {
    try {
      var rewrittenUrl = DanaUrl(url);
    } catch (error) {
      console.error("Url Parse error : backslash at the end not allowed \n Or unsupported char is present");
    }
}


var winpath = window.location
