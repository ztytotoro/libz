export const IsString = IsTypeBuilder("string")

export const IsNumber = IsTypeBuilder("number")

export const IsBoolean = IsTypeBuilder("boolean")

export const IsObject = IsInstanceBuilder(Object)

export const IsFunction = IsInstanceBuilder(Function)

export const IsArray = IsInstanceBuilder(Array)

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

export const typeChecker = [
    IsString,
    IsNumber,
    IsBoolean,
    IsObject,
    IsFunction,
    IsArray
]

export const ObjectChecker = [
    IsObject,
    IsArray
]

export function IsType(target, type) {
    switch(type) {
        case "string": return IsString(target);
        case "number": return IsNumber(target);
        case "boolean": return IsBoolean(target);
        case "object": return IsObject(target);
        case "function": return IsFunction(target);
        case "array": return IsArray(target);
        default: return null;
    }
}

export function GetType(target) {
    let t = TypeOf(target);
    if(t === "object") {
        return Match(target, [
            [IsArray, "array"],
            [IsObject, "object"]
        ]);
    } else {
        return t;
    }
}

export function TypeOf(target) {
    return typeof target;
}

export function IsEmptyObject(object) {
    if(IsObject(object)) {
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