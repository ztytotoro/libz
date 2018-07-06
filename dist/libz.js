const IsString = IsTypeBuilder("string");

const IsNumber = IsTypeBuilder("number");

const IsBoolean = IsTypeBuilder("boolean");

const IsFunction = IsTypeBuilder("function");

const IsArray = IsInstanceBuilder(Array);

const IsCommonObject = IsInstanceBuilder(Object);

function IsObject$1(target) {
    if(IsCommonObject(target)) {
        return !IsFunction(target) && !IsArray(target);
    }
    return false;
}

function IsInstanceBuilder(instance) {
    return function (target) {
        return target instanceof instance;
    }
}

function IsTypeBuilder(type) {
    return function (target) {
        return typeof target === type;
    }
}

const typeChecker = [
    IsString,
    IsNumber,
    IsBoolean,
    IsObject$1,
    IsFunction,
    IsArray
];

const ObjectChecker = [
    IsObject$1,
    IsArray
];

function IsType$1(target, type) {
    switch(type) {
        case "string": return IsString(target);
        case "number": return IsNumber(target);
        case "boolean": return IsBoolean(target);
        case "object": return IsObject$1(target);
        case "function": return IsFunction(target);
        case "array": return IsArray(target);
        default: return null;
    }
}

function GetType(target) {
    let t = TypeOf(target);
    if(t === "object") {
        return Match(target, [
            [IsArray, "array"],
            [IsObject$1, "object"]
        ]);
    } else {
        return t;
    }
}

function TypeOf(target) {
    return typeof target;
}

function IsEmptyObject(object) {
    if(IsObject$1(object) && !IsFunction(object) && !IsArray(object)) {
        for(let prop in object) {
            if(object.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

function Curry(fun) {
    return CurryBuilder(fun);
}

function CurryRight(fun) {
    return CurryBuilder(fun, true);
}

function CurryBuilder(fun, right = false, args=[], rest=[]){
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

let _ = {};

function forOwn(object, predicate) {
    let result = {};
    for (prop in object) {
        if (object.hasOwnProperty(prop)) {
            result[prop] = predicate(object[prop], prop);
        }    }
    return result;
}

function forEach(array, predicate) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(predicate(array[i], i, array));
    }
    return result;
}

function all(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (!predicate(array[i], i, array)) {
            return false;
        }
    }
    return true;
}

function once(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            return true;
        }
    }
    return false;
}

function match(target, predicates) {
    for(let predicate of predicates) {
        if(IsArray(predicate)){
            if(predicate[0](target)) return predicate[1];
        }
        else if(IsFunction(predicate)) {
            if(predicate(target)) return predicate.name;
        }
    }
    return "";
}

function matches(target, predicates) {
    let result = [];
    for(let predicate of predicates) {
        if(IsArray(predicate)){
            if(predicate[0](target)) result.push(predicate[1]);
        }
        else if(IsFunction(predicate)) {
            if(predicate(target)) result.push(predicate.name);
        }
    }
    return result;
}

let ForOwn$1 = CurryRight(forOwn);
let ForEach = CurryRight(forEach);
let All = CurryRight(all);
let Once = CurryRight(once);
let Match$1 = CurryRight(match);
let Matches = CurryRight(matches);

function Flow(array) {
    if(IsArray(array)){
        if(array.length > 0){
            return function(...args) {
                let result = array[0](...args);
                for(let i = 1;i < array.length; i++){
                    result = array[i](result);
                }
                return result;
            }
        }
    }
}

function when(predicate, array) {
    if(IsFunction(predicate)){
        return function(...args) {
            let t = predicate(...args);
            for(let item of array) {
                if(item[0] === t) {
                    return item[1]();
                }
            }
        }
    } else {
        for(let item of array) {
            if(item[0] === predicate) {
                return item[1]();
            }
        }
    }
}

const When = CurryRight(when);

