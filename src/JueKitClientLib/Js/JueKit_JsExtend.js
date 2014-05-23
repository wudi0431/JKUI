/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

JueKit.Type.extend(String.prototype,
{
    HTMLEncode : function()
    {
        return JueKit.String.HTMLEncode(this);
    },
    HTMLDecode : function(s)
    {
        return JueKit.String.HTMLDecode(this);
    },
    stripTags : function()
    {
        return this.replace(/>\s+</gi, '><').replace(/<\/?[^>]+>/gi, '').replace(/\r\n/gi, ' ');
    },
    stripScripts : function()
    {
        return this.replace(new RegExp(JueKit.scriptFragment, 'img'), '');
    },
    evalScripts : function()
    {
        var reAll = new RegExp(JueKit.scriptFragment, 'img');
        var reOne = new RegExp(JueKit.scriptFragment, 'im');
        var scripts = this.match(reAll);
        for(var i=0; i<scripts.length; i++)
        {
            eval(scripts[i].match(reOne)[1]);
        }
    },
    camelize : function()
    {
        var oStringList = this.split('-');
        if(oStringList.length == 1)
        {
            return oStringList[0];
        }

        var camelizedString = this.indexOf('-') == 0
            ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
            : oStringList[0];
        
        for (var i=1, len=oStringList.length; i<len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },
    hyphenlize : function()
    {
        var hyphenlizedString = '';
        var hyphenlizedString = '';
        for(var i = 0, len = this.length;i < len; ++i)
        {
            if(this.charAt(i) == this.charAt(i).toUpperCase())
            {
                hyphenlizedString = hyphenlizedString + '-' + this.charAt(i).toLowerCase();
            }
            else
            {
                hyphenlizedString = hyphenlizedString + this.charAt(i);
            }
        }
        return hyphenlizedString;
    },
    trim : function()
    {
        return this.replace(/(^[\s]*)|([\s]*$)/g, "");
    },
    include : function(s1, s2)
    {
        return JueKit.String.include(this, s1, s2);
    },
    toObject : function()
    {
        try
        {
            return eval('(' + this + ')');
        }
        catch(e)
        {
            return eval(this);
        }
    }
});


JueKit.String = 
{
    _sreg : /{(\d+)?}/g,
    
    format : function(text)
    {
        if(arguments.length == 0)
            return "";

        if(arguments.length == 1)
            return text;

        var args = arguments;
        text = text.replace(this._sreg,
            function($0, $1) {
                return args[parseInt($1)+1];
            }
        );
        
        return text;
    },
    
    trim : function(s)
    {
        return s.replace(/(^[\s]*)|([\s]*$)/g, "");
    },
    
    include : function(s, s1, s2)
    {
        if(!s2 || !s2.length)
        {
            return s.indexOf(s1)>-1 ? true : false;
        }
        else
        {
            return (s2+s+s2).indexOf(s2+s1+s2)>-1 ? true : false;
        }
    },
    
    __HTMLEncode : function(s)
    {
        this._elEncodeT.data = s;
        return this._elEncodeP.innerHTML;
    },
    
    HTMLEncode : function(s)
    {
        this._elEncodeP = JueKit.Dom.createEl('p');
        this._elEncodeT = document.createTextNode(s);
        this._elEncodeP.appendChild(this._elEncodeT);
        
        this.HTMLEncode = this.__HTMLEncode;
        delete this.__HTMLEncode;
        
        return this._elEncodeP.innerHTML;
    },
    
    HTMLDecode : function(s)
    {
        var d = JueKit.Dom.createEl('div', null, s);
        return d.innerText;
    },
    
    isNullOrEmpty : function(s)
    {
        return (s === undefined
            || s == null
            || s == "");
    },
        
    substrEx : function(s, bytes)
    {
        if(s === undefined || s === null || s === "")
        {
            return "";
        }

        var i = 0;
        var uFF61 = 65377;	//parseInt("FF61", 16)
        var uFF9F = 65439;	//parseInt("FF9F", 16)
        var uFFE8 = 65512;	//parseInt("FFE8", 16)
        var uFFEE = 65518;	//parseInt("FFEE", 16)
        while(i < s.length && bytes > 0)
        {
            var c = s.charCodeAt(i);
            if(c < 256
                || ((uFF61 <= c) && (c <= uFF9F))
                || ((uFFE8 <= c) && (c <= uFFEE)))
            {
                bytes -= 1;
            }
            else
            {
                bytes -= 2;
            }
            i ++;
        }

        
        if(s.length > i)
        {
            return s.substr(0, i) + "...";
        }
        return s.substr(0, i);
    }
};

JueKit.Number =
{
    format : function(value, format)
    {
    },
    
    formatSize : function(calSize)
    {
        if(calSize === undefined)
        {
            return "";
        }
    
        var sizeLevel = 0;
        //while(calSize/1024 >= 1)
        while(calSize > 900)
        {
            sizeLevel++;
            calSize	= calSize/1024;
        }
        calSize = calSize.toString();
        calSize = calSize.substring(0,calSize.indexOf(".") > -1 ? calSize.indexOf(".") + 3 : calSize.length);
        //calSize	= Math.floor(calSize);
        var retValue;
        switch(sizeLevel)
        {
            default:
            case 0: retValue	= calSize+ " Bytes";	break;
            case 1: retValue	= calSize+ " KB";	break;
            case 2: retValue	= calSize+ " MB";	break;
            case 3: retValue	= calSize+ " GB";	break;
            case 4: retValue	= calSize+ " TB";	break;
            case 5: retValue	= calSize+ " EB";	break;
        }
        return retValue;
    }
};

JueKit.DateTime = JueKit.Type.createClass("JueKit.DateTime", null,
{
    ctor : function(year, month, date, hours, minutes, seconds, ms)
    {
        if(arguments.length == 0)
        {
            this._value = new Date();
        }
        else if(arguments.length == 1)
        {
            this._value = new Date(year);
        }
        else
        {
            month = month || 0;
            date = date || 0;
            hours = hours || 0;
            minutes = minutes || 0;
            seconds = seconds || 0;
            ms = ms || 0;
            this._value = new Date(year, month, date, hours, minutes, seconds, ms);
        }
    },
    
    justDate : function()
    {
        var tm = this._value.getTime();
        return new JueKit.DateTime(this._value.getFullYear(),
            this._value.getMonth(),
            this._value.getDate(),
            0, 0, 0, 0);
    },
    
    justTime : function()
    {
        return new JueKit.DateTime(this._value.getTime() % JueKit.DateTime._TM_DAY);
    },
    
    addYear : function(years)
    {
        var nYear = this._value.getFullYear() + years;
        this._value = new Date(nYear,
            this._value.getMonth(),
            this._value.getDate(),
            this._value.getHours(),
            this._value.getMinutes(),
            this._value.getHours(),
            this._value.getMilliseconds());
            
        return this;
    },
    
    addMonth : function(months)
    {
        var nMonth = this._value.getFullYear() * 12 + this._value.getMonth() + 1;
        nYear = parseInt(nMonth/12);
        nMonth = nMonth % 12;

        this._value = new Date(nYear,
            nMonth,
            this._value.getDate(),
            this._value.getHours(),
            this._value.getMinutes(),
            this._value.getHours(),
            this._value.getMilliseconds());
        
        return this;
    },
    
    addDay : function(days)
    {
        this._value.setTime(this._value.getTime() + JueKit.DateTime._TM_DAY * days);
        
        return this;
    },
    
    get_value : function()
    {
        return new Date(this._value.getTime());
    },
    
    format : function(format)
    {
        return JueKit.DateTime.format(this._value, format);
    },
    
    toString : function()
    {
        return this.format("yyyy-MM-dd hh:mm:ss");
    }
});

JueKit.Type.extend(JueKit.DateTime, 
{
    _TM_SECOND : 1000,
    _TM_MINUTE : 60000,
    _TM_HOUR : 3600000,
    _TM_DAY : 86400000,
    _MONTH_NUM : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    // 2008-12-31 18:08:08
    _re1 : /^(\d{4})-(\d{1,2})-(\d{1,2})(?: (\d{1,2}):(\d{1,2}):(\d{1,2})(?::(\d{1,3}))?)?$/,
    // 12/31/2008 18:08:08
    _re2 : /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?: (\d{1,2}):(\d{1,2}):(\d{1,2})(?::(\d{1,3}))?)?$/,
    // 12-31-2008 18:08:08
    _re3 : /^(\d{1,2})-(\d{1,2})-(\d{4})(?: (\d{1,2}):(\d{1,2}):(\d{1,2})(?::(\d{1,3}))?)?$/,
    format : function(value, format)
    {
        if(!value)
        {
            return "";
        }
        
        var strM = (value.getMonth()+1).toString();
        var strD = value.getDate().toString();
        var strH = value.getHours().toString();
        var strMin = value.getMinutes().toString();
        var strS = value.getSeconds().toString();
        var str = format.replace("yyyy", value.getFullYear());
        str = str.replace("MMM", this._MONTH_NUM[value.getMonth()]);
        str = str.replace("MM", strM.length == 1 ? "0" + strM : strM);
        str = str.replace("dd", strD.length == 1 ? "0" + strD : strD);
        str = str.replace("hh", strH.length == 1 ? "0" + strH : strH);
        str = str.replace("mm", strMin.length == 1 ? "0" + strMin : strMin);
        str = str.replace("ss", strS.length == 1 ? "0" + strS : strS);
        
        str = str.replace("yy", value.getFullYear().toString().substr(2));
        str = str.replace("MM", strM);
        str = str.replace("dd", strD);
        str = str.replace("hh", strH);
        str = str.replace("mm", strMin);
        str = str.replace("ss", strS);

        return str;
    },
    
    parse : function(str)
    {
        /// <summary>解析时间字符串</summary>
        /// <param name="str" type="String">时间字符串。如："2008-08-08 12:01:02"</param>
        var res = this._re1.exec(str);
        if(res)
        {
            return new JueKit.DateTime(parseInt(res[1], 10), parseInt(res[2]-1, 10), parseInt(res[3], 10), parseInt(res[4], 10), parseInt(res[5], 10), parseInt(res[6], 10), parseInt(res[7], 10));
        }
        res = this._re2.exec(str);
        if(res)
        {
            return new JueKit.DateTime(parseInt(res[3], 10), parseInt(res[1]-1, 10), parseInt(res[2], 10), parseInt(res[4], 10), parseInt(res[5], 10), parseInt(res[6], 10), parseInt(res[7], 10));
        }		
        res = this._re3.exec(str);
        if(res)
        {
            return new JueKit.DateTime(parseInt(res[3], 10), parseInt(res[1]-1, 10), parseInt(res[2], 10), parseInt(res[4], 10), parseInt(res[5], 10), parseInt(res[6], 10), parseInt(res[7], 10));
        }		
        return null;
    },
    
    parse2 : function(str, format)
    {
        
    },
    
    now : function()
    {
        return new JueKit.DateTime();
    },
    
    today : function()
    {
        return this.now().justDate();
    }
});


