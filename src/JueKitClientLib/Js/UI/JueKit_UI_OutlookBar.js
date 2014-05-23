/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.OutlookBar
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.OutlookBar = JueKit.Type.createClass("JueKit.UI.OutlookBar", JueKit.UI.RichClientWebControl,{
    // _currentTabSelector : null,
    // OutlookBar基本样式名称
    cssCls: "jueOutlookBar",
    // 调整PanelGroup的高度
    onLoad: function () {

    }, 
    //查找当前pael
    __cbFindCurrentPanel: function (panel) {
        if (panel.get_isCurrent()) {
            return true;
        }
        this._currentPanelIndex++;
        return false;
    },
    //绑定事件
    bindDomEventHandlers: function () {
        JueKit.Event.addHandler(this._elSelectorGroup, 'click', this.__hElSelectorGroup_Click, this);
        JueKit.Event.addHandler(this._elTopRightA, 'click', this.__hCollapse_Click, this);
    },
    //创建DOM
    createDom: function (objData) {
        //设置样式
        if (objData.cssCls) {
            this.cssCls = objData.cssCls;
        }

        //得到按钮对象
        this._el = JueKit.UI.OutlookBar.__getOutlookBarDom(this.cssCls);
        //调基类方法创建
        JueKit.UI.OutlookBar._base.createDom.call(this, objData);
        this.parseDom(objData);
    },
    //解析DOM
    parseDom: function (objData) {
        this._isCollapse = false;

        this._collapsePosition = objData.CollapsePosition || 'Left';

        this._elTop = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elTopLeft = JueKit.Dom.getChildElByIndex(this._elTop, 0);
        this._elTopRight = JueKit.Dom.getChildElByIndex(this._elTop, 1);
        this._elTopRightA = JueKit.Dom.getChildElByIndex(this._elTopRight, 0);
        this._elTopRightA.className = this._collapsePosition;

        this._elHBox = JueKit.Dom.getChildElByIndex(this._el, 1);

        this._elPanelGroup = JueKit.Dom.getChildElByIndex(this._el, 2);
        this._elSelectorGroupWrap = JueKit.Dom.getChildElByIndex(this._el, 3);
        this._elSelectorGroup = JueKit.Dom.getChildElByIndex(this._elSelectorGroupWrap, 1);
    },
    //初始化数据
    onInit: function (objData) {
        var width = objData.width || 'auto';
        var height = objData.height || 'auto';
        if (width != 'auto') {
            this.set_width(width);
        }
        if (height != 'auto') {
            this._el.style.height = height + "px";
        }
    },
    //折叠和展开的点击事件
    __hCollapse_Click: function (ev) {
        if (this._isCollapse) {
            this.set_collapse(false);
        } else {
            this.set_collapse(true);
        }
    },
    //设置当折叠时显示的文本，
    __set_HBoxText: function (txt) {
        if (this._panelWidth == undefined || JueKit.theRcp.get_clientLanguage() == "ja") {
            this._elHBox.style.height = "100%";
            this._elHBox.innerHTML = txt;
        }
        this._elHBox.innerHTML = txt;
        this._elHBox.style.lineHeight = "23px";
    },
    //设值折叠和展开
    set_collapse: function (fg) {
        if (fg) {
            this._elTopLeft.style.display = "none";
            this._elHBox.style.display = "block";
            this._elPanelGroup.style.display = "none";
            this.__set_HBoxText(this._elTopLeft.innerHTML);
            this._el.style.width = "23px";
            if (this._collapsePosition == "Left") {
                this._elTopRightA.className = "Right";
            } else {
                this._elTopRightA.className = "Left";
            }
        }
        else {

            this._elTopLeft.style.display = "block";
            this._elHBox.style.display = "none";
            this._elPanelGroup.style.display = "block";
            if (this._panelWidth == undefined) {
                this._el.style.width = 'auto';
            } else {
                this._el.style.width = this._panelWidth + "px";
            }

            if (this._collapsePosition == "Left") {
                this._elTopRightA.className = "Left";
            } else {
                this._elTopRightA.className = "Right";
            }
        }
        this._isCollapse = fg;

        this.fireEvent("collapse");
    },
    //检查是否折叠 true 为折叠状态,flase为展开状态
    get_isCollapse: function () {
        return this._isCollapse;
    },
    //点击设置当前pael
    __hElSelectorGroup_Click: function (evt) {
        var el = JueKit.Event.srcEl(evt);

        while (el.tagName != "UL") {
            if (el.tagName == "LI") {
                break;
            }
            el = el.parentNode;
        }

        if (el.tagName == "UL") {
            return;
        }
        var nTabIndex = JueKit.Dom.getElIndex(el);

        this.set_currentPanelIndex(nTabIndex);
    },
    // 设置OutlookBar的第一个的title
    set_topTitle: function (title) {
        this._elTopLeft.innerHTML = JueKit.String.HTMLEncode(title);
    },
    //获得第一个panel
    get_firstPanel: function () {
        var node = this.get_controls().get_first();

        if (node) {
            return node.get_value();
        }
        return null;
    },
    //获得最后一个panel
    get_lastPanel: function () {
        var node = this.get_controls().get_last();

        if (node) {
            return node.get_value();
        }
        return null;
    },
    //获得当前panel
    get_currentPanel: function () {
        return this._currentPanel;
    },
    //获得当前panel的索引
    get_currentPanelIndex: function () {
        if (!this._currentPanel) {
            return -1;
        }
        var node = this.get_controls().get_first();
        var panelIndex = 0;
        var panel;
        while (node) {
            panel = node.get_value();
            if (panel == this._currentPanel) {
                break;
            }

            panelIndex++;
            node = node.get_next();
        }

        if (!node) {
            return -1;
        }
        return panelIndex;
    },
    //设置OutlookBar的当前panel的索引
    set_currentPanelIndex: function (panelIndex) {
        if (panelIndex < 0) {
            panelIndex = 0;
        }
        if (panelIndex > this.get_controls().get_count() - 1) {
            panelIndex = 0;
        }
        this.set_currentPanel(this.get_controls().getAt(panelIndex).get_value());
    },
    //设置OutlookBar的panel的为当前paenl
    set_currentPanel: function (panel) {
        if (this.get_isCollapse()) {
            this.set_collapse(false);
        }
        if (!panel || panel == this._currentPanel) {
            return;
        }

        var oldPanel = this._currentPanel;
        if (this._currentPanel) {
            this._currentPanel.inactive();
        } 
        this.set_topTitle(panel.get_title());
        this._currentPanel = panel;
        this._currentPanel.active();
        this.fireEvent("change", { newPanel: this._currentPanel, oldPanel: oldPanel });
    }, 
    //设置OutlookBar宽度
    set_width: function (value) {
        if (value < 0) {
            return;
        }
        var width = value - 2;

        if (width < 0) {
            width = 0;
        }

        this._el.style.width = (width) + "px";

        this._panelWidth = width;
        //this._currentPanel && this._currentPanel.set_width(width);
    },
    //设置OutlookBar高度
    set_height: function (value) {
        if (value < 0) {
            return;
        }
        var height = value - this._elSelectorGroupWrap.offsetHeight - 23;
        if (height <= 0) { return; }
        this._elPanelGroup.style.height = height.toString() + "px";
        this._elHBox.style.height = (height - 1) + "px";
        this._panelHeight = height;
        this._currentPanel && this._currentPanel.set_height(height);
    }
});

// 按钮模板
JueKit.UI.OutlookBar._olbTemplate = {};
// 返回按钮模板
JueKit.UI.OutlookBar.__getOutlookBarDom = function (cssCls) {
    if (!this._olbTemplate[cssCls]) {
        var elContainer = JueKit.Dom.createEl("div", null,
            JueKit.String.format("<div class='{0}'><div class='{0}Top'><div class='{0}TopLeft'></div><div class='{0}TopRight'><a href='javascript:void(0);'></a></div></div><div class='{0}HBox'></div><div class='{0}PanelGroup'></div><div class='{0}SelectorGroupWrap'><div class='{0}AdjustStrip'><div class='{0}AdjustStripInner'></div></div><ul class='{0}SelectorGroup'></ul></div>", cssCls));
        this._olbTemplate[cssCls] = elContainer.childNodes[0];
    }
    var el = this._olbTemplate[cssCls].cloneNode(true); 
    return el;
};