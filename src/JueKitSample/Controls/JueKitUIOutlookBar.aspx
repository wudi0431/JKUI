<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIOutlookBar.aspx.cs" Inherits="Controls_JueKitUIButton" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %> 
<!DOCTYPE html>
<html>
  <head id="Head2" runat="server">
    <title>JueKit OutlookBar组件API</title>
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
                <a href="#btn-groups">OutlookBar组件</a>
                  <ul class="nav">
                    <li><a href="#btn-groups-single">基本案例</a></li>
                    <li><a href="#btn-groups-pre">属性</a></li>
                    <li><a href="#btn-groups-mether">方法</a></li> 
                 </ul>
            </li>
            <li>
                <a href="#panel-groups">OutlookBarPanel组件</a>
                  <ul class="nav">
                    <li><a href="#panel-groups-single">基本案例</a></li>
                    <li><a href="#panel-groups-pre">属性</a></li>
                    <li><a href="#panel-groups-mether">方法</a></li> 
                 </ul>
            </li>
            </ul>
        </div>
    </div>
    <div class="col-md-9" role="main">
    <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="btn-groups">OutlookBar组件</h1>
        </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
    <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
    <div class="bs-example">
       <jue:OutlookBar ID="JueOutlookBar1"  OnClientCollapse="outlookBarCollapse" runat="server" LazyLoad="true" CollapsePosition="Left"
            Width="200" Height="200">
            <jue:OutlookBarPanel ID="JueOutlookBarPanel2" Title="日历"  runat="server">
                content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df
            </jue:OutlookBarPanel>
            <jue:OutlookBarPanel ID="JueOutlookBarPanel3" Title="联系人" OnClientActive="outlookBarPanel_active" runat="server">
                content of Panel3
            </jue:OutlookBarPanel>
            <jue:OutlookBarPanel ID="JueOutlookBarPanel4" Title="任务" OnClientActive="outlookBarPanel_active" runat="server">
                content of Panel4
            </jue:OutlookBarPanel>
        </jue:OutlookBar> 
        <script type="text/javascript">
            function rcpMain_Load(sender, args) {

            } 
            function outlookBarCollapse(sender, args) {
                alert(sender.get_isCollapse());
            }
            function outlookBarPanel_active(sender, args) {
                alert(sender.get_title());
            }
        </script>
    </div> 
<div class="highlight">
<pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
     &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt;   
         &lt;jue:OutlookBar ID="OutlookBar1" OnClientCollapse="outlookBarCollapse" runat="server" LazyLoad="true" CollapsePosition="Left"
            Width="200" Height="200"&gt;
            &lt;jue:OutlookBarPanel ID="OutlookBarPanel1" OnClientActive="outlookBarPanel_active" Title="日历" runat="server"&gt;
                content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df
            &lt;/jue:OutlookBarPanel&gt;
            &lt;jue:OutlookBarPanel ID="OutlookBarPanel2" OnClientActive="outlookBarPanel_active" Title="联系人" runat="server"&gt;
                content of Panel3
            &lt;/jue:OutlookBarPanel&gt;
            &lt;jue:OutlookBarPanel ID="OutlookBarPanel3" OnClientActive="outlookBarPanel_active" Title="任务" runat="server"&gt;
                content of Panel4
            &lt;/jue:OutlookBarPanel&gt;
        &lt;/jue:OutlookBar&gt;  
     &lt;/jue:RichClientPanel&gt; 
   &lt;script type="text/javascript"&gt;
        function outlookBarCollapse(sender, args) {
                alert(sender.get_isCollapse());
            }
        function outlookBarPanel_active(sender, args) {
            alert(sender.get_title());
        }
 &lt;/script&gt

</code>
</pre> 
</div>
       <h5>2.js用法</h5>
    <p> 在页面上写一占位符  
  <div class="highlight">
        <code class="language-html">
           &lt;div id="JueOutlookBar2""&gt;&lt;/div&gt; 
         </code>
     </div>
    </p> 
    <div id="ScriptOutlookBar3" class="bs-example">
     <%--   <div id="ScriptOutlookBarPanel1"></div>--%>
       <script type="text/javascript">

           var outlookbar2 = new JueKit.UI.OutlookBar({
               container: 'ScriptOutlookBar3',
               width: 200,
               height: 200
           });

           var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
               parent: outlookbar2,
               title: "日历"
           });
           outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
           var outlookBarPaneJs2 = new JueKit.UI.OutlookBarPanel({
               parent: outlookbar2,
               title: "联系人",
               IconClassName: 'btn1',
               isCurrent:true
           });
           outlookBarPaneJs2.getEl().innerHTML = " content of Panel3";
           var outlookBarPaneJs3 = new JueKit.UI.OutlookBarPanel({
               parent: outlookbar2,
               title: "任务"
           });
           outlookBarPaneJs3.getEl().innerHTML = " content of Panel4";


           outlookBarPaneJsl.addHandler("active", function () {
               alert(outlookBarPaneJsl.get_title());
           });
           outlookBarPaneJs2.addHandler("active", function () {
               alert(outlookBarPaneJs2.get_title());
           });
           outlookBarPaneJs3.addHandler("active", function () {
               alert(outlookBarPaneJs3.get_title());
           });
         
       </script> 
    </div>

