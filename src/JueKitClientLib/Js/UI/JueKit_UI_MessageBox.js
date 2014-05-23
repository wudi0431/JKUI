/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.MessageBox
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.MessageBox = JueKit.Type.createClass("JueKit.UI.MessageBox", JueKit.UI.Window,
{
    createDom : function(objData)
    {
        objData.innerHTML = "<div id='" + objData.id + "_msg' class='jueMsgBoxMsg'></div><div id='" + objData.id + "_btnGroup' class='jueMsgBoxBtnGroup'></div>";
        JueKit.UI.MessageBox._base.createDom.call(this, objData);

        
        this._btnYes = new JueKit.UI.Button(
            {
                text:JueKitSR["mngboxyes"],
                container:objData.id + "_btnGroup",
                ehl:
                {
                    click:{handler:this.__hBtnYes_Click, scope:this}
                }
            });
        this._btnYes.set_width(95);
        this._btnNo = new JueKit.UI.Button(
            {
                text:JueKitSR["mngboxno"],
                container:objData.id + "_btnGroup",
                ehl:
                {
                    click:{handler:this.__hBtnNo_Click, scope:this}
                }
            });
        this._btnNo.set_width(95);
        this._btnOK = new JueKit.UI.Button(
            {
                text:JueKitSR["mngboxok"],
                container:objData.id + "_btnGroup",
                ehl:
                {
                    click:{handler:this.__hBtnOK_Click, scope:this}
                }
            });
        this._btnOK.set_width(95);
        this._btnCancel = new JueKit.UI.Button(
            {
                text:JueKitSR["mngboxcancel"],
                container:objData.id + "_btnGroup",
                ehl:
                {
                    click:{handler:this.__hBtnCancel_Click, scope:this}
                }
            });
        this._btnCancel.set_width(95);
    },
    
    parseDom : function(objData)
    {
        JueKit.UI.MessageBox._base.parseDom.call(this, objData);
        
        this._elMsg = JueKit(objData.id + "_msg");
        this._elBbtnGroup = JueKit(objData.id + "_btnGroup");
    },
    
    __hBtnYes_Click : function(sender)
    {
        this.close(1);
    },
    
    __hBtnNo_Click : function(sender)
    {
        this.close(2);
    },
    
    __hBtnOK_Click : function(sender)
    {
        this.close(1);
    },
    
    __hBtnCancel_Click : function(sender)
    {
        this.close(0);
    },
    
    onRefreshControl : function()
    {
        this.set_innerWidth(800);

        // 设置消息框的最小宽度
        var w = this._elMsg.offsetWidth;
        if(w < 250)
        {
            w = 250;
        }
        
        var i=0;
        if(this._btnYes._state & 1)
        {
            i++;
        }
        if(this._btnNo._state & 1)
        {
            i++;
        }
        if(this._btnOK._state & 1)
        {
            i++;
        }
        if(this._btnCancel._state & 1)
        {
            i++;
        }
        
        if(w < 90 * i)
        {
            w = 90*i;
        }
        
        // 设置消息框的最大宽度
        if(w > 800)
        {
            w = 800;
        }

        this.set_innerWidth(w);
        
        if(JueKit.Browser.isIE)
        {
            // IE显示背景图标时的一个bug
            this._elMsg.style.height = "1";
            this._elMsg.style.height = "auto";
        }
        
    },
    
    set_maxHeight : function(value)
    {
        this._maxHeight = value;
        //this.__setViewChanged();
        var mh = this._maxHeight,
            em = this._elMsg;
        if(mh)
        {
            em.style.height = "";
            em.style.overflow = "visible";
            if(em.offsetHeight > mh)
            {
                em.style.height = mh + "px";
                em.style.overflow = "auto";
            }
        }
    },
    
    set_message : function(value)
    {
        ///<summary>设置消息的内容</summary>
        this._elMsg.innerHTML = value;
        this.__setViewChanged();
    },
    
    set_icon : function(value)
    {
        if(!value)
        {
            value = "";
        }
        
        this._icon = value.toLowerCase();
        switch(this._icon)
        {
            case "warning":
                this._elMsg.className = "jueMsgBoxMsg jueMsgBoxWarning";
                break;
            case "information":
                this._elMsg.className = "jueMsgBoxMsg jueMsgBoxInformation";
                break;
            case "question":
                this._elMsg.className = "jueMsgBoxMsg jueMsgBoxQuestion";
                break;
            case "error":
                this._elMsg.className = "jueMsgBoxMsg jueMsgBoxError";
                break;
            default:
                this._elMsg.className = "jueMsgBoxMsg";
                this._icon = "";
                break;
        }
        this.__setViewChanged();
    },
    
    set_buttons : function(value)
    {
        if(!value)
        {
            value = "";
        }
        
        this._buttons = value.toLowerCase();
        switch(this._buttons)
        {
            case "yes":
                this._btnYes.show();
                this._btnNo.show(false);
                this._btnOK.show(false);
                this._btnCancel.show(false);
                break;
            case "yesno":
                this._btnYes.show();
                this._btnNo.show();
                this._btnOK.show(false);
                this._btnCancel.show(false);
                break;
            case "ok":
                this._btnYes.show(false);
                this._btnNo.show(false);
                this._btnOK.show();
                this._btnCancel.show(false);
                break;
            case "okcancel":
                this._btnYes.show(false);
                this._btnNo.show(false);
                this._btnOK.show();
                this._btnCancel.show();
                break;
            case "yesnocancel":
                this._btnYes.show();
                this._btnNo.show();
                this._btnOK.show(false);
                this._btnCancel.show();
                break;
            default:
                this._btnYes.show(false);
                this._btnNo.show(false);
                this._btnOK.show();
                this._btnCancel.show(false);
                this._buttons = "";
                break;
        }
        this.__setViewChanged();
    },
    
    onActive : function()
    {
        switch(this._buttons)
        {
            case "yes":
                this._btnYes.focus();
                break;
            case "yesno":
                this._btnNo.focus();
                break;
            case "ok":
                this._btnOK.focus();
                break;
            case "okcancel":
            case "yesnocancel":
                this._btnCancel.focus();
                break;
            default:
                this._btnOK.focus();
                break;
        }
    }
});


