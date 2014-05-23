/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Data.Rendererers
JueKit.Type.registerNamespace("JueKit.Data");

JueKit.Data.Renderers =
{
    date : function(format)
    {
        return function(value)
        {
            if(typeof value === "string")
            {
                value = JueKit.DateTime.parse(value);
                if(value != null)
                {
                    return value.format(format);
                }
                return "";
            }
            return JueKit.DateTime.format(value, format);
        };
    },
    
    justDate : function(value)
    {
        return JueKit.DateTime.format(value, "yyyy-MM-dd");
    },
    
    fileSize : function(value)
    {
        return JueKit.Number.formatSize(value);
    }
};

