/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.EventIE
JueKit.EventIE =
{
    srcEl : function(evt)
    {
        return evt.srcElement;
    },
    
    button : function(evt)
    {
        if(evt.button == 1)
        {
            return 1;
        }
        if(evt.button == 2)
        {
            return 3;
        }
        if(evt.button == 4)
        {
            return 2;
        }
        return 0;
    },
    
    isLeftButton : function(evt)
    {
        return evt.button == 1;
    },
    
    isRightButton : function(evt)
    {
        return evt.button == 2;
    },
    
    pointerX : function(evt)
    {
        return evt.clientX + document.documentElement.scrollLeft;
    },
    
    pointerY : function(evt)
    {
        return evt.clientY + document.documentElement.scrollTop;
    },
    
    stop : function(evt)
    {
        evt.returnValue = false;
        evt.cancelBubble = true;
    },
    
    __addHandler : function(el, evtName, handler)
    {
        return el.attachEvent('on'+evtName, handler);
    },
    
    __removeHandler : function(el, evtName, handler)
    {
        return el.detachEvent('on'+evtName, handler);
    }
};
