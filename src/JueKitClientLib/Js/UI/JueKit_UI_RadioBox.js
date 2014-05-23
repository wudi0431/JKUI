/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
// JueKit.UI.RadioBox
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.RadioBox = JueKit.Type.createClass("JueKit.UI.RadioBox", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueChk",
    //初始化属性
    onInitProperty : function(objData){
        this._value = objData.value;
        
        this._text = objData.text || "";

        JueKit.UI.RadioBox._base.onInitProperty.call(this, objData);
    },
    // 创建DOM
    createDom : function(objData){
        var cssCls = this.cssCls;
        this._el = JueKit.Dom.createEl("span", {className:cssCls + "Wrap"});
        
        if(!objData.name)
        {
            objData.name = objData.id + "name";
        }
        var IEversion = JueKit.Browser.version;
        if (JueKit.Browser.isIE && IEversion < "8") {
            this._elInput = JueKit.Dom.createEl("<input name='" + objData.name + "' />", { type: "radio", id: objData.id });
         } else {
            this._elInput = JueKit.Dom.createEl("input", { type: "radio", id: objData.id });
            this._elInput.name=objData.name;
        }
       
        
        this._elLabel = JueKit.Dom.createEl("label", {className:cssCls + "Lbl", htmlFor:objData.id}, JueKit.String.HTMLEncode(this._text));
        
        this._el.appendChild(this._elInput);
        this._el.appendChild(this._elLabel);
        JueKit.UI.RadioBox._base.createDom.call(this, objData);
    },
    // 解析DOM
    parseDom : function(objData){
        this._elInput = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elLabel = JueKit.Dom.getNextEl(this._elInput);
    },
    // 绑定事件
    bindDomEventHandlers : function(){
        JueKit.Event.addHandler(this._elInput, "click", this.__hElInputClick, this);
    },
    //初始化数据
    onInit : function(objData){
        this._elInput.checked = objData.checked;
        this._elInput.readonly = objData.readOnly;
    },
    // 点击事件
    __hElInputClick: function(evt) {
        if(!this.get_readOnly())
        {
            this.fireEvent("change");
        }
    },
    //获得RadioBox的 value 值
    get_value : function(){
        return this._elInput.value;
    },
    //设置RadioBox的 value 值
    set_value : function(value){
        this._elInput.value = value;
    },
    //获得RadioBox的 文本 值
    get_text : function(){
        return this._text;
    },
    //设置RadioBox的 文本 值
    set_text : function(value){
        this._text = value;
        this._elLabel.innerHTML = value;
    },
    //获得RadioBox的 是否被中
    get_checked : function(){
        return this._elInput.checked;
    },
    //设置RadioBox的 是否被中
    set_checked : function(value){
        if(this._elInput.checked != value)
        {
            this._elInput.checked = value;
            this.fireEvent("change");
        }
    },
    //获得RadioBox的 是否只读
    get_readOnly : function(){
        return this._elInput.readonly;
    },
    //设置RadioBox的 是否只读
    set_readOnly : function(value){
        this._elInput.readonly = value;
        if(value)
        {
            this._elInput.setAttribute("disabled","disabled");
        }
        else
        {
           if(this._elInput.getAttribute("disabled"))
           {
              this._elInput.removeAttribute("disabled");
           }
        }
        //this.__refreshCtl();
    },
  //设置RadioBox的 与 datagrid 列名称样
    set_valueColName : function(value){
        this._valueColName = value;
    }
});




// JueKit.UI.RadioBoxList
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.RadioBoxList = JueKit.Type.createClass("JueKit.UI.RadioBoxList", JueKit.UI.RichClientWebControl,
{
    cssCls: "jueChkBoxList",
    // 获得数据字典
    ctor: function(objData) {
        this._items = new JueKit.Collection.LinkedList();

        JueKit.UI.RadioBoxList._base.ctor.call(this, objData);
    },
    //创建DOM
    createDom: function(objData) {
        this._el = JueKit.Dom.createEl("ul", { id: objData.id, className: this.cssCls });

        JueKit.UI.RadioBoxList._base.createDom.call(this, objData);
    },
    //初始化数据
    onInit: function(objData) {
        if (objData.items) {
            for (var i = 0; i < objData.items.length; i++) {
                this.addItem(new JueKit.UI.RadioBox(objData.items[i]));
            }
        }
        this.set_selectedText(objData.selectedText, true);
    },
    //绑定事件
    bindDomEventHandlers: function() {
        JueKit.Event.addHandler(this._el, "click", this.__hElClick, this);
    },
    //单击事件
    __hElClick: function(evt) {
        var el = JueKit.Event.srcEl(evt);
        if (el.tagName == "INPUT") 
        {
            this.fireEvent("change");
        }
    },
    // 获得选中的文本
    getSelectItemText: function() {
        var text;
        var node = this._items.get_first(),
            item;

        while (node) {
            item = node.get_value();
            if (item && item.get_checked()) {
                return item.get_text();
            }
            node = node.get_next();
        }

        return text;
    },
    // 根据索引设置选中的文本
    set_selectedIndex: function (index) {
        var nodeCbk = this._items.getAt(index);
        if (nodeCbk) {
            nodeCbk = nodeCbk.get_value();
            nodeCbk.set_checked(true);
        } 
    },
    // 根据文本设置选中的文本
    set_selectedText: function(text) {
        var node = this._items.get_first(),
            item;

        while (node) {
            item = node.get_value();
            if (item && item.get_text() == text) {
                item.set_checked(true);
            }

            node = node.get_next();
        }
    },
    // 设置是否只读
    set_readOnly: function(value) {
        var node = this._items.get_first(),
            item;

        while (node) {
            item = node.get_value();

            item.set_readOnly(value);

            node = node.get_next();
        }
    },
    // 添加 item
    addItem: function(item) {
        this._items.addLast(item);
        var li = JueKit.Dom.createEl("li", { className: this.cssCls + "Item" });

        li.appendChild(item._el);
        this._el.appendChild(li);
    },
    // 添加 删除item
    removeItem: function(item) {
        this._items.remove(item);
        JueKit.Dom.removeEl(item._el.parentNode);
    },
    // 设置显示方向 是 水平 
    set_direction: function(direction) {
        var cssCls = this.cssCls + "Ver";
        if (direction == JueKit.UI.Direction.vertical) {
            JueKit.Dom.addCssClass(this._el, cssCls);
        }
        else {
            JueKit.Dom.removeCssClass(this._el, cssCls);
        }
    }
});
