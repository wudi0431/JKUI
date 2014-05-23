/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.RichClientWebControl
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.FillStyle =
{
    none : 0,
    horizon : 1,
    vertical : 2,
    both : 3
};

JueKit.UI.RichClientWebControl = JueKit.Type.createClass("JueKit.UI.RichClientWebControl", JueKit.RichClientControl,
{
    _state : 0,
    
    onInitProperty : function(objData)
    {
        // 根据ID绑定和对象相关的元素
        this._el = JueKit(objData.id);
        
        // 控件的填充方式
        this._fillStyle = objData.fillStyle || 0;
        
        // 如果没有指定宽度，则设置宽度值为-1。
        // 当宽度值为-1时，控件的宽度会被自动调整。高度也是如此。
        this._width = objData.width || -1;
        this._height = objData.height || -1;
        
        // 保留设置给当前控件的CssClass
        if(objData.cssClass)
        {
            this.cssCls = objData.cssClass;
        }
        
        JueKit.UI.RichClientWebControl._base.onInitProperty.call(this, objData);
    },

    bindDomEventHandlers : function(objData)
    {
    },
    
    __initControl : function(objData)
    {
        if(!this._el)
        {
            // 如果没有找到相关的元素，则创建它！
            
            // 在创建前检查ID
            if(!objData.id)
            {
                // 如果没有指定ID，则自动分配一个ID
                objData.id = JueKit.UI.RichClientWebControl.geneId();
                this._id = objData.id;
            }
            
            // 创建控件DOM
            this.createDom(objData);
        }
        // 解析Dom树，保存所需的元素引用
        this.parseDom(objData);

        JueKit.UI.RichClientWebControl._base.__initControl.apply(this, arguments);
        
        this.bindDomEventHandlers();
    },
    
    createDom : function(objData)
    {
        // 将创建完的控件添加到DOM树中。
        
        // 如果指定了容器，则添加到容器中。
        objData.container = JueKit(objData.container);
        if(!objData.container)
        {
            // 否则添加到body中。
            objData.container = document.body;
        }
        objData.container.appendChild(this._el);
    },
    
    parseDom : function()
    {
    },
    
    getEl : function()
    {
        return this._el;
    },
    
    show : function(visible)
    {
        if(visible === undefined || visible)
        {
            // 设置当前状态为可见
            this._state |= JueKit.UI.State.visible;
            
            // 显示元素
            JueKit.Dom.show(this._el);
            
            // 更新视图
            this.__refreshControl();
        }
        else
        {
            // 设置当前状态为不可见
            this._state &= ~JueKit.UI.State.visible;
            
            // 隐藏元素
            JueKit.Dom.hide(this._el);
            
            if(this._state & 8)
            {
                // 如果当前是模态对话框状态
                // 将模态对话框背景计数减1。
                JueKit.UI.Window.__decreaseBg();
            }
        }
    },
    
    __setViewChanged : function()
    {
        if(this._state & JueKit.UI.State.visible)
        {
            // 如果当前控件可见，则刷新显示
            this.__refreshControl();
        }
        else
        {
            // 否则，这是状态为已修改，等待更新
            this._state |= JueKit.UI.State.viewChanged;
        }
    },
    
    // 绑定数据源到控件，或者将控件与现有数据源解除绑定。
    bindDataSource : function(dataSource)
    {
        if(this._dataSource)
        {
            this._dataSource.unbindView(this);
            if(this.onUnbindDataSource)
            {
                this.onUnbindDataSource(dataSource);
            }
        }
        
        if(dataSource)
        {
            this._dataSource = dataSource;
            this._dataSource.bindView(this);
            if(this.onBindDataSource)
            {
                this.onBindDataSource(dataSource);
            }
        }
    },
    
    get_dataSource : function()
    {
        return this._dataSource;
    },
    
    __refreshControl : function()
    {
        if(this._state & JueKit.UI.State.viewChanged)
        {
            // 如果当前状态为已经更改视图，则更新
            this.onRefreshControl();
            this._state &= ~JueKit.UI.State.viewChanged;
        }
    },
    
    onRefreshControl : function()
    {
    },

    
    __getContainerInnerWidth : function()
    {
        if(this._el.parentNode.tagName == "BODY")
        {
            return JueKit.Dom.getClientWidth();
        }
        
        return this._el.parentNode.offsetWidth;
    },

    __getContainerInnerHeight : function()
    {
        if(this._el.parentNode.tagName == "BODY")
        {
            return JueKit.Dom.getClientHeight();
        }
        
        return this._el.parentNode.offsetHeight;
    },
    
    get_width : function()
    {
        return this._width;
    },
    
    set_width : function(value)
    {
        this._width = value;
        if(value < 0)
        {
            this._el.style.width = "";
        }
        else
        {
            this._el.style.width = value + "px";
        }
        
        this.onSetWidth && this.onSetWidth();
        
        
        // 如果在非调整布局的时候设置宽度，则不更新子控件的大小
        !(this._state & JueKit.UI.State.layouting) && this.isContainer && this.__layoutChildren();
    },
    
    get_height : function()
    {
        return this._height;
    },
    
    set_height : function(value)
    {
        this._height = value;
        if(value < 0)
        {
            this._el.style.height = "";
        }
        else
        {
            this._el.style.height = value + "px";
        }
        
        this.onSetHeight && this.onSetHeight();
        
        // 如果在非调整布局的时候设置高度，则不更新子控件的大小
        !(this._state & JueKit.UI.State.layouting) && this.isContainer && this.__layoutChildren();
    },
    
    get_offsetHeight : function()
    {
        if(!this._el)
        {
            return this.get_height();
        }
        
        return this._el.offsetHeight;
    },
    
    /* 布局相关函数 */
    suspendLayout : function()
    {
        this._layoutSuspendedCount ++;
    },
    
    resumeLayout : function(performLayout)
    {
        if(this._layoutSuspendedCount > 0)
        {
            this._layoutSuspendedCount --;

            if((this._layoutSuspendedCount == 0)
                && (this._state & JueKit.UI.State.waitingLayout)
                && (performLayout))
            {
                this.performLayout();
            }
        }
    },
    //来执行 布局
    performLayout : function()
    {
        if(this._layoutSuspendedCount > 0)
        {
            this._state |= JueKit.UI.State.waitingLayout;
        }
        else
        {
            this._layoutSuspendedCount = 1;
            this.onLayout && this.onLayout();
            this._layoutSuspendedCount = 0;
        }
    },
    
    __layoutChildren : function() //子元素 执行布局
    {
        var node = this.get_controls().get_first(),
            ctl;
        while(node)
        {
            ctl = node.get_value();
            ctl.performLayout && ctl.performLayout();
            node = node.get_next();
        }
    },

    onLayout : function()// 开始执行布局 
    {
        this._state |= JueKit.UI.State.layouting;
        var w = this._width || -1;
        if(this._fillStyle & 1)	// JueKit.UI.FillStyle.horizon 水平
        {
            w = this.__getContainerInnerWidth();
        }
        
        var h = this._height || -1;
        if(this._fillStyle & 2)	// JueKit.UI.FillStyle.vertical 垂直
        {
            h = this.__getContainerInnerHeight();
        }
        
        var args = {width:w, height:h};
        this.fireEvent("measureItem", args);
        
        this.set_width(args.width);
        this.set_height(args.height);
        
        this.isContainer && this.__layoutChildren(); // 执行子 控件的布局
        this._state &= ~(JueKit.UI.State.layouting | JueKit.UI.State.waitingLayout);
    },
    
    set_top : function(top)
    {
        if(this._el.style.position != "absolute")
        {
            this._el.style.position = "absolute";
        }
        this._top = top;
        this._el.style.top = top + "px";
    },
    
    set_left : function(left)
    {
        if(this._el.style.position != "absolute")
        {
            this._el.style.position = "absolute";
        }
        this._left = left;
        this._el.style.left = left + "px";
    },
    
    // 将控件覆盖在el上面，并且控件的大小随着el的大小变化而变化
    cover : function(el)
    {
        if(!this._coverEl)
        {
            JueKit.Event.addHandler(window, "resize", this.__cover, this);
        }
        this._coverEl = JueKit(el);
        this.__cover();
    },
    
    // 取消覆盖
    uncover : function()
    {
        delete this._coverEl;
        JueKit.Event.removeHandler(window, "resize", this.__cover, this);
    },
    
    __cover : function()
    {
        if(this._coverEl)
        {
            var pos = JueKit.Dom.getPosition(this._coverEl);
            var size = JueKit.Dom.getSize(this._coverEl);
            
            this.set_top(pos.top);
            this.set_left(pos.left);
            this.set_width(size.width);
            this.set_height(size.height);
        }
    }
});


