/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.Kit.NotifyWindow
JueKit.Type.registerNamespace("JueKit.UI.Kit");

JueKit.UI.Kit.NotifyWindow = JueKit.Type.createClass("JueKit.UI.Kit.NotifyWindow", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueNtfWnd",
    createDom : function(objData)
    {
        var cssCls = this.cssCls;
        var html = JueKit.String.format("<div class='{0}HeaderW'><div class='{0}Header'><div class='{0}HeaderI'><a class='{0}Close' alt='{1}'></a><div class='{0}Title'></div></div></div></div><div class='{0}Body'><div class='{0}BodyI'></div></div><div class='{0}FooterW'><div class='{0}Footer'><div class='{0}FooterI'></div></div></div>", cssCls, JueKitSR["close"]);
        this._el = JueKit.Dom.createEl("div", {className:cssCls}, html);
        
        JueKit.UI.Kit.NotifyWindow._base.createDom.call(this, objData);
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
    
    startCountdown : function()
    {
        var oThis = this;
        this._timeoutId = setTimeout(function(){oThis.fadeOutWindow();}, this._countdown);
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
        var ntfw = JueKit.UI.Kit.NotifyWindow;
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
            JueKit.UI.Kit.NotifyWindow._defaultTweener.sizeTo(this._el, this._width, 0, 0, 1, function(){oThis.closeWindow();});
        }
    },
    
    showMessage : function()
    {
        var ntfw = JueKit.UI.Kit.NotifyWindow;
        this.show();
        this.set_height(this._height);
        this._el.style.height = "0";
        this._el.style.left = (JueKit.Dom.getClientWidth() - this._el.offsetWidth - 10) + "px";
        this._el.style.top = (JueKit.Dom.getClientHeight() - this._el.offsetHeight - 10 - ntfw._totalHeight) + "px";
        ntfw._totalHeight += this._height + 5;
        ntfw._lastNotifyWnd = this;

        var oThis = this;
        JueKit.UI.Kit.NotifyWindow._defaultTweener.sizeTo(this._el, this._width, this._height, 0, 1,
            function(){
                oThis.startCountdown();
            });
    }
});



JueKit.UI.Kit.NotifyWindowPool = JueKit.Type.createClass("JueKit.UI.Kit.NotifyWindowPool", JueKit.Pool,
{
    createEntry : function()
    {
        var o = new JueKit.UI.Kit.NotifyWindow({});
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

JueKit.UI.Kit.NotifyWindow._defaultFormula = function(x)
{
    return x;
};

JueKit.Type.extend(JueKit.UI.Kit.NotifyWindow,
{
    _pool : new JueKit.UI.Kit.NotifyWindowPool(),
    
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
        wnd.__ehClose = options.onClose;

        wnd.showMessage();
        return wnd;
    }
});

