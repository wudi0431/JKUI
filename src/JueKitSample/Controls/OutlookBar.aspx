<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OutlookBar.aspx.cs" Inherits="Controls_OutlookBar" %>

<%@ Register Assembly="JueKit" Namespace="JueKit.Web.UI.WebControls" TagPrefix="jue" %>
<%@ Register Src="../UserControls/FolderPropertyMain.ascx" TagName="FolderPropertyMain"
    TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>OutlookBar</title>
</head>
<body>
    <jue:ClientResourceManager runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <jue:OutlookBar ID="JueOutlookBar1" runat="server" LazyLoad="true" CollapsePosition="Left"
            Width="200" Height="500">
            <jue:OutlookBarPanel ID="JueOutlookBarPanel2" Title="日历" runat="server">
                content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df
            </jue:OutlookBarPanel>
            <jue:OutlookBarPanel ID="JueOutlookBarPanel3" Title="联系人" runat="server">
                content of Panel3
            </jue:OutlookBarPanel>
            <jue:OutlookBarPanel ID="JueOutlookBarPanel4" Title="任务" runat="server">
                content of Panel4
            </jue:OutlookBarPanel>
        </jue:OutlookBar>
        
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <jue:OutlookBar ID="OutlookBar2" runat="server" LazyLoad="true" CollapsePosition="Right"
            Width="200" Height="500">
            <jue:OutlookBarPanel ID="a1" Title="日历" runat="server">
                content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df
            </jue:OutlookBarPanel>
            <jue:OutlookBarPanel ID="a2" Title="联系人" runat="server">
                content of Panel3
            </jue:OutlookBarPanel>
            <jue:OutlookBarPanel ID="a3" Title="任务" runat="server">
                content of Panel4
            </jue:OutlookBarPanel>
        </jue:OutlookBar>
    </jue:RichClientPanel>
    <script>
    alert(JueOutlookBar1);
    </script>
</body>
</html>
