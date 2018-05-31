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