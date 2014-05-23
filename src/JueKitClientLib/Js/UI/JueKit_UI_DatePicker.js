/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

JueKit.Type.registerNamespace("JueKit.UI");

// JueKit.UI.DatePicker
JueKit.UI.DatePicker = JueKit.Type.createClass("JueKit.UI.DatePicker", JueKit.UI.DropdownControl,
{
    onInitProperty: function (objData) {
        //this._currentDate = objData.currentDate;

        this._valueColName = objData.valueColName;

        JueKit.UI.DatePicker._base.onInitProperty.call(this, objData);
    },

    onInit: function (objData) {
        this.set_currentDate(objData.currentDate);

        if (objData.dataSource) {
            this.bindDataSource(objData.dataSource);
        }

        JueKit.UI.DatePicker._base.onInit.call(this, objData);
    },

    onBeforeDropdown: function () {
        if (!this._calendar) {
            this._calendar = new JueKit.UI.Calendar({
                container: this._elBox,
                currentDate: this._currentDate
            });
            this._calendar.addHandler("click", this.__hCalendar_Click, this);

            var sb = new JueKit.Text.StringBuilder();
            sb.append("<a class='jueDatePickerBtnClear' href='javascript:void(0);'>" + JueKitSR["datePickerBtnClear"] + "</a>");
            sb.append("<a class='jueDatePickerBtnToday' href='javascript:void(0);'>" + JueKitSR["datePickerBtnToday"] + ": " + JueKit.DateTime.today().format("yyyy-MM-dd") + "</a>");

            this._elOperation = JueKit.Dom.createEl("div", { className: "jueDatePickerOperation" }, sb.toString());
            this._elBox.appendChild(this._elOperation);

            this._elBtnClear = this._elOperation.firstChild;
            this._elBtnToday = this._elBtnClear.nextSibling;

            JueKit.Event.addHandler(this._elBtnClear, "click", this.__hElBtnClear_Click, this);
            JueKit.Event.addHandler(this._elBtnToday, "click", this.__hElBtnToday_Click, this);
        }
        else {
            debugger;
            this._calendar.set_currentDate(this._currentDate);
            if (this._currentDate) {
                this._calendar.setCalendar(this._currentDate.getFullYear(), this._currentDate.getMonth());
            }
        }
        return true;
    },

    __hCalendar_Click: function (sender, args) {
        this.set_currentDate(args.currentDate);
        JueKit.UI.DropdownControl.closeDropdown(this);
    },

    __hElBtnClear_Click: function (evt) {
        JueKit.UI.DropdownControl.closeDropdown(this);
        this.set_currentDate();
    },

    __hElBtnToday_Click: function (evt) {
        JueKit.UI.DropdownControl.closeDropdown(this);
        this.set_currentDate(JueKit.DateTime.today().get_value());
    },

    get_currentDate: function () {
        return this._currentDate;
    },

    set_currentDate: function (value) {
        if (this._state & JueKit.UI.State.updatingCtlData) {
            return;
        }

        if (this._currentDate == undefined && value == undefined) {
            return;
        }

        if (typeof value == "string" && value != "") {
            value = JueKit.DateTime.parse(value).justDate().get_value();
        }
        else if (value instanceof JueKit.DateTime) {
            value = value.justDate().get_value();
        }

        if (this._currentDate && (this._currentDate - value == 0)) {
            return;
        }

        var oldDate = this._currentDate;

        this.set_labelText(JueKit.DateTime.format(value, "yyyy-MM-dd"));
        this._currentDate = value;
        var args = { oldDate: oldDate, currentDate: this._currentDate };
        if (this.onChange) {
            this.onChange(args);
        }

        this.updateData();
        this.fireEvent("change", args);
    },

    set_valueColName: function (value) {
        this._valueColName = value;
    },

    onMesureItem: function () {
        //var size = JueKit.Dom.getSize(this._calendar._el);
        if (this._width < 150) {
            return [160, -1];
        } else {
            return [-1, -1];
        }
    },

    //DataBindableControl
    onUpdateCtlData: function (dataSource) {
        if (this._valueColName) {
            var value = JueKit.Data.DataRow.getColValue(dataSource, this._valueColName);
            this.set_currentDate(value);
        }
    },

    onUpdateData: function (dataSource) {
        if (this._valueColName) {
            JueKit.Data.DataRow.setColValue(dataSource, this._valueColName, this.get_currentDate());
        }
    }
});

JueKit.Type.extend(JueKit.UI.DatePicker.prototype, JueKit.UI.DataBindableControl.prototype);

JueKit.UI.DataGridInstantDatePicker = JueKit.Type.createClass("JueKit.UI.DataGridInstantDatePicker", JueKit.UI.DatePicker,
{
    instUpdateEditor : function(grid, dataRow, col)
    {
        this._instGrid = grid;
        this._instDataRow = dataRow;
        this._instCol = col;
        
        this.set_currentDate(JueKit.Data.DataRow.getColValue(dataRow, col.name));
    },
    
    instUpdateData : function()
    {
        if(!this._instDataRow)
        {
            return;
        }
        if(this._instCol.name)
        {
            JueKit.Data.DataRow.setColValue(this._instDataRow,
                this._instCol.name,
                this.get_currentDate());
        }
    },
    
    onChange : function()
    {
        this.instUpdateData();
    }
});
