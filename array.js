export function FixedArray(length) {
    return new Array(length);
}

export function DeepFind(array, indexArray) {
    let result = array;
    for(let index of indexArray) {
        result = result[index];
    }
    return result;
}