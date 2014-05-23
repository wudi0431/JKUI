JueKit.Type.registerNamespace("JueKit.UI");
JueKit.Type.registerNamespace("JueKit.UI.Common");

JueKit.UI.Direction = 
{
    none : 0,

    horizon : 1,
    
    vertical : 2,
    
    both : 3
},

JueKit.UI.State =
{
    hidden : 0,
    visible :			1 << 0,	// 1
    minimum :			1 << 1,	// 2
    maximum :			1 << 2,	// 4
    modal :				1 << 3,	// 8
    closed :			1 << 4,	// 16
    viewChanged :		1 << 5,	// 32
    waitingLayout :		1 << 6,	// 64
    layouting :			1 << 7,	// 64

    updatingCtlData :	1 << 10,
    updatingData :		1 << 11
};

JueKit.UI.Common =
{
    get_activeControl : function()
    {
        return JueKit.UI.Common._activeControl;
    },
    
    set_activeControl : function(value)
    {
        JueKit.UI.Common._activeControl = value;
    },
    
    get_mouseButton : function()
    {
        return this._mouseButton;
    },
    
    
    __init : function()
    {
        JueKit.Event.addHandler(document.body, "mousedown", this.__hBody_Mousedown, this);
        JueKit.Event.addHandler(document.body, "mouseup", this.__hBody_Mouseup, this);
        if(JueKit.Browser.isFirefox)
        {
            document.body.oncontextmenu = JueKit.fReturnFalse;
        }
    },

    __hBody_Mousedown : function(evt)
    {
        this._mouseButton = JueKit.Event.button(evt);
        if(this._curPopupMenu)
        {
            this._curPopupMenu.endTrackPopupMenu();
        }
        if(this._activeDataGrid && this._activeDataGrid._canEndEdit)
        {
            this._activeDataGrid.endEdit();
            this._canEndEdit = false;
        }
    },
    
    __hBody_Mouseup : function()
    {
        this._mouseButton = 0;
    },
    
    set_curPopupMenu : function(value)
    {
        this._curPopupMenu = value;
    }
};

JueKit.Event.addHandler(window, "load", JueKit.UI.Common.__init, JueKit.UI.Common);
