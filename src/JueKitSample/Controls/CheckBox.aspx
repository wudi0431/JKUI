<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CheckBox.aspx.cs" Inherits="Controls_CheckBox" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
        <jue:CheckBox ID="CheckBox1" runat="server" Text="Js" Checked="true"></jue:CheckBox>
        <jue:CheckBox ID="CheckBox2" runat="server" Text="Cpp" ReadOnly="true"></jue:CheckBox>
    </jue:RichClientPanel>
<script type="text/javascript">
function rcp_Load(sender, args)
{
    var chk = new JueKit.UI.CheckBox({text:"c#"});
    //chk.set_readOnly(true);
    chk.set_checked(true);
}
</script>
</body>
</html>
