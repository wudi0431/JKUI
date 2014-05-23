/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.AccordionPanel
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.AccordionPanel = JueKit.Type.createClass("JueKit.UI.AccordionPanel", JueKit.UI.LazyLoadWebControl,
{
    isContainer : true,
    onInitProperty : function(objData)
    {
        this._expanded = objData.expanded;
        this._title = objData.title;
        
        JueKit.UI.AccordionPanel._base.onInitProperty.call(this, objData);
    },

    bindDomEventHandlers : function()
    {
        if(this._elPanelSwitch)
        {
            //JueKit.Event.addHandler(this._elPanelSwitch, "click", this.__hPanelSwitch_Click, this);
            JueKit.Event.addHandler(this._elPanelHeader, "click", this.__hPanelSwitch_Click, this);
        }
    },
    
    createDom : function(objData)
    {
        var cssCls = this._parent.cssCls + "Panel";
        var cssClsSwitch = cssCls + "Switch";
        if(this._expanded)
        {
            cssClsSwitch = cssClsSwitch + " " + cssClsSwitch + "Expanded";
        }
        var html = JueKit.String.format("<div class='{0}HeaderWrap'><div class='{0}Header'><div class='{0}HeaderInner'><a class='{1}' id='{3}_switch'><span></span></a><span class='{0}Title' id='{3}_title'>{2}</span></div></div></div><div class='{0}ContentW' id='{3}_content'><div class='{0}Content'><div class='{0}ContentI'></div></div></div>",
            cssCls,
            cssClsSwitch,
            JueKit.String.HTMLEncode(this._title),
            this._id);
        this._el = JueKit.Dom.createEl("div", {className:cssCls}, html);
    
        JueKit.UI.AccordionPanel._base.createDom.call(this, objData);
    },

    parseDom : function(objData)
    {
        this._elPanelTitle = JueKit(this._id + "_title");
        this._elPanelSwitch = JueKit(this._id + "_switch");
        this._elPanelContent = JueKit(this._id + "_content");
        
        this._elPanelHeader = JueKit.Dom.getChildElByIndex(this._el,0);
        
        
        this._elInner = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._elPanelContent));
        
        this._elChildContainer = this._elPanelContent;
    },
    
    // Dom Event Handlers
    __hPanelSwitch_Click : function(evt)
    {
        this.toggle();
    },
    
    get_title : function()
    {
        return this._title;
    },
    
    set_title : function(value)
    {
        this._title = value;
        this._elPanelTitle.innerHTML = value;
    },
    
    get_expanded : function()
    {
        return this._expanded;
    },
    
    toggle: function()
    {
        if(this._expanded)
        {
            this.collapse();
        }
        else
        {
            this.expand();
        }
    },
    
    expand : function()
    {
        if(this.onExpanding)
        {
            this.onExpanding();
        }
        
        
        JueKit.Dom.addCssClass(this._elPanelSwitch, "jueAccordionPanelSwitchExpanded");
        JueKit.Dom.show(this._elPanelContent);

        if(!this._childLoaded)
        {
            this.__loadNow();
        }

        this._expanded = true;
        this._parent.notifyPanelExpanded(this);
        this.fireEvent("expanded");
    },
    
    collapse : function()
    {
        this.fireEvent("collapse");
        
        this._expanded = false;

        JueKit.Dom.removeCssClass(this._elPanelSwitch, "jueAccordionPanelSwitchExpanded");
        JueKit.Dom.hide(this._elPanelContent);
    },
    
    getElInner : function()
    {
        return this._elInner;
    }
    
    // Dom Event Handlers
});
