/**
* Copyright (c) 2007 Tulipmm.cn. All rights reserved.
* @Author fossil
*/

// JueKit.UI.DropdownControl
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.DropdownControl = JueKit.Type.createClass("JueKit.UI.DropdownControl", JueKit.UI.RichClientWebControl, {
    cssCls: "jueDrp",
    // 当没有选中任何项的时候显示的内容
    _emptyText: "",
    _firstDropdown: true,

    onInitProperty: function (objData) {
        if (objData.emptyText !== undefined) {
            this._emptyText = objData.emptyText;
        }

        if (objData.readOnly) {
            this._readOnly = objData.readOnly;
        }

        JueKit.UI.DropdownControl._base.onInitProperty.call(this, objData);
    },

    createDom: function (objData) {
        var html = JueKit.String.format("<div class='{0}'><div class='{0}Inner'><div class='{0}Btn'></div><div class='{0}Lbl'></div></div></div><div class='{0}Box' style='display:none'></div>", this.cssCls);
        this._el = JueKit.Dom.createEl("div", {
            className: this.cssCls + "Wrap"
        }, html);

        this._elBox = JueKit.Dom.getChildElByIndex(this._el, 1);
        if (this.createBoxContent) {
            this.createBoxContent(this._elBox, objData);
        }
        JueKit.UI.DropdownControl._base.createDom.call(this, objData);
    },

    parseDom: function (objData) {
        this._elHead = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elBtn = JueKit.Dom.getChildElByIndex(
            JueKit.Dom.getChildElByIndex(this._elHead, 0), 0);

        this._elLbl = JueKit.Dom.getNextEl(this._elBtn);
        this._elBox = JueKit.Dom.getChildElByIndex(this._el, 1);

        JueKit.UI.DropdownControl._base.parseDom.call(this, objData);
    },

    bindDomEventHandlers: function (objData) {
        JueKit.Event.addHandler(this._el, "mouseover", this.__hEl_Mouseover, this);
        JueKit.Event.addHandler(this._el, "mouseout", this.__hEl_Mouseout, this);
        JueKit.Event.addHandler(document.body, "mousedown", this.__hBody_Mousedown, this);
    },

    onInit: function (objData) {
        if (objData.width >= 0) {
            this.set_width(objData.width);
        } else {
            this.set_width(150);
        }

        if (objData.limitBoxHeight && objData.limitBoxHeight >= 0) {
            this._limitBoxHeight = objData.limitBoxHeight;
        } else {
            this._limitBoxHeight = 350;
        }

        if (JueKit.Browser.isIE) {
            this._el.style.overflow = "hidden";
        }

        document.body.appendChild(this._elBox);

    },

    __hEl_Mouseover: function (evt) {
        if (!this._readOnly) {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "Hover");
        }
    },

    __hEl_Mouseout: function (evt) {
        if (!this._readOnly) {
            JueKit.Dom.removeCssClass(this._el, this.cssCls + "Hover");
        }
    },

    __hBody_Mousedown: function (evt) {
        if (this._readOnly) {
            return;
        }

        var el = JueKit.Event.srcEl(evt);
        while (el) {
            if (el == this._elBox) {
                return;
            }
            if (el == this._el) {
                if (this._isDropping) {
                    this.closeDropdown();
                } else {
                    this.dropdown();
                }
                return;
            }
            el = el.parentNode;
        }

        this.closeDropdown();
    },

    __limitBoxHeight: function () {
        var height = this._elBox.offsetHeight;
        if (height > this._limitBoxHeight) {
            height = this._limitBoxHeight;
            this._elBox.style.height = this._limitBoxHeight + "px";

            if (this.onForceLimitBoxHeight) {
                this.onForceLimitBoxHeight(height);
            }
        }
    },

    dropdown: function () {
        JueKit.UI.DropdownControl.dropdown(this);
    },

    __dropdown: function () {
        if (this._readOnly) {
            return;
        }

        var args = {
            result: true,
            // 表示是否是第一次下拉
            isFirst: this._firstDropdown
        };

        // 在进行下拉前执行，子类可以在这个时候做一些处理
        // 比如DropdownList，可以高亮选中的项
        if (this.onBeforeDropdown) {
            if (!this.onBeforeDropdown()) {
                return false;
            }
        }

        // 触发BeforeDropdown事件
        this.fireEvent("beforeDropdown", args);

        // 判断是不是要终止下拉的执行
        if (!args.result) {
            return false;
        }

        // 删除_firstDropdown成员，
        // 这样在下次下拉操作的时候，就不是第一次了-_-||
        this._firstDropdown = undefined;

        // 设置当前状态为正在下拉
        this._isDropping = true;


        // 设置ClassName
        JueKit.Dom.addCssClass(this._el, this.cssCls + "Down");

        // 显示下拉框
        JueKit.Dom.show(this._elBox);

        // 调整下拉框大小
        var pos = JueKit.Dom.getPosition(this._el);
        if (pos == false) {
            return;
        }
        var size = JueKit.Dom.getSize(this._el);

        var boxSize = [-1, -1];
        if (this.onMesureItem) {
            boxSize = this.onMesureItem();
        }

        var width = boxSize[0];
        if (width == -1) {
            width = size.width;
        }

        var height = boxSize[1];

        this._elBox.style.width = width + "px";
        if (height != -1) {
            this._elBox.style.height = height + "px";
        }

        // 设置下拉框的最大高度
        this.__limitBoxHeight();

        // 调整下拉框的位置 
        var boxTop = pos.top + size.height;
        var boxLeft = pos.left;

        var clientHeight = JueKit.Dom.getInner().height;
        var scrollTop = JueKit.Dom.getScroll().top;

        if (boxTop + this._elBox.offsetHeight > (clientHeight + scrollTop)) {
            boxTop = pos.top - this._elBox.offsetHeight;
        }
        if (boxTop < 0) {
            boxTop = pos.top + size.height;
            height = clientHeight + scrollTop - boxTop;
            if (height > 0) {
                this._elBox.style.height = height + "px";
            }
        }
        if (navigator.userAgent.indexOf("Chrome") > -1 || navigator.userAgent.indexOf("Safari") > -1) {
            boxTop = boxTop + scrollTop;
        }

        JueKit.Dom.setPosition(this._elBox, boxLeft, boxTop);

        if (this.onDropdown) {
            this.onDropdown();
        }

        return true
    },

    closeDropdown: function () {
        JueKit.UI.DropdownControl.closeDropdown(this);
    },

    __closeDropdown: function () {
        // 设置当前状态不再下拉
        this._isDropping = false;

        // 设置ClassName
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Down");

        // 隐藏下拉框
        JueKit.Dom.hide(this._elBox);

        this.onCloseDropdown && this.onCloseDropdown();

        this.fireEvent("closeDropdown");
    },

    get_readOnly: function () {
        return this._readOnly;
    },

    set_readOnly: function (value) {
        this._readOnly = value;
    },

    set_labelText: function (value) {
        if (value === undefined || value === null) {
            value = "";
        }
        this._elLbl.innerHTML = JueKit.String.HTMLEncode(value);
        if (this._width > 0) {
            this._elLbl.style.width = this.get_width() - 22 + "px";
        }
        this.set_labelTip(value);
    },

    set_labelTip: function (value) {
        if (value === undefined || value === null) {
            value = "";
        }
        this._elHead.title = value;
    }
});

