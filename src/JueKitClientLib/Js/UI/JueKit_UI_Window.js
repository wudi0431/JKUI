/**
* Copyright (c) 2007 Tulipmm.cn. All rights reserved.
* @Author fossil
*/

// JueKit.UI.Window
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.Window = JueKit.Type.createClass("JueKit.UI.Window", JueKit.UI.LazyLoadWebControl, {
    _firstActive: true,
    isContainer: true,
    //加载完成后执行刷新控件
    onLoad: function (objData) {
        this.__setViewChanged();
    },
    //初始化属性
    onInitProperty: function (objData) {
        // 默认窗口带有最小化按钮
        if (objData.minimizeBox === undefined) {
            this._minimizeBox = true;
        } else {
            this._minimizeBox = objData.minimizeBox;
        }

        // 默认窗口带有最大化按钮
        if (objData.maximizeBox === undefined) {
            this._maximizeBox = true;
        } else {
            this._maximizeBox = objData.maximizeBox;
        }

        this._text = objData.text || "";

        this._recycleUse = objData.recycleUse;

        JueKit.UI.Window._base.onInitProperty.call(this, objData);
    },
    // 绑定DOM事件
    bindDomEventHandlers: function (objData) {
       

        // 点击最小化按钮
        if (this._elSysBtnMin) {
            JueKit.Event.addHandler(this._elSysBtnMin, "click", this.__hElSysBtnMin_Click, this);
        }
        // 点击最大化按钮
        if (this._elSysBtnMax) {
            JueKit.Event.addHandler(this._elSysBtnMax, "click", this.__hElSysBtnMax_Click, this);
        }
        // 点击关闭按钮
        if (this._elSysBtnClose) {
            JueKit.Event.addHandler(this._elSysBtnClose, "click", this.__hElSysBtnClose_Click, this);
        }

        // 双击标题栏
        JueKit.Event.addHandler(this._elTop, "dblclick", this.__hElSysBtnMax_Click, this);

        // 设置标题栏的拖动
        this._ddImpl = new JueKit.DragDrop(this._el, this._elTop, "A");
        this._ddImpl.addHandler("endDrag", this.__hDDImpl_EndDrop, this);

        // 当浏览器窗口大小改变时，调整窗口大小
        JueKit.Event.addHandler(window, "resize", this.__hWindow_Resize, this);
    },
    //获得DOM的html
    getDomHtml: function (objData) {
        var sb = new JueKit.Text.StringBuilder();

        sb.append("<div class='jueWndTopWrap'><div class='jueWndTop'><div class='jueWndTopInner'>");
        sb.append("<div class='jueWndSysBtnGroup'>");
        if (this._minimizeBox) {
            this.__appendSysBtnHTML(sb, objData.id + "_sysBtnMin", "jueWndSysBtn jueWndSysBtnMin", JueKitSR["minimum"]);
        }
        if (this._maximizeBox) {
            this.__appendSysBtnHTML(sb, objData.id + "_sysBtnMax", "jueWndSysBtn jueWndSysBtnMax", JueKitSR["maximum"]);
        }
        this.__appendSysBtnHTML(sb, objData.id + "_sysBtnClose", "jueWndSysBtn jueWndSysBtnClose", JueKitSR["close"]);
        sb.append("</div>");
        sb.append("<span id='" + this._id + "_titleText' class='jueWndTitleText'>" + this._text + "</span>");
        sb.append("</div></div></div>");
        sb.append("<div class='jueWndBodyWrap'><div class='jueWndBody'><div id='" + objData.id + "_bodyInner' class='jueWndBodyInner'>");
        if (objData.innerHTML) {
            sb.append(objData.innerHTML);
        }
        sb.append("</div></div></div>");
        sb.append("<div class='jueWndBottomWrap'><div class='jueWndBottom'><div class='jueWndBottomInner'></div></div></div>");

        return sb.toString();
    },
    //创建DOM
    createDom: function (objData) {
        this._el = JueKit.Dom.createEl("div", {
            id: objData.id,
            className: "jueWnd"
        });

        this._el.innerHTML = this.getDomHtml(objData);
        if (!objData.visible) {
            this._el.style.display = 'none';
        }
        JueKit.UI.Window._base.createDom.call(this, objData);

        this.parseDom(objData);
        objData.createWindowContent && objData.createWindowContent(this._elBodyInner, objData);
        //this._elBodyInner = JueKit(this._id + "_bodyInner");
        this.createWindowContent && this.createWindowContent(this._elBodyInner, objData);

    },
    //添加拖拽手柄
    __appendSysBtnHTML: function (sb, id, cssClass, title) {
        sb.append("<a id='" + id + "' class='" + cssClass + "' href='javascript:void(0);' title='" + title + "'><span>" + title + "</span></a>");
    },
    //解析DOM
    parseDom: function (objData) {
        if (objData.lazyLoad) {
            this._el.innerHTML = this.getDomHtml(objData);
        }

        this._elTop = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elBody = JueKit.Dom.getNextEl(this._elTop);
        this._elBottom = JueKit.Dom.getNextEl(this._elBody);
        this._elTitleText = JueKit(this._id + "_titleText");
        this._elSysBtnMin = JueKit(this._id + "_sysBtnMin");
        this._elSysBtnMax = JueKit(this._id + "_sysBtnMax");
        this._elSysBtnClose = JueKit(this._id + "_sysBtnClose");
        this._elBodyInner = JueKit(this._id + "_bodyInner");
        this._elChildContainer = this._elBodyInner;
    },
    //拖拽结束后重新设置位置
    __hDDImpl_EndDrop: function () {
        this.__rememberPosition();
    },
    //点击 最小化窗口
    __hElSysBtnMin_Click: function (evt) {
        if (this._state & 6) // this._state & 2 || this._state & 4
        {
            // 如果当前状态是最小化，或者最大化，则还原
            this.restore();
        } else {
            // 否则，最小化
            this.minimize();
        }
        JueKit.Event.stop(evt);
    },
    //点击最大化窗口
    __hElSysBtnMax_Click: function (evt) {
        if (this._state & 6) // this._state & 2 || this._state & 4
        {
            // 如果当前状态是最小化，或者最大化，则还原
            this.restore();
        } else {
            // 否则，最大化
            this.maximize();
        }
        JueKit.Event.stop(evt);
    },
    //点击关闭窗口
    __hElSysBtnClose_Click: function (evt) {
        // 当点击关闭按钮时，关闭窗体，并设置默认result为0。
        this.close(0);
    },
    //点击重置恢复窗口大小
    __hWindow_Resize: function (evt) {
        // 只有在最大化状态时，才调整窗口大小
        if (this._state & 4) {
            // 设置宽度为浏览器客户区的宽度
            this.__setWndWidth(JueKit.Dom.getClientWidth());

            // 设置高度为浏览器客户区的高度
            this.__setWndHeight(JueKit.Dom.getClientHeight());
        }
    },
    //点击重置窗口位置
    __rememberPosition: function () {
        var pos = JueKit.Dom.getPosition(this._el);
        this._left = pos.left;
        this._top = pos.top;
    },
    // 居中显示窗口
    center: function (left, top) {
        left = left || 0.5;
        top = top || 0.3;

        JueKit.Dom.center(this._el, left, top);
        this.__rememberPosition();
    },
    //显示窗口
    showDialog: function () {
        this._state |= 8;
        this.show();
        JueKit.Dom.setStyle(this._el, "zIndex", JueKit.UI.Window.__increaseBg() + 1);

        this.center(0.5, 0.3);

        if (!this._childLoaded) {
            this.__loadNow();
        } else {
            this.__doActiveWindow();
        }
    },
    //延迟加载窗口
    onLazyLoaded: function () {
        this.center(0.5, 0.3);
        this.__doActiveWindow();
    },
    //当窗口获得焦点时
    __doActiveWindow: function () {
        this._el.tabIndex = -1;
        this._el.focus();
        var args = {
            firstActive: this._firstActive
        };

        this.onActive && this.onActive(args);

        this.fireEvent("active", args);
        this._firstActive = undefined;
    },
    //关闭窗口
    close: function (dialogResult) {
        if (!(this._state & JueKit.UI.State.visible)) {
            return;
        }

        if (this.beforeClose && !this.beforeClose(dialogResult)) {
            return;
        }

        var args = {
            dialogResult: dialogResult,
            result: true
        };
        this.fireEvent("beforeClose", args);

        if (args.result == false) {
            return;
        }

        this._dialogResult = dialogResult;

        this.show(false);

        if (!this._recycleUse) {
            // 如果不是循环使用的，把dom元素删除。
            JueKit.Dom.removeEl(this._el);
        }

        this.fireEvent("close", args);
    },
    //最大化窗口
    maximize: function () {
        if (!this._maximizeBox || this._state & 4) {
            return;
        }

        this._ddImpl.set_disable(true);
        JueKit.Dom.addCssClass(this._el, "jueWndMaximum");

        JueKit.Dom.setStyles(this._el, {
            position: "absolute",
            left: "0",
            top: "0"
        });
        var width = this._width;
        var height = this._height;
        var ow = this._el.offsetWidth;
        var oh = this._el.offsetHeight;
        var cw = JueKit.Dom.getClientWidth();
        var ch = JueKit.Dom.getClientHeight();
        this.set_width(cw);
        this.set_height(ch);
        this._width = width;
        this._height = height;

        // 设置提示为“还原”
        this._elSysBtnMax.title = JueKitSR["restore"];


        this._state |= 4;
        this.__layoutChildren();

        var args = {
            originalWidth: ow,
            originalHeight: oh,
            currentWidth: cw,
            currentHeight: ch
        };
        this.fireEvent("windowResize", args);
    },
    //恢复窗口的 大小，位置
    restore: function () {
        if (this._state == 1) {
            return;
        }

        if (this._state & 2) {
            this._state &= ~2;
            JueKit.Dom.removeCssClass(this._el, "jueWndMinimum");
            JueKit.Dom.show(this._elBody);
        } else if (this._state & 4) {
            this._ddImpl.set_disable(false);
            this._state &= ~4;
            JueKit.Dom.removeCssClass(this._el, "jueWndMaximum");
            JueKit.Dom.setStyles(this._el, {
                position: "",
                left: this._left + "px",
                top: this._top + "px"
            });
            this.set_height(this._height);
            this.set_width(this._width);
        }

        // 设置提示为“最大化”
        this._elSysBtnMax.title = JueKitSR["maximum"];

        this.__layoutChildren();
        var cw = JueKit.Dom.getClientWidth();
        var ch = JueKit.Dom.getClientHeight();
        var args = {
            originalWidth: cw,
            originalHeight: ch,
            currentWidth: this._width,
            currentHeight: this._height
        };
        this.fireEvent("windowResize", args);
    },
    //最小化窗口
    minimize: function () {
        if (!this._maximizeBox || this._state & 2) {
            return;
        }

        this._state |= 2;

        JueKit.Dom.addCssClass(this._el, "jueWndMinimum");
        JueKit.Dom.hide(this._elBody);

        // 设置提示为“还原”
        this._elSysBtnMax.title = JueKitSR["restore"];
    },
    //设置窗口标题
    set_text: function (value) {
        ///<summary>设置窗口的标题</summary>
        if (value === undefined || value === null) {
            value = "";
        }
        this._text = value;
        this._elTitleText.innerHTML = JueKit.String.HTMLEncode(this._text);
    },
    //设置窗口高度
    onSetHeight: function (value) {
        var ih = this._height - this._elTop.offsetHeight - this._elBottom.offsetHeight - this._elBody.offsetHeight + this._elBodyInner.offsetHeight;
        if (ih < 0) {
            this._elBodyInner.style.height = "";
        } else {
            this._elBodyInner.style.height = ih + "px";
        }
    },
    //设置窗口内容高度
    set_innerWidth: function (value) {
        this.set_width(value + 15);
    },
    //刷新窗口高度
    onRefreshControl: function () {
        // 调整窗口的高度
        this.set_width(this._width);
        this.set_height(this._height);
    },
    //获得窗口内容的对象
    get_windowBodyEl: function () {
        return this._elBodyInner;
    },
    // 获得关闭后的参数
    get_dialogResult: function () {
        return this._dialogResult;
    }
});


