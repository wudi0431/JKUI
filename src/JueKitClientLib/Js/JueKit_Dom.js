/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Dom
JueKit.Dom =
{
    __init : function()
    {
        JueKit.Type.extend(JueKit.Dom, JueKit.DomComm);
        delete JueKit.DomComm;
        if(JueKit.Browser.isIE)
        {
            JueKit.Type.extend(JueKit.Dom, JueKit.DomIE);
            delete JueKit.DomIE;
        }
        else if(JueKit.Browser.isFirefox)
        {
            JueKit.Type.extend(JueKit.Dom, JueKit.DomMF);
            delete JueKit.DomMF;
        }
        else if(JueKit.Browser.isOpera)
        {
            JueKit.Type.extend(JueKit.Dom, JueKit.DomOP);
            delete JueKit.DomOP;
        }
        
        delete this.__init;
    }
};

JueKit.Dom.__init();


JueKit.El = JueKit.Type.createClass("JueKit.El", null,
{
    ctor : function(el, outScope, outName)
    {
        this.el = JueKit(el);
        this.__output(outScope, outName);
    },
    
    __output : function(outScope, outName)
    {
        if(outScope)
        {
            outScope[outName] = this.el;
        }
    },
    
    firstEl : function(outScope, outName)
    {
        
    }
    
    
});

JueKit.El.query = function(el, outScope, outName)
{
    return new JueKit.El(el, outScope, outName);
};

var JueKit2 = JueKit.El.query;
