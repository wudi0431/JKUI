<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FolderPropertyMain.ascx.cs" Inherits="UserControls_FolderPropertyMain" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<form action="">
    <div>
        <div>
            <label>Name:</label>
            <input type="text" id="folderName" />
        </div>
        <div>
            <label>Size:</label>
            <span>folder size</span>
        </div>
        <div>
            <jue:Button runat="server" Text="OK" ID="btnOK" onclick="btnOK_Click" AutoPostBack="true"></jue:Button>
        </div>
    </div>
</form>
