export function Curry(fun, args=[]) {
    return function(...x) {
        let t = args.concat(x);
        if(t.length === fun.length || t.length > fun.length) {
            return fun(...t)
        } else {
            return CurryBuilder(fun, t);
        }
    }
}

export function CurryRight(fun, args=[]) {
    return function(...x) {
        let t = x.concat(args);
        if(t.length === fun.length || t.length > fun.length) {
            return fun(...t)
        } else {
            return CurryBuilderRight(fun, t);
        }
    }
}