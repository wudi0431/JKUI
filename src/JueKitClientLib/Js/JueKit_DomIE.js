/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.DomIE
JueKit.DomIE =
{
    // 获取浏览器可见区域的宽度
    getClientWidth : function(wnd)
    {
        if(!wnd)
        {
            wnd = window;
        }
        return wnd.document.documentElement.clientWidth;
    },
    
    // 获取浏览器可见区域的高度
    getClientHeight : function(wnd)
    {
        if(!wnd)
        {
            wnd = window;
        }
        return wnd.document.documentElement.clientHeight;
    },

    // 获取DOM元素的位置
    // @param el {Element} DOM 元素
    // @param clientAbs {Boolean} 是否绝对位置
    getPosition: function (el, clientAbs)
    {
        el = JueKit(el);

        if(el.parentNode === null || this.getStyle(el, 'display') == 'none')
  		{
            return false;
        }

        var box = el.getBoundingClientRect(),
            l = box.left - 2,
            t = box.top - 2;
        // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        if(!clientAbs)
        {
            var de = document.documentElement;
            l += de.scrollLeft;
            t += de.scrollTop;
        }
        
        return {left:l, top:t};
    },

    // 获取DOM元素某个样式的值
    // @param el {Element} DOM 元素
    // @param styleName {String} 样式名
    getStyle: function (el, styleName)
    {
        el = JueKit(el);
        
        if(styleName == "opacity")
        {
            return this.getOpacity(el);
        }
        else
        {
            return el.currentStyle[styleName];
        }
    },

    // 获取DOM元素某个样式的值
    // @param el {Element} DOM 元素
    // @param styleName {String} 样式名
    setStyle: function (el, styleName, value)
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
    
    getOpacity : function(el)
    {
        el = JueKit(el);

        var filter;
        if(el.filters.length == 0)
        {
            return 1;
        }
        if(el.filters.item('alpha'))
        {
            filter = el.filters.item('alpha');
        }
        else if(el.filters.item('DXImageTransform.Microsoft.Alpha'))
        {
            filter = el.filters.item('DXImageTransform.Microsoft.Alpha');
        }
        else
        {
            return 1;
        }
        return filter.opacity / 100;
    },
    
    setOpacity : function(el, value)
    {
        el = JueKit(el);

        el.style.filter = 'alpha(opacity=' + value * 100 + ')';
        if (!el.currentStyle.hasLayout)
        {
            el.style.zoom = 1;
        }
    },
    
    setRotation : function(el, value)
    {
        el = JueKit(el);

        el.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + value + ');';
        if (!el.currentStyle.hasLayout)
        {
            el.style.zoom = 1;
        }
    }
};
