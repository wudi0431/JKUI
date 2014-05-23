/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
// JueKit.UI.CheckBox
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.CheckBox = JueKit.Type.createClass("JueKit.UI.CheckBox", JueKit.UI.RichClientWebControl,{
    cssCls : "jueChk",
    //初始化属性
    onInitProperty : function(objData){
        this._value = objData.value;
        
        this._text = objData.text || "";

        this._valueColName = objData.valueColName || "";

        JueKit.UI.CheckBox._base.onInitProperty.call(this, objData);
    },
    // 创建DOM
    createDom : function(objData){
        var cssCls = this.cssCls;
        this._el = JueKit.Dom.createEl("span", {id:objData.id, className:cssCls + "Wrap"});
        
        this._elInput = JueKit.Dom.createEl("input", {type:"checkbox", id:objData.id, className:cssCls});
        this._elBox = JueKit.Dom.createEl("a", {className:cssCls + "Box"});
        this._elLabel = JueKit.Dom.createEl("label", {className:cssCls + "Lbl", htmlFor:objData.id}, JueKit.String.HTMLEncode(this._text));
        
        this._el.appendChild(this._elInput);
        this._el.appendChild(this._elBox);
        this._el.appendChild(this._elLabel);
        JueKit.UI.CheckBox._base.createDom.call(this, objData);
    },
    // 解析DOM
    parseDom : function(objData){
        this._elInput = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elChkBox = JueKit.Dom.getNextEl(this._elInput);
        this._elLabel = JueKit.Dom.getNextEl(this._elChkBox);
    },
    //初始化数据
    onInit : function(objData){
        this._checked = objData.checked;
        this._elInput.readonly = objData.readOnly;
        this.__refreshCtl();
    },
    // 绑定事件
    bindDomEventHandlers : function(){
        JueKit.Event.addHandler(this._el, "click", this.__hElClick, this);
    },
   // 点击事件
    __hElClick : function(evt){
        if(!this.get_readOnly())
        {
            this.set_checked(!this.get_checked());
        }
    },
   // 刷新checbox 是选中 只读
    __refreshCtl : function(){
        if(this._checked)
        {
            JueKit.Dom.addCssClass(this._elChkBox, this.cssCls + "Checked");
        }
        else
        {
            JueKit.Dom.removeCssClass(this._elChkBox, this.cssCls + "Checked");
        }
        
        if(this._elInput.readonly)
        {
            JueKit.Dom.addCssClass(this._el, this.cssCls + "ReadOnly");
        }
        else
        {
            JueKit.Dom.removeCssClass(this._el, this.cssCls + "ReadOnly");
        }
    },
    //获得checbox的 value 值
    get_value : function(){
        return this._elInput.value;
    },
    //设置checbox的 value 值
    set_value : function(value){
        this._elInput.value = value;
    },
    //获得checbox的 文本 值
    get_text : function(){
        return this._text;
    },
    //设置checbox的 文本 值
    set_text : function(value){
        this._text = value;
        this._elLabel.innerHTML = value;
    },
    //获得checbox的 是否被中
    get_checked : function(){
        return !!this._checked;
    },
    //设置checbox的 是否被中
    set_checked : function(value){
        if(this._state & JueKit.UI.State.updatingCtlData)
        {
            return;
        }
    
        if(this._checked != value)
        {
            this._checked = value;
            this.__refreshCtl();
            this.updateData();
            this.fireEvent("change");
        }
    },
    //获得checbox的 是否只读
    get_readOnly : function(){
        return this._elInput.readonly;
    },
    //设置checbox的 是否只读
    set_readOnly : function(value){
        this._elInput.readonly = value;
        this.__refreshCtl();
    },
    //设置checbox的 与 datagrid 列名称样
    set_valueColName : function(value){
        this._valueColName = value;
    }, 
    //DataBindableControl
    // 当数据源发生改变时，更新控件
    onUpdateCtlData : function(dataSource){
        if(this._valueColName)
        {
            var value = JueKit.Data.DataRow.getColValue(dataSource, this._valueColName);
            this.set_checked(value ? true : false);
        }
    },
    // 当控件数据发生改变时，更改数据源
    onUpdateData : function(dataSource){
        if(this._valueColName)
        {
            JueKit.Data.DataRow.setColValue(dataSource, this._valueColName, this.get_checked());
        }
    }
});

