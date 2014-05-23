/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.Tabset
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.Tabset = JueKit.Type.createClass("JueKit.UI.Tabset", JueKit.UI.RichClientWebControl,{
    // _currentTabSelector : null, 
    cssCls: "jueTab",
    //获得数据集
    ctor: function (objData) {
        this._panels = new JueKit.Collection.LinkedList();

        JueKit.UI.Tabset._base.ctor.call(this, objData);
    },
    //加载完成执行
    onLoad: function (objData) {
        //this._currentPanel && this._currentPanel.__doBeforeActive() && this._currentPanel.__doActive();
        var cp = this._currentPanel;
        if (!cp) {
            return;
        }

        var args = { firstActive: true, result: true };
        cp.fireEvent("beforeActive", args);

        if (!args.result) {
            return;
        }
        if (!cp._childLoaded) {
            cp.__loadNow();
        }
        else {
            cp.onActive && cp.onActive(args);
            cp.fireEvent("active", args);
            cp._firstActive = undefined;
        }
        args = { newPanel: cp, oldPanel: null };
        this.onChange && this.onChange(args);
        this.fireEvent("change", args);
        cp.fireEvent("afterActive");

    },
    //记录当前panel的索引
    __cbFindCurrentPanel: function (panel) {
        if (panel._isCurrent) {
            return true;
        }
        this._currentPanelIndex++;
        return false;
    },
    //绑定事件
    bindDomEventHandlers: function () {
        JueKit.Event.addHandler(this._elTabStrip, 'click', this.__hTabStripEl_Click, this);
    },
    //创建DOM
    createDom: function (objData) {
        var cssClass = this.cssCls;
        var html = JueKit.String.format("<div class='{0}Header'><div class='{0}StripWrap'><div class='{0}Strip'><ul class='{0}SelectorGroup'></ul></div></div></div><div class='{0}PanelGroupWrap'><div class='{0}PanelGroup'><div class='{0}PanelGroupInner'></div></div></div><div class='{0}FooterW'><div class='{0}Footer'><div class='{0}FooterI'></div></div></div>", cssClass);

        this._el = JueKit.Dom.createEl("div", { className: cssClass }, html);

        JueKit.UI.Tabset._base.createDom.call(this, objData);

        this.parseDom(objData);
    },
    //解析DOM
    parseDom: function (objData) {
        this._elTabHeader = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elTabStripWrap = JueKit.Dom.getChildElByIndex(this._elTabHeader, 0);
        this._elTabStrip = JueKit.Dom.getChildElByIndex(this._elTabStripWrap, 0);
        this._elTabSelGroup = JueKit.Dom.getChildElByIndex(this._elTabStrip, 0);

        this._elPanelGroup = JueKit.Dom.getNextEl(this._elTabHeader);
        this._elPanelGroupInner = JueKit.Dom.getChildElByIndex(JueKit.Dom.getChildElByIndex(this._elPanelGroup, 0), 0); ;
        this._elFooterW = JueKit.Dom.getNextEl(this._elPanelGroup);
    },
    // ×关闭panel事件
    __hTabStripEl_Click: function (evt) {
        var el = JueKit.Event.srcEl(evt),
            cssClose = this.cssCls + "BtnClose";

        while (el && el.tagName != "UL") {
            if (el.className == cssClose) {
                this.closePanelByIndex(JueKit.Dom.getParentIndex(el, "LI"));
                JueKit.Event.stop(evt);
                return;
            }
            if (el.tagName == "A") {
                el.blur();
            }
            else if (el.tagName == "LI") {
                var nTabIndex = JueKit.Dom.getElIndex(el);

                this.set_currentPanelIndex(nTabIndex);
                return;
            }
            el = el.parentNode;
        }
    },
    //获得所有的panel
    get_panels: function () {
        return this._panels;
    },
    //获得第一个panel
    get_firstPanel: function () {
        var node = this._panels.get_first();

        if (node) {
            return node.get_value();
        }
        return null;
    },
    //获得最后一个panel
    get_lastPanel: function () {
        var node = this._panels.get_last();

        if (node) {
            return node.get_value();
        }
        return null;
    },
    //获得当前panel
    get_currentPanel: function () {
        return this._currentPanel;
    },
    //获得当前panel的索引值
    get_currentPanelIndex: function () {
        if (!this._currentPanel) {
            return -1;
        }
        var node = this._panels.get_first();
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
    //设置某个panel为当前panel，传一个panel的索引
    set_currentPanelIndex: function (panelIndex) {
        if (panelIndex < 0) {
            panelIndex = 0;
        }
        if (panelIndex > this._panels.get_count() - 1) {
            panelIndex = 0;
        }

        var panel = this._panels.getAt(panelIndex).get_value();
        if (!panel._panelVisible) {
            this.set_currentPanelIndex(panelIndex + 1);
            return;
        }

        this.set_currentPanel(panel);
        this.fireEvent("itemClick", panelIndex);
    },
    //设置传入的panelw为当前panel
    set_currentPanel: function (panel) {
        var clickArgs = { result: true };
        panel && panel.fireEvent("click", clickArgs);
        if (!clickArgs.result) {
            return false;
        }

        if (!panel || panel == this._currentPanel) {
            return false;
        }

        if (panel.__doBeforeActive()) {
            var oldPanel = this._currentPanel;
            if (oldPanel) {
                oldPanel.inactive();
            }
            this._currentPanel = panel;
            panel.__doActive();

            this.layoutTabHeader();

            var args = { newPanel: panel, oldPanel: oldPanel };
            this.onChange && this.onChange(args);
            this.fireEvent("change", args);
            panel.fireEvent("afterActive");

            return true;
        }

        return false;
    },
    //设置tabset的高度
    set_height: function (value) {
        this._height = value;

        if (value <= 0) {
            return;
        }
        if (this._elFooterW) { 
            var ih = value - this._elTabHeader.offsetHeight - this._elFooterW.offsetHeight;
        } else {
            var ih = value - this._elTabHeader.offsetHeight;
        } 
        this._elPanelGroupInner.style.height = ih + "px";
        this._el.style.height = value + "px";

        this._innerHeight = ih;
        this._currentPanel && this._currentPanel.set_height(ih);
    },
    //添加panel
    addPanel: function (panel) {
        if (!(panel instanceof JueKit.UI.TabPanel)) {
            panel.parent = this;
            panel = new JueKit.UI.TabPanel(panel);
        }

        return panel;
    },
    //获得下一个可见的panel
    getNextVisiblePanel: function (panel) {
        do {
            panel = panel.get_next();
            if (panel && panel._panelVisible) {
                return panel;
            }
        }
        while (panel)
    },
    //获得上一个可见的panel
    getPrevVisiblePanel: function (panel) {
        do {
            panel = panel.get_previous();
            if (panel && panel._panelVisible) {
                return panel;
            }
        }
        while (panel)
    },
    //隐藏一个pael
    __onHidePanel: function (panel) {
        var p = this.getNextVisiblePanel(panel);
        if (!p) {
            p = this.getPrevVisiblePanel(panel);
        }
        if (p) {
            this.set_currentPanel(p);
        }
    },
    //关闭一个panel
    closePanel: function (panel) {
        if (panel.__doClose()) {
            this.__onHidePanel(panel);
            this._panels.remove(panel);
        }
    },
    //根据传入的panel的索引关闭一个panel
    closePanelByIndex: function (panelIndex) {
        this.closePanel(this._panels.getAt(panelIndex).get_value());
    },
    //重新布局Tabset的Header
    layoutTabHeader: function () {
        if (this._elTabHeader.offsetHeight == 0) {
            return;
        }

        this._elTabSelGroup.style.width = "";

        var tabsWidth = 0,
            headerWidth = this._elTabHeader.offsetWidth,
            oldScrollLeft = this._elTabStripWrap.scrollLeft;
        var elTab = JueKit.Dom.getFirstChild(this._elTabSelGroup);
        while (elTab) {
            tabsWidth += elTab.offsetWidth;

            elTab = JueKit.Dom.getNextEl(elTab);
        }

        //this._elTabSelGroup.style.width = (tabsWidth + 20) + "px";

        if (tabsWidth + 10 > headerWidth) {
            this._elTabStrip.style.width = (tabsWidth + 20) + "px";
            if (!this._elTabOpts) {
                var strHtml = JueKit.String.format("<a href='javascript:;' class='{0}OptMoveLeft'><span>&lt;</span></a><a href='javascript:;' class='{0}OptMoveRight'><span>&gt;</span></a>", this.cssCls);
                this._elTabOpts = JueKit.Dom.createEl("div", { className: this.cssCls + "Opts" }, strHtml);
                this._elTabOptMoveLeft = JueKit.Dom.getFirstChild(this._elTabOpts);
                this._elTabOptMoveRight = JueKit.Dom.getNextEl(this._elTabOptMoveLeft);

                JueKit.Event.addHandler(this._elTabOptMoveLeft, "click", this._elTabOptMoveLeft_click, this);
                JueKit.Event.addHandler(this._elTabOptMoveRight, "click", this._elTabOptMoveRight_click, this);

                this._elTabHeader.insertBefore(this._elTabOpts, this._elTabHeader.firstChild);
            }
            else {
                JueKit.Dom.show(this._elTabOpts);
            }

            var tabStripWrapWidth = headerWidth - this._elTabOpts.offsetWidth - 5;
            if (tabStripWrapWidth > 0) {
                this._elTabStripWrap.style.width = tabStripWrapWidth + "px";
            }

            var rectTab = JueKit.Dom.getRect(this._currentPanel._elTabSelector);
            var rectTabStrip = JueKit.Dom.getRect(this._elTabStripWrap);

            if (rectTab.left + rectTab.width > rectTabStrip.left + rectTabStrip.width) {
                this._elTabStripWrap.scrollLeft += rectTab.left + rectTab.width - rectTabStrip.left - rectTabStrip.width;
            }
            else if (rectTab.left < rectTabStrip.left) {
                this._elTabStripWrap.scrollLeft -= rectTabStrip.left - rectTab.left;
            }
            else {
                this._elTabStripWrap.scrollLeft = oldScrollLeft;
            }
        }
        else {
            if (this._elTabOpts) {
                JueKit.Dom.hide(this._elTabOpts);
            }
            this._elTabStripWrap.style.width = "";
            this._elTabStrip.style.width = "";
        }
    },
    //移动到左边
    _elTabOptMoveLeft_click: function (evt) {
        this.set_currentPanel(this.getPrevVisiblePanel(this._currentPanel));
    },
    //移动到右边
    _elTabOptMoveRight_click: function (evt) {
        this.set_currentPanel(this.getNextVisiblePanel(this._currentPanel));
    }

});
