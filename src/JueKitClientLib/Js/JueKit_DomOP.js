/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.DomOP
JueKit.DomOP =
{
    getClientWidth : function(wnd)
    {
        if(!wnd)
        {
            wnd = window;
        }
        return wnd.document.body.clientWidth;
    },
    
    getClientHeight : function(wnd)
    {
        if(!wnd)
        {
            wnd = window;
        }
        return wnd.document.body.clientHeight;
    },
    
    getPosition : function(el, clientAbs)
    {
        el = JueKit(el);

        if(el.parentNode === null || this.getStyle(el, 'display') == 'none')
  		{
            return false;
        }
        var forElement = el;

        var t = 0, l = 0;

        do {
            t += el.offsetTop  || 0;
            l += el.offsetLeft || 0;

            // Safari fix
            if (el.offsetParent == document.body &&
            this.getStyle(el, "position") == "absolute") break;
        } while (el = el.offsetParent);

        /*
        el = forElement;
        do {
            if (!JueKit.Browser.isOpera || el.tagName == "BODY")
            {
                t -= el.scrollTop  || 0;
                l -= el.scrollLeft || 0;
            }
        } while (el = el.parentNode);
        */
        
        if(clientAbs)
        {
            var de = document.documentElement;
            l -= de.scrollLeft;
            t -= de.scrollTop;
        }
        return {left:l, top:t};
    },
    
    getStyle : function(el, styleName)
    {
        var value = null;
        el = JueKit(el);
        var dv = document.defaultView;
        
        if(styleName == "opacity")
        {
            return this.getOpacity(el);
        }
        else if (el.style[styleName])
        {
            value = el.style[styleName];
        }
        else if ( dv && dv.getComputedStyle )
        {
            // convert camelCase to hyphen-case
            var converted = '';
            for(i = 0, len = styleName.length;i < len; ++i)
            {
                if (styleName.charAt(i) == styleName.charAt(i).toUpperCase())
                {
                    converted = converted + '-' + styleName.charAt(i).toLowerCase();
                }
                else
                {
                    converted = converted + styleName.charAt(i);
                }
            }

            if (dv.getComputedStyle(el, '').getPropertyValue(converted))
            {
                value = dv.getComputedStyle(el, '').getPropertyValue(converted);
            }
        }

        return value;
    },
    
    setStyle : function(el, styleName, value)
    {
        el = JueKit(el);
        
        if(styleName == "opacity")
        {
            this.setOpacity(el, value);
        }
        else
        {
            el.style[styleName] = value;
        }
    },
        
    getOpacity : function(el, value)
    {
        el = JueKit(el);
        return document.defaultView.getComputedStyle(el, "").getPropertyValue("opacity")
    },
    
    setOpacity : function(el, value)
    {
        el = JueKit(el);
        el.style.opacity = value;
        el.style["-moz-opacity"] = value;
        el.style["-khtml-opacity"] = value;
    },
    
    setRotation : function(el, value)
    {
        el = JueKit(el);
        el.style.display = "block";
        el.style.rotate = (value * 90) + "deg";
        el.style["-moz-transform"] = "rotate(" + (value * 90) + "deg)";
        el.style["-webkit-transform"] = "rotate(" + (value * 90) + "deg)";
    }
};


