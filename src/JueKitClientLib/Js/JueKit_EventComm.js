/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.DomEventHandlerItem
JueKit.DomEventHandlerItem = function(el, evtName, handler, scope, option)
{
    this._el = el;
    this._evtName = evtName;
    this._handler = handler;
    this._scope = scope;
    this._closureHandler = function(){return handler.call(scope, arguments[0], option);};
};

// JueKit.EventComm
JueKit.EventComm =
{	
    addHandler : function(el, evtName, handler, scope, option)
    {
        if(!handler)
        {
            throw new Error("参数 handler 不能为空。");
        }

        if(!scope)
        {
            scope = window;
        }

        el = JueKit(el);
        var hi;

        if(evtName == 'load' && (!el || el == window) && scope != this)
        {
            hi = new JueKit.DomEventHandlerItem(el, evtName, handler, scope, option);
            this._loadHis.addLast(hi);
            return true;
        }
        if(evtName == 'unload' && (!el || el == window) && scope != this)
        {
            hi = new JueKit.DomEventHandlerItem(el, evtName, handler, scope, option);
            this._unloadHis.addLast(hi);
            return true;
        }
        
        if(!el)
        {
            return false;
        }
        
        /*
        if(evtName == 'contextmenu' && scope != this)
        {
            hi = new JueKit.DomEventHandlerItem(el, evtName, handler, scope, option);
            this._contextMenuHis.addLast(hi);
            return true;
        }
        */
        hi = new JueKit.DomEventHandlerItem(el, evtName, handler, scope, option);
        this._his.addLast(hi);
        return this.__addHandler(el, evtName, hi._closureHandler);
    },
    
    removeHandler : function(el, evtName, handler, scope)
    {
        if(!scope)
        {
            scope = window;
        }

        el = JueKit(el);
        
        if(!el)
        {
            return false;
        }
        
        var node, hi;
        node = this._his.tryUntil(
                function(eventHandler)
                {
                    return (eventHandler._el == el
                        && eventHandler._evtName == evtName
                        && eventHandler._handler == handler
                        && (eventHandler._scope == scope)
                        );
                }
            );

        if(!node)
        {
            return;
        }
        hi = node.get_value();
        
        var returnValue = this.__removeHandler(el, evtName, hi._closureHandler);

        this._his.remove(node);
        
        delete hi._handler;
        delete hi._closureHandler;
        return returnValue;
    },
    
    __hWindow_onLoad : function()
    {
        this.__fireEventHandlerList(this._loadHis);
    },
    
    __hWindow_onUnload : function()
    {
        this.__fireEventHandlerList(this._unloadHis);
        this._his.forEach(
                function(hi)
                {				
                    this.__removeHandler(hi._el, hi._evtName, hi._closureHandler);
                    
                    delete hi._handler;
                    delete hi._closureHandler;
                    delete hi;
                }, this
            );
            
        this._his.clear();
    },
    
    __hBody_ContextMenu : function(evt)
    {
        if(evt._jueStop)
        {
            JueKit.Event.stop(evt);
            return;	
        }
    },
    
    __fireEventHandlerList : function(eventHandlerList)
    {
        eventHandlerList.forEach(
                function(hi)
                {
                    hi._closureHandler();
                    delete hi._handler;
                    delete hi._closureHandler;
                    delete hi;
                }
            );
        eventHandlerList.clear();
    },
    
    keyCode : function(evt)
    {
        return evt.keyCode;
    },
    
    ctrlKey : function(evt)
    {
        return evt.ctrlKey;
    }
};

