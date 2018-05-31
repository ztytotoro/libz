import { CurryRight } from "./curry";
import {IsArry, IsObject, IsFunction} from "./type.js";

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

export let ForOwn = CurryRight(forOwn);
export let ForEach = CurryRight(forEach);
export let All = CurryRight(all);
export let Once = CurryRight(once);
export let Match = CurryRight(match);
export let Matches = CurryRight(matches);