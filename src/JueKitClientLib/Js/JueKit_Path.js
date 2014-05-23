/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.Path
JueKit.Path = {
    __splitLast : function(text, splitter)
    {
        if(text === undefined
            || text === null
            || text === "")
        {
            return "";
        }
        var nDotIndex = text.lastIndexOf(splitter);
        if(nDotIndex == -1)
        {
            return "";
        }
        return text.substr(nDotIndex + splitter.length).toLowerCase();
    },
    
    getFileName : function(path, splitter)
    {
        var retVal = this.__splitLast(path, splitter);
        if(retVal == "")
        {
            return path;
        }
    },
    
    getExtName : function(path)
    {
        return this.__splitLast(path, ".");
    }
};
