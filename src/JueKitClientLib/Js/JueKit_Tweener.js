/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKIt.Tweener
JueKit.Tweener = JueKit.Type.createClass("JueKit.Tweener", null,
{
    ctor : function(time, interval, formula)
    {
        /// <summary>创建一个渐变类</summary>
        /// <param name="time" type="Number">渐变时间，单位为毫秒</param>
        /// <param name="interval" type="Number">渐变的间隔时间，单位为毫秒</param>
        /// <param name="formula" type="Number">渐变规则</param>

        this._time = time || 2000;
        this._interval = interval || 40;
        this._formula = formula || JueKit.Tweener.defaultFormula;
    },
    
    tween : function(onStep, onComplete)
    {
        /// <summary>开始渐变</summary>
        /// <param name="onStep" type="Function">渐变时的回调函数</param>
        /// <param name="onComplete" type="Function">渐变结束后的回调函数</param>

        var time = this._time;
        var interval = this._interval;
        var formula = this._formula;
        
        var end = formula(1);
        var t = 0;
        function cb()
        {
            t += interval;
            var x = t/time;
            if(x < 1)
            {
                onStep(formula(x)/end);
            }
            else
            {
                onStep(1);
                onComplete && onComplete();
                clearInterval(intervalId);
            }
        }
        var intervalId = setInterval(cb, interval);
        return intervalId;
    },
    
    opacity : function(el, begin, end, onComplete)
    {
        var delta = end - begin;
        function onStep(rate)
        {
            JueKit.Dom.setStyle(el, "opacity", rate * delta + begin);
        }
        return this.tween(onStep, onComplete);
    },
    
    moveBy : function(el, offsetX, offsetY, onComplete)
    {
        var pos = JueKit.Dom.getPosition(el);
        var left = pos.left;
        var top = pos.top;
        
        function onStep(rate)
        {
            JueKit.Dom.setPosition(el, offsetX * rate + left, offsetY * rate + top);
        }
        return this.tween(onStep, onComplete);
    },
    
    sizeTo : function(el, offsetWidth, offsetHeight, fixHorizon, fixVertical, onComplete)
    {
        var size = JueKit.Dom.getSize(el);
        var pos = JueKit.Dom.getPosition(el);
        var width = size.width;
        var height = size.height;
        offsetWidth -= width;
        offsetHeight -= height;
        
        fixHorizon = fixHorizon || 0;
        fixVertical = fixVertical || 0;
        
        function onStep(rate)
        {
            JueKit.Dom.setOffsetWidth(el, offsetWidth * rate + width);
            JueKit.Dom.setOffsetHeight(el, offsetHeight * rate + height);
            
            if(fixHorizon == 1)
            {
                el.style.left = (pos.left - offsetWidth * rate) + "px";
            }
            if(fixVertical == 1)
            {
                el.style.top = (pos.top - offsetHeight * rate) + "px";
            }
        }
        return this.tween(onStep, onComplete);
    }
});

JueKit.Tweener.defaultFormula = function(x)
{
    /// <summary>默认的渐变规则</summary>
    
    return 1-Math.pow(1-x,3);
};

JueKit.Type.extend(JueKit.Tweener,
{
    /// <summary>默认的渐变器</summary>
    _defaultTweener : new JueKit.Tweener(),

    opacity : function(el, begin, end, onComplete)
    {
        return this._defaultTweener.opacity(el, begin, end, onComplete);
    },
    
    moveBy : function(el, offsetX, offsetY, onComplete)
    {
        return this._defaultTweener.moveBy(el, offsetX, offsetY, onComplete);
    },
    
    moveTo : function(el, positionX, positionY, onComplete)
    {
        var pos = JueKit.Dom.getPosition(el);
        var offsetX = positionX - pos.left;
        var offsetY = positionY - pos.top;
        
        return this._defaultTweener.moveBy(el, offsetX, offsetY, onComplete);
    },
    
    sizeTo : function(el, offsetWidth, offsetHeight, onComplete)
    {
        return this._defaultTweener.sizeTo(el, offsetWidth, offsetHeight, onComplete);
    }
});
