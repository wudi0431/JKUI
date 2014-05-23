/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.LazyLoadWebControl
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.LazyLoadWebControl = JueKit.Type.createClass("JueKit.UI.LazyLoadWebControl", JueKit.UI.RichClientWebControl,
{
    isContainer : true,
    onInitProperty : function(objData)
    {
        if(objData.lazyLoad)
        {
            this._childLoaded = false;
        }
        else
        {
            this._childLoaded = true;
        }
        
        JueKit.UI.LazyLoadWebControl._base.onInitProperty.call(this, objData);
    },
    
    lazyLoad : function(cbSuccess, oScopeS, cbFailed, oScopeF)
    {
        if(!this._richClientPanel)
        {
            return;
        }
        
        var hr = JueKit.Net.HttpRequest.gain();

        hr.set_url(this._richClientPanel._updateUrl);
        hr.set_method("POST");
//		hr.setHeader("jueAction", "lazyLoad");
//		hr.setHeader("jueUid", this._uid);

        hr.addContent("jueAction", "lazyLoad");
        hr.addContent("jueUid", this._uid);
        if(cbSuccess)
        {
            if(!oScopeS)
            {
                oScopeS = this;
            }
            hr.add_success(cbSuccess, oScopeS);
        }
        if(cbFailed)
        {
            if(!oScopeF)
            {
                oScopeF = this;
            }
            hr.add_failed(cbFailed, oScopeF);
        }
        
        hr.send();
    },

    __loadNow : function()
    {
        this._elChildContainer.innerHTML = JueKitSR["loading"];
        this.lazyLoad(this.__cbLoadNowS, this, this.__cbLoadNowF, this);
    },
    
    __cbLoadNowS : function(text)
    {
        this._childLoaded = true;
        var o = text.toObject();
        if(this._elChildContainer)
        {
            this._elChildContainer.innerHTML = o.innerHTML;
        }
        this.__createChildControls(o.controls);

        this.onLazyLoaded && this.onLazyLoaded();
    },
    
    __cbLoadNowF : function(text)
    {
        alert(text);
    },
    
    get_elChildContainer : function()
    {
        return this._elChildContainer;
    }
});