JueKit.Type.extend(JueKit.UI.DropdownControl, {
    dropdown: function (control) {
        if (!control) {
            this.current = null;
        }

        if (this.current && (this.current != control)) {
            this.current.closeDropdown();
        }

        if (control.__dropdown()) {
            this.current = control;
        }
    },

    closeDropdown: function (control) {
        this.current = null;
        control.__closeDropdown();
    }
});

// JueKit.UI.DropdownList
JueKit.UI.DropdownList = JueKit.Type.createClass("JueKit.UI.DropdownList", JueKit.UI.DropdownControl, {
    _selectedIndex: -1,
    onInitProperty: function (objData) {
        this._items = [];

        this._textColName = objData.textColName;
        this._valueColName = objData.valueColName;
        this._canSearch = objData.canSearch || false;

        JueKit.UI.DropdownList._base.onInitProperty.call(this, objData);
    },

    onInit: function (objData) {
        this.set_textColName(objData.textColName);
        this.set_valueColName(objData.valueColName);
        if (objData.dataSource) {
            this.bindDataSource(objData.dataSource);
        }
        if (objData.dropdownDataSource) {
            this.bindDropdownDataSource(objData.dropdownDataSource);
        } else if (objData.items) {
            for (var i = 0; i < objData.items.length; i++) {
                var item = objData.items[i];
                this.addItem(item.text, item.value);
            }
        }

        if (objData.selectedValue !== undefined) {
            this.set_selectedValue(objData.selectedValue);
        } else if (objData.selectedIndex !== undefined) {
            this.set_selectedIndex(objData.selectedIndex);
        } else {
            this.set_labelText(this._emptyText);
        }

        JueKit.UI.DropdownList._base.onInit.call(this, objData);
    },

    createBoxContent: function (elBox, objData) {
        this._elSearchBox = JueKit.Dom.createEl("div", {
            className: this.cssCls + "SearchBox"
        });
        this._btnCancelSearch = JueKit.Dom.createEl("a", {
            className: this.cssCls + "CancelSearch"
        });
        this._txtSearch = JueKit.Dom.createEl("input");
        this._txtSearch.className = "jueDorpdownListSearchTxt";
        this._txtSearch.style.display = "block";
        this._elSearchBox.appendChild(this._btnCancelSearch);
        this._elSearchBox.appendChild(this._txtSearch);
        this._elList = JueKit.Dom.createEl("ul", {
            className: this.cssCls + "List"
        });
        elBox.appendChild(this._elSearchBox);
        elBox.appendChild(this._elList);

        if (!this._canSearch) {
            JueKit.Dom.hide(this._elSearchBox);
        }

        JueKit.Event.addHandler(this._txtSearch, "keyup", this.__hTxtSearch_KeyUp, this);
    },

    parseDom: function (objData) {
        JueKit.UI.DropdownList._base.parseDom.call(this, objData);

        if (!this._elList) {
            this._elList = JueKit.Dom.getChildElByIndex(this._elBox, 0);
        }
    },
    onLoad: function (objData) {
        if (this._items.length > 10) {
            if (!this._canSearch) {
                this._canSearch = objData.canSearch = true;
                JueKit.Dom.show(this._elSearchBox);
            }
        }
    },

    bindDomEventHandlers: function (objData) {
        JueKit.Event.addHandler(this._elList, "mouseup", this.__hElList_Mouseup, this);
        JueKit.UI.DropdownList._base.bindDomEventHandlers.call(this, objData);
    },

    __hElList_Mouseup: function (evt) {
        var el = JueKit.Event.srcEl(evt);
        el = JueKit.Dom.getParent(el, "LI");
        if (el) {
            var nIndex = JueKit.Dom.getElIndex(el);
            this.set_selectedIndex(nIndex);
        }
        JueKit.UI.DropdownControl.closeDropdown(this);
    },
    __showNodesPointer: -1, //当前上下移动指向
    __searchShowNodes: [],  //每次查询后为显示状态的li->a元素数组
    __hTxtSearch_KeyUp: function (event) {
        //搜索查询框并支持向上向下键
        var keyCode = { DOWN: 40, UP: 38, ENTER: 13 };
        if (this._canSearch) {
            //当onBeforeDropdown调用时event为null
            if (event === null) {
                var pthis = this;
                this.__searchShowNodes.length = 0;
                for (var i = 0, len = this._items.length; i < len; i++) {
                    JueKit.Dom.show(this._elList.childNodes[i]);
                    this.__searchShowNodes.push(this._elList.childNodes[i].childNodes[0]);
                }
                //input查询框渲染完成后调用foucs获得焦点,直接调用无效
                window.setTimeout(function () { pthis._txtSearch.focus() }, 200);
            }
            else {
                event = event || window.event || {};
                if (!(event.keyCode === keyCode.DOWN || event.keyCode === keyCode.UP || event.keyCode === keyCode.ENTER)) {
                    var search = this._txtSearch.value.trim().toLowerCase();
                    this.__searchShowNodes.length = 0;
                    for (var i = 0, len = this._items.length; i < len; i++) {
                        var text = this._items[i].text.toLowerCase();
                        if (text.indexOf(search) !== -1) {
                            JueKit.Dom.show(this._elList.childNodes[i]);
                            this.__searchShowNodes.push(this._elList.childNodes[i].childNodes[0]);
                        } else {
                            JueKit.Dom.hide(this._elList.childNodes[i]);
                        }
                    }
                }

                var setActiveClass = function (elem, className) { elem.className = className || "jueDrpListItem_a_hover"; }, //设置激活样式
                      allSetDefaultClass = function (domnodes, className) { for (var i = 0, len = domnodes.length; i < len; i++) domnodes[i].className = className || "jueDrpListItem_a"; }; //默认样式

                allSetDefaultClass(this.__searchShowNodes);
                switch (event.keyCode) {
                    case keyCode.DOWN:
                        this.__showNodesPointer++;
                        if (this.__showNodesPointer >= this.__searchShowNodes.length) this.__showNodesPointer = 0;
                        setActiveClass(this.__searchShowNodes[this.__showNodesPointer]);
                        break;
                    case keyCode.UP:
                        this.__showNodesPointer--;
                        if (this.__showNodesPointer <= -1) this.__showNodesPointer = this.__searchShowNodes.length - 1;
                        setActiveClass(this.__searchShowNodes[this.__showNodesPointer]);
                        break;
                    case keyCode.ENTER:
                        el = JueKit.Dom.getParent(this.__searchShowNodes[this.__showNodesPointer], "LI");
                        el && this.set_selectedIndex(JueKit.Dom.getElIndex(el));
                        JueKit.UI.DropdownControl.closeDropdown(this);
                        this.__showNodesPointer = -1;
                        break;
                    default:
                        break;
                }
            }
        }
    },

    onBeforeDropdown: function () {
        if (this._canSearch) {
            this._txtSearch.value = "";
            this.__hTxtSearch_KeyUp(null);
        }

        return true;
    },

    addItem: function (text, value) {
        if (value === undefined) {
            value = text;
        }

        this._items[this._items.length] = {
            text: text,
            value: value
        };
        var el = JueKit.Dom.createEl("li", {
            className: this.cssCls + "ListItem"
        }, "<a href='javascript:void(0);'>" + JueKit.String.HTMLEncode(text) + "</a>");
        el.firstChild.title = text;
        this._elList.appendChild(el);
    },

    removeItem: function (index) {
        if (index < 0) {
            return;
        }

        if (index >= this._items.length) {
            return;
        }

        this._items.splice(index, 1);
        JueKit.Dom.removeEl(JueKit.Dom.getChildElByIndex(this._elList, index));

        if (index == this._selectedIndex) {
            this.set_selectedIndex(-1);
        } else if (index < this._selectedIndex) {
            this._selectedIndex--;
        }
    },

    removeItemByValue: function (value) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].value === value) {
                return this.removeItem(i);
            }
        }
    },

    get_selectedIndex: function () {
        return this._selectedIndex;
    },

    set_selectedIndex: function (value) {
        if (value >= this._items.length) {
            value = -1;
        }

        var oldSelectedIndex = this._selectedIndex;
        if (value == oldSelectedIndex) {
            return;
        }

        this._selectedIndex = value;

        if (this._selectedIndex == -1) {
            this._text = this._emptyText;
            this.set_labelText(this._emptyText);
        } else {
            this._text = this._items[this._selectedIndex].text;
            this.set_labelText(this._text);
        }

        var args = {
            oldSelectedIndex: oldSelectedIndex,
            selectedIndex: this._selectedIndex
        };

        if (this.onChange) {
            this.onChange(args);
        }

        this.fireEvent("change", args);

        if (this._state & JueKit.UI.State.updatingCtlData) {
            return;
        }

        this.updateData();
    },

    get_selectedValue: function () {
        var idx = this._selectedIndex;
        if (idx == -1) {
            return null;
        }

        var v = this._items[idx].value;
        if (v === undefined) {
            return this._items[idx].text
        }
        return v;
    },

    set_selectedValue: function (value) {
        var nIndex = -1;
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].value == value) {
                nIndex = i;
                break;
            }
        }

        this.set_selectedIndex(nIndex);
    },

    get_selectedText: function () {
        var idx = this._selectedIndex;
        if (idx == -1) {
            return null;
        }

        return this._items[idx].text;
    },

    set_selectedText: function (value) {
        var nIndex = -1;
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].text == value) {
                nIndex = i;
                break;
            }
        }

        this.set_selectedIndex(nIndex);
    },

    get_text: function () {
        return this._text;
    },

    getTextByValue: function (value) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].value == value) {
                return this._items[i].text;
            }
        }

        return this._emptyText;
    },

    clearItems: function () {
        this._selectedIndex = -1;
        this._text = null;
        this._items = [];
        this._elList.innerHTML = "";
    },

    set_textColName: function (value) {
        this._textColName = value;
    },

    set_valueColName: function (value) {
        this._valueColName = value;
    },

    bindDropdownDataSource: function (dataSource) {
        if (this._dropdownDataSource) {
            this._dropdownDataSource.unbindView(this);
            this.onUnbindDropdownDataSource && this.onUnbindDataSource(dataSource);
        }

        if (dataSource) {
            this._dropdownDataSource = dataSource;
            this._dropdownDataSource.bindView(this);
            this.onBindDropdownDataSource && this.onBindDropdownDataSource(dataSource);
        }
    },
    // IDataView

    canUpdateView: function () {
        return true;
    },

    beginUpdateView: function (dataSource, updateType, args) {
        if (dataSource == this._dropdownDataSource) {
            this.clearItems();
        }
    },

    onBindRowData: function (dataRow) {
        var text = JueKit.Data.DataRow.getColValue(dataRow, this._textColName);
        var value = JueKit.Data.DataRow.getColValue(dataRow, this._valueColName);

        this.addItem(text, value);
    },

    endUpdateView: function () { },

    //DataBindableControl
    onUpdateCtlData: function (dataSource) {
        if (dataSource == this._dropdownDataSource) {
            dataSource.forEach(this.onBindRowData, this);
            return;
        }
        var value;
        if (this._valueColName) {
            value = JueKit.Data.DataRow.getColValue(dataSource, this._valueColName);
            this.set_selectedValue(value);
        } else if (this._textColName) {
            value = JueKit.Data.DataRow.getColValue(dataSource, this._textColName);
            this.set_selectedText(value);
        }
    },

    onUpdateData: function (dataSource) {
        this.__updateData(dataSource);
    },

    __updateData: function (ds) {
        if (ds) {
            if (this._valueColName) {
                JueKit.Data.DataRow.setColValue(ds, this._valueColName, this.get_selectedValue());
            }
            if (this._textColName) {
                JueKit.Data.DataRow.setColValue(ds, this._textColName, this.get_selectedText());
            }
        }
    }
});

