function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
};   
 
function myFunction() {
    document.getElementById("demo").innerHTML = "" + randomInt(1,100);
};
 
