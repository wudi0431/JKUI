<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WebUserControl.aspx.cs" Inherits="Controls_WebUserControl" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<%@ Register src="../UserControls/FolderPropertyMain.ascx" tagname="FolderPropertyMain" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server">
    </jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <uc1:FolderPropertyMain ID="FolderPropertyMain1" runat="server" />
    </jue:RichClientPanel>
    </form>
</body>
</html>
