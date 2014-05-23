<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIButton.aspx.cs" Inherits="Controls_JueKitUIButton" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %> 
<!DOCTYPE html>
<html>
  <head id="Head2" runat="server">
    <title>JueKit 按钮组件API</title>
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
                <a href="#btn-groups">按钮组件</a>
                  <ul class="nav">
                    <li><a href="#btn-groups-single">基本案例</a></li>
                    <li><a href="#btn-groups-pre">属性</a></li>
                    <li><a href="#btn-groups-mether">方法</a></li> 
                 </ul>
            </li>
            </ul>
        </div>
    </div>
    <div class="col-md-9" role="main">
    <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="btn-groups">按钮组件</h1>
        </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
    <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
    <div class="bs-example">
        <jue:Button ID="Button1" runat="server" Text="OK" Type="Submit"></jue:Button>
        <script type="text/javascript">
            function rcpMain_Load(sender, args) {
                var btnOK = JueKit.theRcp.findControl("Button1");
                btnOK.addHandler("click", function () {
                    alert('单击事件绑定成功！！！');
                }); 
            } 
        </script>
    </div> 
<div class="highlight">
<pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
     &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt; 
        &lt;jue:Button ID="Button1" runat="server" Text="OK" Type="Submit"&gt;&lt;/jue:Button&gt;  
     &lt;/jue:RichClientPanel&gt;
     <br/>
      &lt;script type="text/javascript"&gt;
          function rcpMain_Load(sender, args) {
              var btnOK = JueKit.theRcp.findControl("Button1");
              btnOK.addHandler("click", function () {
                  alert('单击事件绑定成功！！！');
              });
          } 
     &lt;/script&gt;
</code>
</pre> 
</div>
       <h5>2.js用法</h5>
    <p> 在页面上写一占位符  
  <div class="highlight">        <code class="language-html">
           &lt;div id="btn""&gt;&lt;/div&gt; 
         </code>
     </div>
    </p>
    <div id="btn" class="bs-example">
       <script type="text/javascript"> 
           var btnOK = new JueKit.UI.Button({ container: 'btn', text: '按钮' });
           var btnOK1 = new JueKit.UI.Button({ container: 'btn', text: 'icon按钮', iconCssCls: "btn1" });
           var btnOK2 = new JueKit.UI.Button({ container: 'btn', text: '禁用按钮', disabled: true });
           btnOK.addHandler("click", function () {
               alert('单击事件绑定成功！！！');
           });
           btnOK1.addHandler("click", function () {
               alert('单击事件绑定成功和icon样式设置成功！！！');
           }); 
       </script> 
    </div>