JueKit.Type.extend(JueKit.UI.DropdownList.prototype, JueKit.UI.DataBindableControl.prototype);


JueKit.UI.DataGridInstantDropdownList = JueKit.Type.createClass("JueKit.UI.DataGridInstantDropdownList", JueKit.UI.DropdownList, {
    instUpdateEditor: function (grid, dataRow, col) {
        this._instGrid = grid;
        this._instDataRow = dataRow;
        this._instCol = col;

        this._state |= JueKit.UI.State.updatingCtlData;
        this.set_selectedValue(JueKit.Data.DataRow.getColValue(dataRow, col.valueColName));
        this._state &= ~JueKit.UI.State.updatingCtlData;
    },

    instUpdateData: function () {
        this.__updateData(this._instDataRow);
    },

    instBeginEdit: function () {
        this.dropdown();
    },

    onChange: function () {
        this.instUpdateData();
    }
});



/**********************
** DropdownTree
**********************/

// JueKit.UI.DropdownTree
JueKit.UI.DropdownTree = JueKit.Type.createClass("JueKit.UI.DropdownTree", JueKit.UI.DropdownControl, {
    onInitProperty: function (objData) {
        this._multiSelect = objData.multiSelect;
        this._objData = objData;
        JueKit.UI.DropdownTree._base.onInitProperty.call(this, objData);
    },

    onBeforeDropdown: function () {
        if (!this._tree) {
            var el;
            if (this._objData.quiry) {
                el = JueKit.Dom.createEl("div", {
                    className: this.cssCls + "Sel"
                });
                el.style["paddingBottom"] = "5px";
                el.style.padding = "5px";

                this._elBox.appendChild(el);
                this._txtSel = new JueKit.UI.TextBox({
                    type: "text",
                    container: el

                });
                this._txtSel.set_width(120);
                this._btnSel = new JueKit.UI.Button({
                    text: JueKitSR["query"],
                    container: el,
                    cssCls: "miniBtn"
                });

                this._btnSel.addHandler("click", this.__onClickSel, this);
            }

            el = JueKit.Dom.createEl("div", {
                className: this.cssCls + "TreeCtnr"
            });
            this._elBox.appendChild(el);
            el.style.width = "100%";
            var version = JueKit.Browser.version;
            if(version=="8") {
                el.style.overflow = "auto";
            } 
            this._elTreeCtnr = el;

            if (this.createTree) {
                this._tree = this.createTree(el, this._objData);
            }

            if (this._tree) {
                this._tree.addHandler("expand", this.__hTree_ExpandCollapse, this);
                this._tree.addHandler("collapse", this.__hTree_ExpandCollapse, this);
            }

            el = JueKit.Dom.createEl("div", {
                className: this.cssCls + "Opt"
            });

            this._btnOk = new JueKit.UI.Button({
                text: JueKitSR["ok"],
                container: el,
                cssCls: "miniBtn"
            });
            this._btnCancel = new JueKit.UI.Button({
                text: JueKitSR["cancel"],
                container: el,
                cssCls: "miniBtn"
            });
            this._btnClear = new JueKit.UI.Button({
                text: JueKitSR["clear"],
                container: el,
                cssCls: "miniBtn"
            });
            //this._btnClear.cssCls = this._btnOk.cssCls = this._btnCancel.cssCls = "miniBtn";

            this._btnOk.addHandler("click", this.__onClickOk, this);
            this._btnCancel.addHandler("click", this.__onClickCancel, this);
            this._btnClear.addHandler("click", this.__onClickClear, this);
            this._elBox.appendChild(el);
            this._elOpt = el;
        } else {
            if (this._objData.quiry) {
                this._txtSel.set_value("");
            }
            if (this._objData.setTree) {
                this.setSelectedItemsTree(this._selectedItems);
            }

        }
        return true;
    },

    __onClickOk: function (sender) {
        this._selectedItems = this._tree.getSelectedItems();
        this.set_labelText(this.getSelectedItemsLabel(this._selectedItems));
        this.closeDropdown();
        var args = {
            selectedItems: this._selectedItems
        };
        this.fireEvent("change", args);
    },

    __onClickCancel: function (sender) {
        this.closeDropdown();
    },

    __onClickClear: function (sender) {
        this.setSelectedItems();
    },

    __hTree_ExpandCollapse: function (sender, args) {
        this._elBox.style.height = "auto";
        this._elTreeCtnr.style.height = "auto";
        this.__limitBoxHeight();
    },

    get_tree: function () {
        return this._tree;
    },

    onForceLimitBoxHeight: function (height) {
        if (height == -1) {
            return;
        }

        height -= this._elOpt.offsetHeight;
        this._elTreeCtnr.style.height = height;
    },

    getSelectedItems: function () {
        return this._selectedItems;
    },

    setSelectedItems: function (items) {
        if (this._tree) {
            if (items) {
                this._selectedItems = items;
            } else {
                this._tree.get_topNode().set_checked(false, true);
                this._tree.set_currentNode(null);
                this._selectedItems = [];
            }
            this.set_labelText(this.getSelectedItemsLabel(this._selectedItems));
        } else {
            if (items) {
                this._selectedItems = items;
            } else {
                this._selectedItems = [];
            }
            this.set_labelText(this.getSelectedItemsLabel(this._selectedItems));
        }
    }
});