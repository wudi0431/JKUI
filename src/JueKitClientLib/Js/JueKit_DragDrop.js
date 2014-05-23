/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.DragDrop
JueKit.Type.registerNamespace("JueKit");


JueKit.DDMng = {
    _ddObjs : [],
    _dropObjs : [],
    
    addDragDrop : function(dd)
    {
        if(dd._canDrop)
        {
            /*
            var cate = dd._category || "default",
                ds = this._dropObjs[cate];
                
            if(!ds)
            {
                ds = []
                this._dropObjs[cate] = ds;
            }
            */
            var ds = this._dropObjs;
            ds.push(dd);
        }
    },
    
    cacheDropPos : function()
    {
        var ds = this._dropObjs,
            dd;
        for(var i=0; i<ds.length; i++)
        {
            dd = ds[i];
            dd._cachedRect = JueKit.Dom.getRect(dd.el);
        }
    }
    
};


JueKit.DropTarget = JueKit.Type.createClass("JueKit.DropTarget", JueKit.CustomEventControl,
{
    ctor : function(el, options)
    {
        this.el = el;
        if(options)
        {
            this._category = options.category;
        }
        this._canDrop = true;
        JueKit.DDMng.addDragDrop(this);
    },
    
    get_category : function()
    {
        return this._category;
    }
});

