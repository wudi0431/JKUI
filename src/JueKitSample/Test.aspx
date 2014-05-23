<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Test.aspx.cs" Inherits="Test" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server">
    </jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
    </jue:RichClientPanel>
    <input type="button" id="btn" value="click" />
<script>
function rcp_Load(sender, args)
{
    var btn = JueKit("btn");
    JueKit.Event.addHandler(btn, "click", handler1);
    JueKit.Event.addHandler(btn, "click", handler2);
    JueKit.Event.addHandler(btn, "click", handler3);
}

function handler1(evt)
{
    alert(1);
}

function handler2(evt)
{
    alert(2);
    JueKit.Event.stop(evt);
    return false;
}

function handler3(evt)
{
    alert(3);
}
</script>
</body>
</html>
