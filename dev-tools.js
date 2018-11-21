(function () {
    function ls(param1, param2) {
        let arry = [];
        let result = [];
        let query;
        if (typeof param1 === 'string') {
            if (!(param2 instanceof Array)) {
                arry.push(param2);
            } else {
                arry = param2;
            }
            query = param1;
        } else if (!param2) {
            if (!(param1 instanceof Array)) {
                arry.push(param1);
            } else {
                arry = param1;
            }
            query = "*";
        }

        for (let i = 0; i < arry.length; i++) {
            result.push(GetPropsFromObj(query, arry[i]));
        }
        console.table(result);
    }

    function GetPropsFromObj(props, obj) {
        let arry = [];
        let parry = props.split(",");
        let prop;
        if (props === "*") {
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arry[prop] = obj[prop];
                }
            }
        } else {
            for (let i = 0; i < parry.length; i++) {
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (prop.toLowerCase() === parry[i].toLowerCase()) {
                            arry[prop] = obj[prop];
                        }
                    }
                }
            }
        }


        return arry;
    }

    window.shortcut = false;
    window.keys = [];
    $(document).ready(function () {
        $(document).keydown(function (e) {
            if (e.ctrlKey && e.keyCode === 66 && window.shortcut) {
                let uri = e.target.baseURI;
                alert(uri.match(/(?<=^http(s)?:\/\/[^\/]*(\/+))[a-zA-Z0-9_]+/)[0]);
            }
        });
        // 84 89
        $(document).keydown(function (e) {
            if (e.keyCode === 90) {
                window.keys.push(e.keyCode);
            }
            else if (e.keyCode === 84) {
                clearTimeout(window.shortcut_timeout);
                window.keys.push(e.keyCode);
            }
            else if (e.keyCode === 89) {
                clearTimeout(window.shortcut_timeout);
                window.keys.push(e.keyCode);
                if (window.keys.join(",") === [90, 84, 89].join(",")) {
                    window.shortcut = !window.shortcut;
                    if (window.shortcut) {
                        console.log(` _______  _______  ___     _     _  _______  ______    __    _  ___   __    _  _______  __  
|       ||  _    ||   |   | | _ | ||   _   ||    _ |  |  |  | ||   | |  |  | ||       ||  | 
|    ___|| |_|   ||   |   | || || ||  |_|  ||   | ||  |   |_| ||   | |   |_| ||    ___||  | 
|   |___ |       ||   |   |       ||       ||   |_||_ |       ||   | |       ||   | __ |  | 
|    ___||  _   | |   |   |       ||       ||    __  ||  _    ||   | |  _    ||   ||  ||__| 
|   |    | |_|   ||   |   |   _   ||   _   ||   |  | || | |   ||   | | | |   ||   |_| | __  
|___|    |_______||___|   |__| |__||__| |__||___|  |_||_|  |__||___| |_|  |__||_______||__| 
`);
                        Object.prototype.ls = function () {
                            ls(this);
                        };
                        Object.prototype.stringify = function () {
                            return JSON.stringify(this);
                        };
                    } else {
                        delete Object.prototype.ls;
                        delete Object.prototype.stringify;
                    }
                    window.keys = [];
                }
            }
            window.shortcut_timeout = setTimeout(() => {
                window.keys = [];
            }, 500);
        });
    });
}());