function If(expression) {
    let t = cbt => {
        if(expression) {
            cbt();
        }
        return {
            false(cbf) {
                if(!expression) cbf();
            }
        }
    };
    let f = cbf => {
        if(!expression) {
            cbf();
        }
        return {
            true(cbt) {
                if(expression) cbt();
            }
        }
    };
    return {
        true: t,
        false: f
    };
}

class IfBuilder {
    constructor() {
        this.trueCb = () => {};
        this.falseCb = () => {};
        this.ex = expression => {
            return expression;
        };
    };

    get true() {
        return this.trueCb;
    }

    set true(cb) {
        this.trueCb = cb;
    }

    get false() {
        return this.falseCb;
    }

    set false(cb) {
        this.falseCb = cb;
    }

    get excutor() {
        return this.ex;
    }

    set excutor(cb) {
        this.ex = cb;
    }

    excute(val) {
        if(this.ex(val)) {
            return this.trueCb();
        } else {
            return this.falseCb();
        }
    }

    resetExcutor() {
        this.ex = expression => {
            return expression;
        };
    }
}

//根据父节点属性名称，将列表转化为树
function GenerateTree(data, id, pid) {
    let t = DeepCopy(data);
    for (let i = 0; i < t.length; i++) {
        t[i].children = [];
        for (let j = 0; j < t.length; j++) {
            if (i !== j) {
                if (t[i][id] === t[j][pid]) {
                    t[i].children.push(t[j]);
                    t[j].parent = t[i];
                }
            }
        }
        if (t[i].children.length === 0) {
            delete t[i].children;
        }
    }

    return t.filter(x => {
        if (x.parent) {
            delete x.parent;
            return false;
        } else {
            return true;
        }
    });
}

//根据节点寻找路径
function GetTreePath(tree, value, id) {
    if (!tree || !value) {
        return [];
    }
    let t = [];
    for (let item of tree) {
        if (item[id].toString() === value.toString()) {
            t.push(item[id]);
        } else {
            let c = GetTreePath(item.children, value, id);
            if (c.length > 0) {
                t.push(item[id]);
                t = t.concat(c);
            }
        }
    }

    return t;
}

function DeepCopy(x, validate) {
    if (x === null || x === undefined) {
        return x;
    }
    if (typeof x === "object") {
        if (x instanceof Array) {
            let t = [];
            for (let item of x) {
                t.push(DeepCopy(item, validate));
            }
            return t;
        } else {
            let t = {};
            for (let prop in x) {
                if (validate) {
                    if (validate(prop, x[prop]))
                        continue;
                }
                if (x.hasOwnProperty(prop)) {
                    t[prop] = DeepCopy(x[prop]);
                }
            }
            return t;
        }
    } else {
        return x;
    }
}

function FixedArray(length) {
    return new Array(length);
}

function DigTree(array, indexArray) {
    let index = indexArray.shift();
    let result = array[index];
    if(indexArray.length > 0) {
        result = DigTree(result.children, indexArray);
    }
    return result;
}

function Cookies(){
    
}

function onEvent(dom, event, handler) {
    return dom.addEventListener(event, handler, false);
}

function offEvent(dom, event, handler) {
    return dom.removeEventListener(event, handler);
}

const OnEvent = CurryRight(onEvent);

const OffEvent = CurryRight(offEvent);

function IsEmpty(value) {
    return value === "" || value === undefined || value === null;
}

export { IsEmpty, Curry, CurryRight, CurryBuilder, _, ForOwn$1 as ForOwn, ForEach, All, Once, Match$1 as Match, Matches, IsString, IsNumber, IsBoolean, IsFunction, IsArray, IsCommonObject, IsObject$1 as IsObject, typeChecker, ObjectChecker, IsType$1 as IsType, GetType, TypeOf, IsEmptyObject, Flow, When, If, IfBuilder, GenerateTree, GetTreePath, DeepCopy, FixedArray, DigTree, Cookies, OnEvent, OffEvent };
