import { CurryRight } from "./curry.js";

export function Cookies(){
    
}

function onEvent(dom, event, handler) {
    return dom["addEventListener"](event, handler);
}

function offEvent(dom, event, handler) {
    return dom["removeEventListener"](event, handler);
}

export const OnEvent = CurryRight(onEvent);

export const OffEvent = CurryRight(offEvent);