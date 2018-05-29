// Test if a value is empty or not.
export function IsEmpty(value) {
    return value === undefined || value === null || value === "";
}

// push
export function PurePush(arr, x) {
    return [...arr, x];
}

export function Equal(a, b) {
    return a == b;
}

export function StrictEqual(a, b) {
    return a === b;
}

export function Match(validator, value) {
    return validator(value);
}

export function MatchesOne(validator, values) {

}