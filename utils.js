//根据父节点属性名称，将列表转化为树
export function GenerateTree(data, id, pid) {
    let t = DeepCopy(data);
    for (let i = 0; i < t.length; i++) {
        t[i].children = [];
        for (let j = 0; j < t.length; j++) {
            if (i !== j) {
                if (t[i][id] === t[j][pid]) {
                    t[i].children.push(t[j]);
                    t[j].parent = t[i];
                }
            }
        }
        if (t[i].children.length === 0) {
            delete t[i].children;
        }
    }

    return t.filter(x => {
        if (x.parent) {
            delete x.parent;
            return false;
        } else {
            return true;
        }
    });
}

//根据节点寻找路径
export function GetTreePath(tree, value, id) {
    if (!tree || !value) {
        return [];
    }
    let t = [];
    for (let item of tree) {
        if (item[id].toString() === value.toString()) {
            t.push(item[id]);
        } else {
            let c = GetTreePath(item.children, value, id);
            if (c.length > 0) {
                t.push(item[id]);
                t = t.concat(c);
            }
        }
    }

    return t;
}

export function DeepCopy(x, validate) {
    if (x === null || x === undefined) {
        return x;
    }
    if (typeof x === "object") {
        if (x instanceof Array) {
            let t = [];
            for (let item of x) {
                t.push(DeepCopy(item, validate));
            }
            return t;
        } else {
            let t = {};
            for (let prop in x) {
                if (validate) {
                    if (validate(prop, x[prop]))
                        continue;
                }
                if (x.hasOwnProperty(prop)) {
                    t[prop] = DeepCopy(x[prop]);
                }
            }
            return t;
        }
    } else {
        return x;
    }
}

export function CompressImg (file) {
    return new Promise((resolve, reject) => {
        let url = URL.createObjectURL(file);
        let img = new Image();
        img.src = url;
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(b => {
                resolve(new File([b], file.name, { type: file.type, lastModified: file.lastModified}));
            }, file.type, 0.5);
        };
    });
}

function Object2Array(obj) {
    var arry = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arry.push({
                name: prop,
                value: obj[prop]
            });
        }
    }
    return arry;
}

function DistincConcat(prop) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    return Distinc(Concat(data), prop);
}
//合并数组
function Concat() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    return [].concat.apply([], data);
}
function Distinc(data) {
    var props = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        props[_i - 1] = arguments[_i];
    }
    if (props.length === 0) {
        var t = [];
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var item = data_1[_a];
            if (!t.includes(item)) {
                t.push(item);
            }
        }
        return t;
    }
    else {
        var t = [];
        var mark_1 = +new Date();
        var _loop_1 = function (item) {
            var v = props.map(function (x) { return item[x]; });
            var find = false;
            t.forEach(function (x) {
                var same = true;
                v.forEach(function (val, index) {
                    if (val !== x[index]) {
                        same = false;
                    }
                });
                if (same) {
                    find = true;
                }
            });
            if (find) {
                item["del" + mark_1] = true;
            }
            else {
                t.push(v);
            }
        };
        for (var _b = 0, data_2 = data; _b < data_2.length; _b++) {
            var item = data_2[_b];
            _loop_1(item);
        }
        return data.filter(function (x) { return !x["del" + mark_1]; });
    }
}
function UUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function DeepCopy(x, validate) {
    if (x === null || x === undefined) {
        return x;
    }
    if (typeof x === "object") {
        if (x instanceof Array) {
            var t = [];
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var item = x_1[_i];
                t.push(DeepCopy(item, validate));
            }
            return t;
        }
        else {
            var t = {};
            for (var prop in x) {
                if (validate) {
                    if (validate(prop, x[prop]))
                        continue;
                }
                if (x.hasOwnProperty(prop)) {
                    t[prop] = DeepCopy(x[prop]);
                }
            }
            return t;
        }
    }
    else {
        return x;
    }
}
function CombineObject(a, b, validate) {
    if (a instanceof Array && typeof b === "function") {
        a.push(b);
        return a;
    }
    else if (typeof a === "function" && typeof b === "function") {
        return b;
    }
    if (a instanceof Array && b instanceof Array) {
        return a.concat(b);
    }
    var t = {};
    for (var prop in a) {
        if (a.hasOwnProperty(prop)) {
            if (b.hasOwnProperty(prop)) {
                t[prop] = CombineObject(a[prop], b[prop]);
            }
            else {
                t[prop] = DeepCopy(a[prop]);
            }
        }
    }
    return Object.assign({}, DeepCopy(b, validate), DeepCopy(t, validate));
}
function CombineObjects() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    if (options.length === 0) {
        return {};
    }
    if (options.length === 1) {
        return options[0];
    }
    var t = options.shift();
    return ExtendObject(t, options);
}
function ExtendObject(target, options) {
    if (options.length === 0) {
        return target;
    }
    var t = options.shift();
    return ExtendObject(CombineObject(target, t), options);
}

