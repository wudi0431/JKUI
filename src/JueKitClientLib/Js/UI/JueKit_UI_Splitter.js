/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.Splitter
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.SplitterBarDragDrop = JueKit.Type.createClass("JueKit.SplitterBarDragDrop", JueKit.DragDrop,
{
    b4Drag : function(evt)
    {
        this._indicator = this.getDragIndicator();
        this._splitter.dragX=this._startX;
        this._splitter.dragY=this._startY;
        this._splitter.startDrag();
    },
    
    getDragIndicator : function()
    {
        if(!this._sbi)
        {
            var cssCls = this._splitter.cssCls;
            var el = JueKit.Dom.createEl("div", {className:cssCls + "IndicatorWrap"}, "<div class='" + cssCls + "Indicator'></div>");
            
            el.style.position = "absolute";
            this._splitter._el.appendChild(el);
            
            this._sbi = el;
        }
        
        var sbr = this._splitter._elSplitBar;
        
        this._sbi.style.display = "block";
        this._sbi.style.width = sbr.offsetWidth;
        this._sbi.style.height = sbr.offsetHeight;
        return this._sbi;
    },
    
    b4EndDrag : function(evt)
    {
        this._sbi.style.display = "none";
        
        var d;
        
        if(this._splitter._direction == JueKit.UI.Direction.vertical)
        {
            d = this._curX - this._startX;
        }
        if(this._splitter._direction == JueKit.UI.Direction.horizon)
        {
            d = this._curY - this._startY;
        }
        this._splitter.changeCellSize(d);
        
        this._splitter.dragX=this._curX;
        this._splitter.dragY=this._curY;
        this._splitter.endDrag();
    }
});

