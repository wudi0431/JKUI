/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.Calendar
JueKit.Type.registerNamespace("JueKit.UI");

 // JueKit.UI.Calendar
JueKit.UI.Calendar = JueKit.Type.createClass("JueKit.UI.Calendar", JueKit.UI.RichClientWebControl,
{
    onInitProperty : function(objData)
    {
        this._date = objData.date;
        if(!this._date)
        {
            this._date = new Date();
        }
        
        this._weekStartDay = objData.weekStartDay || 0;

        this._currentDate = objData.currentDate || JueKit.DateTime.today().get_value();
        this._calendarYear = objData.calendarYear || this._currentDate.getFullYear();
        this._calendarMonth = objData.calendarMonth || this._currentDate.getMonth();
    },

    createDom : function(objData)
    {
        this._el = JueKit.UI.Calendar.__getCalendarDom();
        
        JueKit.UI.Calendar._base.createDom.call(this, objData);
    },
    
    parseDom : function(objData)
    {
        this._elLocator = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elCalendar = JueKit.Dom.getNextEl(this._elLocator);
        this._elOperation = JueKit.Dom.getNextEl(this._elCalendar);
        
        this._elBtnYearPrev = this._elLocator.firstChild;
        this._elLblYear = this._elBtnYearPrev.nextSibling;
        this._elBtnYearNext = this._elLblYear.nextSibling;
        this._elBtnMonthPrev = this._elBtnYearNext.nextSibling;
        this._elLblMonth = this._elBtnMonthPrev.nextSibling;
        this._elBtnMonthNext = this._elLblMonth.nextSibling;
    },
    
    bindDomEventHandlers : function(objData)
    {
        JueKit.Event.addHandler(this._elBtnYearPrev, "click", this.__hElBtnYearPrev_Click, this);
        JueKit.Event.addHandler(this._elBtnYearNext, "click", this.__hElBtnYearNext_Click, this);
        JueKit.Event.addHandler(this._elBtnMonthPrev, "click", this.__hElBtnMonthPrev_Click, this);
        JueKit.Event.addHandler(this._elBtnMonthNext, "click", this.__hElBtnMonthNext_Click, this);
        JueKit.Event.addHandler(this._elCalendar, "click", this.__hElCalendar_Click, this);
    },
    
    __hElBtnYearPrev_Click : function(evt)
    {
        this._calendarYear -= 1;
        this.__refreshCalendar();
    },
    
    __hElBtnYearNext_Click : function(evt)
    {
        this._calendarYear += 1;
        this.__refreshCalendar();
    },
    
    __hElBtnMonthPrev_Click : function(evt)
    {
        var nMonth = this._calendarYear * 12 + this._calendarMonth - 1;
        this._calendarMonth = nMonth % 12;
        this._calendarYear = parseInt(nMonth/12);
        this.__refreshCalendar();
    },
    
    __hElBtnMonthNext_Click : function(evt)
    {
        var nMonth = this._calendarYear * 12 + this._calendarMonth + 1;
        this._calendarMonth = nMonth % 12;
        this._calendarYear = parseInt(nMonth/12);
        this.__refreshCalendar();
    },
    
    __hElCalendar_Click : function(evt)
    {
        var el = JueKit.Event.srcEl(evt);
        el = JueKit.Dom.getParent(el, "A");
        
        if(el)
        {
            if(JueKit.Dom.hasCssClass(el, "jueCalendarDayDisabled"))
            {
                return;
            }
        
            if(this._elToday)
            {
                JueKit.Dom.removeCssClass(this._elToday, "jueCalendarDayToday");
            }
            this._elToday = el;
            JueKit.Dom.addCssClass(this._elToday, "jueCalendarDayToday");
            el = JueKit.Dom.getParent(el, "TD");
            
            var oldDate = this._currentDate;
            
            this._currentDate = (new JueKit.DateTime(this._firstDate.getTime())).addDay((el.parentNode.rowIndex-1) * 7 + el.cellIndex).get_value();
            
            this.fireEvent("click", {oldDate : oldDate, currentDate : this._currentDate});
        }
        
    },
    
    onInit : function(objData)
    {
        var el = this._elCalendar;
        var tr = el.tBodies[0].rows[0];
        for(var i=0; i<7; i++)
        {
            tr.cells[i].innerHTML = JueKitSR["dayNameAbb"][i];
        }
        this.__refreshCalendar();
    },
        
    __refreshCalendar : function()
    {
        this._elLblYear.innerHTML = this._calendarYear;
        this._elLblMonth.innerHTML = JueKitSR["monthNameSum"][this._calendarMonth];
    
        var el = this._elCalendar;

        var firstDateOfMonth = new Date(this._calendarYear, this._calendarMonth, 1);
        var lastDateOfMonth = (new JueKit.DateTime(firstDateOfMonth.getTime())).addMonth(1).addDay(-1).get_value();
        var firstDay = firstDateOfMonth.getDay();
        this._firstDate = (new JueKit.DateTime(firstDateOfMonth.getTime())).addDay(-1 * firstDay).get_value();
        var curDate = new Date(this._firstDate.getTime());
        
        var tBody = el.tBodies[0];
        var td, a;
        
        var minDate;
        
        if(this._minDate)
        {
            minDate = this._minDate.get_value();
        }
        for(var i=7; i<49; i++)
        {
            td = tBody.rows[parseInt(i/7)].cells[i%7];
            a = td.firstChild;
            a.innerHTML = curDate.getDate();
            if(curDate < firstDateOfMonth)
            {
                a.className = "jueCalendarDayPrevM";
            }
            else if(curDate > lastDateOfMonth)
            {
                a.className = "jueCalendarDayNextM";
            }
            else if(curDate - this._currentDate == 0)
            {
                this._elToday = a;
                a.className = "jueCalendarDayToday";
            }
            else
            {
                a.className = "jueCalendarDayThisM";
            }
            
            if(minDate && curDate < minDate)
            {
                a.className = "jueCalendarDayDisabled";
            }
            
            curDate.setTime(curDate.getTime() + JueKit.DateTime._TM_DAY);
        }
    },
    
    get_currentDate : function()
    {
        return this._currentDate;
    },
    
    set_currentDate : function(value)
    {
        if(value)
        {
            if (typeof value == "string" && value != "")
            {
                value = JueKit.DateTime.parse(vlaue).justDate();
            }
            else if(value instanceof JueKit.DateTime)
            {
                value = value.justDate();
            }
            else if(value instanceof Date)
            {
                value = (new JueKit.DateTime(value)).justDate();
            }

            if(value.get_value)
            {
                value = value.get_value();
            }
        }
        
        this._currentDate = value;
    },
    
    get_minDate : function()
    {
        return this._minDate;
    },
    
    set_minDate : function(value)
    {
        if(value)
        {
            value = value.justDate();
        }
        var oldDate = this._minDate;
        this._minDate = value;
        if(oldDate != this._minDate)
        {
            this.__refreshCalendar();
        }
    },
    
    get_maxDate : function()
    {
        return this._maxDate;
    },
    
    set_maxDate : function(value)
    {
        if(value)
        {
            value = value.justDate();
        }
        var oldDate = this._maxDate;
        this._maxDate = value;
        if(oldDate != this._maxDate)
        {
            this.__refreshCalendar();
        }
    },
    
    setCalendar : function(year, month)
    {
        if(year < 1970)
        {
            year = 1970;
        }
        this._calendarYear = year;
        
        if(month <=0)
        {
            month =0;
        }
        if(month > 12)
        {
            month = 12;
        }
        
        this._calendarMonth = month;
        this.__refreshCalendar();
    }
});

