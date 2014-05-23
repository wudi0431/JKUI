/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.DomComm
JueKit.DomComm =
{
    getPageWidth: function (wnd) {
        if (!wnd) {
            wnd = window;
        }
        var bw = wnd.document.documentElement.scrollWidth;
        var cw = this.getClientWidth(wnd);
        if (bw > cw) {
            return bw;
        }
        return cw;
    },

    getPageHeight: function (wnd) {
        if (!wnd) {
            wnd = window;
        }
        var bh = wnd.document.documentElement.scrollHeight;
        var ch = this.getClientHeight(wnd);
        if (bh > ch) {
            return bh;
        }
        return ch;
    },

    setStyles: function (el, styles) {
        for (var key in styles) {
            if (styles.hasOwnProperty(key)) {
                this.setStyle(el, key, styles[key]);
            }
        }
    },

    getPositionX: function (el, clientAbs) {
        return this.getPosition(el, clientAbs).left;
    },

    getPositionY: function (el, clientAbs) {
        return this.getPosition(el, clientAbs).top;
    },

    getSize: function (el) {
        el = JueKit(el);

        var width;
        var height;

        if (this.visible(el)) {
            width = el.offsetWidth;
            height = el.offsetHeight;
        }
        else {
            this.show(el);
            width = el.offsetWidth;
            height = el.offsetHeight;
            this.hide(el);
        }
        return { width: width, height: height };
    },

    getWidth: function (el) {
        return this.getSize(el).width;
    },

    getHeight: function (el) {
        return this.getSize(el).height;
    },

    getRect: function (el, clientAbs) {
        var rect = this.getSize(el);
        var pos = this.getPosition(el, clientAbs);
        rect.left = pos.left;
        rect.top = pos.top;

        return rect;
    },

    setOffsetWidth: function (el, width) {
        if (width > 0) {
            width = width + "px";
        }
        else {
            width = "auto";
        }
        this.setStyle(el, "width", width);
    },

    setOffsetHeight: function (el, height) {
        if (height > 0) {
            height = height + "px";
        }
        else {
            height = "auto";
        }
        this.setStyle(el, "height", height);
    },

    setPosition: function (el, left, top) {
        el = JueKit(el);

        var pEl = el.parentNode;
        while ((pEl.tagName != "BODY") && (pEl.style.position != "absolute")) {
            pEl = pEl.parentNode;
        }

        var pPos;
        if (pEl.tagName == "BODY") {
            pPos = { left: 0, top: 0 };
        }
        else {
            pPos = JueKit.Dom.getPosition(pEl);
        }

        left -= pPos.left;
        top -= pPos.top;

        var clHeight = pEl.innerHeight || pEl.clientHeight;
        var clWidth = pEl.innerWidth || pEl.clientWidth;
        if (clHeight <= 0) {
            clHeight = pEl.parentNode.clientHeight;
        }

        if (clWidth <= 0) {
            clWidth = pEl.parentNode.clientWidth;
        }

        if (clWidth != 0) {
            if (left > (clWidth - el.offsetWidth)) {
                left = clWidth - el.offsetWidth;
            } else if (left < 0) {
                left = 0;
            }
        } 
        if (clHeight != 0) {
            if (top < 0) {
                top = 0;
            }
        }
         
        el.style.position = "absolute";
        el.style.left = left + 'px';
        el.style.top = top + 'px';
    },

    center: function (el, left, top) {
        if (left === undefined) {
            left = 0.5;
        }

        if (top === undefined) {
            top = 0.5;
        }

        el = JueKit(el);
        var cw = this.getClientWidth();
        var ch = this.getClientHeight();
        var ew = this.getWidth(el);
        var eh = this.getHeight(el);
        var st = document.documentElement.scrollTop;
        var sl = document.documentElement.scrollLeft;

        this.setPosition(el, (cw - ew) * left + sl, (ch - eh) * top + st);
    },

    visible: function (el) {
        return this.getStyle(el, "display") != "none";
    },

    show: function (el) {
        el = JueKit(el);
        return el.style.display = "";
    },

    hide: function (el) {
        el = JueKit(el);
        return el.style.display = "none";
    },

    toggle: function (el) {
        this[this.visible(el) ? "hide" : "show"](el);
    },

    hasCssClass: function (el, cssClass) {
        el = JueKit(el);
        return el.className.include(cssClass, " ");
    },

    setCssClass: function (el, cssClass) {
        el = JueKit(el);
        el.className = cssClass;
    },

    addCssClass: function (el, cssClass) {
        if (!this.hasCssClass(el, cssClass)) {
            el = JueKit(el);
            el.className = (el.className + " " + cssClass).trim();
        }
    },

    removeCssClass: function (el, cssClass) {
        this.replaceCssClass(el, cssClass, "");
    },

    replaceCssClass: function (el, cssClass1, cssClass2) {
        el = JueKit(el);
        if (this.hasCssClass(el, cssClass2)) {
            cssClass2 = "";
        }
        el.className = (" " + el.className + " ").replace(" " + cssClass1 + " ", " " + cssClass2 + " ").trim();
    },

    toggleCssClass: function (el, cssClass1, cssClass2) {
        if (cssClass2) {
            if (this.hasCssClass(el, cssClass1)) {
                this.replaceCssClass(el, cssClass1, cssClass2);
            }
            else {
                this.replaceCssClass(el, cssClass2, cssClass1);
            }
        }
        else {
            this[this.hasCssClass(el, cssClass1) ? "removeCssClass" : "addCssClass"](el, cssClass1);
        }
    },

    createEl: function (tagName, attributes, innerHTML) {
        var el = document.createElement(tagName);
        if (attributes) {
            JueKit.Type.extend(el, attributes);
        }
        if (innerHTML && innerHTML.length) {
            el.innerHTML = innerHTML;
        }
        return el;
    },

    removeEl: function (el) {
        el = JueKit(el);
        if (el) {
            el.parentNode.removeChild(el);
        }
    },

    getParent: function (el, tag) {
        tag = tag.toLowerCase();
        while (el) {
            if (el.tagName.toLowerCase() == tag) {
                return el;
            }
            el = el.parentNode;
        }
        return el;
    },

    getParentIndex: function (el, tag) {
        var pEl = this.getParent(el, tag);
        if (pEl) {
            return this.getElIndex(pEl);
        }
        return -1;
    },

    getElIndex: function (el) {
        el = JueKit(el);
        var p = el.parentNode;
        if (!p) {
            return -1;
        }
        else {
            var index = 0;
            for (var i = 0; i < p.childNodes.length; i++) {
                if (p.childNodes[i].nodeType == 1) {
                    if (p.childNodes[i] === el) {
                        return index;
                    }
                    index++;
                }
            }
        }
    },

    getChildElByIndex: function (el, index) {
        el = JueKit(el);
        if (!el) {
            return null;
        }

        var pi = 0;
        var node;
        for (var i = 0; i < el.childNodes.length; i++) {
            node = el.childNodes[i];
            if (node.nodeType == 1) {
                if (pi == index) {
                    return node;
                }
                pi++;
            }
        }
    },

    getFirstChild: function (el) {
        return this.getChildElByIndex(el, 0);
    },

    getNextEl: function (el) {
        el = JueKit(el);
        el = el.nextSibling;
        while (el) {
            if (el.nodeType == 1) {
                return el;
            }
            el = el.nextSibling;
        }
        return null;
    },

    getPreviousEl: function (el) {
        el = JueKit(el);
        el = el.previousSibling;
        while (el) {
            if (el.nodeType == 1) {
                return el;
            }
            el = el.previousSibling;
        }
        return null;
    },
    //跨浏览器获取滚动条位置
    getScroll: function () {
        var top, left, width, heigth;
        if (document.documentElement && document.documentElement.scrollTop) {
            top = document.documentElement.scrollTop;
            left = document.documentElement.scrollLeft;
            width = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            top = document.body.scrollTop;
            left = document.body.scrollLeft;
            width = document.body.scrollWidth;
            heigth = document.body.scrollHeight;
        }
        return { top: top, left: left, width: width, heigth: heigth };
    },
    //跨浏览器获取视口大小
    getInner: function () {
        if (typeof window.innerWidth != 'undefined') {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
    }
};
