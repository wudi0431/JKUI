/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.OutlookBarPanel
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.OutlookBarPanel = JueKit.Type.createClass("JueKit.UI.OutlookBarPanel", JueKit.UI.LazyLoadWebControl, {
    //初始化属性
    onInitProperty: function (objData) {
        this._isCurrent = objData.isCurrent;
        this._title = objData.title;

        this._iconClassName = objData.IconClassName;

        JueKit.UI.OutlookBarPanel._base.onInitProperty.call(this, objData);
    },
    // 设置为当前panel
    onLoad: function () {
        if (this._isCurrent) {
            this._parent.set_currentPanel(this);
        }
    },
    /*
    bindDomEventHandlers : function()
    {
    },
    */
    // 创建DOM
    createDom: function (objData) {
        var cssClass = this._parent.cssCls;
        this._el = JueKit.Dom.createEl("div", { className: cssClass + "Panel" });

        this._el.style.display = "none";

        this._parent._elPanelGroup.appendChild(this._el);

        this._elTabSelectorDom = JueKit.Dom.createEl("li", { id: this._id + "_selector", className: cssClass + "Selector" }, JueKit.String.format("<a  href='javascript:void(0);'><span  id=" + this._id + "_selectorText" + " class='{0}SelectorText {0}SelectorIcon' ></span></a>", cssClass));

        this._elTabSelector = this._elTabSelectorDom;

        this._elTabSelectorText = this._elTabSelector.childNodes[0];

        this._parent._elSelectorGroup.appendChild(this._elTabSelectorDom);

        this._parent && this._parent.get_controls().addLast(this);
    },
    //解析DOM
    parseDom: function (objData) {
        this._elTabSelector = JueKit(this._id + "_selector");
        this._elTabSelectorText = JueKit(this._id + "_selectorText");
        this._elChildContainer = this._el;
    },
    //初始化数据
    onInit: function (objData) {
        if (this._title) {
            this.set_title(this._title);
        }
        if (this._iconClassName) {
            JueKit.Dom.removeCssClass(this._elTabSelectorText, "jueOutlookBarSelectorIcon");
            JueKit.Dom.addCssClass(this._elTabSelectorText, this._iconClassName);
        }
//        debugger;
//        if (this._parent.get_controls().get_count() == 0 && !this.get_isCurrent()) {
//            this._parent.set_topTitle(this._title);
//        }
        if (this._parent) {
            this._parent.set_height(this._parent._el.offsetHeight);
        }
    },
    //获得是否为当前panel
    get_isCurrent: function () {
        return this._isCurrent;
    },
    //获得标题
    get_title: function () {
        return this._title;
    },
    //设置标题
    set_title: function (value) {
        this._title = value;
        this._elTabSelectorText.innerHTML = JueKit.String.HTMLEncode(value);
        if (this.get_isCurrent()) {
            this._parent.set_topTitle(value);
        }
    },
    //加载完成后子元素布局
    onLazyLoaded: function () {
        this.onActive && this.onActive();
        this.__layoutChildren();
        this.fireEvent("active");
    },
    //当前panel选中时添加样式
    active: function () {
        //this.fireEvent("active"); 
        JueKit.Dom.addCssClass(this._elTabSelector, "jueOutlookBarSelectorCurrent");
        JueKit.Dom.show(this._el);

        this._isCurrent = true;
        if (!this._childLoaded) {
            this.__loadNow();
        }
        else {
            this.onActive && this.onActive();
            this.__layoutChildren();
            this.fireEvent("active");
        }

        //this.set_width(this._parent._panelWidth);
        //this.set_height(this._parent._panelHeight);
    },
    //当前panel不选中时，删除样式
    inactive: function () {
        this.fireEvent("inactive");

        JueKit.Dom.removeCssClass(this._elTabSelector, "jueOutlookBarSelectorCurrent");
        JueKit.Dom.hide(this._el);

        this._isCurrent = false;
    }
    // Dom Event Handlers
});
