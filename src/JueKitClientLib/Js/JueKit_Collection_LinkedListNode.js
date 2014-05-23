/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Collection.LinkedListNode
JueKit.Type.registerNamespace("JueKit.Collection");

JueKit.Collection.LinkedListNode = JueKit.Type.createClass("JueKit.Collection.LinkedListNode", null,
{
    // 字段
    /*
    _list : null,
    _next : null,
    _previous : null,
    _value : null,
    */
    
    // 属性
    get_list : function()
    {
        return this._list;
    },
    
    set_list : function(oValue)
    {
        this._list = oValue;
    },
    
    get_next : function()
    {
        return this._next;
    },
    
    set_next : function(oValue)
    {
        this._next = oValue;
    },
    
    get_previous : function()
    {
        return this._previous;
    },
    
    set_previous : function(oValue)
    {
        this._previous = oValue;
    },
    
    get_value : function()
    {
        return this._value;
    },
    
    set_value : function(oValue)
    {
        this._value = oValue;
    },

    // 方法
    destroy : function()
    {
        delete this._list;
        delete this._next;
        delete this._previous;
        delete this._value;
    }
});
