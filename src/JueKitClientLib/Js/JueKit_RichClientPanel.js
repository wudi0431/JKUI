/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.RichClientPanel
JueKit.Type.registerNamespace("JueKit");

JueKit.RichClientPanel = JueKit.Type.createClass("JueKit.RichClientPanel", JueKit.RichClientControl,
{
    findControl : function(id)
    {
        return this._richClientControls[id];
    },

    ctor : function(objData)
    {
        // Record the unique RichClientPanel
        JueKit.theRcp = this;
        
        this._layoutSuspendedCount = 0;

        this._richClientControls = {};
        window["_jueCtls"] = this._richClientControls;

        objData.richClientPanel = this;

        // 保存自定义客户端变量值
        this._clientProperties = objData.clientProperties;

        // 调用基类的构造函数，创建并初始化所有控件
        JueKit.RichClientPanel._base.ctor.apply(this, arguments);

        // 控件创建完毕，调整页面控件布局
        this.performLayout();

        // 监听大小更改事件，更新页面布局
        if(!objData.performLayoutOnce)
        {
            JueKit.Event.addHandler(window, "resize", this.performLayout, this);
        }
    },
    
    onInitProperty : function(objData)
    {
        this._clientLibUrl = objData.clientLibUrl;
        this._updateUrl = objData.updateUrl;
        this._appUrl = objData.appUrl;
        this._clientLanguage = objData.clientLanguage;
        
        JueKit.RichClientPanel._base.onInitProperty.call(this, objData);
    },
    
    get_clientLibUrl : function()
    {
        return this._clientLibUrl;
    },
    
    get_updateUrl : function()
    {
        return this._updateUrl;
    },
    
    get_appUrl : function()
    {
        return this._appUrl;
    },
    
    get_clientLanguage : function()
    {
        return this._clientLanguage;
    },

    doPostBack : function(ctl, eventName, args, cbSuccess, cbFailed)
    {
        var hr = JueKit.Net.HttpRequest.gain();
        var updateUrl = this._updateUrl;
        if(!updateUrl)
        {
            updateUrl = location.href.replace(location.hash, "");
        }
        hr.set_url(updateUrl);
        hr.set_method("POST");
//		hr.setHeader("jueAction", "postBack");
//		hr.setHeader("jueUid", ctl._uid);
//		hr.setHeader("jueEvt", eventName);

        hr.addContent("jueAction", "postBack");
        hr.addContent("jueUid", ctl._uid);
        hr.addContent("jueEvt", eventName);

        if(args)
        {
            for(var key in args)
            {
                hr.addContent(key, args[key]);
            }
        }

        if(cbSuccess)
        {
            hr.add_success(cbSuccess, ctl);
        }
        if(cbFailed)
        {
            hr.add_failed(cbFailed, ctl);
        }
        
        hr.send();
    },
    
    getClientProperty : function(name)
    {
        if(this._clientProperties)
        {
            return this._clientProperties[name];
        }
        return null;
    },
    
    performLayout : function()
    {
        if(this._layoutSuspendedCount > 0)
        {
            return;
        }
        
//		var cw = JueKit.Dom.getClientWidth();
//		var ch = JueKit.Dom.getClientHeight();
//		if(cw == this._lastCW && ch == this._lastCH)
//		{
//			return;
//		}
//		this._lastCW = cw;
//		this._lastCH = ch;

        this._layoutSuspendedCount ++;
        
        var node = this.get_controls().get_first(),
            ctl;
        while(node)
        {
            ctl = node.get_value();
            ctl.performLayout && ctl.performLayout();
            node = node.get_next();
        }
        
        this._layoutSuspendedCount --;
    }
});

