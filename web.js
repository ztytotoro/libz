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

export const OnEvent = CurryRight(onEvent);
export const OffEvent = CurryRight(offEvent);