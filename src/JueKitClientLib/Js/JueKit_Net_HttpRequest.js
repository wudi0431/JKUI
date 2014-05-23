/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Net.HttpRequest
JueKit.Type.registerNamespace("JueKit.Net");

JueKit.Net.HttpRequest = JueKit.Type.createClass("JueKit.Net.HttpRequest", null,
{
    //_eventHandlerList : null,

    get_url : function()
    {
        return this._url;
    },
    
    set_url : function(value)
    {
        this._url = value;
    },
    
    get_method : function()
    {
        return this._method;
    },
    
    set_method : function(value)
    {
        this._method = value;
    },
    
    get_async : function()
    {
        return this._async;
    },
    
    set_async : function(value)
    {
        this._async = value;
    },
    
    ctor : function(url, method, async)
    {
        this._url = url;
        
        if(!method)
        {
            method = "GET";
        }
        this._method = method;
        
        if(!async)
        {
            async = true;
        }
        this._async = async;
        
        this._xhr = JueKit.Net.HttpRequest.__createXhr();
        
        this._eventHandlerList = new JueKit.EventHandlerList();
        
        this._headers = {};
        this._content = [];
    },
    
    __hReadyStateChange : function()
    {
        var xhr = this._xhr;
        
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {
                this._eventHandlerList.fire("success", xhr.responseText);
            }
            else
            {
                this._eventHandlerList.fire("failed", xhr.responseText, xhr._status);
            }
            JueKit.Net.HttpRequest.release(this);
        }
    },
    
    add_success : function(handler, scope)
    {
        this._eventHandlerList.add("success", handler, scope);
    },
    
    remove_success : function(handler, scope)
    {
        this._eventHandlerList.remove("success", handler, scope);
    },
    
    add_failed : function(handler, scope)
    {
        this._eventHandlerList.add("failed", handler, scope);
    },
    
    remove_failed : function(handler, scope)
    {
        this._eventHandlerList.remove("failed", handler, scope);
    },
    
    setHeader : function(name, value)
    {
        this._headers[name] = value;
    },
    
    addContent : function(name, value)
    {
        this._content[this._content.length] = {name:name, value:value};
    },
    
    clearContent : function()
    {
        this._content.length = 0;
    },
    
    send : function(data)
    {
        var xhr = this._xhr;
        if(JueKit.Browser.isIE)
        {
            this._url += (this._url.indexOf("?") < 0 ? "?" : "&") + "_hrc_=" + JueKit.Net.HttpRequest._hrc++;
        }
        xhr.open(this._method, this._url, this._async, this._userName, this._password);
        
        for(var hk in this._headers)
        {
            xhr.setRequestHeader(hk, this._headers[hk]);
        }
        
        if(this._async)
        {
            var oThis = this;
            xhr.onreadystatechange = function(){oThis.__hReadyStateChange();};
        }
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        
        if(this._method == "POST")
        {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var content = this._content;
            if(data)
            {
                xhr.send(data.toString());
            }
            else if(content.length > 0)
            {
                var sb = new JueKit.Text.StringBuilder();
                var ci;	// contentItem
                for(var i=0; i<content.length; i++)
                {
                    ci = content[i];
                    sb.append(encodeURIComponent(ci.name) + '=' + encodeURIComponent(ci.value) + '&');
                }
                xhr.send(sb.toString());
            }
            else
            {
                xhr.send("");
            }
        }
        else
        {
            xhr.send("");
        }
        
        return xhr;
    },
    
    get : function(url, async)
    {
        this.set_url(url);
        this.set_async(async);
        this.set_method("GET");
        this.send();
    },
    
    post : function(url, async, data)
    {
        this.set_url(url);
        this.set_async(async);
        this.set_method("POST");
        this.send(data);
    }
});


// JueKit.Net.HttpRequestPool
JueKit.Net.HttpRequestPool = JueKit.Type.createClass("JueKit.UI.HttpRequestPool", JueKit.Pool,
{
    createEntry : function()
    {
        var o = new JueKit.Net.HttpRequest();
        return o;
    },
    
    initEntry : function(entry)
    {
    },
    
    cleanEntry : function(entry)
    {
        entry._eventHandlerList.clear("success");
        entry._eventHandlerList.clear("failed");
        entry.clearContent();
        entry._headers = {};
    },
    
    destroyEntry : function(entry)
    {
    }
});


JueKit.Type.extend(JueKit.Net.HttpRequest,
{
    _hrc : 0,
    _pool : new JueKit.Net.HttpRequestPool(),
    
    gain : function(options)
    {
        return this._pool.gain();
    },
    
    release : function(xhr)
    {
        this._pool.release(xhr);
    },
    
    __initClass : function()
    {
        if(window.XMLHttpRequest)
        {
            this.__createXhr = function()
            {
                return new XMLHttpRequest();
            };
        }
        else
        {
            this.__createXhr = function()
            {
                return new ActiveXObject('MSXML2.XmlHttp');
            };
        }
        delete this.__initClass;
    },
    
    get : function(url, async, cbSuccess, oScopeSuccess, cbFailed, oScopeFailed)
    {
        var hr = this.gain();
        cbSuccess && hr.add_success(cbSuccess, oScopeSuccess);
        cbFail && hr.add_failed(cbFailed, oScopeFailed);
        hr.get(url, async);
    },

    post: function(url, async, args, cbSuccess, oScopeSuccess, cbFailed, oScopeFailed)
    {
        var hr = this.gain();
        cbSuccess && hr.add_success(cbSuccess, oScopeSuccess);
        cbFailed && hr.add_failed(cbFailed, oScopeFailed);
        if (args) {
            for (var key in args) {
                hr.addContent(key, args[key]);
            }
        }
        hr.post(url, async);
    }
});

JueKit.Net.HttpRequest.__initClass();


