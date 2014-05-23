/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.MenuItem
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.MenuItemType =
{
    string : 1,
    
    separator : 2,
    
    ownerdraw : 3
};

JueKit.UI.MenuStyle =
{
    // 指示显示在坐标左边（默认显示在右边）
    trackLeft : 1 << 0,
    
    // 指示显示在坐标上边（默认显示在下边）
    trackTop : 1 << 1,
    
    // 指示允许右键点击（默认忽略右键点击）
    rightClick : 1 << 2
};

JueKit.UI.MenuItemStyle = 
{
    // 可见
    visible : 1 << 0,
    
    // 禁用
    disabled : 1 << 1,
    
    // 复选状态
    check : 1 << 2,
    
    // 单选状态
    radio : 1 << 3
};

JueKit.UI.MenuItem = JueKit.Type.createClass("JueKit.UI.MenuItem", JueKit.UI.CommandItem,
{
    cssCls : "jueMenuItem",
    _menuItemStyle : JueKit.UI.MenuItemStyle.visible,
    onInitProperty : function(objData)
    {
        this._menuType = objData.type || JueKit.UI.MenuItemType.string;
        this._cmdId = objData.cmdId;
        this._cmdData = objData.cmdData;
        this._menu = objData.menu;
        
        JueKit.UI.MenuItem._base.onInitProperty.call(this, objData);
    },
    
    createDom : function(objData)
    {
        var html = JueKit.String.format("<div class='{0}'><div class='{0}Inner'><div class='{0}Icon'></div><div class='{0}Label'>{1}</div><div class='{0}PopupBtn'></div></div></div>", this.cssCls, JueKit.String.HTMLEncode(this._text));
        var cssMenuItemWrap = this.cssCls + "Wrap";
        if(this._menuType == JueKit.UI.MenuItemType.separator)
        {
            cssMenuItemWrap += " " + this.cssCls + "Separator";
        }
        
        if(this._disabled)
        {
            cssMenuItemWrap += " " + this.cssCls + "Disabled";
        }
        this._el = JueKit.Dom.createEl("div", {className:cssMenuItemWrap}, html);

        JueKit.UI.MenuItem._base.createDom.call(this, objData);
        
        if(objData.items)
        {
            this._subMenu = new JueKit.UI.Menu({parent:objData.menu, items:objData.items});
            JueKit.Dom.addCssClass(this._el, this.cssCls + "Popup");
        }
    },
    
    parseDom : function(objData)
    {
        this._elText = this._elLabel = this._el.childNodes[0].childNodes[0].childNodes[1];
    },
    
    bindDomEventHandlers : function(objData)
    {
        JueKit.Event.addHandler(this._el, "mouseover", this.__hEl_Mouseover, this);
        JueKit.Event.addHandler(this._el, "mouseout", this.__hEl_Mouseout, this);
    },
    
    __hEl_Mouseover : function(evt)
    {
        if(this._menuType == JueKit.UI.MenuItemType.separator || this._disabled)
        {
            return;
        }
        
        JueKit.Dom.addCssClass(this._el, this.cssCls + "Hover");
        
        this._menu.__setCurMenuItem(this);
    },
    
    __hEl_Mouseout : function(evt)
    {
        if(this._menuType == JueKit.UI.MenuItemType.separator || this._disabled)
        {
            return;
        }
        
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Hover");
        this._menu.__setCurMenuItem(null);
    },
    
    get_disabled : function()
    {
        return (this._menuItemStyle & JueKit.UI.MenuItemStyle.disabled) > 0;
    },
    
    set_disabled : function(value)
    {
        if(this.get_disabled() == value)
        {
            return;
        }
    
        if(value)
        {
            this._menuItemStyle |= JueKit.UI.MenuItemStyle.disabled;
        }
        else
        {
            this._menuItemStyle &= ~JueKit.UI.MenuItemStyle.disabled;
        }
        
        JueKit.Dom[value?"addCssClass":"removeCssClass"](this._el, this.cssCls + "Disabled");
    },
    
    get_visible : function()
    {
        return (this._menuItemStyle & JueKit.UI.MenuItemStyle.visible) > 0;
    },
    
    set_visible : function(value)
    {
        if(this.get_visible() == value)
        {
            return;
        }
    
        if(value)
        {
            this._menuItemStyle |= JueKit.UI.MenuItemStyle.visible;
            this._el.style.display = "";
        }
        else
        {
            this._menuItemStyle &= ~JueKit.UI.MenuItemStyle.visible;
            this._el.style.display = "none";
        }
    },
    
    get_checked : function()
    {
        return (this._menuItemStyle & JueKit.UI.MenuItemStyle.check) > 0;
    },

    set_checked : function(value)
    {
        if(this.get_checked() == value)
        {
            return;
        }
        
        if(value)
        {
            this._menuItemStyle |= JueKit.UI.MenuItemStyle.check;
        }
        else
        {
            this._menuItemStyle &= ~JueKit.UI.MenuItemStyle.check;
        }
        
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Radio");
        JueKit.Dom[value?"addCssClass":"removeCssClass"](this._el, this.cssCls + "Checked");
    },
    
    get_radio : function()
    {
        return (this._menuItemStyle & JueKit.UI.MenuItemStyle.radio) > 0;
    },

    set_radio : function(value)
    {
        if(value)
        {
            this._menuItemStyle |= JueKit.UI.MenuItemStyle.radio;
        }
        else
        {
            this._menuItemStyle &= ~JueKit.UI.MenuItemStyle.radio;
        }
        
        JueKit.Dom.removeCssClass(this._el, this.cssCls + "Checked");
        JueKit.Dom[value?"addCssClass":"removeCssClass"](this._el, this.cssCls + "Radio");
    },
    
    get_menuType : function()
    {
        return this._menuType;
    },
    
    get_cmdId : function()
    {
        return this._cmdId;
    },
    
    get_cmdData : function()
    {
        return this._cmdData;
    },
    
    trackSubMenu : function()
    {
        if(!this._subMenu)
        {
            return;
        }
        
        var rect = JueKit.Dom.getRect(this._el);
        this._subMenu.trackPopupMenu(rect.left + rect.width, rect.top, this);
    }
});

