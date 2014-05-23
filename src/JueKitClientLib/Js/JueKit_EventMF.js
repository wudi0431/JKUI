/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.EventMF
JueKit.EventMF =
{
    srcEl : function(evt)
    {
        return evt.target;
    },
    
    button : function(evt)
    {
        return evt.which;
    },
    
    isLeftButton : function(evt)
    {
        return evt.which == 1;
    },
    
    isRightButton : function(evt)
    {
        return evt.which == 3;
    },
    
    pointerX : function(evt)
    {
        return evt.pageX;
    },
    
    pointerY : function(evt)
    {
        return evt.pageY;
    },
    
    stop : function(evt)
    {
        evt.preventDefault();
        evt.stopPropagation();
    },
    
    __addHandler : function(el, evtName, handler)
    {
        return el.addEventListener(evtName, handler, false);
    },
    
    __removeHandler : function(el, evtName, handler)
    {
        return el.removeEventListener(evtName, handler, false);
    }
};
