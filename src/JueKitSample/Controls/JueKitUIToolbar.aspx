<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIToolbar.aspx.cs" Inherits="Controls_JueKitUITextBox" %>
<%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html>
<html>
<head id="Head2" runat="server">
  <title>JueKit Toolbar组件API</title>
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
background: url(../Images/favoritefile.png) no-repeat;
display: inline-block;
vertical-align: middle; 
}
.btn2 {
   width: 16px;
height: 16px;
background: url(../Images/km_metacfg.gif) no-repeat;
display: inline-block;
vertical-align: middle; 
}
.btn3 {
   width: 16px;
height: 16px;
background: url(../Images/favoritefolder.png) no-repeat;
display: inline-block;
vertical-align: middle; 
}
.btn4 {
   width: 16px;
height: 16px;
background: url(../Images/import.png) no-repeat;
display: inline-block;
vertical-align: middle; 
}
.btn5 {
   width: 16px;
height: 16px;
background: url(../Images/export.png) no-repeat;
display: inline-block;
vertical-align: middle; 
}
.btn6 {
   width: 16px;
height: 16px;
background: url(../Images/km_file.gif) no-repeat;
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
                <a href="#btn-groups">Toolbar组件</a>
                <ul class="nav">
                  <li>
                    <a href="#btn-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#btn-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#btn-groups-mether">方法</a>
                  </li>
                </ul>
              </li> 
            </ul>
          </div>
        </div>
        <div class="col-md-9" role="main">
          <div class="bs-docs-section">
            <div class="page-header">
              <h1 id="btn-groups">Toolbar组件</h1>
            </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
            <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
            <div class="bs-example">  
            <jue:Toolbar ID="docTbOperation" runat="server" FillStyle="Horizon">
            <jue:ButtonToolbarItem ID="docTbiNewFolder" Text="保存" runat="server" Disabled="False" CommandId="1005" IconCssClass="btn1" OnClientClick="docTbiNewFolder_Click">
             </jue:ButtonToolbarItem>
            <jue:ButtonToolbarItem ID="docTbiNewFolder1" Text="修改" runat="server" Disabled="False" CommandId="1006" IconCssClass="btn2" OnClientClick="docTbiNewFolder_Click">
             </jue:ButtonToolbarItem>
            <jue:ButtonToolbarItem ID="docTbiNewFolder2" Text="删除" runat="server" Disabled="False" CommandId="1007" IconCssClass="btn3" OnClientClick="docTbiNewFolder_Click">
             </jue:ButtonToolbarItem>
            <jue:ButtonToolbarItem ID="docTbiNewFolder3" Text="导入" runat="server" Disabled="False" CommandId="1008" IconCssClass="btn4" OnClientClick="docTbiNewFolder_Click">
             </jue:ButtonToolbarItem>
            <jue:ButtonToolbarItem ID="docTbiNewFolder4" Text="导出" runat="server" Disabled="False" CommandId="1009" IconCssClass="btn5" OnClientClick="docTbiNewFolder_Click">
             </jue:ButtonToolbarItem>
            <jue:ButtonToolbarItem ID="docTbiNewFolder5" Text="返回" runat="server" Disabled="False" CommandId="1010" IconCssClass="btn6" OnClientClick="docTbiNewFolder_Click">
            </jue:ButtonToolbarItem> 
            </jue:Toolbar>
              <script type="text/javascript">
                  function rcpMain_Load(sender, args) { 

                  } 
                  function docTbiNewFolder_Click(sender, args) {
                      alert(sender.get_text());
                      alert(sender._cmdId);
                  }
                  
              </script>
            </div>
            <div class="highlight">
              <pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
   &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt; 
     
     &lt;jue:Toolbar ID="Toolbar1" runat="server" FillStyle="Horizon"&gt;
        &lt;jue:ButtonToolbarItem ID="ButtonToolbarItem1" Text="保存" runat="server" Disabled="False" CommandId="1005" IconCssClass="btn1" OnClientClick="docTbiNewFolder_Click"&gt;
            &lt;/jue:ButtonToolbarItem&gt;
        &lt;jue:ButtonToolbarItem ID="ButtonToolbarItem2" Text="修改" runat="server" Disabled="False" CommandId="1006" IconCssClass="btn2" OnClientClick="docTbiNewFolder_Click"&gt;
            &lt;/jue:ButtonToolbarItem&gt;
        &lt;jue:ButtonToolbarItem ID="ButtonToolbarItem3" Text="删除" runat="server" Disabled="False" CommandId="1007" IconCssClass="btn3" OnClientClick="docTbiNewFolder_Click"&gt;
            &lt;/jue:ButtonToolbarItem&gt;
        &lt;jue:ButtonToolbarItem ID="ButtonToolbarItem4" Text="导入" runat="server" Disabled="False" CommandId="1008" IconCssClass="btn4" OnClientClick="docTbiNewFolder_Click"&gt;
            &lt;/jue:ButtonToolbarItem&gt;
        &lt;jue:ButtonToolbarItem ID="ButtonToolbarItem5" Text="导出" runat="server" Disabled="False" CommandId="1009" IconCssClass="btn5" OnClientClick="docTbiNewFolder_Click"&gt;
            &lt;/jue:ButtonToolbarItem&gt;
        &lt;jue:ButtonToolbarItem ID="ButtonToolbarItem6" Text="返回" runat="server" Disabled="False" CommandId="1010" IconCssClass="btn6" OnClientClick="docTbiNewFolder_Click"&gt;
        &lt;/jue:ButtonToolbarItem&gt; 
     &lt;/jue:Toolbar&gt; 

 &lt;/jue:RichClientPanel&gt;
 &lt;script type="text/javascript"&gt; 
     function docTbiNewFolder_Click(sender, args) {
         alert(sender.get_text());
     }          
  &lt;/script&gt;
</code>
</pre>
            </div>
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="toobarui""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="toobarui" class="bs-example">
              <script type="text/javascript"> 
                  var toobar1 = new JueKit.UI.Toolbar({
                      container: 'toobarui'
                  });
                  var item1 = new JueKit.UI.ButtonToolbarItem({
                      container: toobar1._elTbisWrap,
                      text:"按钮",
                      iconCssCls: "btn1",
                      cmdId: 100
                  });
                  var item2 = new JueKit.UI.ButtonToolbarItem({
                      container: toobar1._elTbisWrap,
                      text: "按钮",
                      iconCssCls: "btn2"
                  });
                  var item3 = new JueKit.UI.ButtonToolbarItem({
                      container: toobar1._elTbisWrap,
                      text: "按钮",
                      iconCssCls: "btn3"
                  });
                  item1.addHandler("click", function (sender, args) {
                      alert(item1.get_text());
                      alert(sender._cmdId);
                  });
                  item2.addHandler("click", function () {
                      alert(item2.get_text());
                  });
                  item3.addHandler("click", function () {
                      alert(item3.get_text());
                  });
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var toobar1 = new JueKit.UI.Toolbar({
        container: 'toobarui'
    });
    var item1 = new JueKit.UI.ButtonToolbarItem({
        container: toobar1._elTbisWrap,
        text:"按钮",
        iconCssCls: "btn1",
        cmdId: 100
    });
    var item2 = new JueKit.UI.ButtonToolbarItem({
        container: toobar1._elTbisWrap,
        text: "按钮",
        iconCssCls: "btn2"
    });
    var item3 = new JueKit.UI.ButtonToolbarItem({
        container: toobar1._elTbisWrap,
        text: "按钮",
        iconCssCls: "btn3"
    });
     item1.addHandler("click", function (sender, args) {
        alert(item1.get_text());
        alert(sender._cmdId);
    });
    item2.addHandler("click", function () {
        alert(item2.get_text());
    });
    item3.addHandler("click", function () {
        alert(item3.get_text());
    });
 &lt;/script&gt; 
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
                    <td>cssCls</td>
                    <td>string</td>
                    <td>jueToolbar</td>
                    <td>toolbar的样式</td>
                  </tr>
                  <tr>
                    <td>cmdId</td>
                    <td>number</td>
                    <td>0</td>
                    <td>每个按钮的编号。用于权限</td>
                  </tr> 
                </tbody>
              </table>
            </div>
            <h3 id="btn-groups-mether">方法</h3>
            <p>可选方法</p>
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th style="width: 100px;">名称</th>
                    <th style="width: 100px;">参数</th>
                    <th>描述</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>set_width1</td>
                    <td>width</td>
                    <td>设置toolbar框宽度</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
     var toobar2 = new JueKit.UI.Toolbar({
        container: 'toobarui'
    });
    var item1 = new JueKit.UI.ButtonToolbarItem({
        container: toobar1._elTbisWrap,
        text:"按钮",
        iconCssCls: "btn1",
        cmdId: 100
    });
    toobar2.set_width1(300);
 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
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
  <script  type="text/javascript">hljs.initHighlightingOnLoad();</script>
  <script src="../bootstrap/js/application.js" type="text/javascript"></script>
</body>
</html>