var cnf = {
    redirectURI: document.location.href,
    authURI: "https://idbridge.liveperson.net/api/account/71820006/unauth/req/aHR0cHM6Ly9zdHMuZmRuZXQuY29tL2FkZnMvbHMvaWRwaW5pdGlhdGVkc2lnbm9uLmFzcHg-bG9naW5Ub1JwPUxpdmVQZXJzb25JREJyaWRnZQ==",
    clientID: "O4LeiFG0nl7fjUS0FpBts1u5VUIlyqoN",
    response_type: "token"
};   
 
lpGetJWT = function (callback) {
    var frameUrl = document.getElementById("samlredirect").src;
    var idtoken = getParameterByName("id_token", frameUrl);
 
    // Redirect the iframe                            
    document.getElementById('samlredirect').src = "https://sts.fdnet.com/adfs/ls/idpinitiatedsignon.aspx?RelayState=RPID%3DLivePersonIDBridge%26RelayState%3DaHR0cHM6Ly9oZWxwZGVza2NoYXQuZmRuZXQuY29tL2xhbmRpbmdwYWdlLmh0bWw=";
 
       var i = 0;
    var scheduleNextTimeout; 
    scheduleNextTimeout = function(){
        setTimeout(function() {
            // Try to find the id_token 10 times max before displaying the offline survey
            if(i < 45){
                // Check if the iframe url contains the id_token
                mytoken = checkForToken();
 
                // If the id_token is set, pass it to the callback
                if(mytoken){
                    callback(mytoken);
                    return;
                }else{
                    // Else wait one second and try again
                    scheduleNextTimeout();
                }
            }else{
                callback('dead');
                return;
            }
            i++;
        }, 1000);
    };
    scheduleNextTimeout();
};
 
