export const IsString = IsTypeBuilder("string")

export const IsNumber = IsTypeBuilder("number")

export const IsBoolean = IsTypeBuilder("boolean")

export const IsObject = IsInstanceBuilder(Object)

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

export function CheckProp(props) {
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

export function ForOwn(object, cb) {
    for (prop in object) {
        if (object.hasOwnProperty(prop)) cb(prop, object[prop]);
    }
}