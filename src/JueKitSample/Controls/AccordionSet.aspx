<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AccordionSet.aspx.cs" Inherits="Controls_AccordionSet" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<%@ Register src="../UserControls/FolderPropertyMain.ascx" tagname="FolderPropertyMain" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>AccordionSet</title>
</head>
<body>
    <jue:ClientResourceManager runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <div>
            <input type="checkbox" id="chkExclusive" /><label for="chkExclusive">Exclusive</label>
            <jue:Button ID="btnSetExclusive" runat="server" Text="set" OnClientClick="btnSetExclusive_Click"></jue:Button>
        </div>
        <div style="clear:both"></div>
        <jue:AccordionSet ID="JueAccordionSet1" runat="server" Width="250" LazyLoad="true" Exclusive="true" OnClientLoad="JueAccordionSet1_Load">
            <jue:AccordionPanel ID="JueAccordionPanel1" runat="server" Title="系统任务">
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
            <jue:AccordionPanel ID="JueAccordionPanel4" runat="server" Title="文件夹属性">
                <uc1:FolderPropertyMain ID="FolderPropertyMain1" runat="server" />
            </jue:AccordionPanel>
            <jue:AccordionPanel ID="JueAccordionPanel5" runat="server" Title="JueControl">
                <jue:Button ID="btnTest" Text="test" runat="server"></jue:Button>
            </jue:AccordionPanel>
        </jue:AccordionSet>
    </jue:RichClientPanel>
<script type="text/javascript">
function JueAccordionSet1_Load(sender)
{
    JueKit("chkExclusive").checked = sender.get_exclusive();
}

function btnSetExclusive_Click(sender)
{
    var acc = sender.get_richClientPanel().findControl("JueAccordionSet1").set_exclusive(JueKit("chkExclusive").checked);
}
</script>
</body>
</html>
