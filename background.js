var domain="";
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello"){
                domain = '$Time_'+request.domain;
                var time = 0;
                chrome.storage.sync.get(domain, function (items) {
                    if(items[domain] == null || items[domain] == "" || typeof items[domain]  == 'undefined'){
                        chrome.storage.sync.set({[domain]:1}, function () {
                            time=1;
                        });
                    }else
                    {
                        time = items[domain];
                    }
                    chrome.storage.sync.set({[domain]: time+1}, function () {
                    });
                    chrome.storage.sync.get(domain, function (items) {
                        browser.browserAction.setTitle({title: 'Tempo gasto no '+domain.replace('$Time_','')+': '+String(items[domain]).toHHMMSS()});
                    });
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        chrome.tabs.sendMessage(sender.tab.id, {greeting: domain.replace('$Time_',''), time: String(items[domain]).toHHMMSS()}, function(response) {});  
                    });
                });
        }
    });




chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get(domain, function (items) {
    alert('Tempo gasto no '+domain.replace('$Time_','')+': '+String(items[domain]).toHHMMSS());

    });
});
