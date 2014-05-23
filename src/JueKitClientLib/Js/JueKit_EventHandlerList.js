/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.EventHandlerItem
JueKit.EventHandlerItem = function(handler, scope)
{
    this._handler = handler;
    this._scope = scope;
};

// JueKit.EventHandler
JueKit.EventHandler = JueKit.Type.createClass("JueKit.EventHandler");

JueKit.Type.extend(JueKit.EventHandler.prototype,
{
//	_his : null,

    ___get_his : function()
    {
        return this._his;
    },
    
    __get_his : function()
    {
        this._his = new JueKit.Collection.LinkedList();
        
        this.__get_his = this.___get_his;
        
        return this._his;
    },

    add : function(handler, scope)
    {
        if(!scope)
        {
            scope = window;
        }

        var hi = new JueKit.EventHandlerItem(handler, scope);
        this.__get_his().addLast(hi);
    },

    remove : function(handler, scope)
    {
        var his = this.__get_his();
        
        if(!scope)
        {
            scope = window;
        }

        var node, hi;
        node = his.tryUntil(
                function(handlerItem)
                {
                    return (handlerItem._handler == handler
                        && handlerItem._scope == scope);
                }
            );
            
        if(node)
        {
            hi = node.get_value();
            his.remove(node);
            
            delete hi._handler;
            delete hi._scope;
            delete hi._evtArguments;
        }
    },
    
    clear : function()
    {
        if(this._his)
        {
            this._his.clear();
        }
    },
    
    __fireEventHandlerItem : function(hi, arrArgs)
    {
        return hi._handler.call(hi._scope, arrArgs.sender, arrArgs.eventArgs);
    },
    
    fire : function(sender, eventArgs)
    {
        if(this._his)
        {
            this.__get_his().forEach(this.__fireEventHandlerItem, this, {sender:sender, eventArgs:eventArgs});
        }
    },
    
    fireUntil : function(sender, eventArgs)
    {
        if(this._his)
        {
            this.__get_his().enumWhile(this.__fireEventHandlerItem, this, {sender:sender, eventArgs:eventArgs});
        }
    }
});


// JueKit.EventHandlerList
JueKit.EventHandlerList = JueKit.Type.createClass("JueKit.EventHandlerList");

JueKit.Type.extend(JueKit.EventHandlerList.prototype,
{
    //_eventHandlerList : null,

    ctor : function()
    {
        this._eventHandlerList = {};
    },
    
    __getEventHandler : function(eventName)
    {
        if(!this._eventHandlerList[eventName])
        {
            this._eventHandlerList[eventName] = new JueKit.EventHandler();
        }
        return this._eventHandlerList[eventName];
    },

    add : function(eventName, handler, scope)
    {
        var eventHandler = this.__getEventHandler(eventName);
        eventHandler.add(handler, scope);
    },
    
    remove : function(eventName, handler, scope)
    {
        var eventHandler = this._eventHandlerList[eventName];
        if(eventHandler)
        {
            eventHandler.remove(handler, scope);
        }
    },
    
    clear : function(eventName)
    {
        var eventHandler = this._eventHandlerList[eventName];
        if(eventHandler)
        {
            eventHandler.clear();
        }
    },
    
    fire : function(eventName, sender, eventArgs)
    {
        var eventHandler = this._eventHandlerList[eventName];
        if(eventHandler)
        {
            eventHandler.fire(sender, eventArgs);
        }
    },
    
    fireUntil : function(eventName, sender, eventArgs)
    {
        var eventHandler = this._eventHandlerList[eventName];
        if(eventHandler)
        {
            eventHandler.fireUntil(sender, eventArgs);
        }
    }
});
