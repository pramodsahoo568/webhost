var direct_url_list = [];
var vpn_url_list = [];
var unwritten_direct_from_vpn_url_list = [];

// get vpn url list
var xmlhttp_vpn = new XMLHttpRequest();
var vpn_url_path = "vpn_urls.json";

xmlhttp_vpn.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
    var responsedata = JSON.parse(this.responseText);
    vpn_url_list = responsedata;
    //processUrl(responsedata);
  }
};
xmlhttp_vpn.open("GET", DanaUrl(vpn_url_path), true);
xmlhttp_vpn.send();


// get direct url list
var xmlhttp_direct = new XMLHttpRequest();
var direct_url_path = "direct_urls.json";

xmlhttp_direct.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
    var responsedata = JSON.parse(this.responseText);
    direct_url_list = responsedata;
  }
};
xmlhttp_direct.open("GET", DanaUrl(direct_url_path), true);
xmlhttp_direct.send();



function processUrl() {
  console.log("#################processUrl##############");

  processVpnUrl(vpn_url_list);
  processDirectUrl(direct_url_list);
  validateUnwrittenVPNUrlWithDirectUrl(vpn_url_list, direct_url_list);
}






function processVpnUrl(arr) {
  console.log("#################processVpnUrl##############");
  var out = "";
  var i;
  for (i = 0; i < arr.length; i++) {
    var vpn_url = arr[i];
    console.log("vpn URL:" + vpn_url);
    validateVPNUrl(vpn_url);
    validateUnwrittenOriginalUrl(vpn_url);

  }
  //document.getElementById("id01").innerHTML = out;

}

function validateUnwrittenOriginalUrl(vpn_url) {

  var directUrl = "";
  try {
    directUrl = DanaOrigUrl(vpn_url);
  } catch (error) {
    console.log("Error:" + error);
  }
  if (directUrl.indexOf("DanaInfo") > 0) {
    console.error("Unwritten URL contains Danainfo, URL not constructed properly");
  }
}


function validateVPNUrl(vpn_url) {
  if (vpn_url.indexOf("DanaInfo") < 0) {
    console.error("VPN URL Does not contain  Danainfo , Not Re-written ,going direct to server ");
  }
}

function validateUnwrittenVPNUrlWithDirectUrl(vpn_url_list, direct_url_list) {
  console.log("################# validateUnwrittenVPNUrlWithDirectUrl #################");
  var directUrl = "";
  for (i = 0; i < vpn_url_list.length; i++) {
    var vpn_url = vpn_url_list[i];
    console.log("vpn URL:" + vpn_url);

    try {
      directUrl = DanaOrigUrl(vpn_url);
    } catch (error) {
      console.log("Error:" + error);
    }

    if (direct_url_list.includes(directUrl)) {
      console.log("Unwritten VPN DanaOrigUrl URL matches with direct url");
    } else {
      console.error("Unwritten VPN DanaOrigUrl URL Does not matches with direct url");
    }
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
  for (i = 0; i < arr.length; i++) {
    console.log("Direct Url: " + arr[i]);
    checkForValidDirectUrl(arr[i]);
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
