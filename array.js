export function FixedArray(length) {
    return new Array(length);
}

export function DigTree(array, indexArray) {
    let index = indexArray.shift();
    let result = array[index];
    if(indexArray.length > 0) {
        result = DigTree(result.children, indexArray);
    }
    return result;
}