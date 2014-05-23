/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.AccordionSet
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.AccordionSet = JueKit.Type.createClass("JueKit.UI.AccordionSet", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueAccordion",
    onInitProperty : function(objData)
    {
        this._exclusive = objData.exclusive;
        
        JueKit.UI.AccordionSet._base.onInitProperty.call(this, objData);
    },
    
    onLoad : function()
    {
        this.get_controls().forEach(this.__cbFindLastExpandedPanel, this);
    },
    
    __cbFindLastExpandedPanel : function(panel)
    {
        if(panel.get_expanded())
        {
            this._lastExpandedPanel = panel;
        }
    },
    
    bindDomEventHandlers : function(objData)
    {
    },

    createDom : function(objData)
    {
        this._el = JueKit.Dom.createEl("div", {className:this.cssCls + "Set"});
        
        JueKit.UI.AccordionSet._base.createDom.call(this, objData);
    },

    parseDom : function(objData)
    {
    },
    
    get_exclusive : function()
    {
        return this._exclusive;
    },
    
    set_exclusive : function(value)
    {
        this._exclusive = value;
        
        if(value)
        {
            this.get_controls().forEach(this.__cbCollapseOtherPanel, this)
        }
    },
    
    __cbCollapseOtherPanel : function(panel)
    {
        if(panel && panel != this._lastExpandedPanel)
        {
            panel.collapse();
        }
    },
    
    notifyPanelExpanded : function(panel)
    {
        if(this._exclusive && this._lastExpandedPanel)
        {
            this._lastExpandedPanel.collapse();
        }
        this._lastExpandedPanel = panel;
    }
});
