//根据父节点属性名称，将列表转化为树
export function GenerateTree(data, id, pid) {
    let t = DeepCopy(data);
    for (let i = 0; i < t.length; i++) {
        t[i].children = [];
        for (j = 0; j < t.length; j++) {
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