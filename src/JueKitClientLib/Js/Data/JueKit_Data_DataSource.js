/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Data.DataSource
JueKit.Type.registerNamespace("JueKit.Data");

// 更新视图类型
JueKit.Data.UpdateViewType = 
{
    dataChanged :	1,		// 数据更新
    colChanged :	2,		// 列值已更改
    rowDeleted :	4,		// 行已被删除
    rowAdded :		8,		// 添加新行
    rowRestored :	16,		// 行已被还原
    rowChanged :	32,		// 当前行改变
    propChanged :	64		// 属性改变
};

JueKit.Data.DataSource = JueKit.Type.createClass("JueKit.Data.DataSource", JueKit.CustomEventControl,
{
    // 指示是否可以更新
    _canUpdate : true,
    
    // 指示是否可以删除
    _canDelete : true,
    
    // 指示是否可以新增
    _canAdd : true,
    
    ctor : function()
    {
        this._views = new JueKit.Collection.LinkedList();
    },
    
    // 绑定一个视图到数据源
    // 用户不应该直接调用这个方法，而应该使用view.bindDataSource(dataSource)方法。
    bindView : function(view)
    {
        if(view)
        {
            this._views.addLast(view);
            this.updateView(view, JueKit.Data.UpdateViewType.dataChanged);
        }
    },
    
    // 将一个视图和数据源解除绑定
    // 用户不应该调用此方法，而应该使用view.bindDataSource()方法。
    unbindView : function(view)
    {
        this._views.remove(view);
    },
    
/*
    // 分发消息给所有的视图
    __dispatchMsg : function(updateViewType, args)
    {
        var node = this._views.get_first();
        while(node)
        {
            this.__invokeMsg(node.get_value(), updateViewType, args);
            node = node.get_next();
        }
    },
    
    // 给指定视图发送消息
    __invokeMsg : function(view, updateViewType, args)
    {
        if(view && view["onDataSource" + updateViewType])
        {
            view["onDataSource" + updateViewType](this, args);
        }
    },
*/
    
    // 更新所有视图
    updateAllViews : function(updateViewType, args)
    {
        var node = this._views.get_first();
        while(node)
        {
            this.updateView(node.get_value(), updateViewType, args);
            node = node.get_next();
        }
    },
    
    updateView : function(view, updateViewType, args)
    {
        if(!view)
        {
            return;
        }
        
        if(!updateViewType)
        {
            updateViewType = JueKit.Data.UpdateViewType.dataChanged;
        }
        
        // 如果View重写了canUpdateView函数，
        // 则调用以询问是否可以更新
        if(view.canUpdateView && !view.canUpdateView(this, updateViewType, args))
        {
            return;
        }
        
        // 在开始更新视图前通知视图
        // 视图可以在这个函数中做一些准备工作，比如清空原有数据
        view.beginUpdateView && view.beginUpdateView(this, updateViewType, args);

        view.updateView && view.updateView(this, updateViewType, args);
        //this.onUpdateView(view);
        
        // 在更新视图结束后通知视图
        view.endUpdateView && view.endUpdateView(this, updateViewType, args);
    },
    
    get_canUpdate : function()
    {
        return this._canUpdate;
    },
    
    set_canUpdate : function(value)
    {
        if(this._canUpdate == value)
        {
            return;
        }
        
        this._canUpdate = value;
        this.__dispatchMsg("PropertyChanged");
    },
    
    get_canDelete : function()
    {
        return this._canDelete;
    },
    
    set_canDelete : function(value)
    {
        if(this._canDelete == value)
        {
            return;
        }
        
        this._canDelete = value;
        this.__dispatchMsg("PropertyChanged");
    },
    
    get_canAdd : function()
    {
        return this._canAdd;
    },
    
    set_canAdd : function(value)
    {
        if(this._canAdd == value)
        {
            return;
        }
        
        this._canAdd = value;
        this.__dispatchMsg("PropertyChanged");
    }
});