JueKit.Type.extend(JueKit.UI.Window, {
    //创建遮罩层
    __doResizeBg: function (evt) {
        var topWnd = JueKit.getJueKitTopWnd();
        if (topWnd._jueDlgBg && topWnd._jueDlgBgIdx != 2300) {
            var h, w,
                dom = JueKit.Dom;
            /*
            if(JueKit.Browser.isIE)
            {
            h = dom.getPageHeight(topWnd);
            }
            else
            {
            h = dom.getClientHeight(topWnd);
            }

            if(JueKit.Browser.isIE)
            {
            w = dom.getPageWidth(topWnd);
            }
            else
            {
            w = dom.getClientWidth(topWnd);
            }
            */

            if (topWnd._jueDlgFrame) {
                dom.setStyles(topWnd._jueDlgFrame, {
                    width: (dom.getPageWidth() - 10) + "px",
                    height: (dom.getPageHeight() - 10) + "px"
                });
            }

            dom.setStyles(topWnd._jueDlgBg, {
                width: dom.getPageWidth() + "px",
                height: dom.getPageHeight() + "px"
            });
        }
    },
    //重置遮罩层
    __resizeBg: function (evt) {
        var topWnd = JueKit.getJueKitTopWnd();
        if (topWnd._jueDlgBg && topWnd._jueDlgBgIdx != 2300) {
            var dom = JueKit.Dom,
                w = dom.getClientWidth(),
                h = dom.getClientHeight();

            if (topWnd._jueDlgFrame) {
                dom.setStyles(topWnd._jueDlgFrame, {
                    width: w + "px",
                    height: h + "px"
                });
            }

            dom.setStyles(topWnd._jueDlgBg, {
                width: w + "px",
                height: h + "px"
            });

            var oThis = this,
                doResize = function () {
                    oThis.__doResizeBg();
                };
            setTimeout(doResize, 0);
        }
    },
    //插入遮罩层
    __increaseBg: function () {
        var topWnd = JueKit.getJueKitTopWnd();
        var elBg = topWnd._jueDlgBg,
            elKeyHook = topWnd._jueDlgKeyHook,
            elFrame = topWnd._jueDlgFrame;
        if (!elBg) {
            elBg = JueKit.Dom.createEl("div");
            topWnd.document.body.appendChild(elBg);

            topWnd._jueDlgBg = elBg;
            topWnd._jueDlgBgIdx = 2300;

            var p = "fixed";

            if (JueKit.Browser.isIE) {
                p = "absolute";
                elFrame = JueKit.Dom.createEl("iframe");
                topWnd.document.body.appendChild(elFrame);
                topWnd._jueDlgFrame = elFrame;

                JueKit.Dom.setStyles(elFrame, {
                    position: p,
                    top: "0",
                    left: "0",
                    zIndex: topWnd._jueDlgBgIdx - 1,
                    opacity: 0.1
                });
            }

            JueKit.Dom.setStyles(elBg, {
                background: "#333",
                position: p,
                top: "0",
                left: "0",
                zIndex: topWnd._jueDlgBgIdx,
                opacity: 0.5
            });
            JueKit.Event.addHandler(window, "resize", this.__resizeBg, this);

            elKeyHook = JueKit.Dom.createEl("input");
            elKeyHook.style.position = "absolute";
            elKeyHook.style.top = "-500px";
            elKeyHook.style.left = "-500px";
            topWnd.document.body.appendChild(elKeyHook);
            elBg.id = "elBg";
            elBg.tagIndex = -1;
            JueKit.Event.addHandler(elBg, "focus", function (evt) {
                elKeyHook.focus()
            });
        }

        topWnd._jueDlgBgIdx += 2;

        elBg.style.zIndex = topWnd._jueDlgBgIdx;
        if (topWnd._jueDlgBgIdx == 2302) {
            elBg.style.display = "block";
            if (elFrame) {
                elFrame.id = "elFrame";
                elFrame.style.display = "block";
            }
            this.__resizeBg();
        }

        return topWnd._jueDlgBgIdx;
    },
    //设置遮罩层
    __decreaseBg: function () {
        var topWnd = JueKit.getJueKitTopWnd();
        topWnd._jueDlgBgIdx -= 2;
        var bg = topWnd._jueDlgBg,
            frame = topWnd._jueDlgFrame;
        if (topWnd._jueDlgBgIdx == 2300) {
            if (frame) {
                JueKit.Dom.setStyles(frame, {
                    width: "0",
                    height: "0",
                    display: "none"
                });
            }
            JueKit.Dom.setStyles(bg, {
                width: "0",
                height: "0",
                display: "none"
            });
        } else {
            if (frame) {
                frame.style.zIndex = topWnd._jueDlgBgIdx - 1;
            }
            bg.style.zIndex = topWnd._jueDlgBgIdx;
        }
        return topWnd._jueDlgBgIdx;
    },

    showLoading: function (options) {

    }
});
// 咱时不用
JueKit.UI.LoadingWindow = JueKit.Type.createClass("JueKit.UI.LoadingWindow", JueKit.UI.RichClientWebControl, {
    cssCls: "jueLoadingWnd",
    createDom: function (objData) {
        this._el = JueKit.Dom.createEl("div", {
            className: this.cssCls
        }, objData.text);
    },

    showLoading: function () {
        this.show();
        JueKit.Dom.setStyle(this._el, "zIndex", JueKit.UI.Window.__increaseBg() + 1);
    }
});
// 咱时不用
JueKit.Type.extend(JueKit.UI.Window, {
    showLoading: function (options) { 
        if (!this._loadingWnd) {
            this._loadingWnd;
        }
    },

    hideLoading: function () {
        if (this._loadingWnd) {
            this._loadingWnd.show(false);
        }
    }
});



