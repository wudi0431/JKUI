<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FormView.aspx.cs" Inherits="Controls_FormView" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    <style>
#formSample .jueFormLabel
{
    width:100px;
}
#formSample .jueFormEl
{
    margin-left:100px;
}

    </style>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcp_Load">
    </jue:RichClientPanel>
<script type="text/javascript">
function rcp_Load(sender, args)
{
    var fv = new JueKit.UI.FormView({id:"formSample"});
    new JueKit.UI.TextBoxFormItem({parent:fv,
            label:"Name"});
    new JueKit.UI.DropdownListFormItem({parent:fv,
            label:"Gender",
            items:[{text:"Male"}, {text:"Female"}],
            emptyText : "Please specify"
        });
    new JueKit.UI.DatePickerFormItem({parent:fv,
            label:"Birthday",
            emptyText : "Please specify"
        });
    new JueKit.UI.CheckBoxFormItem({parent:fv,
            label:"Bless",
            text:"God bless me",
            checked:true
        });
    (new JueKit.UI.CheckBoxListFormItem({parent:fv,
            label:"Intresting",
            items:[
                {
                    text:"Computer",
                    checked:true
                },
                {
                    text:"Singing",
                    checked:true
                },
                {
                    text:"Swimming",
                    checked:false
                }
            ]
        })).get_checkBoxList().set_direction(JueKit.UI.Direction.vertical);
}
</script>
</body>
</html>
