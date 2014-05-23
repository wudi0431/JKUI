/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.TextBoxMode =
{
    /// <summary>
    /// 单行文本框
    /// </summary>
    singleLine : 0,

    /// <summary>
    /// 多行文本框
    /// </summary>
    multiLine : 1,

    /// <summary>
    /// 密码
    /// </summary>
    password : 2
};

 // JueKit.UI.TextBox
JueKit.UI.TextBox = JueKit.Type.createClass("JueKit.UI.TextBox", JueKit.UI.RichClientWebControl,
{  
    //文本框默认样式
    cssCls: "jueTxt",
   //获得焦点
    _selectOnFocus: true,
   //初始化文本框属性
    onInitProperty : function(objData) { 
        //文本框默认值
        this._value = objData.value;
        //文本框类型
        this._textMode = objData.textMode || 0;
        this._type = objData.type || "text";
        //是否只读
        //this._readOnly = objData.readOnly;
        // 元数据id
        this._dataSourceId = objData.dataSourceId || 0;
        //行名称
        this._valueColName = objData.valueColName;
        // 判断文本框是否获得焦点
        if(objData.selectOnFocus !== undefined)
        {
            this._selectOnFocus = objData.selectOnFocus;
        }
        // 调基类方法初始化属性
        JueKit.UI.TextBox._base.onInitProperty.call(this, objData);
    },
    // 绑定事件
    bindDomEventHandlers : function(objData){
        //JueKit.Event.addHandler(this._el, "keyup", this.__hEl_Change, this);
        // 失去焦点
        JueKit.Event.addHandler(this._el, "blur", this.__hEl_Change, this);
        // 获得焦点
        JueKit.Event.addHandler(this._el, "focus", this.__hEl_Focus, this);
        // 调基类方法绑定事件
        JueKit.UI.TextBox._base.bindDomEventHandlers.call(this, objData);
    },
   // 创建DOM
    createDom : function(objData) {
       
        var tag = "input",
            pro = {id:objData.id, className : this.cssCls, value:this._value || ""};
        
        if(this._textMode == JueKit.UI.TextBoxMode.multiLine)
        {
            tag = "textarea";
            pro.className += "MultiLine";
        }
        else if(this._textMode == JueKit.UI.TextBoxMode.singleLine)
        {
            pro.type = "text";
        }
        else
        {
            pro.type = "password";
        }

        this._el = JueKit.Dom.createEl(tag, pro);
        
        JueKit.UI.TextBox._base.createDom.call(this, objData);
        this.set_readOnly(objData.readOnly);
    },
    //解析DOM
    parseDom : function(objData){
    },
    // 初始化值
    onInit : function(objData){
        this._oldValue = this.get_value();
    },
    // 加载完成事件
    onLoad : function(objData){
        var ds = objData.dataSource;
        if(!ds && this._dataSourceId)
        {
            ds = this.findControl(this._dataSourceId);
        }
        ds && this.bindDataSource(ds, true);
    },
    // 失去焦点事件
    __hEl_Change : function(evt){
        if(this._oldValue == this._el.value)
        {
            return;
        }
        var args = {oldValue:this._oldValue};
        this._oldValue = this._el.value;

        this.onChange && this.onChange(args);
        this.updateData();
        this.fireEvent("change", args);
    },
    //获得焦点事件
    __hEl_Focus : function(evt){
        if(this._selectOnFocus)
        {
            try{this._el.select();}catch(e){};
        }
    },
    // 获得文本框值
    get_value : function(){
        return this._el.value;
    },
    // 设置文本框值
    set_value : function(value){
        if(this._state & JueKit.UI.State.updatingCtlData)
        {
            return;
        }

        if(value === undefined
            || value === null)
        {
            value = "";
        }
        
        this._oldValue = value;
        this._el.value = value;
    },
    // 设置文本框size的值
    set_size : function(value){
        this._el.size = value;
    },
    // 获得文本框类型
    get_textMode : function(){
        return this._textMode;
    },
    // 获得文本框 与 datagrid 列名一致
    set_textColName : function(value){
        this._valueColName = value;
    },
    // 获得文本框是否只读
    get_readOnly : function(){
        return this._el.readOnly;
    },
    // 设置文本框只读
    set_readOnly : function(value){
        this._el.readOnly = value;
    },
    // 设置文本框获得焦点
    focus : function(){
        this._el.focus();
    }, 
    //DataBindableControl
    // 当数据源发生改变时，更新控件
    onUpdateCtlData : function(dataSource){
        if(this._valueColName)
        {
            this.set_value(JueKit.Data.DataRow.getColValue(dataSource, this._valueColName));
        }
    }, 
    // 当控件数据发生改变时，更改数据源
    onUpdateData : function(dataSource){
        JueKit.Data.DataRow.setColValue(dataSource, this._valueColName, this.get_value());
    },
    // 设置文本框宽度
    set_width : function(width){
        this._width = width;
        this._el.style.width = (width > 0) ? width + "px" : "auto";
    }
});

JueKit.Type.extend(JueKit.UI.TextBox.prototype, JueKit.UI.DataBindableControl.prototype);

// JueKit.UI.IDataGridInstantEditor
JueKit.UI.DataGridInstantTextBox = JueKit.Type.createClass("JueKit.UI.DataGridInstantEditor", JueKit.UI.TextBox,
{
    instUpdateEditor : function(grid, dataRow, col)
    {
        this._instGrid = grid;
        this._instDataRow = dataRow;
        this._instCol = col;
        
        this.set_value(JueKit.Data.DataRow.getColValue(dataRow, col.name));
    },
    
    instUpdateData : function()
    {
        JueKit.Data.DataRow.setColValue(this._instDataRow,
            this._instCol.name,
            this.get_value());
    },
    
    instBeginEdit : function()
    {
        this._el.blur();
        this._el.focus();
    },
    
    onChange : function()
    {
        this.instUpdateData();
    }
});
