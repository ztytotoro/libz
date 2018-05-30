import {IsEmptyObject} from "./type.js";

export function Curry(fun, args=[]) {
    return function(...x) {
        let t = args.concat(x);
        if(t.length === fun.length || t.length > fun.length) {
            return fun(...t)
        } else {
            return Curry(fun, t);
        }
    }
}

export function CurryRight(fun, args=[]) {
    return function(...x) {
        let t = x.concat(args);
        if(t.length === fun.length || t.length > fun.length) {
            return fun(...t)
        } else {
            return CurryRight(fun, t);
        }
    }
}

export function CurryBuilder(fun, args=[], rest=[]){
    if(args.length === 0) {
        rest = new Array(fun.length);
        args = new Array(fun.length);
        for(let i = 0; i<rest.length;i++){
            rest[i] = i;
        }
    }

    return function(...x) {
        let t1 = [...args];
        let t2 = [...rest];
        for(let i = 0; i < x.length; i++) {
            if(!IsEmptyObject(x[i])){
                t1[t2[i]] = x[i];
                t2[i] = -1;
            }
        }
        t2 = t2.filter(it => it !== -1);
        if(t2.length === 0) return fun(...t1);
        else return CurryBuilder(fun, t1, t2);
    }
}

export function CurryBuilderRight(fun, args=[], rest=[]){
    if(args.length === 0) {
        rest = new Array(fun.length);
        args = new Array(fun.length);
        for(let i = rest.length - 1; i >= 0;i--){
            rest[i] = i;
        }
    }

    return function(...x) {
        let t1 = [...args];
        let t2 = [...rest];
        x = x.reverse();
        for(let i = 0; i < x.length; i++) {
            if(!IsEmptyObject(x[i])){
                t1[t2[i]] = x[i];
                t2[i] = -1;
            }
        }
        t2 = t2.filter(it => it !== -1);
        if(t2.length === 0) return fun(...t1);
        else return CurryBuilderRight(fun, t1, t2);
    }
}