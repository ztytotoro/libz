import { Curry, CurryRight } from "./curry";

function forOwn(object, predicate) {
    let result = {};
    for (prop in object) {
        if (object.hasOwnProperty(prop)) {
            result[prop] = predicate(prop, object[prop]);
        };
    }
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
        if (!predicate(array[i], i, array)) {
            return true;
        }
    }
    return false;
}

export let ForOwn = CurryRight(forOwn);
export let ForEach = CurryRight(forEach);
export let All = CurryRight(all);
export let Once = CurryRight(once);