JueKit.VK = 
{
    VK_LBUTTON : 0x01,		// Left mouse button
    VK_RBUTTON : 0x02,		// Right mouse button
    VK_CANCEL : 0x03,		// Control-break processing
    VK_MBUTTON : 0x04,		// Middle mouse button (three-button mouse)
    VK_XBUTTON1 : 0x05,		// Windows 2000/XP: X1 mouse button
    VK_XBUTTON2 : 0x06,		// Windows 2000/XP: X2 mouse button
    VK_BACK : 0x07,			// BACKSPACE key
    VK_BACKSPACE : 0x08,	// BACKSPACE key
    VK_TAB : 0x09,			// TAB key
    VK_CLEAR : 0x0C,		// CLEAR key
    VK_RETURN : 0x0D,		// ENTER key
    VK_SHIFT : 0x10,		// SHIFT key
    VK_CONTROL : 0x11,		// CTRL key
    VK_MENU : 0x12,			// ALT key
    VK_PAUSE : 0x13,		// PAUSE key
    VK_CAPITAL : 0x14,		// CAPS LOCK key
    VK_ESCAPE : 0x1B,		// ESC key
    VK_CONVERT : 0x1C,		// IME convert
    VK_NONCONVERT : 0x1D,		// IME nonconvert
    VK_ACCEPT : 0x1E,		// IME accept
    VK_MODECHANGE : 0x1F,	// IME mode change request
    VK_SPACE : 0x20,		// SPACEBAR
    VK_PRIOR : 0x21,		// PAGE UP key
    VK_NEXT :0x22,			// PAGE DOWN key
    VK_END : 0x23,			// END key
    VK_HOME : 0x24,			// HOME key
    VK_LEFT : 0x25,			// LEFT ARROW key
    VK_UP : 0x26,			// UP ARROW key
    VK_RIGHT : 0x27,		// RIGHT ARROW key
    VK_DOWN : 0x28,			// DOWN ARROW key
    VK_PAUSE : 0x13,		// PAUSE key
    VK_SELECT : 0x2F,		// SELECT key
    VK_SNAPSHOT : 0x2C,		// PRINT SCREEN key
    VK_INSERT : 0x2D,		// INS key
    VK_DELETE : 0x2E,		// DEL key
    VK_HELP : 0x2F,			// HELP key
    VK_0 : 0x30,			// 0
    VK_1 : 0x31,			// 1
    VK_2 : 0x32,			// 2
    VK_3 : 0x33,			// 3
    VK_4 : 0x34,			// 4
    VK_5 : 0x35,			// 5
    VK_6 : 0x36,			// 6
    VK_7 : 0x37,			// 7
    VK_8 : 0x38,			// 8
    VK_9 : 0x39,			// 9
    VK_A : 0x41,			// A
    VK_B : 0x42,			// B
    VK_C : 0x43,			// C
    VK_D : 0x44,			// D
    VK_E : 0x45,			// E
    VK_F : 0x46,			// F
    VK_G : 0x47,			// G
    VK_H : 0x48,			// H
    VK_I : 0x49,			// I
    VK_J : 0x4A,			// J
    VK_K : 0x4B,			// K
    VK_L : 0x4C,			// L
    VK_M : 0x4D,			// M
    VK_N : 0x4E,			// N
    VK_O : 0x4F,			// O
    VK_P : 0x50,			// P
    VK_Q : 0x51,			// Q
    VK_R : 0x52,			// R
    VK_S : 0x53,			// S
    VK_T : 0x54,			// T
    VK_U : 0x55,			// U
    VK_V : 0x56,			// V
    VK_W : 0x57,			// W
    VK_X : 0x58,			// X
    VK_Y : 0x59,			// Y
    VK_Z : 0x5A,			// Z
    
    VK_LWIN : 0x5B,			// Left Windows key (Microsoft? Natural? keyboard)
    VK_RWIN : 0x5C,			// Right Windows key (Natural keyboard)
    VK_APPS : 0x5D,			// Applications key (Natural keyboard)
    VK_SLEEP : 0x5F,		// Computer Sleep key
    
    VK_NUMPAD0 : 0x60,		// Numeric keypad 0 key
    VK_NUMPAD1 : 0x61,		// Numeric keypad 1 key
    VK_NUMPAD2 : 0x62,		// Numeric keypad 2 key
    VK_NUMPAD3 : 0x63,		// Numeric keypad 3 key
    VK_NUMPAD4 : 0x64,		// Numeric keypad 4 key
    VK_NUMPAD5 : 0x65,		// Numeric keypad 5 key
    VK_NUMPAD6 : 0x66,		// Numeric keypad 6 key
    VK_NUMPAD7 : 0x67,		// Numeric keypad 7 key
    VK_NUMPAD8 : 0x68,		// Numeric keypad 8 key
    VK_NUMPAD9 : 0x69,		// Numeric keypad 9 key
    
    VK_MULTIPLY : 0x6A,		// Multiply key
    VK_ADD : 0x6B,			// Add key
    VK_SEPARATOR : 0x6C,	// Separator key
    VK_SUBTRACT : 0x6D,		// Subtract key
    VK_DECIMAL : 0x6E,		// Decimal key
    VK_DIVIDE : 0x6F,		// Divide key
    
    VK_F1 : 0x70,			// F1 key
    VK_F2 : 0x71,			// F2 key
    VK_F3 : 0x72,			// F3 key
    VK_F4 : 0x73,			// F4 key
    VK_F5 : 0x74,			// F5 key
    VK_F6 : 0x75,			// F6 key
    VK_F7 : 0x76,			// F7 key
    VK_F8 : 0x77,			// F8 key
    VK_F9 : 0x78,			// F9 key
    VK_F10 : 0x79,			// F10 key
    VK_F11 : 0x7A,			// F11 key
    VK_F12 : 0x7B,			// F12 key
    
    VK_NUMLOCK : 0x90		// NUM LOCK key
};
