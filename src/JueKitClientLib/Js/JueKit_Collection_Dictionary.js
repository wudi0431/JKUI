/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Collection.Dictionary
JueKit.Type.registerNamespace("JueKit.Collection");

JueKit.Collection.Dictionary = JueKit.Type.createClass("JueKit.Collection.Dictionary", null,
{
    ctor : function()
    {
        this.clear();
    },
    
    get_count : function()
    {
        return this._keys.get_count();
    },
    
    get_keys : function()
    {
        return this._keys;
    },
    
    get_values : function()
    {
        return this._values;
    },
    
    getValue : function(key)
    {
        var node = this._map[key];
        
        if(node)
        {
            return node.get_value();
        }
        return null;
    },
    
    setValue : function(key, value)
    {
        var node = this._map[key];
        
        if(node)
        {
            // 如果已经设置过这个key的值了，修改。
            node.set_value(value);
        }
        else
        {
            // 否则，添加一个
            node = this._values.addLast(value);
            this._map[key] = node;
            this._keys.addLast(key);
        }
    },
    
    getAt : function(nIndex)
    {
        var node = this._values.getAt(nIndex);
        if(node)
        {
            return node.get_value();
        }
        return null;
    },
    
    remove : function(key)
    {
        var node = this._map[key];
        if(node)
        {
            this._keys.remove(key);
            this._values.remove(node);
            
            delete this._map[key];
        }
    },
    
    clear : function()
    {
        this._keys = new JueKit.Collection.LinkedList();
        this._values = new JueKit.Collection.LinkedList();
        
        this._map = {};
    }
});
