chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello"){
                var time = 0;
                chrome.storage.sync.get("time", function (items) {
                    if(items.time == null && items.time == "" && typeof items.time  == 'undefined'){
                        alert("null");
                        chrome.storage.sync.set({time: 1 }, function () {
                            time=1;
                        });
                    }else
                    {
                        time = items.time;
                    }
                    chrome.storage.sync.set({time: time+1}, function () {
                    });
                });
        }
    });




chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get("time", function (items) {
    alert('Tempo gasto no Facebook: '+items.time);
    });
});

alert("running");
