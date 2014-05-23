<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUITabset.aspx.cs" Inherits="Controls_JueKitUIButton" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %> 
<!DOCTYPE html>
<html>
  <head id="Head2" runat="server">
    <title>JueKit Tabset组件API</title>
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
                <a href="#btn-groups">Tabset组件</a>
                  <ul class="nav">
                    <li><a href="#btn-groups-single">基本案例</a></li>
                    <li><a href="#btn-groups-pre">属性</a></li>
                    <li><a href="#btn-groups-mether">方法</a></li> 
                 </ul>
            </li>
            <li>
                <a href="#tabpanel-groups">TabPanel组件</a>
                  <ul class="nav"> 
                    <li><a href="#tabpanel-groups-pre">属性</a></li>
                    <li><a href="#tabpanel-groups-mether">方法</a></li> 
                 </ul>
            </li>
            </ul>
        </div>
    </div>
    <div class="col-md-9" role="main">
    <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="btn-groups">Tabset组件</h1>
        </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
    <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
    <div class="bs-example">
           <jue:Tabset ID="JueTabset1" runat="server" LazyLoad="true"   Height="200">
                <jue:TabPanel ID="JueTabPanel1" Title="TabPanel1" runat="server"    LazyLoad="true">
                     content of Panelfsdfs
                </jue:TabPanel> 
                <jue:TabPanel ID="JueTabPanel2" Title="TabPanel2" runat="server" OnClientActive="JueTabPanel2_Active" LazyLoad="true">
                    content of Panel4
              </jue:TabPanel>
            </jue:Tabset>
        <script type="text/javascript">
            function rcpMain_Load(sender, args) {

            }  
            function JueTabPanel2_Active(sender, args) {
                alert(sender.get_title());
            }
        </script>
    </div> 
<div class="highlight">
<pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
     &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt; 
        &lt;jue:Tabset ID="Tabset1" runat="server" LazyLoad="true"   Height="200"&gt;
            &lt;jue:TabPanel ID="TabPanel1" Title="TabPanel1" runat="server"    LazyLoad="true"&gt;
                    content of Panelfsdfs
            &lt;/jue:TabPanel&gt; 
            &lt;jue:TabPanel ID="TabPanel2" Title="TabPanel2" runat="server" OnClientActive="JueTabPanel2_Active" LazyLoad="true"&gt;
                content of Panel4
            &lt;/jue:TabPanel&gt;
            &lt;/jue:Tabset&gt;  
     &lt;/jue:RichClientPanel&gt;
     <br/>
      &lt;script type="text/javascript"&gt;
         function JueTabPanel2_Active(sender, args) {
                alert(sender.get_title());
            }
     &lt;/script&gt;
</code>
</pre> 
</div>
       <h5>2.js用法</h5>
    <p> 在页面上写一占位符  
  <div class="highlight">
        <code class="language-html">
           &lt;div id="btn""&gt;&lt;/div&gt; 
         </code>
     </div>
    </p>
    <div id="tabSet2" class="bs-example">
       <script type="text/javascript">

           var tabSet2 = new JueKit.UI.Tabset({
               container: 'tabSet2',
               fillStyle: JueKit.UI.FillStyle.horizon
           });
           var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
           var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
           var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 

           tabPanel1.addHandler("active", function () {
               alert(tabPanel1.get_title());
           });
           tabPanel2.addHandler("active", function () {
               alert(tabPanel2.get_title());
           });
           tabPanel3.addHandler("active", function () {
               alert(tabPanel3.get_title());
           });
  
       </script> 
    </div>

