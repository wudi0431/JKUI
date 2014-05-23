<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProgressBar.aspx.cs" Inherits="Controls_ProgressBar" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ProgressBar</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <jue:ProgressBar ID="JueProgressBar1" runat="server" CurrentValue="30"></jue:ProgressBar>
        <div style="clear:both"></div>
        <input id="txtProgressBarValue" type="text" /><jue:Button ID="btnSetProgressBarValue" runat="server" Text="Set Current Value" OnClientClick="btnSetProgressBarValue_Click"></jue:Button>
        <div style="clear:both"></div>
        <br />
        <jue:ProgressBar ID="JueProgressBar2" runat="server" CurrentValue="50" IsSmooth="true" OnClientChange="JueProgressBar2_Change"></jue:ProgressBar>
        <div id="bar2Percentage">0</div>
        <jue:Button ID="btnBeginStep" runat="server" Text="Begin step" OnClientClick="btnBeginStep_Click"></jue:Button>
        <div style="clear:both"></div>
    </jue:RichClientPanel>
<script type="text/javascript">
function btnSetProgressBarValue_Click(sender)
{
    var value = parseInt(JueKit("txtProgressBarValue").value) || 0;

    sender.get_richClientPanel().findControl("JueProgressBar1").set_currentValue(value);
}

function btnBeginStep_Click(sender)
{
    var bar = sender.get_richClientPanel().findControl("JueProgressBar2");
    
    bar.set_currentValue(0);
    stepBar(bar, 100);
}

function stepBar(bar, maxValue)
{
    var value = bar.get_currentValue();
    
    if(value >= maxValue)
    {
        return;
    }
    else
    {
        value += 3;
        bar.set_currentValue(value);
        setTimeout(function(){stepBar(bar, 100)}, 50);
    }
}

function JueProgressBar2_Change(sender)
{
    JueKit("bar2Percentage").innerHTML = sender.get_percentage().toString() + "%";
}
</script>
</body>
</html>
