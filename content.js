var focused=false;
function sendMessage()
{
    if(focused)
    {
        chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
            //console.log(response.farewell);
        });
    }
}

function startTimer() {
    var ticker = setInterval("sendMessage()", 1000);
}

window.onfocus = function() {
    focused = true;
};
window.onblur = function() {
    focused = false;
};

startTimer();