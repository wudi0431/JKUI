/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Data.LinkedListDataReader
JueKit.Type.registerNamespace("JueKit.Data");

JueKit.Data.LinkedListDataReader = JueKit.Type.createClass("JueKit.Data.LinkedListDataReader", JueKit.Data.DataSource,
{
    //_list : null,
    
    ctor : function(list)
    {
        this._list = list;
        JueKit.Data.LinkedListDataReader._base.ctor.call(this);
    },
    
    forEach : function(fCallback, oScope, arrArgs)
    {
        if(!this._list)
        {
            return;
        }
        
        var item = this._list.get_first();
        while(item)
        {
            fCallback.call(oScope, item.get_value(), arrArgs);
            item = item.get_next();
        }
    }
});

JueKit.Data.LinkedListDataReader.open = function(list)
{
    return new JueKit.Data.LinkedListDataReader(list);
};

// JueKit.Data.ArrayDataReader
JueKit.Type.registerNamespace("JueKit.Data");

JueKit.Data.ArrayDataReader = JueKit.Type.createClass("JueKit.Data.ArrayDataReader", JueKit.Data.DataSource,
{
    //_arr : null,
    
    ctor : function(arr)
    {
        this._arrs = arguments;
        JueKit.Data.ArrayDataReader._base.ctor.call(this);
    },
    
    forEach : function(fCallback, oScope, arrArgs)
    {
        if(!this._arrs)
        {
            return;
        }
        
        var arr;
        for(var i=0; i<this._arrs.length; i++)
        {
            arr = this._arrs[i];
            if(arr)
            {
                for(var j=0; j<arr.length; j++)
                {
                    fCallback.call(oScope, arr[j], arrArgs);
                }
            }
        }
    },
    
    sort : function(colName, sortDesc)
    {
        if(!this._arrs)
        {
            return;
        }

        var arr;
        for(var i=0; i<this._arrs.length; i++)
        {
            arr = this._arrs[i];
            if(arr)
            {
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
            }
        }
        
        this.updateAllViews();
    }
});

JueKit.Data.ArrayDataReader.open = function(arr)
{
    return new JueKit.Data.ArrayDataReader(arr);
};

