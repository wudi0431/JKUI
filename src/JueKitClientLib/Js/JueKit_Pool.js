/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.Pool
JueKit.Type.registerNamespace("JueKit");

JueKit.Pool = JueKit.Type.createClass("JueKit.Pool", null,
{
    // 存储对象的数组
    //_entries : null,
    
    // 池里所允许的最大对象数量
    // 如果值为-1，则表示没有限制
    //_maxSize : -1,
    
    // 当前已经被租用的对象数量
    _usedCount : 0,
    
    // 当前池中的对象数量
    _currentSize : 0,
    
    ctor : function(maxSize)
    {
        /// <summary>创建一个缓存池</summary>
        /// <param name="maxSize" type="Number">最大对象数量</param>
        
        this._maxSize = maxSize || -1;
        this._entries = [];
    },
    
    get_maxSize : function()
    {
        /// <summary>获取缓存池的最大大小</summary>

        return this._maxSize;
    },
    
    set_maxSize : function(value)
    {
        /// <summary>设置缓存池的最大大小</summary>
        
        this._maxSize = value;
    },
    
    __getEntry : function(index)
    {
        /// <summary>获取参数index所指定位置的对象</summary>

        if(index < this._currentSize)
        {
            return this._entries[index];
        }
        //return undefined;
    },

    __appendEntry : function(entry)
    {
        /// <summary>将对象添加到对象列表中</summary>
    
        this._entries[this._currentSize] = entry;
        this._currentSize ++;
    },
    
    gain : function()
    {
        /// <summary>从缓存池中获取可用的对象。如果获取失败，则返回null</summary>

        if(this._usedCount == this._maxSize)
        {
            // 已经达到最大对象上限，直接返回null
            return null;
        }

        var entry;
        if(this._usedCount < this._currentSize)
        {
            //如果池中还有可用的对象，直接从池中获取对象
            entry = this.__getEntry(this._usedCount);
        }
        if(entry === undefined)
        {
            entry = this.createEntry();
            this.__appendEntry(entry);
        }
        this.initEntry(entry);
        this._usedCount ++;

        return entry;
    },
    
    release : function(entry)
    {
        var temp = this._entries[this._usedCount-1];
        
        if(entry !== temp)
        {
            for(var i=0; i<this._usedCount; i++)
            {
                if(this._entries[i] === entry)
                {
                    this._entries[i] = temp;
                    break;
                }
            }
            this._entries[this._usedCount-1] = entry;
        }
        
        this.cleanEntry(entry);
        this._usedCount --;
    }
    
    /*
    createEntry : function()
    {
        return null;
    },
    */
    
    /*
    initEntry : function(entry)
    {
        
    },
    */
    
    /*
    cleanEntry : function(entry)
    {
    },
    */
    
    /*
    destroyEntry : function(entry)
    {
    },
    */
});
