<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Jsonlize.aspx.cs" Inherits="Json_Jsonlize" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Jsonlize</title>
</head>
<body>
<fieldset>
    <legend>Jsonlize Array</legend>
    <div id="divJsonlizeArray" runat="server"></div>
</fieldset>
<fieldset>
    <legend>Jsonlize Dictionary</legend>
    <div id="divJsonlizeDictionary" runat="server"></div>
</fieldset>
<script type="text/javascript">
var a= eval("function tmp(a){return a;}(" + document.getElementById("divJsonlizeDictionary").innerHTML + ");");
alert(a.birthday);
</script>
</body>
</html>
