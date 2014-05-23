/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Text.StringBuilder
JueKit.Type.registerNamespace("JueKit.Text");

JueKit.Text.StringBuilder = JueKit.Type.createClass("JueKit.Text.StringBuilder", null,
{
    // 属性
    get_length : function()
    {
        return this._data.length;
    },
    
    // 构造函数
    ctor : function()
    {
        this._data = [];
    },
    
    // 方法
    append : function(text)
    {
        if(arguments.length > 1)
        {
            text = JueKit.String.format.apply(JueKit.String, arguments);
        }
        this._data[this._data.length] = text;
    },
    
    appendLine : function(text)
    {
        if(arguments.length > 1)
        {
            text = JueKit.String.format.apply(JueKit.String, arguments);
        }
        this._data[this._data.length] = text + "\r\n";
    },
    
    clear : function()
    {
        this._data.length = 0;
    }
});

JueKit.Text.StringBuilder.prototype.toString = function()
{
    return this._data.join("");
};

