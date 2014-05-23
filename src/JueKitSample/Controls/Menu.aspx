<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu.aspx.cs" Inherits="Controls_Menu" %>

<%@ Register Assembly="JueKit" Namespace="JueKit.Web.UI.WebControls" TagPrefix="jue" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
        <div style="padding: 5px">
            <jue:Button ID="btnShowMenu" runat="server" Text="ShowMenu" Type="Button" OnClientClick="btnShowMenu_Click">
            </jue:Button>
        </div>
    </jue:RichClientPanel>
<script>
var copyContent;
function rcp_Load(sender, args)
{
    var menu = new JueKit.UI.Menu({
        items :
        [
            {
                text:"打开",
                items :
                [
                    {
                        text:"文件",
                        cmdId : 4
                    },
                    {
                        text:"文件夹",
                        cmdId : 5
                    }
                ]
            },
            {
                text:"新建",
                items :
                [
                    {
                        text:"文件",
                        cmdId : 6
                    },
                    {
                        text:"文件夹",
                        cmdId : 7
                    }
                ]
            },
            {
                type:JueKit.UI.MenuItemType.separator
            },
            {
                text:"剪切",
                cmdId : 1
            },
            {
                text:"复制",
                cmdId : 2
            },
            {
                text:"粘贴",
                cmdId : 3,
                disabled : true
            },
            {
                text:"清空粘贴板",
                cmdId : 9,
                disabled : true
            },
            {
                type:JueKit.UI.MenuItemType.separator
            },
            {
                text:"属性",
                cmdId : 8
            }
        ]
    });
    
    var miPaste = menu.findMenuItem(3);
    var miClear = menu.findMenuItem(9);
    
    menu.addHandler("command", menuMain_Command);
    miPaste.addHandler("updateCommandUI", miPaste_UpdateCommandUI);
    miClear.addHandler("updateCommandUI", miClear_UpdateCommandUI);
    
    sender._menuMain = menu;
}

function btnShowMenu_Click(sender, args)
{
    var pos = JueKit.Dom.getPosition(sender._el);
    var size = JueKit.Dom.getSize(sender._el);
    
    sender._richClientPanel._menuMain.trackPopupMenu(pos.left, pos.top + size.height);
}

function menuMain_Command(sender, args)
{
    switch(args.cmdId)
    {
        case 1:
        case 2:
            copyContent = args.menuItem.get_text();
            break;
        case 3:
            alert(copyContent);
            break;
        case 9:
            copyContent = undefined;
            break;
    }
}

function miPaste_UpdateCommandUI(sender, args)
{
    sender.set_disabled(!copyContent);
}
function miClear_UpdateCommandUI(sender, args)
{
    sender.set_disabled(!copyContent);
}
</script>
</body>
</html>
