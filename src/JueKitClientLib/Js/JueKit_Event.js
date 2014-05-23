/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Event
JueKit.Event =
{
    __init : function()
    {
        JueKit.Type.extend(JueKit.Event, JueKit.EventComm);
        delete JueKit.EventComm;
        if(JueKit.Browser.isIE)
        {
            JueKit.Type.extend(JueKit.Event, JueKit.EventIE);
            delete JueKit.EventIE;
        }
        else if(JueKit.Browser.isFirefox)
        {
            JueKit.Type.extend(JueKit.Event, JueKit.EventMF);
            delete JueKit.EventMF;
        }
        else if(JueKit.Browser.isOpera)
        {
            JueKit.Type.extend(JueKit.Event, JueKit.EventMF);
            delete JueKit.EventMF;
        }
        else
        {
            JueKit.Type.extend(JueKit.Event, JueKit.EventMF);
            delete JueKit.EventMF;
        }
        
        this._his = new JueKit.Collection.LinkedList();
        this._loadHis = new JueKit.Collection.LinkedList();
        this._unloadHis = new JueKit.Collection.LinkedList();
        //this._contextMenuHis = new JueKit.Collection.LinkedList();
        
        this.addHandler(window, "load", this.__hWindow_onLoad, this);
        this.addHandler(window, "unload", this.__hWindow_onUnload, this);
        //this.addHandler(document.body, "contextmenu", this.__hBody_ContextMenu, this);
        
        delete this.__init;
    }
};

JueKit.Event.__init();

JueKit.CustomEventControl = JueKit.Type.createClass("JueKit.CustomEventControl", null,
{
    __addHandler : function(eventName, handler, scope)
    {
        this._eventHandlerList.add(eventName, handler, scope);
    },

    addHandler : function(eventName, handler, scope)
    {
        if(!handler)
        {
            throw new Error("参数 handler 不能为空。");
        }

        this._eventHandlerList = new JueKit.EventHandlerList();
        this.__addHandler(eventName, handler, scope);
        this.addHandler = this.__addHandler;
        delete this.__addHandler;
    },

    removeHandler : function(eventName, handler, scope)
    {
        if(this._eventHandlerList)
        {
            this._eventHandlerList.remove(eventName, handler, scope);
        }
    },
    
    fireEvent : function(eventName, args)
    {
        if(!this._eventHandlerList)
        {
            return;
        }
        this._eventHandlerList.fire(eventName, this, args);
    }
});
