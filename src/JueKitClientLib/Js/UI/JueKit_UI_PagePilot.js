/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.PagePilot
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.PagePilot = JueKit.Type.createClass("JueKit.UI.PagePilot", JueKit.UI.RichClientWebControl,
{
    cssCls : "juePagePilot",
    _pageNum : 1,
    _pageCount : 0,
    _totalCount : 0,
    _pageSize : 20,
    ctor : function(objData)
    {
        this._items = new JueKit.Collection.LinkedList();
        this._pageSize = objData.pageSize || 20;

        JueKit.UI.PagePilot._base.ctor.call(this, objData);
    },
    
    createDom : function(objData)
    {
        var cssCls = this.cssCls;
        var html = JueKit.String.format("<form onsubmit='return false;'><span class='{0}PageInfo'></span><a class='{0}Prev' href='javascript:void(0);'>{1}</a><a class='{0}Next' href='javascript:void(0);'>{2}</a><input type='text' class='{0}PageNumTxt' size='1' /> / <span></span></form>", cssCls,
            JueKitSR["prevPage"],
            JueKitSR["nextPage"]);
        this._el = JueKit.Dom.createEl("div", {id:objData.id, className:cssCls}, html);
        
        JueKit.UI.PagePilot._base.createDom.call(this, objData);
    },
    
    parseDom : function(objData)
    {
        this._elForm = JueKit.Dom.getFirstChild(this._el);
        this._elPageInfo = JueKit.Dom.getFirstChild(this._elForm);
        this._elBtnPrev = JueKit.Dom.getNextEl(this._elPageInfo);
        this._elBtnNext = JueKit.Dom.getNextEl(this._elBtnPrev);
        this._elPageNum = JueKit.Dom.getNextEl(this._elBtnNext);
        this._elPageCount = JueKit.Dom.getNextEl(this._elPageNum);
        
        JueKit.UI.PagePilot._base.parseDom.call(this, objData);
    },
    
    bindDomEventHandlers : function(objData)
    {
        JueKit.Event.addHandler(this._elBtnPrev, "click", this.__hElBtnPrev_Click, this);
        JueKit.Event.addHandler(this._elBtnNext, "click", this.__hElBtnNext_Click, this);
        JueKit.Event.addHandler(this._elForm, "submit", this.__hElForm_Submit, this);
        
    },
    
    onInit : function(objData)
    {
        this.refreshPilot(1, this.get_pageSize(), 0);
    },
    
    __hElBtnPrev_Click : function(evt)
    {
        if(this._pageNum == 1)
        {
            return;
        }
        var oldPageNum = this._pageNum;
        this._pageNum--;
        this.fireEvent("pageChange", {pageNum:this._pageNum, oldPageNum:oldPageNum});
    },
    
    __hElBtnNext_Click : function(evt)
    {
        if(this._pageNum >= this._pageCount)
        {
            return;
        }
        var oldPageNum = this._pageNum;
        this._pageNum++;
        this.fireEvent("pageChange", {pageNum:this._pageNum, oldPageNum:oldPageNum});
    },
    
    __hElForm_Submit : function(evt)
    {
        var pageNum = parseInt(this._elPageNum.value.trim()) || 1;
        
        if(pageNum < 1)
        {
            pageNum = 1;
        }
        if(pageNum > this._pageCount)
        {
            pageNum = this._pageCount;
        }
        var oldPageNum = this._pageNum;
        this._pageNum = pageNum;
        this.fireEvent("pageChange", {pageNum:this._pageNum, oldPageNum:oldPageNum});
    },

    refreshPilot : function(pageNum, pageSize, totalCount)
    {
        this._pageNum = pageNum;
        this._pageSize = pageSize;
        this._totalCount = totalCount;
    
        if(this._totalCount == 0)
        {
            this._elPageInfo.innerHTML = "0-0 / 0";
            this._pageCount = 0;
        }
        else
        {
            var nBegin = this._pageSize * (this._pageNum-1) + 1;
            var nEnd = nBegin + this._pageSize - 1;
            if(nEnd > this._totalCount)
            {
                nEnd = this._totalCount;
            }
            
            this._pageCount = parseInt((this._totalCount - 1) / this._pageSize) + 1;
            
            this._elPageInfo.innerHTML = nBegin.toString() + "-" + nEnd + " / " + this._totalCount;
        }
        this._elPageNum.value = this._pageNum;
        this._elPageCount.innerHTML = this._pageCount;
        
        if(pageNum <= 1)
        {
            JueKit.Dom.addCssClass(this._elBtnPrev, this.cssCls + "PrevDisable");
        }
        else
        {
            JueKit.Dom.removeCssClass(this._elBtnPrev, this.cssCls + "PrevDisable");
        }
        if(pageNum >= this._pageCount)
        {
            JueKit.Dom.addCssClass(this._elBtnNext, this.cssCls + "NextDisable");
        }
        else
        {
            JueKit.Dom.removeCssClass(this._elBtnNext, this.cssCls + "NextDisable");
        }
    },
    
    get_pageNum : function()
    {
        return this._pageNum;
    },
    
    get_pageSize : function()
    {
        return this._pageSize || 20;
    },
    
    get_totalCount : function()
    {
        return this._totalCount;
    }
});

