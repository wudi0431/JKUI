/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKIt.Type
JueKit.Type =
{
    // 所有类信息
    _classInfoList : {},
    
    unimplFunction : function()
    {
        throw new Error(JueKit.StringResources.unimplementedFunction);
    },
    
    // 方法
    createClass : function(sTypeName, oBaseClass, oMethods)
    {
        /// <summary>创建一个类</summary>
        /// <param name="sTypeName" type="String">类名</param>

        // 此处typeName不应该为空，如果为空，则稍后不能使用对象工厂的方式创建对象。

        // 创建构造函数
        var func = function()
        {
            if(this.ctor)
                return this.ctor.apply(this, arguments);
        };

        // 指定类的名称
        func._typeName = sTypeName;
        // 给新建的类扩展基本的方法
        //this.extend(func, JueKit.BasicClass);

        // 注册该类
        // 注意：如果类名已经被注册过，则会抛出异常。
        // 因为类名是绝对不允许重复的，所以这里对是否抛出异常不加判断。
        // 如果出现异常，则应该由程序员在开发阶段捕获并解决。
        this.__registerClass(func);
        
        // 如果指定了基类，则继承基类的方法。
        if(oBaseClass)
        {
            // 继承基类方法。
            this.inherit(func, oBaseClass);
        }
        
        // 扩展子类方法
        if(oMethods)
        {
            this.extend(func.prototype, oMethods);
        }
        
        return func;
    },

    __registerClass : function(oClass)
    {
        /// <summary>注册一个类，将其信息加入到类信息列表，以便对象工厂能根据类的名称来创建类的实例</summary>
        /// <param name="oClass" type="Function">要注册的类</param>
        
        // 获取类名
        var typeName = oClass._typeName;
        // 查找类信息
        var classInfo = this._classInfoList[typeName];
        if(classInfo)
        {
            // 如果类信息已存在，表示该类名已被注册。
            throw new Error(JueKit.String.format(JueKitSR["registeredClassName"], typeName));
        }
        else
        {
            // 否则允许注册，加入类信息列表。
            this._classInfoList[typeName] = oClass;
        }
    },

    registerNamespace : function(sNamespace)
    {
        /// <summary>注册一个命名空间</summary>
        /// <param name="sNamespace" type="String">要注册的命名空间的名称</param>

        var names = sNamespace.split(".");
        
        var currentNS = window;
        var name;
        
        for(var i=0; i<names.length; i++)
        {
            name = names[i];
            if(!currentNS[name])
            {
                currentNS[name] = {};
            }
            currentNS = currentNS[names[i]];
        }
    },
    
    extend : function(oOriginal, oExtend)
    {
        /// <summary>将oExtend对象中的成员复制到oOriginal对象的成员中。</summary>
        /// <param name="oOriginal" type="Object">被扩展的对象</param>
        /// <param name="oExtend" type="Object">被复制的对象</param>

        for(var property in oExtend)
        {
            oOriginal[property] = oExtend[property];
        }
    },
    
    inherit : function(oDerivedClass, oBaseClass)
    {
        /// <summary>从一个类继承</summary>
        /// <param name="oDerivedClass" type="Function">派生类</param>
        /// <param name="oBaseClass" type="Function">基类</param>

        // 复制基类的prototype成员
        this.extend(oDerivedClass.prototype, oBaseClass.prototype);
        
        // 因为在IE中不能通过for...in...语句枚举对象中的toString成员，
        // 所以单独设置toString成员
        
        // 注：每个Object对象都包含constructor属性、toString方法和valueOf方法，
        // 每个Function对象包含prototype属性。
        // 除toString方法可被MF枚举外，其他成员都不可被枚举。
        oDerivedClass.prototype.toString = oBaseClass.prototype.toString;
        // 指定基类
        //oDerivedClass._baseClass = oBaseClass;
        
        // 保留基类的原型，供以后调用基类方法。
        oDerivedClass._base = oBaseClass.prototype;
    },
    
    implement : function(oDerivedClass, oBaseInterface)
    {
        this.extend(oDerivedClass.prototype, oBaseInterface.prototype);
        
        if(!oDerivedClass._baseInterfaceList)
        {
            oDerivedClass._baseInterfaceList = [];
        }
        
        var interfaceList = oDerivedClass._baseInterfaceList;

        interfaceList[interfaceList.length] = oBaseInterface;
    },

    createObject : function(oData)
    {
        /// <summary>创建一个对象</summary>
        /// <param name="oData" type="Object">对象数据</param>
        
        var typeName = oData.tn;
        if(typeName && this._classInfoList[typeName])
        {
            return new this._classInfoList[typeName](oData);
        }
    },
    
    reflectName : function(oVar, oScope)
    {
        /// <summary>获取一个成员的名称</summary>
        /// <param name="oVar" type="Object">成员</param>
        /// <param name="oScope" type="Object">范围</param>

        for(var key in oScope)
        {
            if(oScope[key] === oVar)
            {
                return key;
            }
        }
    }
};
