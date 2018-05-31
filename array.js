export function FixedArray(length) {
    return new Array(length);
}

export function DigTree(array, indexArray) {
    let result = array;
    for(let index of indexArray) {
        result = result[index].children;
    }
    return result;
}