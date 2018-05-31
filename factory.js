import {
    CheckProp
} from "./core";
import {
    IsArray, IsType
} from "./type";
import { All } from "./iterator";


function Pack(fun, props) {
    let Check = CheckProp(props)
    return function(...args) {
        if(All(args, (val, i) => {
            if(IsArray(props[i])){
                return IsType(val, props[i][1]);
            }
            else {
                return IsType(val, props[i]);
            }
        }))
        return fun(...args);
    }
}

export function Flow(array, result = []) {
    if (IsArray(array)) {
        if (array.length > 0) {
            return function (...args) {
                result.push(array.shift()(...args));
                if (array.length > 0) return Flow(array, result)
                else return result;
            }
        }
    }

}

// use function a's result as function b's arguments
function Tell(a, b) {
    return function (...args) {
        b(a(...args));
    }
}

// 将函数b作为a的参数
// eg: Bind()
function Bind(a, b) {

}

export function If(expression) {
    let t = cbt => {
        if(expression) {
            cbt();
        }
        return {
            false(cbf) {
                if(!expression) cbf();
            }
        }
    }
    let f = cbf => {
        if(!expression) {
            cbf();
        }
        return {
            true(cbt) {
                if(expression) cbt();
            }
        }
    }
    return {
        true: t,
        false: f
    };
}

export class IfBuilder {
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