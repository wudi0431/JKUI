<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DateTime.aspx.cs" Inherits="DateTime" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
    </jue:RichClientPanel>
<script type="text/javascript">
function rcp_Load(sender, args)
{
    JueKit.DateTime.parse("1985-4-12 12:30:10");
    JueKit.DateTime.parse("1985-4-12");
}
</script>
</body>
</html>
