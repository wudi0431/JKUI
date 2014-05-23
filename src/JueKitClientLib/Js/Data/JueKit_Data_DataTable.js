/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

JueKit.Type.registerNamespace("JueKit.Data");

JueKit.Data.DataType =
{
    typeBool :		0,
    typeInt :		1,
    typeFloat :		2,
    typeString :	3,
    typeDateTime :	4
};

JueKit.Data.DataRowState =
{
    stateNormal :	0,		// 普通状态
    stateChanged :	1,		// 值已经被改变
    stateNew :		2,		// 新建的行
    stateDeleted :	4		// 已经删除的行
};

JueKit.Data.EditMode = 
{
    modeRead :		0,		// 读取
    modeModify :	1,		// 编辑
    modeAdd :		2		// 新增
};

// JueKit.Data.DataRow
JueKit.Data.DataRow = JueKit.Type.createClass("JueKit.Data.DataRow", JueKit.Collection.LinkedListNode,
{
    //_dataTable : null,
    //_data : null,
    
    _state : JueKit.Data.DataRowState.stateNormal,
    ctor : function(table)
    {
        this._table = table;
        this._data = {};
    },
    
    get_state : function()
    {
        return this._state;
    },
    
    set_state : function(value)
    {
        this._state = value;
        
        if(this._state == JueKit.Data.DataRowState.stateNormal)
        {
            this._orgData = undefined;
        }
    },
    
    get_table : function()
    {
        return this._table;
    },

    getColValue : function(name)
    {
        return this._data[name];
    },
    
    setColValue : function(name, value)
    {
        var oldValue = this._data[name];
        if(oldValue == value)
        {
            return;
        }

        if(this._state == JueKit.Data.DataRowState.stateNormal)
        {
            this._orgData = {};
            JueKit.Type.extend(this._orgData, this._data);
            this._state = JueKit.Data.DataRowState.stateChanged;
        }

        this._data[name] = value;

        if(this._table)
        {
            var col = this._table.getCol(name);
            if(col)
            {
                this._table.notifyColValueChange(this, col, oldValue, value);
            }
        }
    },
    
    restore : function()
    {
        if(!this._orgData)
        {
            return;
        }
        
        this._data = this._orgData;
        this._orgData == undefined;
        this._state = JueKit.Data.DataRowState.stateNormal;
        
        if(this._table)
        {
            this._table.notifyRowRestored(this);
        }
    },
    
    deleteRow : function()
    {
        if(this._table)
        {
            this._table.deleteRow(this);
        }
    }
});


JueKit.Data.DataRow.getColValue = function (dataRow, colName) {
    if (!dataRow) {return "";}
    if (dataRow.getColValue) {
        return dataRow.getColValue(colName);
    }
    return dataRow[colName];
};

JueKit.Data.DataRow.setColValue = function(dataRow, colName, value)
{
    if(dataRow.setColValue)
    {
        dataRow.setColValue(colName, value);
    }
    else
    {
        dataRow[colName] = value;
    }
};

// JueKit.Data.DataColumn
JueKit.Data.DataColumn = JueKit.Type.createClass("JueKit.Data.DataColumn", null,
{
    ctor : function(options)
    {
        this._name = options.name;
        this._dataType = options.dataType;
        if(this._dataType === undefined)
        {
            // 默认类型为字符串类型
            this._dataType = JueKit.Data.DataType.typeString;
        }
        
        if(options.size !== undefined)
        {
            this._size = options.size;
        }
        
        if(options.defaultValue !== undefined)
        {
            this._defaultValue = options.defaultValue;
        }
    },
    
    get_name : function()
    {
        return this._name;
    },
    
    get_dataType : function()
    {
        return this._dataType;
    }
});


// JueKit.Data.DataTable

