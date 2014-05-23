/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Collection.LinkedList
JueKit.Type.registerNamespace("JueKit.Collection");

JueKit.Collection.LinkedList = JueKit.Type.createClass("JueKit.Collection.LinkedList", null,
{
    // 字段
    //	_first : null,
    //	_last : null,

    _count : 0,
    
    // 属性
    get_first : function()
    {
        return this._first;
    },
    
    get_last : function()
    {
        return this._last;
    },
    
    get_count : function()
    {
        return this._count;
    },
    
    // 构造
    /*
    ctor : function()
    {
    },
    */
    
    // 方法
    __validateNode : function(oNode)
    {
        return;
        if(oNode._list !== this)
        {
            throw new Error(JueKit.StringResources.externalLinkedListNode);
        }
    },
    
    __validateNewNode : function(oNode)
    {
        return;
        if(oNode._list)
        {
            throw new Error(JueKit.StringResources.linkedListNodeIsAttached);
        }
    },
    
    __resolveNewNodeParameter : function(oValue, notCheckList)
    {
        var newNode;
        if(oValue && oValue.set_next && oValue.set_previous)
        {
            // 如果传入参数是LinkedListNode类型的
            newNode = oValue;
            
            if(!notCheckList && newNode._list)
            {
                if(newNode._previous)
                {
                    newNode._previous._next = newNode._next;
                }
                if(newNode._next)
                {
                    newNode._next._previous = newNode._previous;
                }
                if(newNode._list._first == newNode)
                {
                    newNode._list._first = newNode._next;
                }
                if(newNode._list._last == newNode)
                {
                    newNode._list._last = newNode._previous;
                }
                newNode._list._count --;
            }
            
            newNode._value = oValue;
            this.__validateNewNode(newNode);
            // 设置节点的List
            newNode._list =this;
        }
        else
        {
            // 新建一个LinkedListNode节点
            newNode = new JueKit.Collection.LinkedListNode();
            newNode._value = oValue;
            newNode._list = this;
        }
        return newNode;
    },
    
    addFirst : function(oValue)
    {
        // 处理新节点参数，在这里实现重载
        var newNode = this.__resolveNewNodeParameter(oValue);
        
        if(!this._first)
        {
            // 如果链表中尚无节点
            newNode._next = null;
            this._last = newNode;
        }
        else
        {
            // 设置当前头节点的前一个节点为新添加节点
            this._first._previous = newNode;
            // 设置新添加节点的后一个节点为当前头节点
            newNode._next = this._first;
        }
        // 设置新节点的前一个节点为空
        newNode._previous = null;
        // 设置当前头节点为新节点
        this._first = newNode;
        
        this._count ++;
        return newNode;
    },
    
    addLast : function(oValue)
    {
        // 处理新节点参数，在这里实现重载
        var newNode = this.__resolveNewNodeParameter(oValue, true);
        
        if(!this._last)
        {
            // 如果链表中尚无节点
            newNode._previous = null;
            this._first = newNode;
        }
        else
        {
            // 设置当前尾节点的后一个节点为新添加节点
            this._last._next = newNode;
            // 设置新添加节点的前一个节点为当前尾节点
            newNode._previous = this._last;
        }
        // 设置新节点的后一个节点为空
        newNode._next = null;
        // 设置当前尾节点为新节点
        this._last = newNode;
        
        this._count ++;
        return newNode;
    },
    
    addBefore : function(oValue, oNode)
    {
        if(!oNode || !oNode._previous)
        {
            // 插入到第一个节点之前
            return this.addFirst(oValue);
        }

        return this.addAfter(oValue, oNode._previous);
    },
    
    addAfter : function(oValue, oNode)
    {
        if(oNode && oNode._next)
        {
            var newNode = this.__resolveNewNodeParameter(oValue);
            
            this.__validateNode(oNode);
            
            newNode._previous = oNode;
            newNode._next = oNode._next;
            oNode._next._previous = newNode;
            oNode._next = newNode;
            
            this._count ++;
            
            return newNode;
        }
        else
        {
            // 插入到最后一个节点之后
            return this.addLast(oValue);
        }
    },
    
    contains : function(oValue)
    {
        var node = this._first;
        
        while(node)
        {
            if(node._value === oValue)
            {
                return true;
            }
            node = node._next;
        }
        
        return false;
    },
    
    find : function(oValue, fCallback, oScope)
    {
        var node = this._first;
        
        if(fCallback)
        {
            if(!oScope)
            {
                oScope = window;
            }
            while(node)
            {
                if(fCallback.call(oScope, node._value, oValue))
                {
                    return node;
                }
                node = node._next;
            }
        }
        else
        {
            while(node)
            {
                if(node._value === oValue)
                {
                    return node;
                }
                node = node._next;
            }
        }
        
        return null;
    },
    
    findLast : function(oValue, fCallback, oScope)
    {
        var node = this._last;
        
        if(fCallback)
        {
            if(!oScope)
            {
                oScope = window;
            }
            while(node)
            {
                if(fCallback.call(oScope, node._value, oValue))
                {
                    return node;
                }
                node = node._previous;
            }
        }
        else
        {
            while(node)
            {
                if(node._value === oValue)
                {
                    return node;
                }
                node = node._previous;
            }
        }
        
        return null;
    },
    
    getAt : function(nIndex)
    {
        if(nIndex < 0 && nIndex >= this.get_count())
        {
            return null;
        }

        var node = this._first;
        while(nIndex--)
        {
            node = node._next;
        }
        return node;
    },
    
    remove : function(oNode)
    {
        if(!(oNode && oNode.set_next && oNode.set_previous))
        {
            // 如果传入参数不是LinkedListNode类型的
            // 则根据值查找节点
            oNode = this.find(oNode);
        }
        
        if(!oNode)
        {
            return;
        }

    
        if(oNode === this._first)
        {
            this._first = oNode._next;
        }
        else
        {
            oNode._previous._next = oNode._next;
        }
        
        if(oNode === this._last)
        {
            this._last = oNode._previous;
        }
        else
        {
            oNode._next._previous = oNode._previous;
        }
        oNode.destroy();
        
        this._count --;
    },
    
    removeFirst : function()
    {
        this.remove(this._first);
    },
    
    removeLast : function()
    {
        this.remove(this._last);
    },
    
    clear : function()
    {
        var node = this._first;
        var next;
        // 断开各节点之间的引用，
        // 否则在内存回收时它们将不能被销毁。
        while(node)
        {
            next = node._next;
            node.destroy();
            node = next;
        }
        delete this._first;
        delete this._last;
        this._count = 0;
    },
    
    toString : function()
    {
        var sb = new JueKit.Text.StringBuilder();
        var node = this._first;

        sb.append("[");
        if(node)
        {
            sb.append(node._value);
            
            node = node._next;
            while(node)
            {
                sb.append(",");
                sb.append(node._value);
                node = node._next;
            }
        }
        sb.append("]");

        return sb.toString();
    },
    
    // IEnumerable
    forEach : function(fCallback, oScope, arrArgs)
    {
        var node = this._first;
        var next;
        
        while(node)
        {
            next = node._next;
            fCallback.call(oScope, node._value, arrArgs);
            node = next;
        }
    },
    
    tryUntil : function(fCallback, oScope, arrArgs)
    {
        var node = this._first;
        var next;
        
        while(node)
        {
            next = node._next;
            if(fCallback.call(oScope, node._value, arrArgs))
            {
                return node;
            }
            node = next;
        }
    },
    
    enumWhile : function(fCallback, oScope, arrArgs)
    {
        var node = this._first;
        var next;
        
        while(node)
        {
            next = node._next;
            if(!fCallback.call(oScope, node._value, arrArgs))
            {
                return node;
            }
            node = next;
        }
    }
});