JueKit.UI.Menu = JueKit.Type.createClass("JueKit.UI.Menu", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueMenu",
    _style : 0,
    //_items : null,
    ctor : function(objData)
    {
        this._items = new JueKit.Collection.LinkedList();
        this._parent = objData.parent;
        //this._showMask = objData.showMask;  // 不要显示 锁瓶
        JueKit.UI.Menu._base.ctor.call(this, objData);
    },
    
    createDom : function(objData)
    {
        var html = JueKit.String.format("<div class='{0}HL'><div class='{0}HR'><div class='{0}HM'></div></div></div><div class='{0}BL'><div class='{0}BR'><div class='{0}BM'></div></div></div><div class='{0}FL'><div class='{0}FR'><div class='{0}FM'></div></div></div>", this.cssCls);
        this._el = JueKit.Dom.createEl("div", {className:this.cssCls}, html);
        //this._el.style.display = "none";

        JueKit.UI.Menu._base.createDom.call(this, objData);
    },
    
    parseDom : function(objData)
    {
        this._elInner = this._el.childNodes[1].childNodes[0].childNodes[0];
    },
    
    bindDomEventHandlers : function(objData)
    {
        this._el.onselectstart = JueKit.fReturnFalse;
        JueKit.Event.addHandler(this._el, "mousedown", this.__hEl_Mousedown, this);
        JueKit.Event.addHandler(this._el, "mouseup", this.__hEl_Mouseup, this);
        //JueKit.Event.addHandler(this._el, "mousemove", this.__hEl_Mousemove, this);
    },
    
    onInit : function(objData)
    {
        var item;
        if(objData.items)
        {
            for(var i=0; i<objData.items.length; i++)
            {
                item = objData.items[i];
                this.appendMenuItem(item);
            }
        }
    },
    
    onLoad : function(objData)
    {
        this._el.style.width = this._el.childNodes[1].offsetWidth+15 + "px";
        this.__hideMenu();
    },
    
    __enumUpdateCommandUI : function(menuItem)
    {
        var topMenu = menuItem._menu;
        while(topMenu._parent)
        {
            topMenu = topMenu._parent;
        }
        topMenu.fireEvent("updateCommandUI", {menuItem:menuItem});
        //menuItem.fireEvent("updateCommandUI");
    },
    
    __showMenu : function(x, y, menuItem)
    {
        // 显示所有分隔线
        var node = this._items.get_first(),
            mi;
        while(node)
        {
            mi = node.get_value();
            if(mi._menuType == JueKit.UI.MenuItemType.separator)
            {
                mi.set_visible(true);
            }
            node = node.get_next();
        }
    
        this._items.forEach(this.__enumUpdateCommandUI, this);
        
        // 隐藏连续的，以及首尾分隔线
        var isFirst = true,	// 是否第一个MenuItem
            isSep = false,	// 当前MenuItem是否separator
            sepMi = null;			// 最后一个显示的separator
        node = this._items.get_first();
        while(node)
        {
            mi = node.get_value();
            if(mi._menuType == JueKit.UI.MenuItemType.separator)
            {
                isSep = true;
                if(isFirst || sepMi != null)
                {
                    mi.set_visible(false);
                }
                else
                {
                    sepMi = mi;
                }
            }
            else if(mi.get_visible())
            {
                sepMi = null;
                isSep = false;
                isFirst = false;
            }
            node = node.get_next();
        }
        
        if(sepMi)
        {
            sepMi.set_visible(false);
        }
        
        

        JueKit.Dom.show(this._el);
        
        var w = this._el.offsetWidth;
        if((this._style & JueKit.UI.MenuStyle.trackLeft)
            || x + w > JueKit.Dom.getClientWidth())
        {
            x -= w;
            if(menuItem)
            {
                x -= JueKit.Dom.getRect(menuItem._el).width;
            }
        }
        if(x < 0)
        {
            x = 0;
        }
        
        var h = this._el.offsetHeight;
        if((this._style & JueKit.UI.MenuStyle.trackTop)
            || y + h > JueKit.Dom.getClientHeight())
        {
            y -= h;
        }
        if(y < 0)
        {
            y = 0;
        }
        JueKit.Dom.setPosition(this._el, x, y);
        
        if(this._showMask && JueKit.Browser.isIE)
        {
            JueKit.UI.Menu.showMask(JueKit.Dom.getRect(this._el));
        }
    },

    __hideMenu : function()
    {
        JueKit.Dom.hide(this._el);
        JueKit.UI.Menu.hideMask();
    },

    trackPopupMenu : function(x, y, menuItem)
    {
        if(!menuItem)
        {
            JueKit.UI.Common.set_curPopupMenu(this);
        }
        
        x = x || 0;
        y = y || 0;
        
        var topMenu = this;
        while(topMenu._parent)
        {
            topMenu = topMenu._parent;
        }
        this.fireEvent("beforeTrackMenu");
        
        this.__showMenu(x, y, menuItem);
    },
    
    endTrackPopupMenu : function()
    {
        this.__hideCurSubMenu();
        JueKit.Dom.hide(this._el);
        JueKit.UI.Menu.hideMask();
    },

    __getMenuItemByEl : function(el)
    {
        var elMenuItem;
        while(el && el != this._elInner)
        {
            elMenuItem = el;
            el = el.parentNode;
        }
        
        var index = JueKit.Dom.getElIndex(elMenuItem);
        
        return this._items.getAt(index).get_value();
    },
    
    __hEl_Mousedown : function(evt)
    {
        this._mouseDown = true;
        JueKit.Event.stop(evt);
    },
    
    __hEl_Mouseup : function(evt)
    {
        if(!this._mouseDown)
        {
            return;
        }
        this._mouseDown = false;
        
        var el = JueKit.Event.srcEl(evt);
        
        var menuItem = this.__getMenuItemByEl(el);
        if(menuItem._menuType == JueKit.UI.MenuItemType.string
            && !menuItem.get_disabled() && !menuItem._subMenu)
        {
            var topMenu = menuItem._menu;
            while(topMenu._parent)
            {
                topMenu = topMenu._parent;
            }
        
            topMenu.__hideCurSubMenu();
            topMenu.__hideMenu();
        
            topMenu.fireEvent("command", {
                cmdId : menuItem.get_cmdId(),
                cmdData : menuItem.get_cmdData(),
                menuItem : menuItem
            });
        }
    },
    
    __hEl_Mousemove : function(evt)
    {
    },
    
    getMenuItem : function(index)
    {
        return this._items.getAt(index).get_value();
    },
    
    removeMenuItemByIndex : function(index)
    {
        var menuItem = this.getMenuItem(index);
        this.removeMenuItem(menuItem);
    },
    
    removeMenuItem : function(menuItem)
    {
        if(!menuItem)
        {
            return;
        }
        
        JueKit.Dom.removeEl(menuItem.getEl());
        this._items.remove(menuItem);
    },
    
    appendMenuItem : function(objData)
    {
        if(objData)
        {
            objData.container = this._elInner;
            objData.menu = this;
            var menuItem = new JueKit.UI.MenuItem(objData);
            this._items.addLast(menuItem);
            
            return menuItem;
        }
    },
    
    insertMenuItem : function(objData)
    {
        if(objData)
        {
            objData.menu = this;
            var menuItem = new JueKit.UI.MenuItem(objData);
            this._items.addBefore(menuItem, this._items.find(objData.destMenuItem));
            objData.destMenuItem.getEl().parentNode.insertBefore(menuItem.getEl(), objData.destMenuItem.getEl());
            return menuItem;
        }
    },
    
    __enumFindMenuItem : function(menuItem, cmdId)
    {
        if(menuItem._cmdId == cmdId)
        {
            return true;
        }
        return false;
    },

    findMenuItem : function(cmdId)
    {
        return this._items.find(cmdId, this.__enumFindMenuItem, this).get_value();
    },
    
    get_style : function()
    {
        return this._style;
    },
    
    set_style : function(value)
    {
        this._style = value;
    },
    
    __setCurMenuItem : function(menuItem)
    {
        if(this._trackSubMenuTimeout)
        {
            clearTimeout(this._trackSubMenuTimeout);
        }
        
        if(!menuItem)
        {
            return;
        }
    
        this._curMenuItem = menuItem;

        var oThis = this;
        this._trackSubMenuTimeout = setTimeout(function(){
                oThis.__trackSubMenu(menuItem);
            }, 500);
    },
    
    __hideCurSubMenu : function()
    {
        if(this._curSubMenu)
        {
            this._curSubMenu.__hideCurSubMenu();
            this._curSubMenu.__hideMenu();
        }
    },
    
    __trackSubMenu : function(menuItem)
    {
        this.__hideCurSubMenu();
        if(menuItem._subMenu)
        {
            menuItem.trackSubMenu();
            this._curSubMenu = menuItem._subMenu;
        }
    }
});


JueKit.UI.Menu.showMask = function(rect)
{
    var mask = this._mask;
    if(!mask)
    {
        var p = "absolute";
        this._mask = mask = JueKit.Dom.createEl("iframe");
        document.body.appendChild(mask);

        JueKit.Dom.setStyles(mask, {
                position : p,
                top : "0",
                left : "0",
                zIndex : 3000
            });
    }

    JueKit.Dom.setStyles(mask, {
            top : rect.top,
            left : rect.left,
            width : rect.width,
            height : rect.height
        });
    JueKit.Dom.show(mask);
};

JueKit.UI.Menu.hideMask = function()
{
    var mask = this._mask;
    if(mask)
    {
        JueKit.Dom.hide(mask);
    }
};
