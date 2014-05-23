<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BaseJueKit.aspx.cs" Inherits="Controls_BaseJueKit" %>

<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
 

<!DOCTYPE html>
<html>
  <head id="Head2" runat="server">
    <title>JueKit Demos</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
     <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
     <link href="../bootstrap/css/doc.css" rel="stylesheet" type="text/css" />
    <style>
body{font-family:"ff-tisa-web-pro-1","ff-tisa-web-pro-2","Lucida Grande","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei",sans-serif;}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, .lead {font-family:"ff-tisa-web-pro-1","ff-tisa-web-pro-2","Lucida Grande","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;}
pre code { background: transparent; }
@media (min-width: 768px) {
    .bs-docs-home .bs-social, 
    .bs-docs-home .bs-masthead-links {
      margin-left: 0;
    }
}
</style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="http://cdn.bootcss.com/html5shiv/3.7.0/html5shiv.min.js"></script>
        <script src="http://cdn.bootcss.com/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="../Default.aspx" class="navbar-brand">JueKit</a>
    </div>
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <li class="active">
          <a href="#">基础</a>
        </li>
        <li>
          <a href="#">核心</a>
        </li>
        <li>
          <a href="#">事件</a>
        </li>
        <li>
          <a href="#">JueKitUI组件</a>
        </li>
        <li>
          <a href="#">JueKitUI扩展</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="#">关于JueKit</a>
        </li>
      </ul>
    </nav>
  </div>
</header> 
<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
        <div class="bs-sidebar hidden-print" role="complementary">
           <ul class="nav bs-sidenav">
                <li>
                <a href="#glyphicons">基础</a>
                <ul class="nav nav-pills nav-stacked">
                    <li><a href="#glyphicons-glyphs">基础</a></li>
                    <li><a href="#glyphicons-how-to-use">基础</a></li>
                    <li><a href="#glyphicons-examples">基础</a></li>
                </ul>
            </li>
            </ul>
        </div>
    </div>
  </div>
</div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
      <script src="../bootstrap/js/jquery-1.10.2.js" type="text/javascript"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="../bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
  </body>
</html>
 