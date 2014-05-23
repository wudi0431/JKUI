<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Pool.aspx.cs" Inherits="Pool" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Pool</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
    </jue:RichClientPanel>
<script type="text/javascript">
var TestPool = JueKit.Type.createClass("TestPool", JueKit.Pool,
{
    createEntry : function()
    {
        var o = {};
        o.data = ++ TestPool.counter;
        return o;
    },
    
    initEntry : function(entry)
    {
    },
    
    cleanEntry : function(entry)
    {
    },
    
    showEntries : function()
    {
        var s = "";
        for(var i=0; i<this._entries.length; i++)
        {
            s += this._entries[i].data + ", ";
        }
        alert(s);
    }
});

TestPool.counter = 0;
var pool = new TestPool();

var v1 = pool.gain();
var v2 = pool.gain();
var v3 = pool.gain();
var v4 = pool.gain();
var v5 = pool.gain();
pool.showEntries();
pool.release(v4);
pool.showEntries();
pool.release(v2);
pool.showEntries();
alert(pool.gain().data);
pool.showEntries();
</script>
</body>
</html>