<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
       var btnOK = new JueKit.UI.Button({ container: 'btn', text: '按钮' });
       var btnOK1 = new JueKit.UI.Button({ container: 'btn', text: 'icon按钮', iconCssCls: "btn1" });
       var btnOK2 = new JueKit.UI.Button({ container: 'btn', text: '禁用按钮', disabled: true });
       btnOK.addHandler("click", function () {
           alert('单击事件绑定成功！！！');
       });
       btnOK1.addHandler("click", function () {
           alert('单击事件绑定成功和icon样式设置成功！！！');
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
           <td>jueBtn</td>
           <td>设置按钮样式</td>
         </tr>
         <tr>
           <td>iconCssCls</td>
           <td>string</td>
           <td>jueBtnIcon</td>
           <td>设置按钮icon样式</td>
         </tr>
          <tr>
           <td>disabled</td>
           <td>boolean</td>
           <td>false</td>
           <td>设置按钮是否禁用，true 表示 禁用，false 表示 不禁用</td>
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
           <td>show</td>
           <td>空</td> 
           <td>将隐藏的按钮显示</td>
         </tr>
         <tr>
            <td colspan="3">
              <div id="Div1" class="bs-example">
                   <script type="text/javascript">
                       var btnOK = new JueKit.UI.Button({ container: 'Div1', text: '隐藏' });  
                       var btnOK2 = new JueKit.UI.Button({ container: 'Div1', text: '按钮' });
                       var flag = true;
                       btnOK.addHandler("click", function () {
                           if (!flag) {
                               btnOK2.show();
                               flag = true;
                               btnOK.set_text("隐藏");
                           } else {
                               btnOK2.show(false);
                               flag = false;
                               btnOK.set_text("显示");
                           }

                       }); 
                   </script> 
            </div>
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
       var btnOK = new JueKit.UI.Button({ container: 'Div1', text: '隐藏' });  
        var btnOK2 = new JueKit.UI.Button({ container: 'Div1', text: '按钮' });
        var flag = true;
        btnOK.addHandler("click", function () {
            if (!flag) {
                btnOK2.show();
                flag = true;
                btnOK.set_text("隐藏");
            } else {
                btnOK2.show(false);
                flag = false;
                btnOK.set_text("显示");
            } 
   }); 
 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>set_width</td>
           <td>width</td> 
           <td>设置按钮宽度</td>
         </tr>
         <tr>
            <td colspan="3">
              <div id="Div2" class="bs-example">
                   <script type="text/javascript">
                       var btnOK3 = new JueKit.UI.Button({ container: 'Div2', text: '设置按钮宽度为200' }); 
                       var flag1 = true;
                       btnOK3.addHandler("click", function () {
                           if (!flag1) {
                               flag1 = true;
                               btnOK3.set_text('设置按钮宽度为200');
                               btnOK3.set_width(150);
                           } else {
                               flag1 = false;
                               btnOK3.set_width(200);
                               btnOK3.set_text('设置按钮宽度为150');
                           }

                       }); 
                   </script> 
            </div>
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var btnOK3 = new JueKit.UI.Button({ container: 'Div2', text: '设置按钮宽度为200' }); 
        var flag1 = true;
        btnOK3.addHandler("click", function () {
            if (!flag1) {
                flag1 = true;
                btnOK3.set_text('设置按钮宽度为200');
                btnOK3.set_width(150);
            } else {
                flag1 = false;
                btnOK3.set_width(200);
                btnOK3.set_text('设置按钮宽度为150');
            }

        }); 
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
          <tr>
           <td>focus</td>
           <td>空</td> 
           <td> 按钮焦点事件</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var btnDiv3 = new JueKit.UI.Button({ container: 'Div3', text: '按钮焦点事件' });
       btnDiv3.focus();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>blur</td>
           <td>空</td> 
           <td>按钮失去焦点事件</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnDiv4 = new JueKit.UI.Button({ container: 'Div4', text: '按钮失去焦点事件' });
     btnDiv4.blur();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>set_disabled</td>
           <td>boolean</td> 
           <td>设置按钮是否禁用</td>
         </tr>
         <tr>
            <td colspan="3">
               <div id="Div5" class="bs-example">
                   <script type="text/javascript">
                       var btnOK4 = new JueKit.UI.Button({ container: 'Div5', text: '设置禁用' });
                       var btnOK5 = new JueKit.UI.Button({ container: 'Div5', text: '按钮' });
                       var fla1g = true;
                       btnOK4.addHandler("click", function () {
                           if (!flag1) {
                               btnOK5.set_disabled(false);
                               flag1 = true;
                               btnOK4.set_text("设置禁用");
                           } else {
                               btnOK5.set_disabled(true);
                               flag1 = false;
                               btnOK4.set_text("设置启用");
                           }

                       }); 
                   </script> 
            </div>   
                 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var btnOK4 = new JueKit.UI.Button({ container: 'Div5', text: '设置禁用' });
    var btnOK5 = new JueKit.UI.Button({ container: 'Div5', text: '按钮' });
    var fla1g = true;
    btnOK4.addHandler("click", function () {
        if (!flag1) {
            btnOK5.set_disabled(false);
            flag1 = true;
            btnOK4.set_text("设置禁用");
        } else {
            btnOK5.set_disabled(true);
            flag1 = false;
            btnOK4.set_text("设置启用");
        }

    }); 
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>set_text</td>
           <td>value</td> 
           <td>设置按钮显示文本</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnDiv4 = new JueKit.UI.Button({ container: 'Div4', text: '按钮失去焦点事件' });
      btnDiv4.set_text("设置启用");
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_disabled</td>
           <td>空</td> 
           <td>得到按钮 是否禁用</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnDiv4 = new JueKit.UI.Button({ container: 'Div4', text: '按钮失去焦点事件' });
      var isDisabled = btnDiv4.get_disabled();
      alert(isDisabled);
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
      <script  type="text/javascript">    hljs.initHighlightingOnLoad();</script>
      <script src="../bootstrap/js/application.js" type="text/javascript"></script>
  </body>
</html>