/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit
function JueKit(el)
{
    /// <summary>获取一个HTML元素</summary>
    /// <param name="el" type="Object">元素的ID</param>
    if(typeof(el) == "string")
    {
        el = document.getElementById(el);
    }
    return el;
}

JueKit.version = "2.0.0.0";

JueKit.scriptFragment = "(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)";

JueKit.fReturnFalse = function()
{
    return false;
};

JueKit.fReturnTrue = function()
{
    return true;
};

JueKit._traces = [];
JueKit.trace = function()
{
    var ts = this._traces;
    ts[ts.length] = JueKit.String.format.apply(JueKit.String, arguments);
};

JueKit.clearTrace = function()
{
    this._traces = [];
};

JueKit.getTrace = function()
{
    var sb = new JueKit.Text.StringBuilder();
    var ts = this._traces;
    var i=ts.length-1;
    while(i>=0)
    {
        sb.appendLine(ts[i]);
    }
    
    return sb.toString();
};
/*
锁屏时 找到最顶层的window。
*/
JueKit.getJueKitTopWnd = function()
{
    var w = window;
    try
    {
        while(w && (w.parent != w) && w.parent.document.body)
        {
            if(w["IsJueKitTopWindow"])
                return w;
            w = w.parent;
        }
    }catch(ex){return w;}
    return top;
};


JueKit.Cookies = 
{
    getValue : function(name)
    {
        return this.__getCookies()[name];
    },
    
    __getCookies : function()
    {
        var cookies = {};
        var s = document.cookie;
        var cs = s.split(';');
        var c, cn, cv;
        for(var i=0; i<cs.length; i++)
        {
            c = cs[i].replace(/(^[\s]*)|([\s]*$)/g, "");
            cn = c.substr(0, c.indexOf('='));
            cv = c.substring(c.indexOf('=') + 1, c.length);
            cookies[cn] = cv;
        }
        
        return cookies;
    }
};


JueKit.checkResult = function(result, showErrorCode)
{
    if(result == null)
    {
        return false;
    }
    
    if((result.result !== undefined && result.result != 0)
        || result.errorMsg)
    {
        if(result.errorMsg)
        {
            JueKit.UI.MessageBox.showMessage({text:result.errorMsg, icon:"error"});
        }
        else if(showErrorCode)
        {
            JueKit.UI.MessageBox.showMessage({text:"Error: " + result.result, icon:"error"});
            return false;
        }
        
        return false;
    }
    
    return true;
};


function JueKitRunFunctionProxy(func, scope, args)
{
    var tempFunc = "return (" + func.toString() + ")()";
    tempFunc = new Function(tempFunc);
    return tempFunc.apply(scope, args || []);
}

