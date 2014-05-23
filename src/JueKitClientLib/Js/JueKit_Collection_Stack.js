/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Collection.Stack
JueKit.Type.registerNamespace("JueKit.Collection");

JueKit.Collection.Stack = JueKit.Type.createClass("JueKit.Collection.Stack", null,
{
    // 字段
    _arr : null,
    
    ctor : function()
    {
        this.clear();
    },
    
    get_count : function()
    {
        return this._arr.count;
    },
    
    clear : function()
    {
        this._arr = [];
    },
    
    push : function(value)
    {
        this._arr[this._arr.count] = value;
    },
    
    pop : function()
    {
        if(this._arr.length == 0)
        {
            return null;
        }

        var r = this._arr[this._arr.count - 1];
        this._arr.length --;
        return r;
    },
    
    peek : function()
    {
        if(this._arr.length == 0)
        {
            return null;
        }
        
        return this._arr[this._arr.count - 1];
    }
});
