/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.ProgressBar
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.ProgressBar = JueKit.Type.createClass("JueKit.UI.ProgressBar", JueKit.UI.RichClientWebControl,
{
    onInitProperty : function(objData)
    {
        if(objData.minValue === undefined)
        {
            this._minValue = 0;
        }
        else
        {
            this._minValue = objData.minValue;
        }

        if(objData.maxValue === undefined)
        {
            this._maxValue = 100;
        }
        else
        {
            this._maxValue = objData.minValue;
        }

        this._currentValue = objData.currentValue || 0;
        this._isSmooth = objData.isSmooth;
        this._isCycle = objData.isCycle;
        
        JueKit.UI.ProgressBar._base.onInitProperty.call(this, objData);
    },
    
    onLoad : function()
    {
        this.__updateProgressBarPassed();
    },
    
    bindDomEventHandlers : function()
    {
    },
    
    createDom : function(objData)
    {
    },
    
    parseDom : function()
    {
        this._elProgressBarPassed = JueKit(this._id + "_passed");
    },
    
    get_currentValue : function()
    {
        return this._currentValue || 0;
    },
    
    set_currentValue : function(value)
    {
        if(value == this._currentValue)
        {
            return;
        }
        if(value < this._minValue)
        {
            value = this._minValue;
        }
        
        if(value > this._maxValue)
        {
            value = this._maxValue;
        }
        
        this._currentValue = value;
        this.__updateProgressBarPassed();
        this.fireEvent("change");
    },
    
    get_percentage : function()
    {
        if(this._currentValue <= this._minValue)
        {
            return 0;
        }
        else if(this._currentValue >= this._maxValue)
        {
            return 100;
        }
        else
        {
            return (this._currentValue - this._minValue) * 100 / (this._maxValue - this._minValue);
        }
        
    },
    
    __updateProgressBarPassed : function()
    {
        if(this._elProgressBarPassed)
        {
            this._elProgressBarPassed.style.width = this.get_percentage().toString() + "%";
        }
    }
});
