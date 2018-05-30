import { CheckProp } from "./core";

// 打包函数，加入传参检查，柯里化
// 柯里化支持传入指定位置或指定名称的参数
// props: 二维数组
//      1: 参数名
//      2：参数类型
//      3: 参数描述
function Pack(fun, props, direction = "left") {
    let Curried = direction === "left" ? Curry(fun) : CurryRight(fun);
    let Check = CheckProp(props)
    return function(...args) {
        if(Check(args)) {
           Curried(...args) 
        }
    }
}

export function Flow() {

}

// use function a's result as function b's arguments
export function Tell(a, b) {
    return function(...args) {
        b(a(...args));
    }
}

// 将函数b作为a的参数
// eg: Bind()
export function Bind(a, b) {

}