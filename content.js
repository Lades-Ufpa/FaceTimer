var focused=false;
var originalTitle="";
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if ((splitArr[arrLen - 2].length == 3 || splitArr[arrLen - 2].length == 2) && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    if(domain.search("google.com")>-1)
    {
        domain=extractHostname(url);
    }
    return domain;
}

function sendMessage()
{
    if(focused)
    {
        chrome.runtime.sendMessage({greeting: "hello", domain: extractRootDomain(window.location.href)}, function(response) {
        });
    }
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {      
    if(request.greeting ==extractRootDomain(window.location.href))
    {
        document.title = request.time+" | "+originalTitle;
    }
}
);


function startTimer() {
    originalTitle=document.title;
    var ticker = setInterval("sendMessage()", 1000);
}

window.onfocus = function() {
    focused = true;
};
window.onblur = function() {
    focused = false;
};

window.onload = function() {
    startTimer();
    focused = document.hasFocus();
  };

