<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Splitter.aspx.cs" Inherits="Controls_Splitter" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<%@ Register src="../UserControls/FolderPropertyMain.ascx" tagname="FolderPropertyMain" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body style="margin:0;">
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
        <jue:Splitter ID="Splitter1" runat="server" OnClientMeasureItem="Splitter1_MeasureItem">
            <jue:SplitterCell ID="SplitterCell1" runat="server">
&lt;jue:OutlookBar ID="JueOutlookBar1" runat="server" LazyLoad="true" FillStyle="Both" Width="200" Height="500"&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel1" Title="邮件" runat="server"&gt;
                        &lt;uc1:FolderPropertyMain ID="FolderPropertyMain1" runat="server" /&gt;
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel2" Title="日历" runat="server"&gt;
                        content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df 
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel3" Title="联系人" runat="server"&gt;
                        content of Panel3
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel4" Title="任务" runat="server"&gt;
                        content of Panel4
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel5" Title="JueControls" runat="server"&gt;
                        &lt;jue:AccordionSet ID="JueAccordionSet1" runat="server" FillStyle="Both" Width="250" LazyLoad="true" Exclusive="true"&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel1" runat="server" Title="系统任务"&gt;
                                &lt;ul&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;查看系统信息&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;添加删除程序&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;更改一个设置&lt;/a&gt;&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel2" runat="server" Title="其它位置"&gt;
                                &lt;ul&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;网上邻居&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;我的文档&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;控制面板&lt;/a&gt;&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel3" runat="server" Title="详细信息"&gt;
                                &lt;h3&gt;我的电脑&lt;/h3&gt;
                                系统文件夹
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel4" runat="server" Title="文件夹属性"&gt;
                                &lt;uc1:FolderPropertyMain ID="FolderPropertyMain2" runat="server" /&gt;
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel5" runat="server" Title="JueControl"&gt;
                                &lt;jue:Button ID="btnTest" Text="test" runat="server"&gt;&lt;/jue:Button&gt;
                            &lt;/jue:AccordionPanel&gt;
                        &lt;/jue:AccordionSet&gt;
                    &lt;/jue:OutlookBarPanel&gt;
                &lt;/jue:OutlookBar&gt;
            </jue:SplitterCell>
            <jue:SplitterCell ID="SplitterCell2" runat="server" Width="400">
                &lt;jue:OutlookBar ID="JueOutlookBar1" runat="server" LazyLoad="true" FillStyle="Both" Width="200" Height="500"&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel1" Title="邮件" runat="server"&gt;
                        &lt;uc1:FolderPropertyMain ID="FolderPropertyMain1" runat="server" /&gt;
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel2" Title="日历" runat="server"&gt;
                        content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df 
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel3" Title="联系人" runat="server"&gt;
                        content of Panel3
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel4" Title="任务" runat="server"&gt;
                        content of Panel4
                    &lt;/jue:OutlookBarPanel&gt;
                    &lt;jue:OutlookBarPanel ID="JueOutlookBarPanel5" Title="JueControls" runat="server"&gt;
                        &lt;jue:AccordionSet ID="JueAccordionSet1" runat="server" FillStyle="Both" Width="250" LazyLoad="true" Exclusive="true"&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel1" runat="server" Title="系统任务"&gt;
                                &lt;ul&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;查看系统信息&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;添加删除程序&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;更改一个设置&lt;/a&gt;&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel2" runat="server" Title="其它位置"&gt;
                                &lt;ul&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;网上邻居&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;我的文档&lt;/a&gt;&lt;/li&gt;
                                    &lt;li&gt;&lt;a href="javascript:;"&gt;控制面板&lt;/a&gt;&lt;/li&gt;
                                &lt;/ul&gt;
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel3" runat="server" Title="详细信息"&gt;
                                &lt;h3&gt;我的电脑&lt;/h3&gt;
                                系统文件夹
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel4" runat="server" Title="文件夹属性"&gt;
                                &lt;uc1:FolderPropertyMain ID="FolderPropertyMain2" runat="server" /&gt;
                            &lt;/jue:AccordionPanel&gt;
                            &lt;jue:AccordionPanel ID="JueAccordionPanel5" runat="server" Title="JueControl"&gt;
                                &lt;jue:Button ID="btnTest" Text="test" runat="server"&gt;&lt;/jue:Button&gt;
                            &lt;/jue:AccordionPanel&gt;
                        &lt;/jue:AccordionSet&gt;
                    &lt;/jue:OutlookBarPanel&gt;
                &lt;/jue:OutlookBar&gt;
            </jue:SplitterCell>
        </jue:Splitter>
    </jue:RichClientPanel>
<script type="text/javascript">
function rcp_Load(sender, args)
{
    sender.findControl("Splitter1").performLayout();
}

function Splitter1_MeasureItem(sender, args)
{
    args.width = JueKit.Dom.getClientWidth();
    args.height = JueKit.Dom.getClientHeight();
}
</script>
</body>
</html>
