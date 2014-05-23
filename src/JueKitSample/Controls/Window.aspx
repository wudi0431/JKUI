<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Window.aspx.cs" Inherits="Controls_Window" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Window</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <jue:Button ID="btnCreateWindow" runat="server" Text="CreateWnd" OnClientClick="btnCreateWindow_Click"></jue:Button>
        <div style="clear:both"></div>
        <jue:Window ID="Window1" runat="server" Text="我的电脑" Icon="~/Images/msn_16.gif" Width="500" Height="500" LazyLoad="true">
            <jue:AccordionSet ID="JueAccordionSet1" runat="server" Width="250" LazyLoad="false">
                <jue:AccordionPanel ID="JueAccordionPanel1" runat="server" Title="系统任务" Expanded="true">
                    <ul>
                        <li><a href="javascript:;">查看系统信息</a></li>
                        <li><a href="javascript:;">添加删除程序</a></li>
                        <li><a href="javascript:;">更改一个设置</a></li>
                    </ul>
                </jue:AccordionPanel>
                <jue:AccordionPanel ID="JueAccordionPanel2" runat="server" Title="其它位置">
                    <ul>
                        <li><a href="javascript:;">网上邻居</a></li>
                        <li><a href="javascript:;">我的文档</a></li>
                        <li><a href="javascript:;">控制面板</a></li>
                    </ul>
                </jue:AccordionPanel>
                <jue:AccordionPanel ID="JueAccordionPanel3" runat="server" Title="详细信息">
                    <h3>我的电脑</h3>
                    系统文件夹
                </jue:AccordionPanel>
            </jue:AccordionSet>
        </jue:Window>
    </jue:RichClientPanel>
<script type="text/javascript">
function btnCreateWindow_Click(sender)
{
    var objData =
    {
        //caption : "提示",
        text : "test1",
        icon : "question",
        buttons : "yesnocancel",	// yes,ok,yesno,okcancel
        onClose:{handler:hMsgBox_Close}
    };
    JueKit.UI.MessageBox.showMessage(objData);
}

function hMsgBox_Close(sender, args)
{
    //alert(args.result);
}
</script>
</body>
</html>
