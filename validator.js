import { Once } from "./iterator.js";

export function IsEmpty(value) {
    let ValEqual = Equal(value);
    let EqualOne = Once(ValEqual);
    return EqualOne([undefined, "", null]);
}

export function HasEmpty() {

}