JueKit.UI.Calendar.__getCalendarDom = function()
{
    if(!this._calendarTemplate)
    {
        var html;
        var sb = new JueKit.Text.StringBuilder();
        sb.append("<div class='jueCalendarWrap'>");
        sb.append("<div class='jueCalendarLocator'>");
        sb.append("<a class='jueCalendarYearPrev' href='javascript:void(0);'></a>");
        sb.append("<span class='jueCalendarYear'></span>");
        sb.append("<a class='jueCalendarYearNext' href='javascript:void(0);'></a>");
        sb.append("<a class='jueCalendarMonthPrev' href='javascript:void(0);'></a>");
        sb.append("<span class='jueCalendarMonth'></span>");
        sb.append("<a class='jueCalendarMonthNext' href='javascript:void(0);'></a>");
        sb.append("</div>");
        sb.append("<table cellpadding='0' cellspacing='0' class='jueCalendar'><tbody><tr>");
        for(var i=0; i<7; i++)
        {
            sb.append("<th class='jueCalendarDay" + i + "'>&nbsp;</th>");
        }
        sb.append("</tr>");
        for(var i=0; i<6; i++)
        {
            sb.append("<tr>");
            for(var j=0; j<7; j++)
            {
                sb.append("<td class='jueCalendarDay" + j + "'><a href='javascript:void(0);'>&nbsp;</a></td>");
            }
            sb.append("</tr>");
        }
        sb.append("</tbody></table>");
        sb.append("</div>");
        var elContainer = JueKit.Dom.createEl("div", null,
            sb.toString());
        this._calendarTemplate = elContainer.childNodes[0];
    }
    
    return this._calendarTemplate.cloneNode(true);
};


