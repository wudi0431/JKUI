/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.Button
JueKit.Type.registerNamespace("JueKit.UI");
//按钮组件
JueKit.UI.Button = JueKit.Type.createClass("JueKit.UI.Button", JueKit.UI.CommandItem,
{
    cssCls: "jueBtn", // 按钮基本样式名称
    // 绑定事件
    bindDomEventHandlers: function () {
        // 按钮绑定鼠标移入事件
        JueKit.Event.addHandler(this._el, 'mouseover', this.__hBtnMouseOver, this);
        // 按钮绑定鼠标移出事件
        JueKit.Event.addHandler(this._el, 'mouseout', this.__hBtnMouseOut, this);
        // 按钮绑定鼠标按下事件
        JueKit.Event.addHandler(this._el, 'mousedown', this.__hBtnMouseDown, this);
        // 按钮绑定鼠标单击事件
        JueKit.Event.addHandler(this._el, 'click', this.__hBtnClick, this);
        // 按钮绑定鼠标焦点事件
        JueKit.Event.addHandler(this._elBtn, 'focus', this.__hBtnFocus, this);
        // 按钮绑定鼠标失去焦点事件
        JueKit.Event.addHandler(this._elBtn, 'blur', this.__hBtnBlur, this);
    },
    // 创建DOM节点
    createDom: function (objData) {
        //设置按钮样式
        if (objData.cssCls) {
            this.cssCls = objData.cssCls;
        }
        //设置按钮icon
        if (objData.iconCssClass) {
            this.iconCssCls = objData.iconCssCls;
        }
        //得到按钮对象
        this._el = JueKit.UI.Button.__getButtonDom(this.cssCls, objData.iconCssCls);
        //得到button对象
        this._elBtn = this._el.childNodes[0].childNodes[0].childNodes[0];
        //得到按钮文本对象
        this._elText = this._elBtn.childNodes[1];
        //设置按钮文本
        this._elText.innerHTML = objData.text;
        //调基类方法创建
        JueKit.UI.Button._base.createDom.call(this, objData);
    },
    //解析DOM
    parseDom: function (objData) {
        this._elBtn = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._el)));
        this._elText = JueKit.Dom.getChildElByIndex(this._elBtn, 1);

    },
    // 初始化按钮
    onInit: function (objData) {
        //设置按钮icon
        if (objData.iconCssClass) {
            this.iconCssCls = objData.iconCssClass;
        }
       // 设置按钮是否 禁用
        this.set_disabled(objData.disabled);
    },
    // 显示按钮
    show: function (visible) {  
        JueKit.UI.Button._base.show.call(this, visible);
        if (visible === undefined || visible) {
            this._el.style.display = "inline-block";
        }
    },
    // 按钮绑定鼠标移入事件
    __hBtnMouseOver: function (evt) {
        if (this.get_disabled()) {
            return;
        }

        var ac = JueKit.UI.Common.get_activeControl();
        var mb = JueKit.UI.Common.get_mouseButton();

        if (mb == 1) {
            if (ac == this) {
                JueKit.Dom.addCssClass(this._el, this.cssCls + "Down");
            }
        }
        else {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "Hover");
        }

        this.fireEvent("mouseOver");
    },
    // 按钮绑定鼠标移出事件
    __hBtnMouseOut: function (evt) {
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Hover");
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Down");
    },
    // 按钮绑定鼠标按下事件
    __hBtnMouseDown: function (evt) {
        if (this.get_disabled()) {
            return;
        }

        if (JueKit.Event.button(evt) != 1) {
            return;
        }

        this._elBtn.focus();
        JueKit.Dom.replaceCssClass(this._el, this.cssCls + "Hover", this.cssCls + "Down");

        JueKit.UI.Common.set_activeControl(this);
    },
    // 按钮绑定鼠标单击事件
    __hBtnClick: function (evt) {
        if (this.get_disabled()) {
            return;
        }

        JueKit.Dom.replaceCssClass(this._el, this.cssCls + "Down", this.cssCls + "Hover");

        var args = { result: true, event: evt };
        this.fireEvent("beforeClick", args);

        if (!args.result) {
            return;
        }
        if (this._autoPostBack) {
            this.postBack("click", args.postData, this.__cbServerClickS, null, function (text) { alert(text); });
        }
        else {
            this.fireEvent("click");
        }
    },
    // 按钮绑定鼠标单击事件
    __cbServerClickS: function (text) {
        this.fireEvent("click", text);
    },
    // 按钮绑定鼠标焦点事件
    __hBtnFocus: function (evt) {
        JueKit.Dom.addCssClass(this._el, this.cssCls + "Active");
    },
    // 按钮绑定鼠标失去焦点事件
    __hBtnBlur: function (evt) {
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Active");
    },
    // 设置按钮宽度
    set_width: function (value) {
        this._width = value;
        if (value < 0) {
            return;
        }
        var cw = this._el.offsetWidth - this._elBtn.offsetWidth;
        if (cw < 0) {
            return;
        }
        this._elBtn.style.width = (value - cw) + "px";
    },
    // 按钮鼠标焦点事件
    focus: function () {
        this._elBtn.focus();
    },
    // 按钮鼠标失去焦点事件
    blur: function () {
        this._elBtn.blur();
    },
    // 得到按钮 是否禁用
    get_disabled: function () {
        return this._elBtn.disabled;
    },
    // 设置按钮是否 禁用
    set_disabled: function (value) {
        this._elBtn.disabled = value;
        if (value) {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "Gray");
            if (this.iconCssCls && this._el.childNodes[0] && this._el.childNodes[0].childNodes[0] && this._el.childNodes[0].childNodes[0].childNodes[0] && this._el.childNodes[0].childNodes[0].childNodes[0].childNodes[0]) {
                JueKit.Dom.addCssClass(this._el.childNodes[0].childNodes[0].childNodes[0].childNodes[0], this.iconCssCls + "Gray");
            }
        }
        else {
            JueKit.Dom.removeCssClass(this._el, this.cssCls + "Gray");
            if (this.iconCssCls && this._el.childNodes[0] && this._el.childNodes[0].childNodes[0] && this._el.childNodes[0].childNodes[0].childNodes[0] && this._el.childNodes[0].childNodes[0].childNodes[0].childNodes[0]) {
                JueKit.Dom.removeCssClass(this._el.childNodes[0].childNodes[0].childNodes[0].childNodes[0], this.iconCssCls + "Gray");
            }
        }
    }//, 
    //设置按钮显示文本
//    set_text: function (value) {
//        if (value != undefined && value != "") {
//            this._elText.innerHTML = value;
//        }
//    } 
});
// 按钮模板
JueKit.UI.Button._btnTemplate = {};
// 返回按钮模板
JueKit.UI.Button.__getButtonDom = function (cssCls, iconCssCls) {
    if (!this._btnTemplate[cssCls]) {
        var elContainer = JueKit.Dom.createEl("div", null,
            JueKit.String.format("<span class='{0}Wrap'><span class='{0}'><span class='{0}Inner'><button class='{0}Btn'><span class='{0}Icon'></span><span class='{0}Text'></span></button></span></span></span>", cssCls));
        this._btnTemplate[cssCls] = elContainer.childNodes[0];
    }
    var el = this._btnTemplate[cssCls].cloneNode(true);
    if (iconCssCls !== undefined) {
        el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].className += " " + iconCssCls;
    }
    return el;
};
