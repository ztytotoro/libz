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

export function IsEmptyObject(object) {
    if(IsObject(object)){
        if(JSON.stringify(object) === "{}") return true;
        return false;
    } else {
        return false;
    }
}