/**
* Copyright (c) 2007 Tulipmm.cn. All rights reserved.
* @Author fossil
*/

// TODO: 删除选中行时bug

// JueKit.UI.DataGrid
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.DataGrid = JueKit.Type.createClass("JueKit.UI.DataGrid", JueKit.UI.RichClientWebControl,
{
    /*
    * 指示一个表格是否是只读的
    */
    //_readOnly : false,

    cssCls: "jueDataGrid",
    ctor: function (objData) {
        this._fixCols = [];
        this._cols = [];
        JueKit.UI.DataGrid._base.ctor.call(this, objData);
    },

    onInitProperty: function (objData) {
        // 是否显示选择列
        this._showSelectColumn = objData.showSelectColumn;

        // 是否显示表格头
        if (objData.showHeader === undefined) {
            this._showHeader = true;
        }
        else {
            this._showHeader = objData.showHeader;
        }

        // 点击空白时取消选择已选中行
        this._unselectOnClickBlank = objData.unselectOnClickBlank;

        this._width = objData.width;
        this._height = objData.height;
        this._readOnly = objData.readOnly;

        // 没有数据行的时候显示的信息
        this._emptyMsg = objData.emptyMsg;

        // 点击表格头部能否排序
        if (objData.canSort === undefined) {
            this._canSort = true;
        }
        else {
            this._canSort = objData.canSort;
        }
        // 是否使用自定义排序。当为true时将触发customSort事件，需要在这个事件处理函数里对datasource进行排序。
        this._customSort = objData.customSort;

        // 当单元格内容超出单元格宽度是是否自动换行
        this._autoWrap = objData.autoWrap;

        // 指示当数据源列值改变时，是否刷新整行。
        this._allwaysRefreshAllCols = objData.allwaysRefreshAllCols;
        JueKit.UI.DataGrid._base.onInitProperty.call(this, objData);
    },

    createDom: function (objData) {
        var sHtml = JueKit.String.format("<div class='{0}Header'><div class='{0}ColsScrollWrap'><div class='{0}ColsScroll'><div class='{0}SelectBtnWrap' {1}><a class='{0}SelectBtn' href='javascript:void(0);'></a></div><div class='{0}FixColGroup'></div><div class='{0}ColGroupWrap'><div class='{0}ColGroup'></div></div></div></div><a class='{0}MenuBtn' href='javascript:void(0);'></a></div><div class='{0}BodyWrap'><div class='{0}BodyWrapI'><div class='{0}Body'><div class='{0}FixTableWrap'></div><div class='{0}TableWrap'></div><div class='{0}EmptyMsg' style='display:none;'></div></div></div></div>", this.cssCls, objData.showSelectColumn ? "" : "style='display:none;'");

        var css = this.cssCls;
        if (this._autoWrap) {
            css += " " + css + "AutoWrap";
        }
        this._el = JueKit.Dom.createEl("div", { className: css }, sHtml);
        JueKit.UI.DataGrid._base.createDom.call(this, objData);
    },

    onInit: function (objData) {
        this.set_showHeader(this._showHeader);
        if (this._height) {
            this.set_height(this._height);
        }
    },

    parseDom: function (objData) {
        this._elHeader = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elBodyWrap = JueKit.Dom.getNextEl(this._elHeader);
        this._elBodyWrapI = JueKit.Dom.getChildElByIndex(this._elBodyWrap, 0);
        this._elBody = JueKit.Dom.getChildElByIndex(this._elBodyWrapI, 0);

        this._elColsScrollWrap = JueKit.Dom.getChildElByIndex(this._elHeader, 0);
        this._elColsScroll = JueKit.Dom.getChildElByIndex(this._elColsScrollWrap, 0);
        var elSelectBtnWrap = JueKit.Dom.getChildElByIndex(this._elColsScroll, 0);
        this._elSelectBtn = JueKit.Dom.getChildElByIndex(elSelectBtnWrap, 0);

        this._elFixCols = JueKit.Dom.getNextEl(elSelectBtnWrap);
        this._elColsWrap = JueKit.Dom.getNextEl(this._elFixCols);
        this._elCols = JueKit.Dom.getChildElByIndex(this._elColsWrap, 0);
        this._elMenuBtn = JueKit.Dom.getNextEl(this._elColsScrollWrap);

        this._elFixTableWrap = JueKit.Dom.getChildElByIndex(this._elBody, 0);
        this._elTableWrap = JueKit.Dom.getNextEl(this._elFixTableWrap);
        this._elEmptyMsg = JueKit.Dom.getNextEl(this._elTableWrap);
    },

    bindDomEventHandlers: function (objData) {
        JueKit.Event.addHandler(this._elBodyWrap, "mousedown", this.__hElBody_Mousedown, this);
        JueKit.Event.addHandler(this._elBodyWrap, "click", this.__hElBody_Click, this);
        JueKit.Event.addHandler(this._elBodyWrap, "mouseup", this.__hElBody_Mouseup, this);
        //JueKit.Event.addHandler(this._elBody, "mousemove", this.__hElBody_Mousemove, this);
        JueKit.Event.addHandler(this._elSelectBtn, "click", this.__hElSelectBtn_Click, this);

        JueKit.Event.addHandler(this._elBodyWrap, "scroll", this.__elBodyWrap_Scroll, this);
        JueKit.Event.addHandler(this._elMenuBtn, "click", this.__hElMenuBtn_Click, this);

        // 点击列标题
        JueKit.Event.addHandler(this._elFixCols, "click", this.__hElFixCols_Click, this);
    },

    __hElBody_Mouseup: function (evt) {
        this._canEndEdit = true;
    },

    __hElBody_Mousedown: function (evt) {
        JueKit.UI.Common._activeDataGrid = this;
        this._canEndEdit = false;

        var isLeftButton = JueKit.Event.isLeftButton(evt);

        var el = JueKit.Event.srcEl(evt);
        var srcEl = el;

        var cssClass = this.cssCls;

        var cmdName;
        var rowIndex;
        while (el) {
            if (el.tagName == "A" && isLeftButton) {
                if (el.className == cssClass + "RowSel") {
                    // 切换数据行的选中和未选中状态
                    this.toogleSelectRow(el.parentNode.parentNode.rowIndex);
                    break;
                }
            }
            else if (el.tagName == "TD" && isLeftButton) {
                // 激活单元格，如果可以编辑的话，显示编辑控件
                this.activeCell(el);
            }
            else if (el.tagName == "TR") {
                // 设置表格行为当前行（会改变数据源的当前行）
                if (!this.setActiveRow(el.rowIndex)) {
                    break;
                }
                if (isLeftButton) {
                    // 设置表格行为选中状态
                    this.setSelectedRow(el.rowIndex);
                }
                else {
                    // 点击右键时，选中行不变，当前行改变
                    var row = this._elTable.tBodies[0].rows[el.rowIndex];
                    if (row) {
                        var node = this._selectedRows.find(row);
                        if (!node) {
                            this.setSelectedRow(el.rowIndex);
                        }
                    }
                }
                break;
            }
            else if (el == this._elBodyWrap) {
                this.endEdit();

                if (this._unselectOnClickBlank && srcEl != this._elBodyWrap) {
                    this.unselectAllRows();
                    this.setActiveRow(-1);
                }
                break;
            }
            el = el.parentNode;
        }
    },

    __hElBody_Click: function (evt) {
        JueKit.UI.Common._activeDataGrid = this;
        this._canEndEdit = false;

        var el = JueKit.Event.srcEl(evt);
        var cssClass = this.cssCls;

        var cmdName;
        var rowIndex;
        while (el) {
            if (el.tagName == "A") {
                if (el.attributes["_jueCmdName"]) {
                    cmdName = el.attributes["_jueCmdName"].value;
                }

                if (cmdName) {
                    var triggerEl = el;
                    el = JueKit.Dom.getParent(el, "TR");
                    // 表示点击了一个命令元素
                    this.fireEvent("command",
                        {
                            cmdName: cmdName,
                            cmdValue: el.attributes["_jueRowId"] ? el.attributes["_jueRowId"].value : null,
                            rowIndex: el.rowIndex,
                            rowData: this._dataRows[el.rowIndex],
                            trigger: triggerEl
                        });
                    break;
                }
                return;
            }
            else if (el.tagName == "TR") {
                //				if(isLeftButton)
                //				{
                this.clickRow(el.rowIndex);
                //				}
            }
            el = el.parentNode;
        }
    },

    __hElBody_Mousemove: function (evt) {

    },

    // 点击“选中/取消选中全部”的按钮
    __hElSelectBtn_Click: function (evt) {
        var el = JueKit.Event.srcEl(evt);
        var cssClass = this.cssCls;
        if (JueKit.Dom.hasCssClass(el, cssClass + "SelectBtnSelected")) {
            // 如果当前是选中状态，表明所有记录都被选中
            // 此时应取消选中所有记录
            this.unselectAllRows();
            // 更新按钮状态
            JueKit.Dom.removeCssClass(el, cssClass + "SelectBtnSelected");
        }
        else {
            // 否则，选中所有记录
            this.selectAllRows();
            // 更新按钮状态
            JueKit.Dom.addCssClass(el, cssClass + "SelectBtnSelected");
        }
    },

    __elBody_Contextmenu: function (evt) {
        var el = JueKit.Event.srcEl(evt);
        var args = { result: true, srcEl: el, pointerX: JueKit.Event.pointerX(evt), pointerY: JueKit.Event.pointerY(evt) };

        this.onContextMenu && this.onContextMenu(args);

        this.fireEvent("contextMenu", args);

        if (!args.result) {
            evt._jueStop = true;
            //JueKit.Event.stop(evt);
        }
        return false;
    },


    __elBodyWrap_Scroll: function (evt) {
        var el = JueKit.Event.srcEl(evt);

        this._elColsScrollWrap.scrollLeft = el.scrollLeft;
    },

    // 点击右上角的菜单按钮时触发
    __hElMenuBtn_Click: function (evt) {
        return;
        // 点击菜单按钮
        if (!this._gridMenu) {
            var items = [],
                col,
                i;

            for (i = 0; i < this._fixCols.length; i++) {
                col = this._fixCols[i];
                items[items.length] = { text: col.title, cmdId: JueKit.UI.DataGrid.CmdIds.menuItemToogleCol, cmdData: col };
            }
            for (i = 0; i < this._cols.length; i++) {
                col = this._cols[i];
                items[items.length] = { text: col.title, cmdId: JueKit.UI.DataGrid.CmdIds.menuItemToogleCol, cmdData: col };
            }

            var menu = new JueKit.UI.Menu({ items: items });
            menu.set_style(JueKit.UI.MenuStyle.trackLeft);
            this._gridMenu = menu;
        }
        var btn = JueKit.Event.srcEl(evt);
        var pos = JueKit.Dom.getPosition(btn);
        var size = JueKit.Dom.getSize(btn);
        this._gridMenu.trackPopupMenu(pos.left + size.width, pos.top + size.height);
    },

    // 点击固定列标题
    __hElFixCols_Click: function (evt) {
        var el = JueKit.Event.srcEl(evt);

        var cssCls = this.cssCls + "Col";
        while (!JueKit.Dom.hasCssClass(el, cssCls)) {
            if (el == this._elColsScrollWrap) {
                return;
            }
            el = el.parentNode;
        }

        var index = JueKit.Dom.getElIndex(el);

        var col = this._fixCols[index];

        if (this._lastSortCol && this._lastSortCol.name == col.name) {
            this.sort(col, !this._lastSortDesc);
        }
        else {
            this.sort(col, false);
        }
    },

    sort: function (col, sortDesc) {
        if (!this._canSort) {
            return;
        }

        if ((col.canSort !== undefined) && !col.canSort) {
            return;
        }

        var args = { col: col, sortDesc: sortDesc, result: true };
        if (this._customSort) {
            this.fireEvent("customSort", args);
            if (!args.result) {
                return;
            }
        }
        else {
            var ds = this._dataSource;
            if (!ds || !ds.sort) {
                return;
            }

            ds.sort(col.name, sortDesc);
        }

        this._lastSortCol = col;
        this._lastSortDesc = sortDesc;

        this.setSortCol(col.name, sortDesc);
        //alert(col.name);
    },

    setSortCol: function (sortColName, sortDesc) {
        if (this._lastSortColEl) {
            this._lastSortColEl.className = this.cssCls + "Col";
        }

        var elIndex = -1;
        for (var i = 0; i < this._fixCols.length; i++) {
            if (this._fixCols[i].name == sortColName) {
                elIndex = i;
                break;
            }
        }

        if (elIndex >= 0) {
            var elCol = JueKit.Dom.getChildElByIndex(this._elFixCols, elIndex);
            if (elCol) {
                elCol.className = this.cssCls + "Col " + this.cssCls + (sortDesc ? "ColDesc" : "ColAsc");
                this._lastSortColEl = elCol;
            }
        }
    },

    activeCell: function (cell) {
        if (this._readOnly) {
            return;
        }

        if (this._editData && this._editData[0] == cell) {
            return;
        }

        this.endEdit();

        if (!cell || !cell.parentNode || cell.parentNode.rowIndex === undefined) {
            return;
        }

        var dataRow = this._dataRows[cell.parentNode.rowIndex];
        var colIndex = cell.cellIndex;
        var col;
        var tbl = cell.parentNode.parentNode.parentNode;
        if (tbl == this._elFixTable) {
            if (this._showSelectColumn) {
                colIndex--;
            }
            if (colIndex >= 0) {
                col = this._fixCols[colIndex];
            }
        }
        else if (tbl == this._elTable) {
            col = this._cols[colIndex];
        }

        // 判断是否可以编辑
        if (!col || col.readOnly) {
            return;
        }

        if (col.type == "bool") {
            var bValue = JueKit.Data.DataRow.getColValue(dataRow, col.name);
            JueKit.Data.DataRow.setColValue(dataRow, col.name, bValue ? false : true);
            var sb = new JueKit.Text.StringBuilder();
            this.__bindCellData(sb, col, dataRow);
            cell.innerHTML = sb.toString();
        }
        else {
            // 编辑单元格
            this.__editCell(cell, dataRow, col);
        }
    },

    __editCell: function (cell, dataRow, col) {
        if (this._editData && this._editData[0] == cell) {
            return;
        }
        this.endEdit();

        // 编辑单元格
        this._editData = [cell, dataRow, col];
        var val = JueKit.Data.DataRow.getColValue(dataRow, col.name);

        JueKit.Dom.removeEl(cell.firstChild);
        var editor = JueKit.UI.DataGrid.__getInstantEditor(col);
        this._editData[3] = editor;
        this.__dockEditor(editor, cell);
        //cell.innerHTML = "<form></form>";
        cell.appendChild(editor._el);

        this.fireEvent("beginEditCell", { editor: editor, cell: cell, dataRow: dataRow, col: col });

        editor.instUpdateEditor(this, dataRow, col);
        editor.instBeginEdit && editor.instBeginEdit();
    },

    endEdit: function () {
        if (!this._editData) {
            return;
        }
        var cell = this._editData[0];
        var dataRow = this._editData[1];
        var col = this._editData[2];
        var editor = this._editData[3];

        if (editor) {
            editor.instUpdateData();
        }

        editor.show(false);
        document.body.appendChild(editor._el);

        var sb = new JueKit.Text.StringBuilder();
        this.__bindCellData(sb, col, dataRow);
        cell.innerHTML = sb.toString();
        this._editData = null;
    },

    __dockEditor: function (editor, cell) {
        editor.show();
        editor.set_width(cell.offsetWidth - 3);
    },

    // 设置当前行
    setActiveRow: function (rowIndex) {
        var ds = this._dataSource;
        if (!(ds && ds.set_currentRow)
            || (ds
                && ds.set_currentRow
                && ds.set_currentRow(rowIndex < 0 ? null : this._dataRows[rowIndex], this))) {
            this.__doSetActiveRow(rowIndex);
            return true;
        }
        return false;
        /*
        if(this._dataSource && this._dataSource.set_currentRow)
        {
        // 如果绑定了数据源，数据源会触发当前行改变事件
        if(this._dataSource.set_currentRow(rowIndex < 0 ? null : this._dataRows[rowIndex], this))
        {
        this.__doSetActiveRow(rowIndex);
        }
        else
        {
        return false;
        }
        }
        this.__doSetActiveRow(rowIndex);
        return false;
        */
    },

    // 设置表格当前行时更新表格状态
    __doSetActiveRow: function (rowIndex) {
        // 判断当前行号是不是与即将要设置的行号相同
        if (!this._activeRow) {
            if (rowIndex == -1) {
                return;
            }
        }
        else if (this._activeRow.rowIndex == rowIndex) {
            return;
        }

        var cssCls = this.cssCls;
        var row;
        // 取消当前行的状态
        if (this._activeRow) {
            row = this._activeRow;
            JueKit.Dom.removeCssClass(row, cssCls + "RowActive");
            JueKit.Dom.removeCssClass(this._elFixTable.tBodies[0].rows[row.rowIndex], cssCls + "RowActive");
        }

        // 查找新的当前行
        if (rowIndex == -1) {
            row = null;
        }
        else {
            row = this._elTable.tBodies[0].rows[rowIndex];
        }

        // 构造事件参数对象
        var args = { oldRow: this._activeRow, curRow: row, curRowIndex: rowIndex };
        // 设置新当前行
        this._activeRow = row;

        if (row) {
            JueKit.Dom.addCssClass(row, cssCls + "RowActive");
            JueKit.Dom.addCssClass(this._elFixTable.tBodies[0].rows[rowIndex], cssCls + "RowActive");
        }

        this.onActiveRowChange && this.onActiveRowChange(args);

        // 激发activeRowChange事件
        this.fireEvent("activeRowChange", args);

    },

    // 更新“选择全部”按钮的状态
    __refreshSelectAllBtn: function () {
        var action = "removeCssClass";

        // 如果表格中有行，并且选中的行数等于表格的行数
        if (this._rowCount > 0 && this._selectedRows.get_count() == this._rowCount) {
            // 将“选择全部”按钮设置为选中
            action = "addCssClass";
        }

        JueKit.Dom[action](this._elSelectBtn, this.cssCls + "SelectBtnSelected")
    },

    // 选中/取消选中一行
    toogleSelectRow: function (rowIndex) {
        if (rowIndex < 0) {
            this.fireEvent("selectedItemsChange", { selectedItems: this.getSelectedItems() });
            return;
        }

        // 根据行号获取行对象
        var row = this._elTable.tBodies[0].rows[rowIndex];

        if (!row) {
            this.fireEvent("selectedItemsChange", { selectedItems: this.getSelectedItems() });
            return;
        }

        // 在已经选中的行列表中查找行对象
        var node = this._selectedRows.find(row);

        if (node) {
            // 如果当前行已经选中，从列表中移除
            this._selectedRows.remove(node);
        }
        else {
            /*
            if(!this._multiSelect)
            {
            this.unselectAllRows();
            }
            */
            // 否则，添加到已选中行列表
            this._selectedRows.addLast(row);
        }

        // 更新要选中行的状态
        var cssClass = this.cssCls;
        JueKit.Dom.toggleCssClass(row, cssClass + "RowSelected");
        var rowFix = this._elFixTable.tBodies[0].rows[rowIndex];
        if (rowFix) {
            JueKit.Dom.toggleCssClass(rowFix, cssClass + "RowSelected");
        }

        this.__refreshSelectAllBtn();

        this.fireEvent("selectedItemsChange", { selectedItems: this.getSelectedItems() });
    },


    setSelectedRow: function (rowIndex) {
        this.__doSelectAllRows(this._elFixTable, false);
        this.__doSelectAllRows(this._elTable, false, true);
        this.toogleSelectRow(rowIndex);
    },

    __doSelectAllRows: function (table, select, bClear, bAdd) {
        /// <summary>选中/取消选中表格所有行</summary>
        /// <param name="table" type="Element">表格元素</param>
        /// <param name="select" type="Boolean">指示选中还是取消选中</param>
        /// <param name="bClear" type="Boolean">指示是否清空选中行列表</param>
        /// <param name="bAdd" type="Boolean">指示是否将选中行添加到列表</param>
        if (!table) {
            return;
        }
        var rows = table.rows,
            cssCls = this.cssCls + "RowSelected",
            row,
            action;

        if (select) {
            action = "addCssClass";
        }
        else {
            action = "removeCssClass";
        }

        if (bClear) {
            this._selectedRows = new JueKit.Collection.LinkedList();
        }

        for (var i = 0; i < rows.length; i++) {
            row = rows[i];
            JueKit.Dom[action](row, cssCls);
            if (bAdd) {
                this._selectedRows.addLast(row);
            }
        }
        this.__refreshSelectAllBtn();
    },

    selectAllRows: function () {
        /// <summary>选中所有行</summary>

        this.__doSelectAllRows(this._elFixTable, true);
        this.__doSelectAllRows(this._elTable, true, true, true);

        this.fireEvent("selectedItemsChange", { selectedItems: this.getSelectedItems() });
    },

    unselectAllRows: function () {
        /// <summary>取消选中所有行</summary>

        this.__doSelectAllRows(this._elFixTable, false);
        this.__doSelectAllRows(this._elTable, false, true);

        this.fireEvent("selectedItemsChange", { selectedItems: this.getSelectedItems() });
    },

    __getItemByTR: function (tr) {
        if (!tr) {
            return;
        }

        var idx = tr.rowIndex;

        var item = { index: idx, dataRow: this._dataRows[idx] };
        if (tr.attributes["_jueRowId"]) {
            item.id = tr.attributes["_jueRowId"].value;
        }
        if (tr.attributes["_jueRowType"]) {
            item.type = tr.attributes["_jueRowType"].value;
        }

        return item;
    },

    getActiveItem: function () {
        return this.__getItemByTR(this._activeRow);
    },

    getSelectedItems: function () {
        var items = [];
        if (this._selectedRows) {
            var o = this._selectedRows.get_first();
            while (o) {
                items[items.length] = this.__getItemByTR(o.get_value());
                o = o.get_next();
            }
        }
        return items;
    },

    __getTrIndexByDataRow: function (dataRow) {
        for (var i = 0; i < this._dataRows.length; i++) {
            if (this._dataRows[i] == dataRow) {
                return i;
            }
        }
        return -1;
    },

    // IDataView
    onDataSourceRowAdded: function (sender, args) {
        if (this._updatingView) {
            return;
        }

        var dataRow = args.dataRow;

        var fixTbl = this._elFixTable;
        var tbl = this._elTable;

        var fixTr = fixTbl.tBodies[0].insertRow(-1);
        var tr = tbl.tBodies[0].insertRow(-1);


        this._dataRows[this._rowCount] = dataRow;

        var idValue = JueKit.Data.DataRow.getColValue(dataRow, this._idColumn);
        var typeValue = JueKit.Data.DataRow.getColValue(dataRow, this._typeColumn);
        fixTr.setAttribute("_jueRowId", idValue);
        fixTr.setAttribute("_jueRowType", typeValue);
        tr.setAttribute("_jueRowId", idValue);
        tr.setAttribute("_jueRowType", typeValue);

        if (this._rowCount++ % 2) {
            fixTr.className = this._cssRowAlt;
            tr.className = this._cssRowAlt;
        }

        if (this._showSelectColumn) {
            fixTr.insertCell(-1).innerHTML = "<a class='" + this._cssRowSel + "' href='javascript:void(0);'></a>";
        }

        var cell;
        var sb = new JueKit.Text.StringBuilder();
        for (var i = 0; i < this._fixCols.length; i++) {
            sb.clear();
            this.__bindCellData(sb, this._fixCols[i], dataRow);
            cell = fixTr.insertCell(-1);

            cell.innerHTML = sb.toString();
            cell.style.width = (this._fixCols[i].width-7) + "px";
        }
        for (var i = 0; i < this._cols.length; i++) {
            sb.clear();
            this.__bindCellData(sb, this._cols[i], dataRow);
            cell = tr.insertCell(-1);

            cell.innerHTML = sb.toString();
            cell.style.width = this._cols[i].width + "px";
        }

        this.__refreshSelectAllBtn();
    },

    onDataSourceColChanged: function (sender, args) {
        if (this._updatingView) {
            return;
        }

        var dataRow = args.dataRow;
        var colName = args.dataCol.get_name();
        var trIndex = this.__getTrIndexByDataRow(dataRow);
        if (trIndex == -1) {
            return;
        }

        var i, col, cell;

        var sb = new JueKit.Text.StringBuilder();
        var j = 0;
        if (this._showSelectColumn) {
            j = 1;
        }

        for (i = 0; i < this._fixCols.length; i++) {
            sb.clear();
            col = this._fixCols[i];
            if (this._allwaysRefreshAllCols || col.name == colName) {
                this.__bindCellData(sb, this._fixCols[i], dataRow);
                var trFix = this._elFixTable.tBodies[0].rows[trIndex];
                cell = trFix.cells[i + j];
                if (this._editData && this._editData[0] == cell) {
                    continue;
                }
                cell.innerHTML = sb.toString();
            }
        }
        for (i = 0; i < this._cols.length; i++) {
            sb.clear();
            col = this._cols[i];
            if (this._allwaysRefreshAllCols || col.name == colName) {
                this.__bindCellData(sb, this._cols[i], dataRow);
                var tr = this._elTable.tBodies[0].rows[trIndex];
                cell = tr.cells[i];
                if (this._editData && this._editData[0] == cell) {
                    continue;
                }
                cell.innerHTML = sb.toString();
            }
        }
    },

    onDataSourceRowDeleted: function (sender, args) {
        if (this._updatingView) {
            return;
        }

        var dataRow = args.dataRow;
        var trIndex = this.__getTrIndexByDataRow(dataRow);
        if (trIndex == -1) {
            return;
        }

        if (this._activeRow && this._activeRow.rowIndex == trIndex) {
            this._activeRow = null;
        }

        this._dataRows.splice(trIndex, 1);
        this._rowCount--;

        var trFix = this._elFixTable.tBodies[0].rows[trIndex];
        var tr = this._elTable.tBodies[0].rows[trIndex];

        JueKit.Dom.removeEl(trFix);
        JueKit.Dom.removeEl(tr);

        this.__refreshAltRowCssClass(trIndex);
        this.__refreshSelectAllBtn();
    },

    onDataSourceRowChanged: function (sender, args) {
        if (this._updatingView) {
            return;
        }

        var idx = this.__getTrIndexByDataRow(args.curRow);
        this.__doSetActiveRow(idx);
        this.setSelectedRow(idx);
    },

    canUpdateView: function () {
        return true;
    },

    beginUpdateView: function (dataSource, updateViewType, args) {
        if (updateViewType != JueKit.Data.UpdateViewType.dataChanged) {
            return;
        }
        // 

        this._updatingView = true;
        if (this._editData) {
            var editor = this._editData[3];
            if (editor) {
                editor.show(false);
                document.body.appendChild(editor._el);
            }
            delete this._editData;
        }

        var cssClass = this.cssCls;
        JueKit.Dom.removeCssClass(this._elSelectBtn, cssClass + "SelectBtnSelected");
        this._selectedRows = new JueKit.Collection.LinkedList();
        this._dataRows = [];
        this._activeRow = null;
        this._rowCount = 0;

        this._cssRowAlt = cssClass + "RowAlt";
        this._cssRowSel = cssClass + "RowSel";
        this._cssTable = cssClass + "Table";
        this._cssCellInner = cssClass + "CellInner";
        this._sb = new JueKit.Text.StringBuilder();
        this._sbFix = new JueKit.Text.StringBuilder();

        this._sbFix.append("<table class='" + this._cssTable + "' cellspacing='0' cellpadding='0'>");
        this._sb.append("<table class='" + this._cssTable + "' cellspacing='0' cellpadding='0'>");


        if (this._showSelectColumn) {
            this._sbFix.append("<colgroup class='" + cssClass + "RowSelColGroup'></colgroup>");
        }


        for (var i = 0; i < this._fixCols.length; i++) {
            this.__cbBuildColGroup(this._sbFix, this._fixCols[i]);
        }
        for (var i = 0; i < this._cols.length; i++) {
            this.__cbBuildColGroup(this._sb, this._cols[i]);
        }

        this._sbFix.append("<tbody>");
        this._sb.append("<tbody>");
    },

    __cbBuildColGroup: function (sb, column) {
        //sb.append("<colgroup align=" + column.align + " width='" + column.width + "'></colgroup>");
    },

    updateView: function (dataSource, updateViewType, args) {
        var tp = JueKit.Data.UpdateViewType;
        switch (updateViewType) {
            case tp.dataChanged:    // 更新整个数据表
                dataSource.forEach(this.onBindRowData, this);
                break;
            case tp.colChanged:     // 更新单元格
                this.onDataSourceColChanged(dataSource, args);
                break;
            case tp.rowDeleted:     // 删除数据行
                this.onDataSourceRowDeleted(dataSource, args);
                break;
            case tp.rowAdded:       // 新增数据行
                this.onDataSourceRowAdded(dataSource, args);
                break;
            case tp.rowRestored:
                break;
            case tp.rowChanged:     // 当前数据行改变
                this.onDataSourceRowChanged(dataSource, args);
                break;
            case tp.propChanged:
                break;
        }
    },

    onBindRowData: function (dataRow) {
        this._dataRows[this._rowCount] = dataRow;

        var str = "<tr";

        if (this._idColumn) {
            str += " _jueRowId='" + JueKit.Data.DataRow.getColValue(dataRow, this._idColumn) + "'";
        }
        if (this._typeColumn) {
            str += " _jueRowType='" + JueKit.Data.DataRow.getColValue(dataRow, this._typeColumn) + "'";
        }
        if (this._rowCount++ % 2) {
            str += " class='" + this._cssRowAlt + "'";
        }
        str += ">";
        this._sbFix.append(str);
        this._sb.append(str);

        if (this._showSelectColumn) {
            this._sbFix.append("<td><a class='" + this._cssRowSel + "' href='javascript:void(0);'></a></td>");
        }

        for (var i = 0; i < this._fixCols.length; i++) {
            this._sbFix.append("<td style='width:" + (this._fixCols[i].width-7) + "px'>");
            this.__bindCellData(this._sbFix, this._fixCols[i], dataRow);
            this._sbFix.append("</td>");
        }
        for (var i = 0; i < this._cols.length; i++) {
            this._sb.append("<td style='width:" + this._cols[i].width + "px'>");
            this.__bindCellData(this._sb, this._cols[i], dataRow);
            this._sb.append("</td>");
        }

        this._sbFix.append("</tr>");
        this._sb.append("</tr>");
    },

    __bindCellData: function (sb, column, dataRow) {
        if (this._autoWrap) {
            sb.append("<div class='" + this._cssCellInner + " jueDataGridCellInnerAutoWrap' style='text-align:" + column.align + "'>");
        } else {
            sb.append("<div class='" + this._cssCellInner + " jueDataGridCellInnerOverFlow' style='text-align:" + column.align + "'>");
        }
      

        var value = "";

        if (column.type == "command") {
            // 如果是命令列，生成命令链接
            var cmdItem;
            for (var i = 0; i < column.cmdItems.length; i++) {
                cmdItem = column.cmdItems[i];
                value += "<a href='javascript:void(0);' _jueCmdName='" + cmdItem.cmdName + "' class='jueDataGridCmdLink " + (cmdItem.cssClass || "") + "'>" + cmdItem.cmdText + "</a>";
            }
        }
        else {
            // 对列的值进行预处理
            if (column.preRenderer) {
                value = column.preRenderer(value, dataRow, column);
            }

            if (column.renderTextByValueCol) {
                // 如果
                value = column.editor.getTextByValue(JueKit.Data.DataRow.getColValue(dataRow, column.valueColName));
            }
            else {
                value = JueKit.Data.DataRow.getColValue(dataRow, column.name);
            }

            if (column.renderer) {
                value = column.renderer(value, dataRow, column, this);
            }
            else {
                switch (column.type) {
                    case "date":
                        value = JueKit.DateTime.format(value, "yyyy-MM-dd");
                        break;
                    case "time":
                        value = JueKit.DateTime.format(value, "hh:mm:ss");
                        break;
                    case "datetime":
                        value = JueKit.DateTime.format(value, "yyyy-MM-dd hh:mm:ss");
                        break;
                    case "bool":
                        var cssCls = "jueGridChkBox";

                        if (!this.readOnly && !column.readOnly) {
                            //cssCls += "ReadOnly";
                        }

                        if (value) {
                            cssCls += "Checked";
                        }
                        value = "<a class='" + cssCls + "' href='javascript:void(0);'></a>";
                        break;
                };
            }
        }

        if (value === undefined
            || value === null
            || value === "") {
            value = "&nbsp;";
        }

        sb.append(value);

        sb.append("</div>");
    },

    endUpdateView: function (dataSource, updateViewType, args) {
        if (updateViewType != JueKit.Data.UpdateViewType.dataChanged) {
            return;
        }

        this._sbFix.append("</tbody></table>");
        this._sb.append("</tbody></table>");
        this._elFixTableWrap.innerHTML = this._sbFix.toString();
        this._elTableWrap.innerHTML = this._sb.toString();


        this._elFixTable = JueKit.Dom.getChildElByIndex(this._elFixTableWrap, 0);
        this._elTable = JueKit.Dom.getChildElByIndex(this._elTableWrap, 0);

        if (this._rowCount == 0) {
            this._elEmptyMsg.style.display = "";
        }
        else {
            this._elEmptyMsg.style.display = "none";
        }

        this._updatingView = false;
    },

    notifyDataColValueChange: function (dataRow, dataCol, args) {

    },

    // DataGrid Methods
    __refreshAltRowCssClass: function (startRowIndex) {
        var rows = this._elTable.tBodies[0].rows;
        var fixRows = this._elFixTable.tBodies[0].rows;
        var rowCount = rows.length;
        var tr, fixTr;
        while (startRowIndex < rowCount) {
            tr = rows[startRowIndex];
            fixTr = fixRows[startRowIndex];
            if (startRowIndex++ % 2) {
                tr.className = this._cssRowAlt;
                fixTr.className = this._cssRowAlt;
            }
            else {
                tr.className = "";
                fixTr.className = "";
            }
        }
    },

    clearCols: function () {
        this._elFixCols.innerHTML = "";
        this._elCols.innerHTML = "";

        this._fixCols = [];
        this._cols = [];

        this._elFixTableWrap.innerHTML = "";
        this._elTableWrap.innerHTML = "";
    },

    addCol: function (column) {
        var elCols, arrCols;

        column.fixPos = true;

        if (column.fixPos) {
            elCols = this._elFixCols;
            arrCols = this._fixCols;
        }
        else {
            elCols = this._elCols;
            arrCols = this._cols;
        }
        // 将列信息添加到数组中
        arrCols[arrCols.length] = column;

        // 根据列信息创建元素
        var cssClass = this.cssCls;

        var title = column.title;
        if (!title) {
            title = column.name;
        }

        var elCol = JueKit.Dom.createEl("div", { className: cssClass + "Col" }, "<a class='" + cssClass + "ColResizeBar'></a><a href='javascript:void(0);' class='" + cssClass + "ColTextWrap'><span class='" + cssClass + "ColText'>" + title + "</span></a>");
        if (column.width) {
            elCol.style.width = column.width + "px";
        }
        column._el = elCol;

        //
        var ddImpl = new JueKit.DataGridColResizeBarDragDrop(elCol.childNodes[0]);
        ddImpl._dataGrid = this;
        ddImpl._dataCol = column;
        ddImpl._direction = 1;

        elCols.appendChild(elCol);

        this.__updateColGrpWidth();

        // 如果是下拉列的话，初始化下拉控件
        if (column.dropdown) {
            JueKit.UI.DataGrid.__initDropdownEditor(column);
        }
    },

    getCol: function (name) {
        var i, col;
        for (i = 0; i < this._fixCols.length; i++) {
            col = this._fixCols[i];
            if (col.name == name) {
                return col;
            }
        }
        for (i = 0; i < this._cols.length; i++) {
            col = this._cols[i];
            if (col.name == name) {
                return col;
            }
        }
    },

    set_readOnly: function (value) {
        this._readOnly = value;
    },

    get_idColumn: function () {
        return this._idColumn;
    },

    set_idColumn: function (name) {
        this._idColumn = name;
    },

    get_typeColumn: function () {
        return this._typeColumn;
    },

    set_typeColumn: function (name) {
        this._typeColumn = name;
    },

    get_multiSelect: function () {
        return this._multiSelect;
    },

    set_multiSelect: function (value) {
        this._multiSelect = value;
    },

    get_showSelectColumn: function () {
        return this._showSelectColumn;
    },

    set_showSelectColumn: function (value) {
        this._showSelectColumn = value;

        this._elSelectBtn.parentNode.style.display = value ? "" : "none";
    },

    set_showHeader: function (value) {
        this._showHeader = value;

        this._elHeader.style.display = value ? "" : "none";
    },

    set_unselectOnClickBlank: function (value) {
        this._unselectOnClickBlank = value;
    },

    set_emptyMsg: function (value) {
        if (value === undefined || value === null) {
            value = "";
        }
        this._elEmptyMsg.innerHTML = value;
    },

    set_allwaysRefreshAllCols: function (value) {
        this._allwaysRefreshAllCols = value;
    },

    set_handleContextMenu: function (value) {
        this._handleContextMenu = value;
        if (value) {
            JueKit.Event.addHandler(this._elBodyWrap, "contextmenu", this.__elBody_Contextmenu, this);
        }
        else {
            JueKit.Event.removeHandler(this._elBodyWrap, "contextmenu", this.__elBody_Contextmenu, this);
        }
    },

    __updateColGrpWidth: function () {

        var fixColsWidth = 0;
        var iEversion = JueKit.Browser.version;
        var gridWidth = this._elHeader.offsetWidth;
        var thiGridoffsetWidth = this._el.offsetWidth;
        var thiGridscrollWidth = this._el.scrollWidth;
        if (gridWidth == 0) {
            return;
        }

        var colsBoxWidth = gridWidth - this._elMenuBtn.offsetWidth - 2;

        if (colsBoxWidth <= 0) {
            return;
        }

        //this._elColsScrollWrap.style.width = colsBoxWidth + "px";

        for (var i = 0; i < this._fixCols.length; i++) {
            fixColsWidth += (this._fixCols[i].width || 0);
        }
        this._elFixCols.style.width = fixColsWidth + "px";

        if (JueKit.Browser.isFirefox) {
            var he = this._elSelectBtn.offsetWidth + fixColsWidth + 1;
            this._elColsScroll.style.width = he + "px";

            if (this._fixCols.length == 1 || this._fixCols.length == 0) {
                this._elHeader.style.width = "99%";
                this._elBody.style.width = "95%";
            } else {
                var headerwidth = thiGridoffsetWidth - he;
                if (headerwidth > 0) {
                    if (headerwidth < 17) {
                        this._elHeader.style.width = he - 1 + "px";
                    } else if (thiGridoffsetWidth != thiGridscrollWidth) {
                        this._elHeader.style.width = he - 1 + (headerwidth - 17) + "px";
                    } else {
                        this._elHeader.style.width = thiGridoffsetWidth - 1 + "px";
                    }
                } else {
                    this._elHeader.style.width = he - 1 + "px";
                }

                this._elBody.style.width = this._elColsScroll.style.width;
            }

        } else if (JueKit.Browser.isIE && iEversion <= "7") {
            this._elColsScroll.style.width = (this._elSelectBtn.offsetWidth + fixColsWidth + 5) + "px";
            this._elBodyWrapI.style.width = (this._elSelectBtn.offsetWidth + fixColsWidth + 5) + "px";
        } else if (JueKit.Browser.isIE && iEversion >= "8") {
            var he1 = this._elSelectBtn.offsetWidth + fixColsWidth + 1;
            this._elColsScroll.style.width = he1 + "px";

            if (this._fixCols.length == 1 || this._fixCols.length == 0) {
                this._elHeader.style.width = "99%";
                this._elBody.style.width = "95%";
            } else {
                var headerwidth1 = thiGridoffsetWidth - he1;
                if (headerwidth1 > 0) {
                    if (headerwidth1 < 17) {
                        this._elHeader.style.width = he1 - 1 + "px";
                    } else if (thiGridoffsetWidth != thiGridscrollWidth) {
                        this._elHeader.style.width = he1 - 1 + (headerwidth1 - 17) + "px";
                    } else {
                        this._elHeader.style.width = thiGridoffsetWidth - 1 + "px";
                    }

                } else {
                    this._elHeader.style.width = he1 - 1 + "px";
                }
                this._elBody.style.width = this._elColsScroll.style.width;
            }
        }
        //this._elColsScrollWrap.scrollLeft = this._elBodyWrap.scrollLeft;

        //this._elTable && (this._elTable.style.width = this._elColsScroll.style.width);
        /*
        return;
        var colsWrapWidth = gridWidth - this._elSelectBtn.offsetWidth - fixColsWidth - 2;
        
        // TODO: fix this
        if(colsWrapWidth <= 0)
        {
        colsWrapWidth = 100;
        }
        
        this._elColsWrap.style.width = colsWrapWidth + "px";
        
        var colsWidth = 0;
        
        for(var i=0; i<this._cols.length; i++)
        {
        colsWidth += (this._cols[i].width || 0);
        }
        this._elCols.style.width = colsWidth + "px";
        
        this._elBody.style.width = (this._elCols.offsetWidth + this._elFixCols.offsetWidth + this._elSelectBtn.parentNode.offsetWidth) + "px";
        */
    },

    set_width: function (value) {
        this._width = value;

        if (this._width < 0) {
            return;
        }
        //        var iEversion = JueKit.Browser.version;

        //        if (JueKit.Browser.isIE && iEversion <= "8") {
        //            var elHeaderwidthmin = this._elHeader.offsetWidth - 3;
        //            if (elHeaderwidthmin > 0) {
        //                this._elHeader.style.width = elHeaderwidthmin + "px";
        //            }
        //        } else { 
        //            var elHeaderwidthmax = this._elHeader.offsetWidth - 27;
        //            if (elHeaderwidthmax > 0) {
        //                this._elHeader.style.width = elHeaderwidthmax + "px";
        //            }

        //        }




        //        this._elBodyWrapI.style.width = (this._elSelectBtn.offsetWidth + value + 70) + "px";
        //        this._elBodyWrap.style.width = value + "px";
        //        this._el.style.width = value + "px";

        this.__updateColGrpWidth();
    },

    set_height: function (value) {
        if (value < 0) {
            return;
        }

        var hh = this._elHeader.offsetHeight;
        if (hh == 0) {
            hh = 25;
        }
        var minHeight = hh + 50;

        if (value < minHeight) {
            value = minHeight;
        }


        this._height = value;

        this._elBodyWrapI.style.height = ((value - hh > 18) ? (value - hh - 18) : value - hh) + "px";

        this._elBodyWrap.style.height = (value - 70) + "px";
        this._el.style.height = value + "px";
        this.__updateColGrpWidth();
    },

    get_lastSortCol: function () {
        return this._lastSortCol;
    },

    set_autoWrap: function (value) {
        this._autoWrap = value;
        if (this._autoWrap) {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "AutoWrap");
        }
        else {
            JueKit.Dom.removeCssClass(this._el, this.cssCls + "AutoWrap");
        }
    },

    // 即时编辑
    instUpdateData: function (dataRow, col) {
    },

    changeColSize: function (col, delta) {
        var name = col.name;
        col = this.getCol(col.name);
        if (!col) {
            return;
        }

        var width = col.width + delta;
        if (width < 20) {
            width = 20;
        }
        col.width = width;
        col._el.style.width = width + "px";

        //debugger;
        var i;
        for (i = 0; i < this._fixCols.length; i++) {
            col = this._fixCols[i];
            if (col.name == name) {
                var cellIndex = i;
                if (this._showSelectColumn) {
                    cellIndex += 1;
                }
                if (this._elFixTable) {
                    for (var j = 0; j < this._elFixTable.tBodies[0].rows.length; j++) {
                        this._elFixTable.tBodies[0].rows[j].cells[cellIndex].style.width = (width-7) + "px";
                    }
                }
            }
        }
        for (i = 0; i < this._cols.length; i++) {
            col = this._cols[i];
            if (col.name == name) {
                for (var j = 0; j < this._elTable.tBodies[0].rows.length; j++) {
                    this._elTable.tBodies[0].rows[j].cells[i].style.width = width + "px";
                }
            }
        }

        this.__updateColGrpWidth();
    },

    set_hilightHoverRow: function (value) {
        this._hilightHoverRow = value;
        if (this._hilightHoverRow) {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "HilightHover");
        }
        else {
            JueKit.Dom.removeCssClass(this._el, this.cssCls + "HilightHover");
        }
    },

    set_handHoverRow: function (value) {
        this._handHoverRow = value;
        if (this._handHoverRow) {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "HandHover");
        }
        else {
            JueKit.Dom.removeCssClass(this._el, this.cssCls + "HandHover");
        }
    },

    clickRow: function (rowIndex) {
        if (rowIndex < 0) {
            return;
        }

        var row = this._elTable.tBodies[0].rows[rowIndex];
        if (!row) {
            return;
        }

        this.fireEvent("rowClick", { curRow: row, curRowIndex: rowIndex });
    }

});

