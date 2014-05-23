<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Button.aspx.cs" Inherits="Controls_Button" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <jue:Button ID="btnOK" runat="server" Text="OK" Type="Submit"></jue:Button>
        <jue:Button ID="btnReset" runat="server"  Text="Reset" Type="Reset"></jue:Button>
        <jue:Button ID="btnLongText" runat="server"  Text="这个按钮的标题很长" Type="Button"></jue:Button>
        <jue:Button ID="btnIcon" runat="server" Text="Icon" Icon="./Images/msn_16.gif"></jue:Button>
    </jue:RichClientPanel>
</body>
</html>
