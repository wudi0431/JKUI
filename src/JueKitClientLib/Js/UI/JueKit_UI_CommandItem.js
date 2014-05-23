/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.CommandItem
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.CommandItem = JueKit.Type.createClass("JueKit.UI.CommandItem", JueKit.UI.RichClientWebControl,
{
    get_text : function()
    {
        return this._text;
    },
    
    set_text : function(value)
    {
        this._text = value;
        this._elText.innerHTML = JueKit.String.HTMLEncode(value);
    },
    
    get_disabled : function(value)
    {
        return this._disabled;
    },

    onInitProperty : function(objData)
    {
        this._text = objData.text;
        this._cmdId = objData.cmdId;
        /*
        if(objData.disabled)
        {
            this._disabled = true;
        }
        */
        
        JueKit.UI.CommandItem._base.onInitProperty.call(this, objData);
    },
    
    get_cmdId : function()
    {
        return this._cmdId;
    },
    
    onInit : function(objData)
    {
        this.set_disabled(objData.disabled);
    }
});