JueKit.Type.extend(JueKit.UI.CheckBox.prototype, JueKit.UI.DataBindableControl.prototype);


// JueKit.UI.CheckBoxList
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.CheckBoxList = JueKit.Type.createClass("JueKit.UI.CheckBoxList", JueKit.UI.RichClientWebControl,
{
    cssCls: "jueChkBoxList",
    // 获得数据字典
    ctor: function (objData) {
        this._items = new JueKit.Collection.LinkedList();

        JueKit.UI.CheckBoxList._base.ctor.call(this, objData);
    },
    //创建DOM
    createDom: function (objData) {
        this._el = JueKit.Dom.createEl("ul", { id: objData.id, className: this.cssCls });

        JueKit.UI.CheckBoxList._base.createDom.call(this, objData);
    },
    //绑定事件
    bindDomEventHandlers: function () {
        JueKit.Event.addHandler(this._el, "click", this.__hElClick, this);
    },
   //单击事件
    __hElClick: function (evt) {
        var el = JueKit.Event.srcEl(evt);
        if (el.tagName == "A" || el.tagName == "LABEL") {
            this.fireEvent("change");
        }
    }, 
    // 初始化数据
    onInit: function (objData) {
        if (objData.items) {
            for (var i = 0; i < objData.items.length; i++) {
                this.addItem(new JueKit.UI.CheckBox(objData.items[i]));
            }
        }
        this.set_selectedText(objData.selectedText, true);
    },
    // 获得选中的文本集合
    getSelectItemText: function () {
        var textList = [];
        var node = this._items.get_first(),
            item;

        while (node) {
            item = node.get_value();
            if (item && item.get_checked()) {
                textList[textList.length] = item.get_text();
            }
            node = node.get_next();
        }

        return textList;
    },
    // 获得里面_items
    get_items: function () {
        return this._items;
    },
    // 设置哪一项的索引 是否被选中
    set_selectedIndex: function (index, value) {
        var nodeCbk = this._items.getAt(index);
        if (nodeCbk) {
            nodeCbk = nodeCbk.get_value();
            nodeCbk.set_checked(value);
        }
    },
    // 设置哪一项的文本 是否被选中
    set_selectedText: function (text, value) {
        var node = this._items.get_first(),
            item;

        while (node) {
            item = node.get_value();
            if (item && item.get_text() == text) {
                item.set_checked(value);
            }

            node = node.get_next();
        }
    },
    // 设置是否只读
    set_readOnly: function (value) {
        var node = this._items.get_first(),
            item;

        while (node) {
            item = node.get_value();

            item.set_readOnly(value);

            node = node.get_next();
        }
    },
    // 添加 item
    addItem: function (item) {
        this._items.addLast(item);
        var li = JueKit.Dom.createEl("li", { className: this.cssCls + "Item" }); 
        li.appendChild(item._el);
        this._el.appendChild(li);
    },
    // 添加 删除item
    removeItem: function (item) {
        JueKit.Dom.removeEl(item._value._el.parentNode);
        this._items.remove(item);
    },
    // 设置显示方向 是 水平 
    set_direction: function (direction) {
        var cssCls = this.cssCls + "Ver";
        if (direction == JueKit.UI.Direction.vertical) {
            JueKit.Dom.addCssClass(this._el, cssCls);
        }
        else {
            JueKit.Dom.removeCssClass(this._el, cssCls);
        }
    }
});
