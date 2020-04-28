
// ********************** ajax *************************************   
// Make an ajax call to the given url, then if the call was successful, 
// call the Success Callback fn, otherwise, set an error message into the 
// DOM element that has id 'errorId'.
function ajax3 (params){
    
    // expecting params properties url, successFn, and errorId
    if (!params || !params.url || !params.successFn || !params.errorId) {
        alert ("function ajax requires an input parameter object with properties: url, successFn, and errorId");
        return;
    }

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); 
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); 
    } else {
        alert('ajax not supported');
    }
    
     console.log("ready to get content " + params.url);
    httpReq.open("GET", params.url); // specify which page you want to get
    httpReq.setRequestHeader("x-rapidapi-host", "morning-star.p.rapidapi.com");
    httpReq.setRequestHeader("x-rapidapi-key", "5d486c7d4bmsh37742d0b4222289p14ee30jsn71f0f575dd09");

    
    httpReq.onreadystatechange = function () {

        
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                var obj = JSON.parse(httpReq.responseText);
                params.successFn(obj);  // like the jQuery ajax call, pass back JSON already parsed to JS objecg
            } else {
               
                document.getElementById(params.errorId).innerHTML = "Error (" + httpReq.status + " " + httpReq.statusText +
                        ") while attempting to read '" + params.url + "'";
            }
        }
    }; 

    httpReq.send(null); 

} 