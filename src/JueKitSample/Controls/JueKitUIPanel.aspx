<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIPanel.aspx.cs" Inherits="Controls_JueKitUIButton" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %> 
<!DOCTYPE html>
<html>
  <head id="Head2" runat="server">
    <title>JueKit Panel组件API</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
     <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
      <link href="../bootstrap/css/github.min.css" rel="stylesheet" type="text/css" />
     <link href="../bootstrap/css/doc.css" rel="stylesheet" type="text/css" />
       <script src="../bootstrap/js/jquery-1.10.2.js" type="text/javascript"></script>
    <style type="text/css">
body{font-family:"ff-tisa-web-pro-1","ff-tisa-web-pro-2","Lucida Grande","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei",sans-serif;}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, .lead {font-family:"ff-tisa-web-pro-1","ff-tisa-web-pro-2","Lucida Grande","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;}
pre code { background: transparent; }
@media (min-width: 768px) {
    .bs-docs-home .bs-social, 
    .bs-docs-home .bs-masthead-links {
      margin-left: 0;
    }
.btn1 {
   width: 16px;
height: 16px;
background: url(../Images/msn_16.gif) no-repeat;
display: inline-block;
vertical-align: middle;
   
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
    <jue:ClientResourceManager ID="ClientResourceManager1" runat="server"></jue:ClientResourceManager>
    <jue:RichClientPanel ID="RichClientPanel1" runat="server"  OnClientLoad="rcpMain_Load">
 <uc1:Header ID="header1" runat="server" /> 
<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
        <div class="bs-sidebar hidden-print" role="complementary">
           <ul class="nav bs-sidenav">
                <li>
                <a href="#btn-groups">Panel组件</a>
                  <ul class="nav">
                    <li><a href="#btn-groups-single">基本案例</a></li>
                    <li><a href="#btn-groups-pre">属性</a></li> 
                 </ul>
            </li> 
            </ul>
        </div>
    </div>
    <div class="col-md-9" role="main">
    <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="btn-groups">Panel组件</h1>
        </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
    <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
    <div class="bs-example">
      <jue:Panel ID="panelMyFrame" runat="server">
        <header>标题</header>
        <content>
           内容1111111
        </content>
        <footer>
            底部
        </footer>
    </jue:Panel>
        <script type="text/javascript">
            function rcpMain_Load(sender, args) {

            } 
            
        </script>
    </div> 
<div class="highlight">
<pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
     &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt;   
        &lt;jue:Panel ID="panelMyFrame" runat="server"&gt;
                &lt;header&gt;标题&lt;/header&gt;
                &lt;content&gt;
                   内容1111111
                &lt;/content&gt;
                &lt;footer&gt;
                    底部
                &lt;/footer&gt;
            &lt;/jue:Panel&gt;  
     &lt;/jue:RichClientPanel&gt;  
</code>
</pre> 
</div> 
 <h3 id="btn-groups-pre">属性</h3>
    <p>可选属性</p>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
         <tr>
           <th style="width: 100px;">名称</th>
           <th style="width: 100px;">类型</th>
           <th style="width: 50px;">默认值</th>
           <th>描述</th>
         </tr>
        </thead>
        <tbody>
         <tr>
           <td>header</td>
           <td>string</td>
           <td>juePnl</td>
           <td>设置Panel标题</td>
         </tr>
         <tr>
           <td>content</td>
           <td>width</td>
           <td>auto</td>
           <td>设置Panel内容</td>
         </tr>
          <tr>
           <td>footer</td>
           <td>height</td>
           <td>auto</td>
           <td>设置Panel脚表</td>
         </tr>
        </tbody>
      </table>
    </div> 
</div>
    </div>
  </div>
</div>
</jue:RichClientPanel>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    
    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="../bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
      
      <script src="../bootstrap/js/holder.min.js" type="text/javascript"></script>
      <script src="../bootstrap/js/highlight.min.js" type="text/javascript"></script> 
      <script type="text/javascript">    hljs.initHighlightingOnLoad();</script>
      <script src="../bootstrap/js/application.js" type="text/javascript"></script>
  </body>
</html>