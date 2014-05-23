JueKit.Data.FieldInfo = function(name, dataType, length, defaultValue, index)
{
    this.name = name;
    this._dataType = dataType;
    this._length = length;
    this._defaultValue = defaultValue;
    this._index = index;
};

JueKit.Data.FieldInfo.prototype =
{
    name : null,				// 字段名
    _dataType : null,			// 字段所存储的数据类型
    _length : 0,				// 字段在数据库中所占据的长度
    _defaultValue : null,		// 默认值
    _index : -1					// 此字段信息的索引
};

JueKit.Data.FieldData = function(value)
{
    this._value = value;
};

JueKit.Data.FieldData.prototype =
{
    _value : null,				// 字段当前的值
    _originalValue : null,		// 字段的原始值
    _modified : false,		// 指示当前字段值是否被修改
    
    setValue : function(value)
    {
        value = JueKit.Data.Convert(this._dataType, value);
        if(value != this._value)
        {
            this._modified = true;
            this._originalValue = this.value;
            this._value = value;
        }
        if(this._dataType == JueKit.Data.DataType.jueString && this._value.length > this._length)
        {
            //alert('字符串将被截取。');
            this._value = this._value.substr(0, this._length);
        }
    },
    
    getValue : function()
    {
        return this._value;
    }
};


JueKit.Data.Record = function()
{
    this._filedDataList = new Array();
};

JueKit.Data.Record.prototype = 
{
    _filedDataList : null,	// 此记录所包含的字段数据（FieldData）集合
    _status : 0							// 此记录的当前状态
};

JueKit.Data.RecordSet = function()
{
    this._records = new JueKit.Comm.List();
    this._fieldInfoList = new Object();
};

JueKit.Data.RecordSet.prototype =
{
    _records : null,		// 记录集中的记录集合
    _recordCount : 0,			// 记录集中记录的数量
    _firstRecord : null,	// 记录集中的第一条记录
    _lastRecord : null,		// 记录集中的最后一条记录
    _currentRecord : null,	// 记录集的当前记录
    _fieldInfoList : null,	// 字段信息（FieldInfo）的集合
    _fieldCount : 0,
    
    EOF : true,				// 是否已经在最后一条记录之后
    BOF : true,				// 是否已经在第一条记录之前
    Status : 0,				// 当前记录的状态
    
    __addFieldInfo : function(name, dataType, length, defaultValue)
    {
        var newFieldInfo = new JueKit.Data.FieldInfo(name, dataType, length, defaultValue, this._fieldCount);
        this._fieldInfoList[name] = newFieldInfo;
        this._fieldCount += 1;
        return newFieldInfo;
    },
    
    __addRecord : function(status, setDefaultValue)
    {
        var newRecord = new JueKit.Data.Record();
        this._records.insertAfter(newRecord);
        this._recordCount += 1;
        
        if(typeof status == 'undefined')
        {
            newRecord._status = JueKit.Data.RecordStatus.jueUnmodified;
        }
        else
        {
            newRecord._status = status;
        }
        
        if(typeof setDefaultValue != 'undefined')
        {
            for(var fi in this._fieldInfoList)
            {
                newRecord._fieldDataList[fi._index] = new JueKit.Data.FieldData(fi._defaultValue);
            }
        }
        return newRecord;
    },
    
    __setCurrentRecord : function(record)
    {
        this._currentRecord = record;
        if(record)
        {
            this.Status = record._status;
            this.BOF = this.EOF = false;
        }
        else
        {
            this.Status = null;
        }
        return record;
    },
    
    moveFirst : function()
    {
        if(!this.__setCurrentRecord(this._firstRecord))
        {
            this.BOF = this.EOF = true;
        }
    },
    
    moveLast : function()
    {
        if(!this.__setCurrentRecord(this._lastRecord))
        {
            this.BOF = this.EOF = true;
        }
    },
    
    movePrevious : function()
    {
        if(this._currentRecord)
        {
            if(!this.__setCurrentRecord(this._currentRecord.getPreviousItem()))
            {
                this.BOF = true;
            }
        }
    },
    
    moveNext : function()
    {
        if(this._currentRecord)
        {
            if(!this.__setCurrentRecord(this._currentRecord.getNextItem()))
            {
                this.EOF = true;
            }
        }
    },
    
    setFieldValue : function(key, value)
    {
        if(typeof key == 'string')
        {
            this._currentRecord._fieldDataList[this._fieldInfoList[key]._index].setValue(value);
        }
        else
        {
            this._currentRecord._fieldDataList[key].setValue(value);
        }
    },
    
    getFieldValue : function(key)
    {
        if(typeof key == 'string')
        {
            this._currentRecord._fieldDataList[this._fieldInfoList[key]._index].getValue();
        }
        else
        {
            this._currentRecord._fieldDataList[key].getValue();
        }
    },
    
    addNew : function()
    {
        this.__setCurrentRecord(this.__addRecord(JueKit.Data.RecordStatus.jueNew, true));
    }
};

//JueKit.Class.extend(JueKit.Data.FieldInfo.prototype, JueKit.Comm.IListItem.prototype);
JueKit.Class.extend(JueKit.Data.Record.prototype, JueKit.Comm.IListItem.prototype);

JueKit.Data.Convert = function(destType, value)
{
    var retVal;
    if(value == null)
    {
        return null;
    }
    switch(destType)
    {
        case JueKit.Data.DataType.jueBoolean:
            if(value)
            {
                retVal = true;
            }
            else
            {
                retVal = false;
            }
            break;
        case JueKit.Data.DataType.jueInt:
            retVal = parseInt(value);
            break;
        case JueKit.Data.DataType.jueDouble:
            retVal = eval(value);
            break;
        case JueKit.Data.DataType.jueString:
            retVal = value.toString();
            break;
        case JueKit.Data.DataType.jueDatetime:
            retVal = value;
            break;
        default:
            retVal = null;
            break;
    }
    return retVal;
};

JueKit.Data.DataType =
{
    jueBoolean :	0x0,
    jueInt :		0x1,
    jueDouble :		0x2,
    jueString :		0x3,
    jueDatetime :	0x4
};

JueKit.Data.RecordStatus =
{
    jueUnmodified : 0x0,	// 未被修改，这是记录的初始状态。
    jueNew :		0x1,	// 记录是新建的。
    jueModified :	0x2,	// 记录被修改。
    jueDeleted :	0x3		// 记录被删除。
};
