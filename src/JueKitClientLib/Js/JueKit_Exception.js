/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Exception
JueKit.Exception = JueKit.Type.createClass("JueKit.Exception", Error,
{
    name : "JueKit Exception",

    ctor : function(message)
    {
        this.message = message;
        this.description = message;
    }
});
