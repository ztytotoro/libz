export function IsEmpty(value) {
    return value === "" || value === undefined || value === null;
}

export function All(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (!predicate(array[i], i, array)) {
            return false;
        }
    }
    return true;
}