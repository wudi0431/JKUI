/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.FormView
JueKit.Type.registerNamespace("JueKit.UI");
// 表单控件
JueKit.UI.FormView = JueKit.Type.createClass("JueKit.UI.FormView", JueKit.UI.RichClientWebControl,{
    cssCls : "jueForm",
   //获得数据集
    ctor : function(objData){
        this._items = new JueKit.Collection.LinkedList();

        JueKit.UI.FormView._base.ctor.call(this, objData);
    },
    // 创建DOM
    createDom : function(objData){
        var html = JueKit.String.format("<div class='{0}ItemWrap'></div>", this.cssCls);
        var elCssCls = this.cssCls + "View";
        if(objData.customCssCls)
        {
            elCssCls += " " + objData.customCssCls;
        }
        this._el = JueKit.Dom.createEl("div", {id:objData.id, className:elCssCls}, html);
        
        JueKit.UI.FormView._base.createDom.call(this, objData);
    },
    // 解析DOM
    parseDom : function(objData){
        this._elItemsWrap = JueKit.Dom.getChildElByIndex(this._el, 0);
        
        JueKit.UI.FormView._base.parseDom.call(this, objData);
    },
    // 添加Item
    addItem : function(formItem){
        this._items.addLast(formItem);
        this._elItemsWrap.appendChild(formItem._el);
        
        return formItem;
    },
    // 添加按钮
    addOperationBtn : function(btn){
        if(!this._elOpt)
        {
            this._elOpt = JueKit.Dom.createEl("div", {className:this.cssCls + "Opt"});
            this._el.appendChild(this._elOpt);
        }
    
        this._elOpt.appendChild(btn._el);
        
        return btn;
    }
});
// 暂时用不到
JueKit.UI.FormOpt = JueKit.Type.createClass("JueKit.UI.FormOpt", JueKit.UI.RichClientWebControl,{
    cssCls : "jueForm",

    createDom : function(objData)
    {
        var cssCls = this.cssCls;
        var strHtml = JueKit.String.format("<div class='{0}El'></div>", cssCls);
        var elCssCls = this.cssCls + "Option";
        if(objData.customCssCls)
        {
            elCssCls += " " + objData.customCssCls;
        }
        this._el = JueKit.Dom.createEl("div", {id:objData.id, className:elCssCls}, strHtml);
        
        this.parseDom(objData);
        
        JueKit.UI.FormItem._base.createDom.call(this, objData);
    },
    
    parseDom : function(objData)
    {
        this._elEl = JueKit.Dom.getChildElByIndex(this._el, 0);
    },
    
    onInit : function(objData)
    {
        if(objData.parent)
        {
            objData.parent.addItem(this);
        }
    },

    get_formEl : function()
    {
        return this._elEl;
    }
});
// 自定义表单项
JueKit.UI.FormItem = JueKit.Type.createClass("JueKit.UI.FormItem", JueKit.UI.RichClientWebControl,{
    cssCls : "jueForm",
    // 初始化属性
    onInitProperty : function(objData){
        this._label = objData.label || "";
        JueKit.UI.FormItem._base.onInitProperty.call(this, objData);
    },
    // 创建DOM
    createDom : function(objData){
        var cssCls = this.cssCls;
        var strHtml = JueKit.String.format("<label class='{0}Label'>{1}</label><div class='{0}El'></div>", cssCls, JueKit.String.HTMLEncode(this._label));
        var elCssCls = this.cssCls + "Item";
        if(objData.customCssCls)
        {
            elCssCls += " " + objData.customCssCls;
        }
        this._el = JueKit.Dom.createEl("div", {id:objData.id, className:elCssCls}, strHtml);
        
        this.parseDom(objData);
        
        JueKit.UI.FormItem._base.createDom.call(this, objData);
        
        if(this.createFormEl)
        {
            this.createFormEl(this._elEl, objData);
        }
    },
    // 解析DOM
    parseDom : function(objData){
        this._elLabel = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elEl = JueKit.Dom.getNextEl(this._elLabel);
    },
    //初始化数据
    onInit : function(objData){
        if(objData.parent)
        {
            objData.parent.addItem(this);
        }
    },
    //获得lable
    get_label : function(){
        return this._label;
    },
    //设置lable的值
    set_label : function(value){
        this._label = value;
    },
    //获得 form对象
    get_formEl : function(){
        return this._elEl;
    }
});
//文本框表单项
JueKit.UI.TextBoxFormItem = JueKit.Type.createClass("JueKit.UI.TextBoxFormItem", JueKit.UI.FormItem, {
    //创建表单的文本框对象
    createFormEl : function(formEl, objData){
        this._textBox = new JueKit.UI.TextBox({
                container : formEl,
                value : objData.value,
                textMode : objData.textMode,
                readOnly : objData.readOnly,
                dataSource : objData.dataSource,
                valueColName : objData.valueColName
            });
    },
   //获得文本框对象
    get_textBox : function(){
        return this._textBox;
    },
    //设置文本框为只读
    set_readOnly : function(value){
        this._textBox && this._textBox.set_readOnly(value);
    }
});
//选择框表单项
JueKit.UI.CheckBoxFormItem = JueKit.Type.createClass("JueKit.UI.CheckBoxFormItem", JueKit.UI.FormItem, {
    //创建表单的选择框对象
    createFormEl : function(formEl, objData){
        this._checkBox = new JueKit.UI.CheckBox({
                container : formEl,
                text : objData.text,
                value : objData.value,
                checked : objData.checked
            });
    },
    //获得选择框对象
    get_checkBox : function(){
        return this._checkBox;
    },
    //设置选择框为只读
    set_readOnly : function(value){
        this._checkBox && this._checkBox.set_readOnly(value);
    }
});
//多选择框表单项
JueKit.UI.CheckBoxListFormItem = JueKit.Type.createClass("JueKit.UI.CheckBoxListFormItem", JueKit.UI.FormItem, {
    //创建表单的多选择框对象
    createFormEl : function(formEl, objData){
        this._checkBoxList = new JueKit.UI.CheckBoxList({
                container : formEl,
                items : objData.items
            });
    },
    //获得多选择框对象
    get_checkBoxList : function(){
        return this._checkBoxList;
    }
});
//下拉框表单项
JueKit.UI.DropdownListFormItem = JueKit.Type.createClass("JueKit.UI.DropdownListFormItem", JueKit.UI.FormItem, {
    //创建表单的下拉框对象
    createFormEl : function(formEl, objData){
        this._ddl = new JueKit.UI.DropdownList({
                container : formEl,
                items : objData.items,
                selectedIndex : objData.selectedIndex,
                emptyText : objData.emptyText,
                dataSource : objData.dataSource,
                valueColName : objData.valueColName,
                textColName : objData.textColName,
                canSearch : objData.canSearch
            });
    },
    //获得下拉框对象
    get_dropdownList : function(){
        return this._ddl;
    },
    //获得下拉框对象
    set_readOnly : function(value){
        this._ddl && this._ddl.set_readOnly(value);
    }
});
//日期框表单项
JueKit.UI.DatePickerFormItem = JueKit.Type.createClass("JueKit.UI.DatePickerFormItem", JueKit.UI.FormItem,{
    //创建表单的日期框对象
    createFormEl : function(formEl, objData){
        this._datePicker = new JueKit.UI.DatePicker({
                container : formEl,
                emptyText : objData.emptyText,
                dataSource : objData.dataSource,
                valueColName : objData.valueColName,
                currentDate : objData.currentDate,
                width: objData.width || 150
            });
    },
        //获得日期框对象
    get_datePicker : function(){
        return this._datePicker;
    },
    //设置日期框为只读
    set_readOnly : function(value){
        this._datePicker && this._datePicker.set_readOnly(value);
    }
});
//树表单项
JueKit.UI.TreeFormItem = JueKit.Type.createClass("JueKit.UI.TreeFormItem", JueKit.UI.FormItem, {
    //创建表单的树对象 
    createFormEl: function (formEl, objData) {
        this._tree = new JueKit.UI.Tree({
            container: formEl,
            checkable: objData.checkable,
            topNode: objData.topNode
        });
        this._tree._el.style.display ='inline-block'; 
    },
    //获得树对象
    get_tree: function () {
        return this._tree;
    }
});
