export const IsString = IsTypeBuilder("string")

export const IsNumber = IsTypeBuilder("number")

export const IsBoolean = IsTypeBuilder("boolean")

export const IsObject = IsInstanceBuilder(Object)

export const IsFunction = IsInstanceBuilder(Function)

export const IsArray = IsInstanceBuilder(Array)

export function IsInstanceBuilder(instance) {
    return function (target) {
        return target instanceof instance;
    }
}

export function IsTypeBuilder(type) {
    return function (target) {
        return typeof target === type;
    }
}

export function IsType(target, type) {
    return typeof target === type;
}

export function TypeOf(target) {

}

export function ListenLess(fun, tailProp) {
    return function (...args) {
        return fun(...PurePush(args, tailProp));
    }
}

export function CheckProp(desc, args) {
    let result = [];
    if (IsObject(props)) {
        ForOwn(props, (prop, value) => {
            if (!IsType(prop, value)) {
                result.push(`Prop [${prop}] is not [${value}]!`)
            }
        })
    }
    return result;
}

export function Exception() {

}

// push
export function PurePush(arr, x) {
    return [...arr, x];
}

export function Concat(a, b) {
    return a.concat(b)
}

export function Equal(a) {
    return function(b) {
        return a == b;
    }
}

export function StrictEqual(a) {
    return function (b) {
        return a === b;
    }
}

export function Matches() {

}

export function Match(validator, value) {
    return function (value) {
        return validator(value);
    }
}

export function MatchesOne(validator, values) {
    return function(values) {
        ForEach(values)(validator)
    }
}