JueKit.UI.Splitter = JueKit.Type.createClass("JueKit.UI.Splitter", JueKit.UI.RichClientWebControl,
{
    cssCls: "jueSplitter",
    isContainer: true,
    onInitProperty: function (objData) {
        this._direction = objData.direction || JueKit.UI.Direction.vertical;

        if (objData.dragable === undefined) {
            this._dragable = true;
        }
        else {
            this._dragable = objData.dragable;
        }
        if (objData.hiddenbar == undefined) {
            this._hiddenBar = false;
        }
        else {
            this._hiddenBar = objData.hiddenbar;
        }

        JueKit.UI.Splitter._base.onInitProperty.call(this, objData);
    },

    __createSplitterBar: function (container) {
        var cssCls = this.cssCls;
        var html = JueKit.String.format("<div class='{0}Bar'><div class='{0}BtnGroup'><a class='{0}BtnMin'></a><a class='{0}BtnMax'></a></div></div>", cssCls);
        var bar = JueKit.Dom.createEl("div", { className: cssCls + "BarWrap" }, html);
        container.appendChild(bar);
    },

    preCreateChildControl: function (objData) {
        if (this._clientCreate && this.get_controls().get_count() > 0) {
            this.__createSplitterBar(this._el);
        }
    },

    createDom: function (objData) {
        this._clientCreate = true;
        var cssCls = this.cssCls;
        if (this._direction == JueKit.UI.Direction.vertical) {
            cssCls += " " + this.cssCls + "Vertical";
        }
        else {
            cssCls += " " + this.cssCls + "Horizon";
        }
        this._el = JueKit.Dom.createEl("div", { className: cssCls });


        if (!objData.cells) {
            objData.cells = [{ width: 100 }, {}];
        }
        var controls = this.get_controls();
        for (var i = 0; i < objData.cells.length; i++) {
            var cell = objData.cells[i];
            this.preCreateChildControl && this.preCreateChildControl();
            var control = JueKit.Type.createObject({ tn: "JueKit.UI.SplitterCell", richClientPanel: this._richClientPanel, parent: this, container: this._el, width: cell.width, height: cell.height });

            controls.addLast(control);
            this.addedChildControl && this.addedChildControl(control);
        }

        JueKit.UI.Splitter._base.createDom.call(this, objData);
    },

    parseDom: function (objData) {
        this._elSplitBar = JueKit.Dom.getChildElByIndex(this._el, 1);
        this._elBtnGroup = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._elSplitBar));
        this._elBtnMin = JueKit.Dom.getFirstChild(this._elBtnGroup);
        this._elBtnMax = JueKit.Dom.getNextEl(this._elBtnMin);

        JueKit.UI.Splitter._base.parseDom.call(this, objData);
    },

    bindDomEventHandlers: function (objData) {
        var dd = new JueKit.SplitterBarDragDrop(this._elSplitBar, null, "A");
        dd._splitter = this;
        if (this._direction == JueKit.UI.Direction.horizon) {
            // 如果是水平分割，则允许垂直拖动
            dd._direction = JueKit.UI.Direction.vertical;
        }
        if (this._direction == JueKit.UI.Direction.vertical) {
            // 反之反然
            dd._direction = JueKit.UI.Direction.horizon;
        }
        this._ddImpl = dd;

        JueKit.Event.addHandler(this._elBtnMin, "click", this.__elBtnMin_Click, this);
        JueKit.Event.addHandler(this._elBtnMax, "click", this.__elBtnMax_Click, this);
    },

    onLoad: function (objData) {
        this._autoCell = null;
        var field;
        if (this._direction == JueKit.UI.Direction.vertical) {
            field = "_width";
        }
        else {
            field = "_height";
        }
        var node = this.get_controls().get_first(),
            ctl;
        while (node) {
            ctl = node.get_value();
            if (ctl._autoSize || ctl[field] == -1) {
                this._autoCell = ctl;
            }
            node = node.get_next();
        }

        if (!this._autoCell) {
            this._autoCell = this.get_controls().get_last().get_value();
        }

        this._elBtnGroup.style.top = parseInt((this._elSplitBar.offsetHeight - this._elBtnGroup.offsetHeight) / 2) + "px";

        this.set_dragable(this._dragable);

        if (this._hiddenBar) {
            this.__hiddenBar();
        }
    },

    onLayout: function () {
        JueKit.UI.Splitter._base.onLayout.call(this);

        var method, sizeName, offsetSizeName;
        if (this._direction == JueKit.UI.Direction.vertical) {
            method = "set_width";
            sizeName = "_width";
            offsetSizeName = "offsetWidth";
        }
        else {
            method = "set_height";
            sizeName = "_height";
            offsetSizeName = "offsetHeight";
        }

        var node = this.get_controls().get_first(),
            ctl, size, offsetSize;
        var maxSize = this[sizeName];
        while (node) {
            ctl = node.get_value();
            if (ctl != this._autoCell) {
                size = ctl[sizeName];
                ctl[method].call(ctl, size);
                offsetSize = ctl._el[offsetSizeName];
                maxSize -= offsetSize + this._elSplitBar.offsetWidth;
            }
            node = node.get_next();
        }

        this._autoCell[method].call(this._autoCell, maxSize);
    },

    startDrag: function () {
        this.fireEvent("startdrag");
    },
    endDrag: function () {
        this.fireEvent("enddrag");
    },
    __hiddenBar: function () {
        this._elSplitBar.className = 'jueSplitterBarWrapHidden';
        this._elBtnMin.style.display = "none";
        this._elBtnMax.style.display = "none";
    },
    set_cellLeftWidth: function (width) {
        var c1 = this.get_controls().get_first();
        var c2 = c1.get_next();
        c1 = c1.get_value();
        c2 = c2.get_value();
        var w = (c2._width + c1._width) - width;
        c1.set_width(width);
        c2.set_width(w);
        this.set_width(this._elSplitBar.offsetWidth + c1._width + c2._width);
    },

    set_cellRightWidth: function (width) {
        var c1 = this.get_controls().get_first();
        var c2 = c1.get_next();
        c1 = c1.get_value();
        c2 = c2.get_value();
        c1.set_width(c1._width + c2._width - width);
        c2.set_width(width);
    },

    changeCellSize: function (delta) {
        if (!delta) {
            return;
        }

        var c1 = this.get_controls().get_first();
        var c2 = c1.get_next();
        c1 = c1.get_value();
        c2 = c2.get_value();

        if (this._direction == JueKit.UI.Direction.vertical) {
            if (delta < 0) {
                c1.set_width(c1._width + delta);
                c2.set_width(c2._width - delta);
            }
            else {
                c2.set_width(c2._width - delta);
                c1.set_width(c1._width + delta);
            }
        }
        this._cellState = JueKit.UI.State.visible;
    },

    minCell: function () {
        if (this._cellState == JueKit.UI.State.minimum) {
            return;
        }

        var c1 = this.get_controls().get_first();
        c1 = c1.get_value();
        var width = c1._el.offsetWidth;

        width -= 1;

        this._oldCellDelta = width * -1;
        this.changeCellSize(width * -1);

        //this.set_dragable(false);

        this._cellState = JueKit.UI.State.minimum;
    },

    maxCell: function () {
        if (this._cellState == JueKit.UI.State.maximum) {
            return;
        }

        var c1 = this.get_controls().get_first();
        var c2 = c1.get_next();

        c2 = c2.get_value();
        var width = c2._el.offsetWidth;

        width -= 1;
        this._oldCellDelta = width;
        this.changeCellSize(width);
        //this.set_dragable(false);

        this._cellState = JueKit.UI.State.maximum;
    },

    __restoreCell: function () {
        this.changeCellSize(this._oldCellDelta * -1);
        //this.set_dragable(true);

        this._cellState = JueKit.UI.State.visible;
    },

    __elBtnMin_Click: function (evt) {
        if (this._cellState == JueKit.UI.State.minimum) {
            this.__restoreCell();
        }
        else if (this._cellState == JueKit.UI.State.maximum) {
            this.__restoreCell();
        }
        else {
            this.minCell();
        }
    },

    __elBtnMax_Click: function (evt) {
        if (this._cellState == JueKit.UI.State.minimum) {
            this.__restoreCell();
        }
        else if (this._cellState == JueKit.UI.State.maximum) {
            this.__restoreCell();
        }
        else {
            this.maxCell();
        }
    },

    onSetHeight: function (height) {
    },


    set_dragable: function (value) {
        this._dragable = value;
        this._ddImpl.set_disable(!value);
    },

    getCell: function (index) {
        var cell = this.get_controls().getAt(index);
        if (cell) {
            return cell.get_value();
        }
    },

    getCellElInner: function (index) {
        var cell = this.get_controls().getAt(index);
        if (cell) {
            return cell.get_value().getElInner();
        }
    }
});

