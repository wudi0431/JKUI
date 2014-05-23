/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.Kit.BubbleWindow
JueKit.Type.registerNamespace("JueKit.UI.Kit");

JueKit.UI.Kit.BubbleWindow = JueKit.Type.createClass("JueKit.UI.Kit.BubbleWindow", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueBblWnd",
    createDom : function(objData)
    {
        var cssCls = this.cssCls;
        var html = JueKit.String.format("<div class='{0}HeaderW'><div class='{0}Header'><div class='{0}HeaderI'><a class='{0}Close' alt='{1}'></a><div class='{0}Title'></div></div></div></div><div class='{0}Body'><div class='{0}BodyI'></div></div><div class='{0}FooterW'><div class='{0}Footer'><div class='{0}FooterI'></div></div></div>", cssCls, JueKitSR["close"]);
        this._el = JueKit.Dom.createEl("div", {className:cssCls}, html);
        
        JueKit.UI.Kit.BubbleWindow._base.createDom.call(this, objData);
    },
    
    parseDom : function(objData)
    {
        this._elHeader = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elBtnClose = JueKit.Dom.getChildElByIndex(this._elHeader.firstChild.firstChild, 0);
        this._elTitle = JueKit.Dom.getNextEl(this._elBtnClose);
        this._elBody = JueKit.Dom.getNextEl(this._elHeader);
        this._elBodyInner = this._elBody.firstChild;
        this._elFooter = JueKit.Dom.getNextEl(this._elBody);
    },
    
    bindDomEventHandlers : function(objData)
    {
        JueKit.Event.addHandler(this._el, "mouseover", this.stopCountdown, this);
        JueKit.Event.addHandler(this._el, "mouseout", this.startCountdown, this);
        JueKit.Event.addHandler(this._elBtnClose, "click", this.closeWindow, this);
    },

    set_title : function(value)
    {
        this._elTitle.innerHTML = JueKit.String.HTMLEncode(value);
    },
    
    set_text : function(value)
    {
        this._elBodyInner.innerHTML = value;
        this._elBody.scrollTop = 0;
    },
    
    set_countdown : function(value)
    {
        this._countdown = value;
    },
    
    set_height : function(value)
    {
        if(value < 0)
        {
            this._height = -1;
            this._el.style.height = "";
            this._elBody.style.height = "";
        }
        else
        {
            this._height = value;
            var hb = value - this._elHeader.offsetHeight - this._elFooter.offsetHeight;
            if(hb > 0)
            {
                this._elBody.style.height = hb + "px";
            }
            this._el.style.height = value + "px";
        }
    },
    
    set_bindElement : function(bindElement)
    {
        this._bindElement = bindElement;
    },
    
    startCountdown : function()
    {
        if(this._countdown > 0)
        {
            var oThis = this;
            this._timeoutId = setTimeout(function(){oThis.fadeOutWindow();}, this._countdown);
        }
    },
    
    stopCountdown : function()
    {
        if(this._timeoutId)
        {
            clearTimeout(this._timeoutId);
            this._timeoutId = 0;
        }
    },
    
    closeWindow : function()
    {
        this.show(false);
        this.fireEvent("close");
        var ntfw = JueKit.UI.Kit.BubbleWindow;
        if(ntfw._lastNotifyWnd === this)
        {
            ntfw._totalHeight = 0;
        }
    },
    
    fadeOutWindow : function()
    {
        if(this._state & 1)
        {
            var oThis = this;
            JueKit.UI.Kit.BubbleWindow._defaultTweener.opacity(this._el, 1, 0, function(){oThis.closeWindow();});
        }
    },
    
    showMessage : function()
    {
        this.show();
        JueKit.Dom.setStyle(this._el, "opacity", 1);
        this.set_height(this._height);
        if(this._bindElement)
        {
            var pos = JueKit.Dom.getPosition(this._bindElement);
            var size = JueKit.Dom.getSize(this._bindElement);
            var left = pos.left + size.width;
            var top = pos.top + size.height/2 - this._el.offsetHeight;

            JueKit.Dom.setPosition(this._el, left, top);
            this._el.style.zIndex = JueKit.getJueKitTopWnd()._jueDlgBgIdx + 10;
        }
        
        
        this.startCountdown();
    }
});



JueKit.UI.Kit.BubbleWindowPool = JueKit.Type.createClass("JueKit.UI.Kit.BubbleWindowPool", JueKit.Pool,
{
    createEntry : function()
    {
        var o = new JueKit.UI.Kit.BubbleWindow({});
        o.addHandler("close", this.__hNtfWnd_Close, this);
        return o;
    },
    
    initEntry : function(entry)
    {
    },
    
    cleanEntry : function(entry)
    {
    },
    
    destroyEntry : function(entry)
    {
    },
    
    __hNtfWnd_Close : function(sender, args)
    {
        if(sender.__ehClose)
        {
            var eh = sender.__ehClose;
            eh.handler.call(eh.scope, sender, args);
        }
        this.release(sender);
    }
});

JueKit.UI.Kit.BubbleWindow._defaultFormula = function(x)
{
    return x;
};

JueKit.Type.extend(JueKit.UI.Kit.BubbleWindow,
{
    _pool : new JueKit.UI.Kit.BubbleWindowPool(),
    
    _defaultTweener : new JueKit.Tweener(1000, 0, null),
    
    _totalHeight : 0,
    
    showMessage : function(options)
    {
        var wnd = this._pool.gain();
        
        wnd.set_title(options.title);
        wnd.set_text(options.text);
        wnd.set_width(options.width || 250);
        wnd.set_height(options.height || 130);
        wnd.set_countdown(options.countdown || 5000);
        wnd.set_bindElement(options.bindElement);
        wnd.__ehClose = options.onClose;

        wnd.showMessage();
    }
});

