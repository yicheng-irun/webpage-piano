
export function loadScripts (files = []) {
    const allPromise = [];
    files.forEach((value) => {
        allPromise.push(loadScript(value));
    });
    return Promise.all(allPromise);
}

const cacheScripts = {};

export function loadScript (url) {
    if (!cacheScripts[url]) {
        cacheScripts[url] = new Promise((resolve, reject) => {
            loadScriptFile(url, (err, result) => {
                if (err) {
                    return reject();
                }
                return resolve(result);
            });
        });
    }
    return cacheScripts[url];
}

function loadScriptFile(url, callback){
    var script = document.createElement ('script');
    script.type = 'text/javascript';
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == 'loaded' || script.readyState == 'complete'){
                script.onreadystatechange = null;
                callback(null, script);
            }
        };
    } else { //Others
        script.onload = function(result){
            callback(null, result);
        };
        script.onerror = function (e) {
            callback(e);
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}