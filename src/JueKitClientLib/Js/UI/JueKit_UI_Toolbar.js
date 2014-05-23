/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.Toolbar
JueKit.Type.registerNamespace("JueKit.UI");
// 工具栏
JueKit.UI.Toolbar = JueKit.Type.createClass("JueKit.UI.Toolbar", JueKit.UI.RichClientWebControl,{
    cssCls: "jueToolbar",
    //创建DOM
    createDom : function(objData){
        if (objData.cssCls) {
            this.cssCls = objData.cssCls;
        }
        this._el = JueKit.UI.Toolbar.__getDom(this.cssCls);

        this._elInner = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._el));
        this._elTbisWrap = JueKit.Dom.getFirstChild(this._elInner);

        JueKit.UI.Toolbar._base.createDom.call(this, objData);
    },
    //解析DOM
    parseDom : function(objData){
        this._elInner = JueKit.Dom.getFirstChild(JueKit.Dom.getFirstChild(this._el));
        this._elTbisWrap = JueKit.Dom.getFirstChild(this._elInner);
    },
    //布局工具栏
    onLayout : function(){
        JueKit.UI.Toolbar._base.onLayout.call(this);
        
        var node = this.get_controls().get_first(),
            blankWidth = this._elTbisWrap.offsetWidth,
            ctl, blankCtl;
            
        while(node)
        {
            ctl = node.get_value();
            
            if(ctl._autoSize)
            {
                blankCtl = ctl;
            }
            else
            {
                blankWidth -= ctl._el.offsetWidth;
            }
            
            node = node.get_next();
        }
        
        blankWidth -= 5;
        if(blankCtl)
        {
            if (blankWidth < 0)
            {
                blankWidth = 0;
            }
            blankCtl.set_width(blankWidth);
        }
    },
    //设置工具栏宽度
    set_width1 : function(value){
        JueKit.UI.Toolbar._base.set_width.call(this, value);
        
        this.performLayout();
    }
});
//工具栏模板
JueKit.UI.Toolbar._domTemplate = {};
//返回工具栏的DOM
JueKit.UI.Toolbar.__getDom = function(cssCls){
    if(!this._domTemplate[cssCls])
    {
        var elContainer = JueKit.Dom.createEl("div", null,
            JueKit.String.format("<div class='{0}Wrap'><div class='{0}'><div class='{0}Inner'><div class='jueTbisWrap'></div></div></div></div>", cssCls));
        this._domTemplate[cssCls] = elContainer.childNodes[0];
    }
    
    var el = this._domTemplate[cssCls].cloneNode(true);
    return el;
};

JueKit.Type.registerNamespace("JueKit.UI");
//可自定义工具栏里面的类容
JueKit.UI.ToolbarItem = JueKit.Type.createClass("JueKit.UI.ToolbarItem", JueKit.UI.RichClientWebControl,{
});
//连接工具栏
JueKit.UI.BlankToolbarItem = JueKit.Type.createClass("JueKit.UI.BlankToolbarItem", JueKit.UI.RichClientWebControl,{
    _autoSize : true
});
//按钮工具栏
JueKit.UI.ButtonToolbarItem = JueKit.Type.createClass("JueKit.UI.ButtonToolbarItem", JueKit.UI.Button,{
});
