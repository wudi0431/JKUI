/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// 剪贴板操作类
JueKit.ClipBoard =
{
    _cpCnt : 0,
    copy : function(value)
    {
        if(!JueKit.theRcp)
        {
            return false;
        }
        var flashUrl = JueKit.theRcp.get_clientLibUrl() + "cp.swf";

        var elWrap = this._elWrap,
            wrapId = "_jueCpFlashWrap";
            flashId = "_jueCpFlash" + this._cpCnt++;
        if(!elWrap)
        {
            elWrap = document.createElement("div");
            elWrap.id = wrapId;
            document.body.appendChild(elWrap);
            this._elWrap = elWrap;
        }
        
        elWrap.innerHTML = "<embed src=\"" + flashUrl + "\" flashvars=\"clipboard="+encodeURIComponent(value)+"\" width=\"0\" height=\"0\" type=\"application/x-shockwave-flash\" id=\"" + flashId + "\" />";
        
        // TODO: 判断是否安装了 Flash
        
        // 检测是否安装了 Flash
        var flashObj = window[flashId] || document[flashId] || {};
        if (!flashObj.SetVariable)
        {
            // 没有 flash
            try
            {
                return window.clipboardData.setData("Text", value);
            }
            catch(ex)
            {
                return false;
            }
        }
        

        return true;
    }
};