/* JueKit.UI.IFrameWnd */
JueKit.UI.IFrameWnd = JueKit.Type.createClass("JueKit.UI.IFrameWnd", JueKit.UI.Window, {
    //窗口获得焦点时
    onActive: function (args) {
        if (args.firstActive) {
            var elBody = this._elBodyInner;
            elBody.innerHTML = "<iframe frameborder='0' style='width:100%; height:100%;'></iframe>";

            this._elIFrame = elBody.firstChild;

            if (this._url) {
                this._elIFrame.src = this._url;
            }
        }

        JueKit.Dom.show(this._elIFrame);
    },
    //设置窗口的 url
    set_url: function (value) {
        this._url = value;
        if (this._elIFrame) {
            this._elIFrame.src = value;
        }
    },
    //获得窗口的 url
    get_url: function () {
        return this._url;
    }
});

// JueKit.UI.IFrameWndPool
JueKit.UI.IFrameWndPool = JueKit.Type.createClass("JueKit.UI.IFrameWndPool", JueKit.Pool, {
    createEntry: function () {
        var objData = {
            recycleUse: true,
            text: ""
        };
        var o = new JueKit.UI.IFrameWnd(objData);
        o.addHandler("close", this.__hDlg_Close, this);
        return o;
    },

    initEntry: function (entry) { },

    cleanEntry: function (entry) { },

    destroyEntry: function (entry) { },

    __hDlg_Close: function (sender, args) {
        JueKit.Dom.hide(sender._elIFrame);
        sender._elIFrame.src = "about:blank";

        if (sender.__ehClose) {
            var eh = sender.__ehClose;
            eh.handler.call(eh.scope, sender, args);
        }
        this.release(sender);
    }
});

JueKit.Type.extend(JueKit.UI.IFrameWnd, {
    _pool: new JueKit.UI.IFrameWndPool(),
    showDialog: function (options) {
        var top = JueKit.getJueKitTopWnd();
        if (window != top) {
            return top.JueKit.UI.IFrameWnd.showDialog(options);
        }
        var dlg = this._pool.gain();

        dlg.set_width(options.width || 500);
        dlg.set_height(options.height || 400);
        dlg.set_text(options.title || "");
        dlg.__ehClose = options.onClose;
        dlg.showDialog();

        dlg.set_url(options.url || "about:blank");

        return dlg;
    }
});