JueKit.UI.RichClientWebControl.__autoCtlId = 0;

// 生成控件id
JueKit.UI.RichClientWebControl.geneId = function()
{
    return "_jctl_" + (this.__autoCtlId ++);
};


// 数据绑定控件的基类
JueKit.UI.DataBindableControl = JueKit.Type.createClass("JueKit.UI.DataBindableControl", null,
{
    //DataBindableControl
    updateView : function(dataSource, updateViewType, args)
    {
        var tp = JueKit.Data.UpdateViewType;
        if(this._valueColName
            && (updateViewType & (tp.dataChanged | tp.colChanged | tp.rowRestored | tp.rowChanged)))
        {
            // 设置标志，表示正在更新控件
            this._state &= JueKit.UI.State.updatingCtlData;

            // 更新控件数据
            if(this.onUpdateCtlData)
            {
                this.onUpdateCtlData(dataSource, updateViewType, args);
            }
            
            // 更新结束，取消标志位
            this._state &= ~JueKit.UI.State.updatingCtlData;
        }
    },
    
    updateData : function()
    {
        // 如果绑定了数据源，则可以更新数据
        var dataSource = this._dataSource;
        if(dataSource)
        {
            // 设置标志，表示正在更新数据
            this._state &= JueKit.UI.State.updatingData;

            // 更新数据
            if(this.onUpdateData)
            {
                this.onUpdateData(dataSource);
            }
            
            // 更新结束，取消标志位
            this._state &= ~JueKit.UI.State.updatingData;
        }
    }
});