JueKit.Data.DataTable = JueKit.Type.createClass("JueKit.Data.DataTable", JueKit.Data.DataSource,
{
    /*
    DataSourceMsgs:
        0: dataChanged,		// 数据更新
        1: colChanged,		// 列值已更改
        2: rowDeleted,		// 行已被删除
        3: rowAdded,		// 添加新行
        4: rowRestored,		// 行已被还原
        5: rowChanged,		// 当前行改变
        7: propChanged,	// 属性改变
    */

    ctor : function(options)
    {
        // 初始化列信息
        this._cols = new JueKit.Collection.Dictionary();
        this._rows = new JueKit.Collection.LinkedList();
        this._deletedRows = new JueKit.Collection.LinkedList();
        if(options)
        {
            var cols = options.cols;
            if(cols)
            {
                for(var i=0; i<cols.length; i++)
                {
                    this.addCol(cols[i]);
                }
            }
        }

        JueKit.Data.DataTable._base.ctor.call(this, options);
    },
    
    addCol : function(options)
    {
        this._cols.setValue(options.name, new JueKit.Data.DataColumn(options));
    },
    
    getCol : function(name)
    {
        return this._cols.getValue(name);
    },
    
    get_cols : function()
    {
        return this._cols;
    },
    
    __addRow : function(dataRow)
    {
        this._rows.addLast(dataRow);
    },
    
    newRow : function(data)
    {
        var row;
        if(data)
        {
            row = this.__loadRowData(data);
        }
        else
        {
            row = new JueKit.Data.DataRow(this);
        }
        row._state = JueKit.Data.DataRowState.stateNew;
        
        this.__addRow(row);
        
        var args = {dataRow:row};
        this.updateAllViews(JueKit.Data.UpdateViewType.rowAdded, args);
        this.fireEvent("rowAdded", args);

        this.set_currentRow(row);
        
        return row;
    },
    
    deleteRow : function(dataRow)
    {
        if(!dataRow)
        {
            dataRow = this._currentRow;
        }
    
        if(!dataRow
            || dataRow._table != this
            || dataRow._state == JueKit.Data.DataRowState.stateDeleted)
        {
            return;
        }
        
        var newCurRow = dataRow.get_next();
        if(!newCurRow)
        {
            newCurRow = dataRow.get_previous();
        }
        
        this._rows.remove(dataRow);
        if(dataRow._state != JueKit.Data.DataRowState.stateNew)
        {
            // 如果不是新增记录，转移到删除列表中
            dataRow._state = JueKit.Data.DataRowState.stateDeleted;
            this._deletedRows.addLast(dataRow);
        }
        
        var args = {dataRow:dataRow};
        this.updateAllViews(JueKit.Data.UpdateViewType.rowDeleted, args);
        
        this.fireEvent("rowDeleted", args);
        
        this.set_currentRow(newCurRow);
    },
    
    get_rows : function()
    {
        return this._rows;
    },
    
    get_deletedRows : function()
    {
        return this._deletedRows;
    },
    
    getFirstRow : function()
    {
        return this._rows.get_first();
    },
    
    getLastRow : function()
    {
        return this._rows.get_last();
    },
    
    getRowAt : function(index)
    {
        return this._rows.getAt(index);
    },
    
    getRowCount : function()
    {
        return this._rows.get_count();
    },
    
    get_currentRow : function()
    {
        return this._currentRow;
    },
    
    set_currentRow : function(row, trigger)
    {
        //#debug
        if(row && row.get_table() != this)
        {
            return false;
        }
        //#enddebug
        
        if(this._currentRow == row)
        {
            // 如果当前行就是将要设置的行，返回
            return true;
        }
        
        var oldRow = this._currentRow;
        
        this._currentRow = row;
        
        var args = {oldRow:oldRow, curRow:row, trigger:trigger, result:true};
        this.fireEvent("rowChanging", args);
        
        if(!args.result)
        {
            this._currentRow = oldRow;
            return false;
        }
        
        this.updateAllViews(JueKit.Data.UpdateViewType.rowChanged, args);
        
        this.fireEvent("rowChanged", args);
        return true;
    },
    
    getColValue : function(name)
    {
        if(this._currentRow)
        {
            return this._currentRow.getColValue(name);
        }
    },
    
    setColValue : function(name, value)
    {
        if(this._currentRow)
        {
            return this._currentRow.setColValue(name, value);
        }
    },

    loadDataFromArray : function(array)
    {
        this._currentRow = null;
        this._rows = new JueKit.Collection.LinkedList();
        this._deletedRows = new JueKit.Collection.LinkedList();
        
        if(array)
        {
            for(var i=0; i<array.length; i++)
            {
                this.__addRow(this.__loadRowData(array[i]));
            }
        }
    },
    
    __loadRowData : function(data)
    {
        var dataRow;
        var cols = this._cols.get_values();
        var colNode, col, colIndex;
        colIndex = 0;
        dataRow = new JueKit.Data.DataRow(this);
        colNode = cols.get_first();
        if(data instanceof Array)
        {
            while(colNode)
            {
                col = colNode.get_value();
                dataRow._data[col._name] = data[colIndex];
                colIndex ++;
                colNode = colNode.get_next();
            }
        }
        else
        {
            while(colNode)
            {
                col = colNode.get_value();
                dataRow._data[col._name] = data[col._name];
                colNode = colNode.get_next();
            }
        }
        
        return dataRow;
    },

    notifyColValueChange : function(row, col, oldValue, curValue)
    {
        var args = {
            dataRow : row,
            dataCol : col,
            oldValue : oldValue,
            curValue : curValue,
            result : true
        };

        this.fireEvent("colChanging", args);
        
        if(!args.result)
        {
            return;
        }
        
        this.updateAllViews(JueKit.Data.UpdateViewType.colChanged, args);
        
        this.fireEvent("colChanged", args);
    },
    
    notifyRowRestored : function(row)
    {
        var args = {
                dataRow : row
            };

        this.updateAllViews(JueKit.Data.UpdateViewType.rowRestored, args);

        this.fireEvent("rowRestored", args);
    },
    
    forEach : function(fCallback, oScope, arrArgs)
    {
        this._rows.forEach(fCallback, oScope, arrArgs);
    },
    
    sort : function(colName, sortDesc)
    {
        var arr = [],
            row = this._rows.get_first(),
            i = 0;
    
        while(row)
        {
            arr[i] = row._data;
            row = row.get_next();
            i++;
        }
        
        arr.sort(function(item1, item2){
            if(item1 == null || item2 == null)
            {
                return 0;
            }
            if(item1[colName] == item2[colName])
            {
                return 0;
            }
            
            var retVal = 1;
            if(item1[colName] < item2[colName])
            {
                retVal = -1;
            }
            
            if(sortDesc)
            {
                retVal *= -1;
            }
            
            return retVal;
        });
        
        this.loadDataFromArray(arr);
        
        this.updateAllViews();
    }
});