<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
       var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
        var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
        var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
        var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' });
        tabPanel1.addHandler("active", function () {
            alert(tabPanel1.get_title());
        });
        tabPanel2.addHandler("active", function () {
            alert(tabPanel2.get_title());
        });
        tabPanel3.addHandler("active", function () {
            alert(tabPanel3.get_title());
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
           <td>JueKit.UI.RichClientWebControl</td>
           <td colspan="3">基类所用属性</td> 
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
           <td>addPanel</td>
           <td>panel</td> 
           <td>添加panel</td>
         </tr>
         <tr>
            <td colspan="3">
                  <div id="addPanel1" class="bs-example">
                   <script type="text/javascript">
                       var tabSet3 = new JueKit.UI.Tabset({
                           container: 'addPanel1',
                           fillStyle: JueKit.UI.FillStyle.horizon
                       });
                       tabSet3.addPanel(new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' }));
                       tabSet3.addPanel(new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' }));
                       tabSet3.addPanel(new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项3' }));
                   </script> 
            </div>  
                 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet3 = new JueKit.UI.Tabset({
        container: 'addPanel1',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    tabSet3.addPanel(new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' }));
    tabSet3.addPanel(new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' }));
    tabSet3.addPanel(new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项3' }));
 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>closePanel</td>
           <td>panel</td> 
           <td>关闭一个panel </td>
         </tr>
         <tr>
            <td colspan="3">
                <div id="closePanel1" class="bs-example">
                   <script type="text/javascript">
                       var tabSet4 = new JueKit.UI.Tabset({
                           container: 'closePanel1',
                           fillStyle: JueKit.UI.FillStyle.horizon
                       });
                       var tabPanel4 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项4' });
                       var tabPanel5 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项5' });
                       var tabPanel6 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项6' });
                       tabSet4.closePanel(tabPanel5);
                   </script> 
            </div>   
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet4 = new JueKit.UI.Tabset({
        container: 'closePanel1',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel4 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项4' });
    var tabPanel5 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项5' });
    var tabPanel6 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项6' });
    tabSet4.closePanel(tabPanel5); 
 &lt;/script&gt; 
</code>
</pre> 
</div>   

        </td>
         </tr>
         <tr>
           <td>closePanelByIndex</td>
           <td>index</td> 
           <td>根据传入的panel的索引关闭一个panel </td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet4 = new JueKit.UI.Tabset({
        container: 'closePanel1',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel4 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项4' });
    var tabPanel5 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项5' });
    var tabPanel6 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项6' });
    tabSet4.closePanelByIndex(2); 
 &lt;/script&gt; 
</code>
</pre> 
</div>   

        </td>
         </tr>
         <tr>
           <td>layoutTabHeader</td>
           <td>空</td> 
           <td>重新布局Tabset的Header</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet4 = new JueKit.UI.Tabset({
        container: 'closePanel1',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel4 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项4' });
    var tabPanel5 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项5' });
    var tabPanel6 = new JueKit.UI.TabPanel({ parent: tabSet4, title: '选项6' });
    tabSet4.layoutTabHeader(); 
 &lt;/script&gt; 
</code>
</pre> 
</div>   

        </td>
         </tr>
         <tr>
           <td>set_currentPanelIndex</td>
           <td>panelIndex</td> 
           <td>设置某个panel为当前panel，传一个panel的索引 </td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    tabSet2.set_currentPanelIndex(2);
 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>set_currentPanel</td>
           <td>panel</td> 
           <td>设置传入的panelw为当前panel</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    tabSet2.set_currentPanel(tabPanel3);
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
          <tr>
           <td>set_height</td>
           <td>height</td> 
           <td>设置tabset的高度</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet2 = new JueKit.UI.Tabset({
        container: 'tabSet2',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    tabSet2.set_height(500);
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>get_panels</td>
           <td>空</td> 
           <td>获得所有的panel</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var panels = tabSet2.get_panels();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>get_firstPanel</td>
           <td>空</td> 
           <td>获得第一个panel</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var firstpanel = tabSet2.get_firstPanel();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_lastPanel</td>
           <td>value</td> 
           <td>获得最后一个panel</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var lastpanel = tabSet2.get_lastPanel();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_currentPanel</td>
           <td>空</td> 
           <td>获得当前panel</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var currentpanel = tabSet2.get_currentPanel();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_currentPanelIndex</td>
           <td>空</td> 
           <td>获得当前panel的索引值</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var currentpanelIndex = tabSet2.get_currentPanelIndex();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>getNextVisiblePanel</td>
           <td>panel</td> 
           <td>获得下一个可见的panel</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var nextVisiblePanel = tabSet2.getNextVisiblePanel();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>getPrevVisiblePanel</td>
           <td>panel</td> 
           <td>获得上一个可见的panel</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var tabSet2 = new JueKit.UI.Tabset({
            container: 'tabSet2',
            fillStyle: JueKit.UI.FillStyle.horizon
        });
     var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项1' });
    var tabPanel2 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项2'});
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet2, title: '选项3' }); 
    var prevVisiblePanel = tabSet2.getPrevVisiblePanel();
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
    <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="tabpanel-groups">TabPanel组件和Tabset组件一起使用,案例和用法见Tabset组件</h1>
 
 <h3 id="tabpanel-groups-pre">属性</h3>
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
           <td>showCloseBtn</td>
           <td>boolean</td>
           <td>false</td>
           <td>是否显示带关闭按钮的(暂时不可用)</td>
         </tr>
         <tr>
           <td>title</td>
           <td>title</td>
           <td>""</td>
           <td>设置TabPanel标题</td>
         </tr>
          <tr>
           <td>isCurrent</td>
           <td>boolean</td>
           <td>false</td>
           <td>设置OutlookBarPanel是否为当前pael, trre:表示是当前pael，false:表示不是</td>
         </tr>
        </tbody>
      </table>
    </div>
<h3 id="tabpanel-groups-mether">方法</h3>
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
           <td>set_title</td>
           <td>title</td> 
           <td>设置TabPanel标题</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    tabPanel1.set_title('选项2')
 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>active</td>
           <td>空</td> 
           <td>当TabPanel为当前panel时，加上css样式为选中</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel3.active() 
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
          <tr>
           <td>inactive</td>
           <td>空</td> 
           <td> 当TabPanel不是当前panel时，删除css样式为不选中</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel1.inactive() 
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>get_tabset</td>
           <td>空</td> 
           <td>获得Tabset对象</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    var tabSet5 =tabPanel1.get_tabset() 
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>get_title</td>
           <td>空</td> 
           <td>获得标题</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    var tabPaneltitle =tabPanel1.get_title()
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>get_isCurrent</td>
           <td>空</td> 
           <td>获得是否为当前panel</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    var isCurrent1 =tabPanel1.get_isCurrent()
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>set_tip</td>
           <td>tip</td> 
           <td>设置提示信息</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel1.set_tip('选项1111')
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr> 
 <tr>
           <td>set_showCloseBtn</td>
           <td>boolean</td> 
           <td>设置关闭按钮是否显示</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel1.set_showCloseBtn(true)
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr> 
 <tr>
           <td>onLazyLoaded</td>
           <td>空</td> 
           <td>延迟加载</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel1.onLazyLoaded()
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>show</td>
           <td>boolean</td> 
           <td>是否显示</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel1.show(false)
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr> 
 <tr>
           <td>close</td>
           <td>空</td> 
           <td>关闭tabpanel</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var tabSet3 = new JueKit.UI.Tabset({
        container: 'tabSet3',
        fillStyle: JueKit.UI.FillStyle.horizon
    });
    var tabPanel1 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项1' });
    var tabPanel3 = new JueKit.UI.TabPanel({ parent: tabSet3, title: '选项2' });
    tabPanel1.close()
     
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
</div>
</jue:RichClientPanel>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    
    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="../bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
      
      <script src="../bootstrap/js/holder.min.js" type="text/javascript"></script>
      <script src="../bootstrap/js/highlight.min.js" type="text/javascript"></script> 
      <script  type="text/javascript">    hljs.initHighlightingOnLoad();</script>
      <script src="../bootstrap/js/application.js" type="text/javascript"></script>
  </body>
</html>