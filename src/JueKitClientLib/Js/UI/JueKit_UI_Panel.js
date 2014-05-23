/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.Panel
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.Panel = JueKit.Type.createClass("JueKit.UI.Panel", JueKit.UI.RichClientWebControl,
{
    isContainer : true,
    bindDomEventHandlers : function()
    {
    },
        
    parseDom : function(objData)
    {
        this._elHeaderW = JueKit.Dom.getFirstChild(this._el);
        this._elHeaderI = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._elHeaderW));
        this._elContentW = JueKit.Dom.getNextEl(this._elHeaderW);
        this._elContentI = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._elContentW));
        this._elFooterW = JueKit.Dom.getNextEl(this._elContentW);
    },
    
    onSetHeight : function(value)
    {
        if(this._height < 0)
        {
            return;
        }
        
        var ih = this._height - this._elHeaderW.offsetHeight - this._elFooterW.offsetHeight - this._elContentW.offsetHeight + this._elContentI.offsetHeight;
        this._elContentI.style.height = ih + "px";
    },
    
    set_headerInnerHTML : function(value)
    {
        this._elHeaderI.innerHTML = value;
    }
});