<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt; 
    var outlookbar2 = new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
    var outlookBarPaneJs2 = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "联系人",
        IconClassName: 'btn1',
        isCurrent:true
    });
    outlookBarPaneJs2.getEl().innerHTML = " content of Panel3";
    var outlookBarPaneJs3 = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "任务"
    });
    outlookBarPaneJs3.getEl().innerHTML = " content of Panel4";


    outlookBarPaneJsl.addHandler("active", function () {
        alert(outlookBarPaneJsl.get_title());
    });
    outlookBarPaneJs2.addHandler("active", function () {
        alert(outlookBarPaneJs2.get_title());
    });
    outlookBarPaneJs3.addHandler("active", function () {
        alert(outlookBarPaneJs3.get_title());
    });
 &lt;/script&gt
 &lt;style type="text/css"&gt; 
    .btn1 {
        width: 16px;
        height: 16px;
        background: url(../Images/msn_16.gif) no-repeat;
        display: inline-block;
        vertical-align: middle; 
    }
 &lt;/style&gt;
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
           <td>jueOutlookBar</td>
           <td>设置OutlookBar样式</td>
         </tr>
         <tr>
           <td>width</td>
           <td>width</td>
           <td>auto</td>
           <td>设置OutlookBar宽度</td>
         </tr>
          <tr>
           <td>height</td>
           <td>height</td>
           <td>auto</td>
           <td>设置OutlookBar高度</td>
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
           <td>set_collapse</td>
           <td>boolean</td> 
           <td>设置OutlookBar是展开还是折叠，trre:表示显示，false:表示折叠</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
    
    //先得到当前outlookbar 是展开还是折叠 
    var isCollapse = outlookbar2.get_isCollapse();
    // 再设值是展开还是折叠 
    outlookbar2.set_collapse(isCollapse);

 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>set_width</td>
           <td>width</td> 
           <td>设置OutlookBar宽度</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

    outlookbar2.set_width(300)
    

 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
          <tr>
           <td>set_height</td>
           <td>height</td> 
           <td> 设置OutlookBar高度</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

    outlookbar2.set_height(300)
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>set_topTitle</td>
           <td>title</td> 
           <td>设置OutlookBar的第一个的title</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

    outlookbar2.set_topTitle('日历222')
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>set_currentPanelIndex</td>
           <td>index</td> 
           <td>设置OutlookBar的当前panel的索引</td>
         </tr>
         <tr>
            <td colspan="3">
               <div id="Div5" class="bs-example">
                   <script type="text/javascript">
                       
                   </script> 
            </div>   
                 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

    outlookbar2.set_currentPanelIndex(2)
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>set_currentPanel</td>
           <td>panel</td> 
           <td>设置OutlookBar的panel的为当前paenl</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
    var paenl = outlookbar2.get_currentPanel()
    outlookbar2.set_currentPanel(paenl)
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_currentPanelIndex</td>
           <td>空</td> 
           <td>获得当前panel的索引</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    }); 
    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
   
    outlookbar2.get_currentPanelIndex()
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
  var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    }); 
    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
   
   var currentPanel= outlookbar2.get_currentPanel()
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
  var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    }); 
    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
   
   var firstPanel= outlookbar2.get_firstPanel()
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_lastPanel</td>
           <td>空</td> 
           <td>获得最后一个panel</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    }); 
    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
   
   var lastPanel= outlookbar2.get_lastPanel()
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
          <h1 id="panel-groups">OutlookBarPanel组件和OutlookBar组件一起使用,案例和用法见OutlookBar组件</h1>
 
 <h3 id="panel-groups-pre">属性</h3>
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
           <td>IconClassName</td>
           <td>string</td>
           <td>jueOutlookBarSelectorIcon</td>
           <td>设置OutlookBarPanel图标样式</td>
         </tr>
         <tr>
           <td>title</td>
           <td>title</td>
           <td>""</td>
           <td>设置OutlookBarPanel标题</td>
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
<h3 id="panel-groups-mether">方法</h3>
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
           <td>设置OutlookBarPanel标题</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    }); 
    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";
    
      outlookBarPaneJsl.set_title('日历1111');

 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>active</td>
           <td>空</td> 
           <td>当OutlookBarPanel为当前panel时，加上css样式为选中</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

    outlookBarPaneJsl.active()
    

 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
          <tr>
           <td>inactive</td>
           <td>空</td> 
           <td> 当OutlookBarPanel不是当前panel时，删除css样式为不选中</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
     outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df"; 
    outlookBarPaneJsl.inactive()
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
   var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

    var isCurrent =outlookBarPaneJsl.get_isCurrent()
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
               <div id="Div2" class="bs-example">
                   <script type="text/javascript">
                       
                   </script> 
            </div>   
                 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var  outlookbar2= new JueKit.UI.OutlookBar({
        container: 'ScriptOutlookBar3',
        width:200,
        height: 200
    });

    var outlookBarPaneJsl = new JueKit.UI.OutlookBarPanel({
        parent: outlookbar2,
        title: "日历"
    });
    outlookBarPaneJsl.getEl().innerHTML = "content of Panel2 asdfad dafad dfasd dfasdf afadf a dfa df";

   var title = outlookBarPaneJsl.get_title()
     
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
      <script type="text/javascript">    hljs.initHighlightingOnLoad();</script>
      <script src="../bootstrap/js/application.js" type="text/javascript"></script>
  </body>
</html>