JueKit.DragDrop = JueKit.Type.createClass("JueKit.DragDrop", JueKit.DropTarget,
{
    //_startX : 0,
    //_startY : 0,

    //el : null,

    //_trigger : null,

    //_invalidTriggerTypes : null,

    //_category : null,
    //_canDrop : false;

    _offsetX: 0,
    _offsetY: 0,

    _direction: 3,

    ctor: function (el, trigger, invalidTriggerTypes, options) {
        el = JueKit(el);
        this.el = JueKit(el);

        this.set_trigger(trigger);

        this._invalidTriggerTypes = invalidTriggerTypes;

        if (options) {
            this._category = options.category || "default";
            this._canDrop = options.canDrop;
            this._offsetX = options.offsetX || 0;
            this._offsetY = options.offsetY || 0;
        }

        JueKit.DDMng.addDragDrop(this);
    },

    __triggerMousedown: function (evt) { 
        // 判断是不是点击了不允许拖放的元素
        if (this._invalidTriggerTypes) {
            var el = JueKit.Event.srcEl(evt);
            if (JueKit.String.include(this._invalidTriggerTypes, el.tagName, ",")) {
                return;
            }
        }

        // 判断当前是不是允许拖动
        if (this._disable) {
            return;
        }

        // 记录起始鼠标位置，和被拖动元素位置
        this._startX = JueKit.Event.pointerX(evt);
        this._startY = JueKit.Event.pointerY(evt);

        var pos = JueKit.Dom.getPosition(this.el);
        this._curX = this._startPosX = pos.left + this._offsetX;
        this._curY = this._startPosY = pos.top + this._offsetY;

        // 缓存Drop目标的位置
        JueKit.DDMng.cacheDropPos();

        // 在开始拖动前触发
        var args = { event: evt, result: true };
        if (this.b4Drag) {
            this.b4Drag(args);
        }
        if (!args.result) {
            return;
        }

        this.fireEvent("b4Drag", args);
        if (!args.result) {
            return;
        }

        // 处理拖动指示器
        if (!this._indicator) {
            this._indicator = this.el;
        }

        var style = this._indicator.style;
        if (style.position != "absolute") {
            style.position = "absolute";
        }

        JueKit.Dom.show(this._indicator);
        JueKit.Dom.setPosition(this._indicator, this._startPosX, this._startPosY);

        // 注册监听事件
        JueKit.Event.addHandler(document.body, 'mousemove', this.__bodyMousemove, this);
        JueKit.Event.addHandler(document.body, 'mouseup', this.__bodyMouseup, this);

        // 临时设置页面为不能选中以防止在拖动过程中选中页面文字
        this._oldSelectStart = document.body.onselectstart;
        document.body.onselectstart = JueKit.fReturnFalse;

        if (this.onDragStart) {
            this.onDragStart(evt);
        }
    },

    __bodyMousemove: function (evt) {
        if (this._direction & 1) {
            // 允许水平拖动
            this._curX = JueKit.Event.pointerX(evt);
            var dx = this._curX - this._startX;
        }

        if (this._direction & 2) {
            // 允许垂直拖动
            this._curY = JueKit.Event.pointerY(evt);
            var dy = this._curY - this._startY;
        }

        this.onDrag && this.onDrag();

        var lastDd = this._lastDropTarget;
        dd = this.__getCurDropTarget();

        if (lastDd && lastDd != dd) {
            var args = { result: true, event: evt, drag: this };
            lastDd.onDropOut && lastDd.onDropOut(args);
            if (args.result) {
                lastDd.fireEvent("dropOut", args);
            }
        }
        this._lastDropTarget = dd;
        if (dd) {
            var args = { result: true, event: evt, drag: this };
            dd.onDropHover && dd.onDropHover(args);
            if (args.result) {
                dd.fireEvent("dropHover", args);
            }
        }
    },

    __bodyMouseup: function (evt) {
        JueKit.Event.removeHandler(document.body, 'mousemove', this.__bodyMousemove, this);
        JueKit.Event.removeHandler(document.body, 'mouseup', this.__bodyMouseup, this);
        document.body.onselectstart = this._oldSelectStart;

        var dd = this.__getCurDropTarget();
        if (dd) {
            var args = { result: true, event: evt, drag: this };
            dd.onDrop && dd.onDrop(args);
            if (args.result) {
                dd.fireEvent("drop", args);
            }
        }

        this._lastDropTarget = null;

        if (this.b4EndDrag) {
            this.b4EndDrag(evt);
        }

        if (this.endDrag) {
            this.endDrag(evt);
        }

        this.fireEvent("endDrag");
        //		if(this._indicator !== this.el)
        //		{
        //			JueKit.Dom.hide(this._indicator);
        //		}
    },

    onDrag: function () {
        var left = this._startPosX,
            top = this._startPosY;
        if (this._direction & 1) {
            // 允许水平拖动
            var dx = this._curX - this._startX;
            left = this._startPosX + dx;
        }

        if (this._direction & 2) {
            // 允许垂直拖动
            var dy = this._curY - this._startY;
            top = this._startPosY + dy;
        }

        JueKit.Dom.setPosition(this._indicator, left, top);
    },

    __getCurDropTarget: function () {
        var ds = JueKit.DDMng._dropObjs,
            dd,
            rect,
            x = this._curX,
            y = this._curY;
        for (var i = 0; i < ds.length; i++) {
            dd = ds[i];
            rect = dd._cachedRect;

            if (rect.left <= x && x <= rect.left + rect.width && rect.top <= y && y <= rect.top + rect.height) {
                return dd;
            }
        }
    },

    unreg: function () {
        JueKit.Event.removeHandler(this._trigger, 'mousedown', this.__triggerMousedown, this);
    },

    clear: function () {
        this.unreg();
        delete this.el;
        delete this._trigger;
        delete this._invalidTriggerTypes;
    },

    get_curX: function () {
        return this._curX;
    },

    set_disable: function (value) {
        this._disable = value;
    },

    set_direction: function (value) {
        this._direction = value;
    },

    set_indicator: function (el) {
        this._indicator = el;
    },

    set_offsetX: function (value) {
        this._offsetX = value;
    },

    set_offsetY: function (value) {
        this._offsetY = value;
    },

    set_startPosX: function (value) {
        this._startPosX = value;
    },

    set_startPosY: function (value) {
        this._startPosY = value;
    },

    set_trigger: function (value) {
        this._trigger = JueKit(value);

        if (!this._trigger) {
            this._trigger = this.el;
        }

        if (this._trigger) {
            JueKit.Event.addHandler(this._trigger, 'mousedown', this.__triggerMousedown, this);
        }
    }

});

JueKit.Type.extend(JueKit.DragDrop, {
    start : function(el, trigger)
    {
        
    }
});

JueKit.DragDrop._theDd = new JueKit.DragDrop();

