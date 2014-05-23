<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MessageBox.aspx.cs" Inherits="Controls_MessageBox" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MessageBox</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <jue:Window runat="server" Width="500" Height="600" LazyLoad="false">
        <h2>
            Alert
        </h2>
        <p>
            <jue:Button ID="btnAlert" runat="server" Text="Alert" OnClientClick="btnAlert_Click"></jue:Button>
        </p>
        <h2>
            Message
        </h2>
        <p>
            <jue:Button ID="btnMessage" runat="server" Text="Message" OnClientClick="btnMessage_Click"></jue:Button>
        </p>
        <h2>
            Confirm
        </h2>
        <p>
            <jue:Button ID="btnConfirm" runat="server" Text="Confirm" OnClientClick="btnConfirm_Click"></jue:Button>
        </p>
        <h2>
            Choice
        </h2>
        <p>
            <jue:Button ID="btnChoice" runat="server" Text="Choice" OnClientClick="btnChoice_Click"></jue:Button>
        </p>
        </jue:Window>
    </jue:RichClientPanel>
<script type="text/javascript">
function btnAlert_Click()
{
    JueKit.UI.MessageBox.showMessage({
            text:"Please select a file to upload.",
            icon:"warning"
        });
}

function btnMessage_Click()
{
    JueKit.UI.MessageBox.showMessage({
            text:"File uploaded.",
            icon:"information"
        });
}

function btnConfirm_Click()
{
    JueKit.UI.MessageBox.showMessage({
            text:"Do you want to delete the file?",
            icon:"question",
            buttons:"okcancel",
            onClose : {handler:function(sender, args){
                    alert(args.dialogResult);
                }
            }
        });
}

function btnChoice_Click()
{
    JueKit.UI.MessageBox.showMessage({
            text:"Do you want to save the changed file?",
            icon:"question",
            buttons:"yesnocancel",
            onClose : {handler:function(sender, args){
                    JueKit.UI.MessageBox.showMessage({text:"You clicked button: " + args.dialogResult});
                }
            }
        });
}
</script>
</body>
</html>
