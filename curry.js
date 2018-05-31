import {IsEmptyObject} from "./type.js";

export function Curry(fun) {
    return CurryBuilder(fun);
}

export function CurryRight(fun) {
    return CurryBuilder(fun, true);
}

export function CurryBuilder(fun, right = false, args=[], rest=[]){
    if(args.length === 0) {
        rest = new Array(fun.length);
        args = new Array(fun.length);
        for(let i = 0; i<rest.length;i++){
            rest[i] = right ? rest.length - i - 1 : i;
        }
    }

    return function(...x) {
        let t1 = [...args];
        let t2 = [...rest];
        if(right) x = x.reverse();
        for(let i = 0; i < x.length; i++) {
            if(!IsEmptyObject(x[i])){
                t1[t2[i]] = x[i];
                t2[i] = -1;
            }
        }
        t2 = t2.filter(it => it !== -1);
        if(t2.length === 0) return fun(...t1);
        else return CurryBuilder(fun, right, t1, t2);
    }
}

export let _ = {};