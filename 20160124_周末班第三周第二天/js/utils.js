var utils = {
    //listToArray:将类数组转换为数组
    listToArray: function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //toJSON:将字符串转换为JSON格式的对象
    toJSON: function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};

//win:获取或者设置和浏览器相关的盒子模型信息
utils.win = function win(attr, value) {
    if (typeof value === "undefined") {
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
};

//getCss:获取当前元素经过浏览器计算的样式
utils.getCss = function getCss(curEle, attr) {
    var val = reg = null;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            val = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;
};

//offset:获取元素距离body的偏移量(不管body是否为父级参照物)
utils.offset = function offset(curEle) {
    var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
    while (p) {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
            t += p.clientTop;
            l += p.clientLeft;
        }
        t += p.offsetTop;
        l += p.offsetLeft;
        p = p.offsetParent;
    }
    return {top: t, left: l};
};

/*--------------------------------------------------*/

//prev:获取当前元素的上一个哥哥元素节点
utils.prev = function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};

//prevAll:获取当前元素的所有的哥哥元素节点
utils.prevAll = function prevAll(curEle) {
    //this->utils
    var ary = [], pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
};

//next:获取当前元素的下一个弟弟元素节点
utils.next = function next(curEle) {
    if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
};

//nextAll:获取当前元素的所有的弟弟元素节点
utils.nextAll = function nextAll(curEle) {
    var ary = [], nex = this.next(curEle);
    while (nex) {
        ary[ary.length] = nex;
        nex = this.next(nex);
    }
    return ary;
};

//sibling:获取当前元素的相邻节点(上一个哥哥+下一个弟弟)
utils.sibling = function sibling(curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle);
    var ary = [];
    pre ? ary[ary.length] = pre : null;
    nex ? ary[ary.length] = nex : null;
    return ary;
};

//sibling:获取当前元素的兄弟元素节点(哥哥+弟弟)
utils.siblings = function sibling(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
};

//getIndex:获取当前元素的索引,有几个哥哥,我的索引就是几
utils.getIndex = function getIndex(curEle) {
    return this.prevAll(curEle).length;
};
