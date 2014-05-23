/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.Renderers
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.Renderers =
{
    commandLink : function(commandName, title)
    {
        return function(value)
        {
            return "<a _jueCmdName='" + commandName + "'>" + title + "</a>";
        };
    }
};

