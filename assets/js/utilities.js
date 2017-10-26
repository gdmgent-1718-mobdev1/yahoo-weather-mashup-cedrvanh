function getJsonPByPromise(url) {
    return new Promise(function(resolve, reject) {
        var name = 'jsonp' + new Date().getTime();
        if (url.match(/\?/)) url += '&callback='+name;
        else url += '?callback='+name;
        
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        
        window[name] = function(data){
            document.getElementsByTagName('head')[0].removeChild(script);
            script = null;
            delete window[name];
    
            resolve(data);
        };
        // TO DO: PDP
    
        document.getElementsByTagName('head')[0].appendChild(script);
    });
}
