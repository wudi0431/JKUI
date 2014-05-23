/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKIt.Validator
JueKit.Validator =
{
    validate : function(value, options, element, name)
    {
        /// <summary>对数据进行有效性验证</summary>
        /// <param name="value" type="Object">待验证的值</param>
        /// <param name="options" type="Object">验证选项</param>
        /// <param name="element" type="Object">验证的元素，这个参数会在调用验证失败的回调函数时传给回调函数</param>
        /// <param name="name" type="String">被验证元素的名称，作为参数传给回调函数</param>
        
        // 验证是否为空
        var vi = options.notEmpty;
        if(vi)
        {
            if(value === undefined || value === null || value === "")
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'notEmpty', vi);
                }
                else
                {
                    // TODO: 在此添加默认行为
                }
                return false;
            }
        }
        else
        {
            if(value === undefined || value === null || value === "")
            {
                return true;
            }
        }
        
        vi = options.isNumber;
        if(vi)
        {
            if(isNaN(value)==true)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'isNumber', vi);
                }
                else
                {
                    // TODO: 在此添加默认行为
                }
                return false;
            }
        }
        
        //验证是否为日期
        vi = options.isDate;
        if(vi)
        {
            var reg=/^\d{4}-\d{1,2}-\d{1,2}$/g;
            
            var r = value.match(reg);
            if(!r)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'isDate', vi);
                }
                return false;
            }
        }
        
        // 验证是否和指定的值相等
        vi = options.equalTo;
        if(vi)
        {
            if(value != vi.value)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'equalTo', vi);
                }
                return false;
            }
        }
        
        // 验证最小长度
        vi = options.minLength;
        if(vi)
        {
            if(value.toString().length < vi.value)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'minLength', vi);
                }
                return false;
            }
        }
        
        // 验证最大长度
        vi = options.maxLength;
        if(vi)
        {
            if(value.toString().length > vi.value)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'maxLength', vi);
                }
                return false;
            }
        }
        
        // 验证最小值
        vi = options.minValue;
        if(vi)
        {
            if(value < vi.value)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'minValue', vi);
                }
                return false;
            }
        }
        
        // 验证最大值
        vi = options.maxValue;
        if(vi)
        {
            if(value > vi.value)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'maxValue', vi);
                }
                return false;
            }
        }
        
        // 
        vi = options.compareValue;
        if(vi)
        {
            var isMatch=false;
            switch(vi.condition)
            {
                case '==':
                    if(value = vi.value)
                        isMatch=true;
                    break;
                case '>':
                    if(value > vi.value)
                        isMatch=true;
                    break;
                case '>=':
                    if(value >= vi.value)
                        isMatch=true;
                    break;
                case '<':
                    if(value < vi.value)
                        isMatch=true;
                    break;
                case '<=':
                    if(value <= vi.value)
                        isMatch=true;
                    break;
                case '!=':
                    if(value != vi.value)
                        isMatch=true;
                    break;
            }
            
            if(!isMatch)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'compareValue', vi);
                }
                return false;
            }
        }
     
        //验证文件名.
        vi = options.fileName;
        if(vi)
        {
            var reg=/[\*]|[\|]|[\\]|[\:]|[<]|[>]|[\?]|[/]|[\r]|[\t]|[\n]/g;
            var r = value.match(reg);
            if(r)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'ext', vi);
                }
                return false;
            }
        }
        
        //验证扩展名
        vi = options.exts;
        if(vi)
        {
            var reg=/^[\.]([^\*\|\\\:<>\?/\r\t\n])+$/g;
            var extsList=value.split("|");
            for(var n=0;n<extsList.length;n++)
            {
                var ext=extsList[n];
                if(ext)
                {
                    var r=ext.match(reg);
                    if(!r)
                    {
                        vi.ext=ext;
                        if(vi.onFailed)
                        {
                            vi.onFailed.call(vi.scope, element, name,'exts', vi);
                        }
                        return false;
                    }
                }
            }
        }
        
        //验证是否为Email地址
        vi = options.email;
        if(vi)
        {
            //var emailOptions={regex:{value:"/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/g",onFailed:onFailed}};
            var reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/g;
            
            var r = value.match(reg);
            if(!r)
            {
                if(vi.onFailed)
                {
                    vi.onFailed.call(vi.scope, element, name,'email', vi);
                }
                return false;
            }
        }
        
        return true;
    }
};
