<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NotifyWindow.aspx.cs" Inherits="Controls_NotifyWindow" %>

<%@ Register Assembly="JueKit" Namespace="JueKit.Web.UI.WebControls" TagPrefix="jue" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Untitled Page</title>
</head>
<body>
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server">
        <div style="padding: 5px">
            <jue:Button ID="btnShowNotifyWindow" runat="server" Text="Show Notify Window" Type="Button" OnClientClick="btnShowNotifyWindow_Click">
            </jue:Button>
        </div>
    </jue:RichClientPanel>
<script type="text/javascript">
function btnShowNotifyWindow_Click(sender, args)
{
    JueKit.UI.Kit.NotifyWindow.showMessage({title:"我有一双KAPPA的慢跑鞋", text:"同………志………们！！！我是#50522的主人，我每天都关注你们给我的留言，是你们，是你们让我作出了我最痛快的一次决定！我跟家里人借了钱，去西单买了一双KAPPA的慢跑鞋，真他妈喜欢，红白的。我…….我昨晚实现了梦想！！！！！哈哈哈哈哈哈哈哈哈哈……..我操….哈哈哈哈哈哈哈哈哈……..虽然夜里三点，我只跑了一千米，但是太爽了。静静的夜只能听到橡胶与地面摩擦的声音，听！沙沙沙沙沙沙沙沙…..当我一丝不挂回到我的屋里（自己住）我做了你们所见的所有庆祝动作！谢谢你们谢谢你们！！不过我好想被一个同方向开车的司机看到了！"});
}
</script>
</body>
</html>