JueKit.toJSON = function(obj)
{
    if(obj instanceof String || typeof obj == "string")
    {
        obj = obj.replace(/\\/gi, "\\\\");
        obj = obj.replace(/\\t/gi, "\\t");
        obj = obj.replace(/\\r/gi, "\\r");
        obj = obj.replace(/\\n/gi, "\\n");
        return '"' + obj.replace(/"/gi, '\\"') + '"';
    }

    if(typeof obj == "boolean")
    {
        return obj.toString();
    }

    if(typeof obj == "number")
    {
        return obj.toString()
    }

    var sb = new JueKit.Text.StringBuilder();

    if(obj instanceof Array)
    {
        sb.append("[");
        for(var i=0, len = obj.length; i<len; i++)
        {
            if(i > 0)
            {
                sb.append(",");
            }
            sb.append(JueKit.toJSON(obj[i]));
        }
        sb.append("]");
    }
    else if(obj instanceof Object)
    {
        var count = 0;
        sb.append("{");
        for(var key in obj)
        {
            if(obj.hasOwnProperty(key))
            {
                if(count > 0)
                {
                    sb.append(",");
                }
                var value = obj[key];
                sb.append(JueKit.toJSON(key));
                sb.append(":");
                sb.append(JueKit.toJSON(value));

                count++;
            }
        }
        sb.append("}");
    }

    return sb.toString();
};