JueKit.Type.extend(JueKit.UI.DataGrid,
{
    CmdIds:
    {
        menuItemToogleCol: 1
    },

    __getInstantEditor: function (col) {
        if (col.editor) {
            return col.editor;
        }

        if (col.type == "date" || col.type == "datetime") {
            if (!this._editorDatePicker) {
                this._editorDatePicker = new JueKit.UI.DataGridInstantDatePicker({});
            }
            col.editor = this._editorDatePicker;
            return col.editor;
        }
        else {
            if (!this._txtInCell) {
                var txt = new JueKit.UI.DataGridInstantTextBox({ type: "text", cssClass: "jueGridInCellTxt" });
                this._txtInCell = txt;
            }
            return this._txtInCell;
        }
    },

    __initDropdownEditor: function (col) {
        var drp = col.dropdown;
        var editor;
        if (drp.type) {
            editor = new drp.type(drp);
        }
        else {
            editor = new JueKit.UI.DataGridInstantDropdownList(drp);
        }

        editor.show(false);
        col.editor = editor;
        return editor;
    }
});





JueKit.DataGridColResizeBarDragDrop = JueKit.Type.createClass("JueKit.DataGridColResizeBarDragDrop", JueKit.DragDrop,
{
    b4Drag: function (evt) {
        this._indicator = this.getDragIndicator();
    },

    getDragIndicator: function () {
        if (!this._sbi) {
            var cssCls = this._dataGrid.cssCls;
            var el = JueKit.Dom.createEl("div", { className: cssCls + "ColResizeIndicatorW" }, "<div class='" + cssCls + "ColResizeIndicator'></div>");

            el.style.position = "absolute";
            this._dataGrid._el.appendChild(el);

            this._sbi = el;
        }

        this._sbi.style.display = "block";
        this._sbi.style.height = this._dataGrid._el.offsetHeight + "px";
        return this._sbi;
    },

    b4EndDrag: function (evt) {
        this._sbi.style.display = "none";

        var d = this._curX - this._startX;
        this._dataGrid.changeColSize(this._dataCol, d);
    }
});

