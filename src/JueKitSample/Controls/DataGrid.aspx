<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DataGrid.aspx.cs" Inherits="Controls_DataGrid" %>

<%@ Register Assembly="JueKit" Namespace="JueKit.Web.UI.WebControls" TagPrefix="jue" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
        <jue:DataGrid runat="server" ShowSelectColumn="true">
        </jue:DataGrid>
    </jue:RichClientPanel>
    <div id="ctnr">
    </div>
<script>
function rcp_Load(sender, args)
{
        var grid = new JueKit.UI.DataGrid({container:"ctnr"});
        grid.set_width(500);
        grid.set_height(100);
        grid.addCol({name:"value",title:"option_value",width:200});
}
</script>
</body>
</html>
