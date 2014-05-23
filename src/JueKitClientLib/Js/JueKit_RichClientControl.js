/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.RichClientControl
JueKit.Type.registerNamespace("JueKit");

JueKit.RichClientControl = JueKit.Type.createClass("JueKit.RichClientControl", JueKit.CustomEventControl,
{
    //_eventHandlerList : null,
    _layoutSuspendedCount : 0,
    ctor : function(objData)
    {
        // 初始化控件

        // 初始化控件属性
        this.onInitProperty(objData);

        // 绑定控件的事件处理函数
        this.bindEventHandlers(objData.ehl);	//objData.eventHandlerList

        // 初始化控件
        this.__initControl(objData);
        
        if(this.onInit)
        {
            this.onInit(objData);
        }

        // 创建子控件集合
        this.__createChildControls(objData.controls);

        // 当控件初始化完成后触发
        this.onLoad(objData);

        // 激活控件的Load事件
        this.fireEvent("load");
        
        //JueKit.RichClientControl._base.ctor.call(this);
    },
    
    onInitProperty : function(objData)
    {
        // 对应服务器控件 ClientId
        this._id = objData.id;
        
        // 对应服务器控件 UniqueId
        this._uid = objData.uid;
        
        // 是否自动回传以触发服务器事件
        this._autoPostBack = objData.autoPostBack;
        
        // 在JueKit体系中，每一个RichClientControl都是包含在一个RichClientPanel中的。
        // 这个属性在父控件创建子控件之前传递给子控件的objData。
        this._richClientPanel = objData.richClientPanel;
        if(this._richClientPanel && (typeof this._id == "string"))
        {
            this._richClientPanel._richClientControls[this._id] = this;
        }
        
        // 表示一个控件的父级控件
        // 同richClientPanel属性一样，由父控件在创建子控件前负责传递。
        this._parent = objData.parent;
    },

    __createChildControls : function(arrObjData)
    {
        /// <summary>创建一个控件的所有子控件</summary>
        /// <param name="arrObjData" type="Array" mayBeNull="true">包含需要创建的所有子控件信息的数组</param>

        // 如果arrObjData为空，或数组长度为0，则表示无需创建子控件。
        if(!arrObjData || arrObjData.length == 0)
        {
            return;
        }

        // 获取子控件集合，此时集合应该是空的。
        var controls = this.get_controls();
        var control;
        var objData;
        
        // 对arrObjData数据中的每一个objData，创建控件
        for(var i=0; i<arrObjData.length; i++)
        {
            objData = arrObjData[i];
            
            // 初始化richClientPanel和parent属性，这些属性是形成控件树所必须的。
            objData.richClientPanel = this._richClientPanel;
            objData.parent = this;
            
            // 在真正创建控件前给父控件提供一个接口，使其可以做一些自定义的操作。
            // 注：
            // 这个函数其实应该是私有的，但是由于扩展控件可能会定义并继承这个函数，
            // 如果设置为私有函数，在混淆后函数名不可知，因此设置为公共函数。
            if(this.preCreateChildControl)
            {
                this.preCreateChildControl(objData);
            }
            
            // 创建子控件
            // JueKit.Type.createObject函数会根据objData中的信息来创建相应的RichClientControl对象
            // （当然会调用相应对象的构造函数，）
            control = JueKit.Type.createObject(objData);
            
            // 当创建控件失败时继续创建其它控件。
            if(!control)
            {
                continue;
            }
            
            controls.addLast(control);
            
            // 当子控件已经创建完成，并且添加到父控件的控件集合中之后调用。
            if(this.addedChildControl)
            {
                this.addedChildControl(control);
            }
        }
    },

    bindEventHandlers : function(eventHandlerList)
    {
        if(!eventHandlerList)
        {
            return;
        }

        var eventHandler;
        for(eventName in eventHandlerList)
        {
            eventHandler = eventHandlerList[eventName];
            this.addHandler(eventName, eventHandler.handler, eventHandler.scope);
        }
    },

    get_controls : function()
    {
        if(!this._controls)
        {
            this._controls = new JueKit.Collection.LinkedList();
            this.get_controls = function()
            {
                return this._controls;
            };
        }
        return this._controls;
    },
    
    get_parent : function()
    {
        return this._parent;
    },
    
    get_richClientPanel : function()
    {
        return this._richClientPanel;
    },
    
    __initControl : function(objData)
    {
    },

    onLoad : function(objData)
    {
    },

    postBack : function(eventName, args, cbSuccess, oScopeS, cbFailed, oScopeF)
    {
        if(!this._richClientPanel)
        {
            return;
        }
        
        var hr = JueKit.Net.HttpRequest.gain();
        var updateUrl = this._richClientPanel._updateUrl;
        if(!updateUrl)
        {
            updateUrl = location.href.replace(location.hash, "");
        }
        hr.set_url(updateUrl);
        hr.set_method("POST");
//		hr.setHeader("jueAction", "postBack");
//		hr.setHeader("jueUid", this._uid);
//		hr.setHeader("jueEvt", eventName);

        hr.addContent("jueAction", "postBack");
        hr.addContent("jueUid", this._uid);
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
            if(!oScopeS)
            {
                oScopeS = this;
            }
            hr.add_success(cbSuccess, oScopeS);
        }
        if(cbFailed)
        {
            if(!oScopeF)
            {
                oScopeF = this;
            }
            hr.add_failed(cbFailed, oScopeF);
        }
        
        hr.send();
    },
    
    findControl : function(id)
    {
        return this._richClientPanel._richClientControls[id];
    },
    
    trace : function()
    {
        if(arguments.length > 0)
        {
            arguments[0] = this.id + arguments[0];
        }
        
        JueKit.trace.apply(JueKit, arguments);
    }

    //preCreateChildControl : function(objData){},
    //addedChildControl : function(control){},
    
    //onInit : function(){},

    // JueKit.IDisposable
    //dispose : null
});