function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function myFunction() {
  document.getElementById("demo").innerHTML = "" + randomInt(1,100);;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function runs once per second, if id_token present returns, limited to depth 10
function checkForToken(count){
    
        // In order to get the URL of the iframe after it has been changed, you need to use
        // the contentWindow object
        var frameUrl;
        var idtoken;
        
        try{
              frameUrl = document.getElementById("samlredirect").contentWindow.location.href;   
              idtoken = getParameterByName("id_token", frameUrl);       
        }catch(e){
              idtoken = null;         
        }

        if(idtoken){
            return idtoken;
        }else{
            return null;
        }
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// Extracts a named URL parameter from the page
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
     
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[#]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
   
    if (!results){
        return null;
    }
 
    if(!results[2]){
        return '';
    } 
 
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
 
// Document Ready Function
$(document).ready(function() {  
    // Programatically inject the iFrame
    var myiframe=window.document.createElement("iframe");
    myiframe.src="about:blank";
    myiframe.id= "samlredirect";
    myiframe.frameBorder="0";
    myiframe.style="height:0px;width:0px;display:none;";
    document.body.appendChild(myiframe);
});
 
// LPTag
window.lpTag=window.lpTag||{},"undefined"==typeof window.lpTag._tagCount?(window.lpTag={site:'71820006'||"",section:lpTag.section||"",tagletSection:lpTag.tagletSection||null,autoStart:lpTag.autoStart!==!1,ovr:lpTag.ovr||{},_v:"1.8.0",_tagCount:1,protocol:"https:",events:{bind:function(t,e,i){lpTag.defer(function(){lpTag.events.bind(t,e,i)},0)},trigger:function(t,e,i){lpTag.defer(function(){lpTag.events.trigger(t,e,i)},1)}},defer:function(t,e){0==e?(this._defB=this._defB||[],this._defB.push(t)):1==e?(this._defT=this._defT||[],this._defT.push(t)):(this._defL=this._defL||[],this._defL.push(t))},load:function(t,e,i){var n=this;setTimeout(function(){n._load(t,e,i)},0)},_load:function(t,e,i){var n=t;t||(n=this.protocol+"//"+(this.ovr&&this.ovr.domain?this.ovr.domain:"lptag.liveperson.net")+"/tag/tag.js?site="+this.site);var a=document.createElement("script");a.setAttribute("charset",e?e:"UTF-8"),i&&a.setAttribute("id",i),a.setAttribute("src",n),document.getElementsByTagName("head").item(0).appendChild(a)},init:function(){this._timing=this._timing||{},this._timing.start=(new Date).getTime();var t=this;window.attachEvent?window.attachEvent("onload",function(){t._domReady("domReady")}):(window.addEventListener("DOMContentLoaded",function(){t._domReady("contReady")},!1),window.addEventListener("load",function(){t._domReady("domReady")},!1)),"undefined"==typeof window._lptStop&&this.load()},start:function(){this.autoStart=!0},_domReady:function(t){this.isDom||(this.isDom=!0,this.events.trigger("LPT","DOM_READY",{t:t})),this._timing[t]=(new Date).getTime()},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],hooks:lpTag.hooks||[],ev:lpTag.ev||[]},lpTag.init()):window.lpTag._tagCount+=1;
 
// Send visitorLoggedIn to Live Person.
lpTag.sdes = lpTag.sdes||[]; //Need to define one time on the page
var CustInfo = {
    "type": "ctmrinfo",  //MANDATORY customer info
        "info": {
        "ctype": 'visitorLoggedIn'
    }
};
 
if ( (window.location.href.indexOf("my-intg.navyfederal.org/eCollectionsMemberUIWeb/index.jsp") > 0) 
   || (window.location.href.indexOf("//myaccounts-intg.navyfederal.org") > 0 ) 
    ) {
         sendCtype();
}    
 
 
function sendCtype(){ 
            if (lpTag.sdes.send){
                lpTag.sdes.send(CustInfo);
                clearTimeout(sendCtype);
                //return false;
            } else {
                    setTimeout(sendCtype,50);
    
            }
}
 
var counter = 0;
var postChat = false;
var closeButton = "";
// alert("Version 10");
lpTag.events.bind("lpUnifiedWindow", "state", function(eventData, eventInfo) {
   console.dir("Info: ",eventInfo);
  // if (closeButton === "" ) {
       closeButton = document.getElementsByClassName("lp_close")[0];
//  }
  console.dir("CloseButton="+closeButton);
// If a chat is started reset variables on page
   console.dir("State="+eventData.state);
 
   if (eventData.state === "initialised") {
    //   console.dir("reset counter");
       counter = 0;
       postChat = false;
   }
   // If post chat survey is shown, flag to not close the window
   if (eventData.state === "postChat") {
       postChat = true;
       console.dir(1);
   }
   // else check to see if post chat is completed, or if the chat has ended
   else {
       
       // if the post chat is completed then close chat window
       if (eventData.state === "applicationEnded") {
          closeButton.click();
           console.dir(234);
       }
       // else see if chat has ended
       else {
           // if chat has ended, increase the counter and run the check for post chat survey
           if (eventData.state === "ended") {
               console.dir("Ended - counter="+counter);
               counter++;
               // only run this function once
               if (counter == 1) {
                   console.dir(2);
                   setTimeout(function() {
                       console.dir(3);
                       // if there is no flag for post chat survey, close the window
                       if (postChat == false) {
                           try {
                              closeButton.click();
                              console.dir(4);
                           } catch (e) {console.dir("Error: "+e)}
                       }
                       //lp_cancel_button
                         //lp_cancel_button
                       cancelButton = document.getElementsByClassName("lp_cancel_button")[0] 
                       if (cancelButton) {
                       cancelButton["onclick"] = function(){
                           closeButton.click();
                       };
                       }
                   }, 800);
               }
           }
       }
   }
}
)


/* -- following code removed on 10.29.2018
-- masking is not implemented for this chat application 
//  Data Masking
 
        lpTag.hooks = lpTag.hooks || [];
        lpTag.hooks.push({
              name: "AFTER_GET_LINES",
              callback: function (data) {
                  hooksData = data;
          //    options.data.answers = "masking the masked answer";
           //   console.dir("received: "+hooksData.data.lines[0].text);
            //  hooksData.data.lines[0].text = "Modified Text";
              
              for (i = 0; i < hooksData.data.lines.length; i++) {
                   hooksData.data.lines[i].text = piiMask(hooksData.data.lines[i].text);
              } 
              
              
              return data;
           }
        });
-- end of code removal 10.29.2018
*/

function piiMask(str) {
    //Social Security Number Pattern
    var ssn_re = /(\b(\d{3}[-.\s]?\d{2}[-.\s]?\d{4})\b)/ig;
 
    //Credit Card Number Pattern
    var cc_re = /((\b[0-9]{4}[\s-.]?[0-9]{4}[\s-.]?[0-9]{4}[\s-.]?[0-9]{4}\b)|(\b[0-9]{4}[\s-.]?([0-9]{5}|[0-9]{6})[\s-.]?([0-9]{4}|[0-9]{5})\b)|(\b[0-9]{4}[\s-.]?[0-9]{11}\b)|(\b[0-9]{4}[\s-.]?[0-9]{12}\b))/ig;
 
    //Date of Birth keywords and date patterns
    var dob_re = /((d[\.]?o[\.]?b[\.]?|date\sof\sbirth|birth\sdate|birth\sday|birthday)+.*?)(\b(((?:[12][0-9]|0?[1-9]|3[01]))|((?:0?[1-9]|1[012]))|(\d{2,4})|((?:J(?:u[ln]|an)|A(?:pr|ug)|Ma[ry]|Dec|Feb|Nov|Oct|Sep))|((?:(?:(?:Sept|Dec|Nov)em|Octo)ber|J(?:u(?:ly|ne)|anuary)|A(?:ugust|pril)|Ma(?:rch|y)|February)))[\/\-\s\.]?(((?:0?[1-9]|1[012]))|(((?:[12][0-9]|0?[1-9]|3[01]))((?:[nr]d|st|th))?)|((?:J(?:u[ln]|an)|A(?:pr|ug)|Ma[ry]|Dec|Feb|Nov|Oct|Sep))|((?:(?:(?:Sept|Dec|Nov)em|Octo)ber|J(?:u(?:ly|ne)|anuary)|A(?:ugust|pril)|Ma(?:rch|y)|February)))([\/\-\s\.]|[\,][\s]?)+((\d{2,4})|((?:0?[1-9]|1[012]))|((?:[12][0-9]|0?[1-9]|3[01])))\b)/i;
 
    //Account number keywords (anum_re) and number matching patterns (anum2_re)
    var anum_re = /((?:account|acct|access)\s?(?:number|num|nbr|no|[#])\s?(?:is\s|-\s|:\s)?)((?:\d+))/i;
    //var anum_re = /((?:account|acct|access)\s?(?:number|num|nbr|no|[#])\s?)((?:\d+).*?)/i;
    var anum2_re = /(\b(\d{7}[-]\d{3}|\d{14}|\d{10}[-]\d{4}|\d{12}[-]\d{2})\b)/ig;
 
    //CD keywords (cd_re) and number matching patterns (anum2_re)
    var cd_re = /((?:cd)\s(?:number|num|no|[#]).*?)((\d+).*?)/i;
    var cd2_re = /(\d{14})/ig;
 
    //Added by DGT 7/7/14
 
    //ID Numbers (id_num) (Relevant to SR 7.1.6.6, 7.1.6.28, 7.1.7.28) DGT 7/7/14
    //var id_num = /((?:\sid|^id|identification)(?:\s?\#(\-|\:)?|\sno|\snum|\snumber)?(?:\sis)?)\s([a-z,A-Z]|[0-9])*[0-9]([a-z,A-Z]|[0-9])*/ig;
    //var id_num = /((?:\bid|identification)(?:\s?\#(\-|\:)?|\sno|\snum|\snumber)?(?:\sis)?)\s([a-z,A-Z]|[0-9])*/ig;
    var id_num = /((?:\sid|^id|identification)(?:\s?\#(\-|\:)?|\sno|\snum|\snumber)?(?:\sis)?)\s([a-z,A-Z]|[0-9])*[0-9]([a-z,A-Z]|[0-9])*/ig;
 
    //Drive License Numbers (drv_lic) (Relevant to SR 7.1.6.8, 7.1.6.30, 7.1.7.30) DGT 7/7/14
    var drv_lic = /((?:\sid|^id|license|identification)(?:\s?\#(\-|\:)?|\sno|\snum|\snumber)?(?:\sis)?(?:(?:\sis)?(?:\:|\s\:|\-|\s\-)?\s?))\s([a-z,A-Z]|[0-9])*[0-9]([a-z,A-Z]|[0-9])*/ig;
 
    //CVV Code (sec_code) (Relevant to SR 7.1.6.15, 7.1.6.37, 7.1.7.37) DGT 7/7/14
   //var sec_code = /((?:Security|card\svalidation|CVV2?|CVC2?|CID|CAV2?)\s?(?:Code\s|value\s)?(?:\#\s|\s\#\s?|\sno\s|\snum\s|\snumber\s)?(?:is\s)?(?:(\:|\-)?\s*))([0-9]{3,4})/ig;
    var sec_code = /((?:Security\s?|card\svalidation\s?|CVV2?\s?|CVC2?\s?|CID\s?|CAV2?\s?)(?:Code\s?|value\s?)?(?:\#\s|\s\#\s?|\sno\s|\snum\s|\snumber\s)?(?:is\s)?(?:(?:\:|\-)?\s*))([0-9]{3,4})/ig;


    //PIN Number (pin_num) (Relevant to SR 7.1.6.16, 7.1.6.38, 7.1.7.38) DGT 7/7/14
    //var pin_num = /((PIN\s?)((?:\#|no|(?:num(ber)?))(?:\s)?)?)(?:(?:\s?is)?(?:\:|\s\:|\-|\s\-)?\s?)([0-9]{4})/ig;
    //DGT 11/06/14: Fixed sections that werent supposed to be counted as capturing groups.
    var pin_num = /((?:PIN\s?)(?:(?:\#|no|(?:num(?:ber)?))(?:\s)?)?(?:(?:\s?is)?(?:\:|\s\:|\-|\s\-)?\s?))([0-9]{4})/ig;
 
    //User Password (usr_psw) (Relevant to SR 7.1.6.18, 7.1.6.40, 7.1.7.40) DGT 7/7/14
    //var usr_psw = /((?:password|pw|pwd)(?:(?:\sis)?(?:\:|\s\:|\-|\s\-)?\s))(\S{6,}?)(?:(?:\<\/span\>)| )/ig;
    //var usr_psw = /((?:password|pw|pwd)(?:(?:\sis)?(?:\:|\s\:|\-|\s\-)?\s))(\S{6,}?)(?:(?:\<\/span\>)| |$)/ig;
    //DGT 11/05/14: Added an optional tag to the span and removed it from the password
    var usr_psw = /((?:password|pw|pwd)(?:(?:\sis)?(?:\:|\s\:|\-|\s\-)?\s))(\S{6,})(?:(?:\<\/span\>)?| |$)/ig;
 
    //Maiden Name (maiden_name) (Relevant to SR 7.1.6.19, 7.1.6.41, 7.1.7.41) DGT 7/7/14
    var maiden_name = /(Maiden\sName(?:\sis)?(?:\:|\s\:|\-|\s\-)?\s?)((?!is)\w+)/ig;
 
    //User Name (user_name) (Relevant to SR 7.1.6.19, 7.1.6.41, 7.1.7.41) TRV 6/30/16
   var user_name = /(User\s?Name(?:\s(is|to be|as|to))?(?:\:|\s\:|\-|\s\-)?\s?)((?!is)[^ ]+)/ig;
//   var user_name = /(User\s?Name(?:\sis)?(?:\:|\s\:|\-|\s\-)?\s?)((?!is)\w+)/ig; 
 
    //VIN Number (vin_num) (Relevant to SR 7.1.6.20, 7.1.6.42, 7.1.7.42) DGT 7/7/14
    var vin_num = /(((vehicle\sidentification|VIN)(\s?((num(ber)?)|no|\#))?)\s)([a-z,A-Z,0-9]{17})/ig;
 
    //Account Number (acct_num) (Relevant to SR 7.1.6.20, 7.1.6.43, 7.1.7.43) DGT 7/7/14
    //var acct_num = /(((account|acct|loan)\s?)((num(ber)?|no|\#))\s?)(?:(?:is)?(?:\:|\s\:|\-|\s\-)?\s?)((\S*))/ig;
    // var acct_num = /((?:(?:account|acct|loan) ?(?:number| no|num |[#])) ?(?:(?:is)?(?:\:|\s\:|\-|\s\-)? ?))((?: ?)[0-9]{2,})/ig;
    var acct_num = /((?:(?:account|acct|loan) ?(?:number| no|num |[#]|[:]|[ ])) ?(?:(?:is)?(?:\:|\s\:|\-|\s\-)? ?))((?: ?)[a-zA-Z0-9]+\S*)/ig;
 
    //Replacement patterns
    var replacementPattern = "*****";
    var keywordReplacementPattern = "$1*****";
 
    //Processing variables
    var result = str;
    var ssnFlag = false;
    var ccFlag = false;
    var cdFlag = false;
    var dobFlag = false;
    var anumFlag = false;
    var id_numFlag = false;
    var drv_licFlag = false;
    var sec_codeFlag = false;
    var pin_numFlag = false;
    var usr_pswFlag = false;
    var maiden_nameFlag = false;
    var vin_numFlag = false;
    var acct_numFlag = false;
    var user_nameFlag = false;
 
    try{
        
    if(result!=null)
    {
        if(result.match(cc_re)) {
            result = result.replace(cc_re, replacementPattern);
            ccFlag = true;
        } 
        if(result.match(anum2_re)) {
            result = result.replace(anum2_re, replacementPattern);
            anumFlag = true;
        } 
        if(result.match(cd2_re)) {
            result = result.replace(cd2_re, replacementPattern);
            cdFlag = true;
        } 
        if(result.match(ssn_re)) {
            result = result.replace(ssn_re, replacementPattern);
            ssnFlag = true;
        }       
        if(result.match(anum_re)) {
            result = result.replace(anum_re, keywordReplacementPattern);
            anumFlag = true;
        } 
        if(result.match(cd_re)) {
            result = result.replace(cd_re, keywordReplacementPattern);
            cdFlag = true;
        } 
        if(result.match(dob_re)) {
            result = result.replace(dob_re, keywordReplacementPattern);
            dobFlag = true;
        }
        
        //Added by DGT 7/7/14
        if(result.match(id_num)) {
            result = result.replace(id_num, keywordReplacementPattern);
            id_numFlag = true;
        }
        if(result.match(drv_lic)) {
            result = result.replace(drv_lic, keywordReplacementPattern);
            drv_licFlag = true;
        } 
        if(result.match(sec_code)) {
                result = result.replace(sec_code, keywordReplacementPattern);
                sec_codeFlag = true;
        } 
        if(result.match(pin_num)) {
                result = result.replace(pin_num, keywordReplacementPattern);
                pin_numFlag = true;
        } 
        if(result.match(usr_psw)) {
                result = result.replace(usr_psw, keywordReplacementPattern);
                usr_pswFlag = true;
        } 
        if(result.match(maiden_name)) {
                result = result.replace(maiden_name, keywordReplacementPattern);
                maiden_nameFlag = true;
        } 
        if(result.match(vin_num)) {
                result = result.replace(vin_num, keywordReplacementPattern);
                vin_numFlag = true;
        } 
 
        if(result.match(user_name)) {
                result = result.replace(user_name, keywordReplacementPattern);
                user_nameFlag = true;
        } 
 
        if(result.match(acct_num)) {
                result = result.replace(acct_num, keywordReplacementPattern);
                result = result.replace(/&amp;#39;/g, "'"); //Added by MSaraf 11/07/14
                acct_numFlag = true;
        } 
 
        if(result!=str) {
            if(result.match(cc_re)&&!ccFlag) {
                result = result.replace(cc_re, replacementPattern);
            } 
            if(result.match(anum2_re)&&!anumFlag) {
                result = result.replace(anum2_re, replacementPattern);
            } 
            if(result.match(cd2_re)&&!cdFlag) {
                result = result.replace(cd2_re, replacementPattern);
            } 
            if(result.match(ssn_re)&&!ssnFlag) {
                result = result.replace(ssn_re, replacementPattern);
            }
        if(result.match(anum_re)&&!anumFlag) {
                result = result.replace(anum_re, keywordReplacementPattern);
            } 
            if(result.match(cd_re)&&!cdFlag) {
                result = result.replace(cd_re, keywordReplacementPattern);
            } 
            if(result.match(dob_re)&&!dobFlag) {
                result = result.replace(dob_re, keywordReplacementPattern);
            } 
            if(result.match(id_num)&&!id_numFlag) {
                result = result.replace(id_num, keywordReplacementPattern);
            } 
        }
    }    
}catch(e){console.dir(e.message);}
    return result;
}
