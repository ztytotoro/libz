import { CurryRight } from "./curry.js";

export function Cookies(){
    
}

function onEvent(dom, event, handler) {
    return dom.addEventListener(event, handler, false);
}

function offEvent(dom, event, handler) {
    return dom.removeEventListener(event, handler);
}

function Cache(name, item, promise, expire = true, cache_name = "cache_" + name) {
    if(!window[cache_name]) window[cache_name] = {};
    window[cache_name][item] = promise;
    if(promise instanceof Promise) {
        promise.then(data => {
            window[cache_name][item] = Promise.resolve(data);
            if(expire) {
                clearTimeout(window[cache_name + "_timeout"]);
                window[cache_name + "_timeout"] = setTimeout(() => {
                    delete window[cache_name][item];
                }, 1000 * 30 * 60)
            }
        });
    } else {
        if(expire) {
            clearTimeout(window[cache_name + "_timeout"]);
            window[cache_name + "_timeout"] = setTimeout(() => {
                delete window[cache_name][item];
            }, 1000 * 30)
        }
    }
}

function GetCache(name, item, cache_name = "cache_" + name) {
    return window[cache_name][item];
}

function HasCache(name, item, cache_name = "cache_" + name) {
    return !window[cache_name] ? false : window[cache_name][item] ? true : false
}

function CompressImg(file) {
    return new Promise(function (resolve, reject) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.src = url;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            //let des = canvas.toDataURL("image/jepg", 0.5);
            //let desImage = new Image();
            //desImage.src = des;
            canvas.toBlob(function (b) {
                //b.lastModifiedDate = file.lastModifiedDate;
                //b.name = file.name;
                if(b.size > file.size) {
                    resolve(file);
                }
                resolve(new File([b], file.name, { type: file.type, lastModified: file.lastModified }));
            }, file.type, 0.5);
        };
    });
}

function CompressImgs(files) {
    return Promise.all(files.map(function (file) { return CompressImg(file); }));
}

function GoTo(uri, name, params) {
    var paramUri = (function () {
        var t = [];
        for (var prop in params) {
            if (params.hasOwnProperty(prop)) {
                t.push(prop + "=" + params[prop]);
            }
        }
        return t.join("&");
    })();
    var address;
    if (uri.includes("?")) {
        address = uri + "&" + paramUri;
    }
    else {
        address = uri + "?" + paramUri;
    }
    if (parent.addTotabsFromFrame) {
        parent.addTotabsFromFrame(address, name);
    }
    else {
        window.open(address);
    }
}

function GetParam(key) {
    key = key.toLowerCase();
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.toLowerCase().substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}


export const OnEvent = CurryRight(onEvent);
export const OffEvent = CurryRight(offEvent);