// JueKit.UI.MessageBoxPool
JueKit.UI.MessageBoxPool = JueKit.Type.createClass("JueKit.UI.MessageBoxPool", JueKit.Pool,
{
    createEntry : function()
    {
        var objData = {minimizeBox:false, maximizeBox:false, recycleUse:true, text:JueKitSR["ttlMessage"]};
        var o = new JueKit.UI.MessageBox(objData);
        o.addHandler("close", this.__hMsgBox_Close, this);
        return o;
    },
    
    initEntry : function(entry)
    {
    },
    
    cleanEntry : function(entry)
    {
    },
    
    destroyEntry : function(entry)
    {
    },
    
    __hMsgBox_Close : function(sender, args)
    {
        if(sender.__ehClose)
        {
            var eh = sender.__ehClose;
            eh.handler.call(eh.scope, sender, args);
        }
        this.release(sender);
    }
});


JueKit.Type.extend(JueKit.UI.MessageBox,
{
    _pool : new JueKit.UI.MessageBoxPool(),
    
    showMessage : function(options)
    {
        var topWnd = JueKit.getJueKitTopWnd();
        if(window != topWnd && topWnd.JueKit)
        {
            return topWnd.JueKit.UI.MessageBox.showMessage(options);
        }
    
        var dlg = this._pool.gain();
        
        if(options.title)
        {
            dlg.set_text(options.title);
        }
        else
        {
            dlg.set_text(JueKitSR["ttlMessage"]);
        }
        dlg.set_message(options.text);
        dlg.set_icon(options.icon);
        dlg.set_buttons(options.buttons);
        dlg.__ehClose = options.onClose;

        dlg.showDialog();
        return dlg;
    }
});

