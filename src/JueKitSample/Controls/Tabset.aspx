<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Tabset.aspx.cs" Inherits="Controls_Tabset" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<%@ Register src="../UserControls/FolderPropertyMain.ascx" tagname="FolderPropertyMain" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Tabset</title>
</head>
<body>
    <jue:ClientResourceManager runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <jue:Button ID="btnActiveTab" runat="server" Text="active tab" OnClientClick="btnActiveTab_Click" AutoPostBack="true" OnClick="btnActiveTab_Click"></jue:Button>
        <br />
        <div id="divInfo" style="clear:both"></div>
        <br />
        <jue:Tabset ID="JueTabset1" runat="server" LazyLoad="true" Width="400" Height="500" OnClientChange="JueTabset1_Change">
            <jue:TabPanel ID="JueTabPanel1" Title="FolderPropertyMain" runat="server">
                <uc1:FolderPropertyMain ID="FolderPropertyMain1" runat="server" />
            </jue:TabPanel>
            <jue:TabPanel ID="JueTabPanel2" Title="Panel2" runat="server" IsCurrent="true">
                content of Panel2
            </jue:TabPanel>
            <jue:TabPanel ID="JueTabPanel3" Title="Btn Panel" runat="server">
                <jue:Button ID="btnTest" Text="test" runat="server" OnClick="btnTest_Click" AutoPostBack="true"></jue:Button>
            </jue:TabPanel>
            <jue:TabPanel ID="JueTabPanel4" Title="&lt;&quot; '1' &quot;&gt;" runat="server">
                content of Panel4
            </jue:TabPanel>
            <jue:TabPanel ID="JueTabPanel5" Title="Accordion" runat="server">
                <jue:AccordionSet ID="JueAccordionSet1" runat="server" Width="250" LazyLoad="true" Exclusive="true">
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
                        <uc1:FolderPropertyMain ID="FolderPropertyMain2" runat="server" />
                    </jue:AccordionPanel>
                    <jue:AccordionPanel ID="JueAccordionPanel5" runat="server" Title="JueControl">
                        <jue:Button ID="JueButton1" Text="test" runat="server"></jue:Button>
                    </jue:AccordionPanel>
                </jue:AccordionSet>
            </jue:TabPanel>
        </jue:Tabset>
    </jue:RichClientPanel>
<script type="text/javascript">
function btnActiveTab_Click(sender)
{
    var tab = sender.get_richClientPanel().findControl("JueTabset1");
    tab.set_currentPanelIndex(tab.get_currentPanelIndex() + 1);
}

function JueTabset1_Change(sender, args)
{
    JueKit("divInfo").innerHTML = "Current tab panel changed from '" + args.oldPanel.get_title() + "' to '" + args.newPanel.get_title() + "'";
}
</script>
</body>
</html>
