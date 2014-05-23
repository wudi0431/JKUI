<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DataTable.aspx.cs" Inherits="DataTable_DataTable" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
        <div>
            <jue:Button ID="btnDeleteAll" runat="server" Text="DeleteAll" OnClientClick="btnDeleteAll_Click"></jue:Button>
        </div>
        <jue:DataGrid ID="grid" runat="server" ShowSelectColumn="true" ReadOnly="false" Width="500" Height="200"></jue:DataGrid>
        <div style="clear:both;"><p>Another DataGrid:</p></div>
        <jue:DataGrid ID="grid2" runat="server" ShowSelectColumn="true" ShowHeader="false" ReadOnly="true" Width="500" Height="200"></jue:DataGrid>
    </jue:RichClientPanel>
<script type="text/javascript">
function rcp_Load(sender, args)
{
    // 从二维数组或者对象数组中导入数据到DataTable对象中。
    var data = [
        ["young", "female", "p2a", "design"],
        ["fossil", "male", "macrowing", "program"],
        ["ydmaster", "male", "sal", "program"],
        ["lily", "male", "sap", "support"],
        ["lmflive", "male", "macrowing", "support"],
        {name:"robinson", company:"macrowing", vocation:"manager", gender:"male"},
        {name:"zhangxing", vocation:"program", gender:"male", company:"macrowing"}
    ];
    
    var dataTable = new JueKit.Data.DataTable({
        cols : [
                {name:"name"},
                {name:"gender"},
                {name:"company"},
                {name:"vocation"}
            ]
        });
    dataTable.loadDataFromArray(data);
    
    // 创建Grid
    var grid = sender.findControl("grid");
    grid.addCol({name:"name", width:100});
    grid.addCol({name:"gender", width:100, 
            dropdown : {
                items : [{text:"male"}, {text:"female"}]
            }
        });
    grid.addCol({name:"company", width:100});
    grid.addCol({name:"vocation", width:100});
    
    var grid2 = sender.findControl("grid2");
    grid2.addCol({name:"name", width:100});
    grid2.addCol({name:"gender", width:100});
    grid2.addCol({name:"company", width:100});
    grid2.addCol({name:"vocation", width:100});
    
    // 绑定数据源
    grid.bindDataSource(dataTable);
    dataTable.updateView(grid);
    grid2.bindDataSource(dataTable);
    dataTable.updateView(grid2);

    var dataRow = dataTable.newRow();
    dataRow.setColValue("name", "leon");
    dataRow.setColValue("gender", "male");
    dataRow.setColValue("company", "macrowing");
    dataRow.setColValue("vocation", "manager");
    
    dataTable.deleteRow(dataTable.getRowAt(3));
    dataTable.deleteRow(dataTable.getFirstRow());
    dataTable.deleteRow(dataTable.getFirstRow());
    dataTable.deleteRow(dataTable.getLastRow());
}

function btnDeleteAll_Click(sender, args)
{
    var grid = sender._richClientPanel.findControl("grid");
    var dataTable = grid.get_dataSource();
    var items = grid.getSelectedItems();
    for(var i=0; i<items.length; i++)
    {
        dataTable.deleteRow(items[i].dataRow);
    }
}
</script>
</body>
</html>
