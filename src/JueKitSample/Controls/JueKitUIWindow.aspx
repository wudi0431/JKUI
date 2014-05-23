<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIWindow.aspx.cs" Inherits="Controls_JueKitUIButton" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %> 
<!DOCTYPE html>
<html>
  <head id="Head2" runat="server">
    <title>JueKit Window组件API</title>
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
                <a href="#btn-groups">Window组件</a>
                  <ul class="nav">
                    <li><a href="#btn-groups-single">基本案例</a></li>
                    <li><a href="#btn-groups-pre">属性</a></li>
                    <li><a href="#btn-groups-mether">方法</a></li> 
                 </ul>
            </li>
            <li>
                <a href="#loadingwindow-groups">IFrameWnd组件</a>
                  <ul class="nav">
                    <li><a href="#loadingwindow-groups-single">基本案例</a></li>
                    <li><a href="#loadingwindow-groups-pre">属性</a></li>
                    <li><a href="#loadingwindow-groups-mether">方法</a></li> 
                 </ul>
            </li>
            </ul>
        </div>
    </div>
    <div class="col-md-9" role="main">
    <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="btn-groups">Window组件</h1>
        </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
    <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
    <div class="bs-example">
         <jue:Button ID="Button1" runat="server" Text="打开窗口"></jue:Button> 
        <script type="text/javascript">
            function rcpMain_Load(sender, args) {
                var btnOK23 = JueKit.theRcp.findControl("Button1");
                var window1 = JueKit.theRcp.findControl("Window1");
                btnOK23.addHandler("click", function () {
                    window1.showDialog();
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
         &lt;jue:Window ID="Window2" runat="server" ClientVisible="false" RecycleUse="true"
            Text="window窗口" Width="600" LazyLoad="true"&gt;
            window窗口
        &lt;/jue:Window&gt;   
     &lt;/jue:RichClientPanel&gt;
     <br/>
      &lt;script type="text/javascript"&gt;
          function rcpMain_Load(sender, args) {
               var btnOK = JueKit.theRcp.findControl("Button1");
                var window1 = JueKit.theRcp.findControl("Window1");
                btnOK.addHandler("click", function () {
                    window1.showDialog();
                });
          } 
     &lt;/script&gt;
</code>
</pre> 
</div>
       <h5>2.js用法</h5>
    <p> 在页面上写一占位符  
  <div class="highlight">
        <code class="language-html">
           &lt;div id="window2""&gt;&lt;/div&gt; 
         </code>
     </div>
    </p>
    <div id="window2" class="bs-example">
       <script type="text/javascript"> 
           var window2 = new JueKit.UI.Window({
               text: 'window窗口1',
               recycleUse: true,
               innerHTML: "window窗口1",
               width:600,
               visible: false
           }); 
           var btnOK = new JueKit.UI.Button({ container: 'window2', text: '打开窗口' }); 
           btnOK.addHandler("click", function () {
               window2.showDialog();
           });
            
       </script> 
    </div>

<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var window2 = new JueKit.UI.Window({
        text: 'window窗口1',
        recycleUse: true,
        innerHTML: "window窗口1",
        width:600,
        visible: false
    }); 
    var btnOK = new JueKit.UI.Button({ container: 'window2', text: '打开窗口' }); 
    btnOK.addHandler("click", function () {
        window2.showDialog();
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
            <td>id</td>
            <td>string</td>
            <td>_jctl_N</td>
            <td>Windowid,N表示 随机数</td>
            </tr>
         <tr>
           <td>minimizeBox</td>
           <td>boolean</td>
           <td>true</td>
           <td>设置窗口是否显示小窗口，true:显示最小窗口，false：不显示最小窗口</td>
         </tr>
         <tr>
           <td>maximizeBox</td>
           <td>boolean</td>
           <td>true</td>
           <td>设置窗口是否显示最大窗口，true:显示最大窗口，false：不显示最大窗口</td>
         </tr>
          <tr>
           <td>recycleUse</td>
           <td>boolean</td>
           <td>true</td>
           <td>是否重复利用JueKit.UI.Window对象,true:表示重复利用JueKit.UI.Window对象，false:不重复利用JueKit.UI.Window对象,并删除Window对象</td>
         </tr>
          <tr>
           <td>lazyLoad</td>
           <td>boolean</td>
           <td>false</td>
           <td>是否延迟加载，true:延迟加载，false：不延迟加载，只对页面用法有效</td>
         </tr>
          <tr>
           <td>text</td>
           <td>string</td>
           <td>""</td>
           <td>窗口的标题</td>
         </tr>
         <tr>
           <td>innerHTML</td>
           <td>string</td>
           <td>""</td>
           <td>窗口的内容</td>
         </tr>
         <tr>
           <td>visible</td>
           <td>boolean</td>
           <td>true</td>
           <td>窗口的是否显示，true:显示，false：不显示</td>
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
           <td>showDialog</td>
           <td>空</td> 
           <td>显示Window窗口</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var window2 = new JueKit.UI.Window({
        text: 'window窗口1',
        recycleUse: true,
        innerHTML: "window窗口1",
        width:600,
        visible: false
    }); 
    var btnOK = new JueKit.UI.Button({ container: 'window2', text: '打开窗口' }); 
    btnOK.addHandler("click", function () {
        window2.showDialog();
    });   
 &lt;/script&gt; 
</code>
</pre> 
</div>   

            </td>
         </tr>
         <tr>
           <td>close</td>
           <td>dialogResult</td> 
           <td>关掉Window窗口</td>
         </tr>
         <tr>
            <td colspan="3">
              <div id="window3" class="bs-example">
                   <script type="text/javascript">
                       //js 方法创建window
                       var window3 = new JueKit.UI.Window({
                           text: 'window窗口3',
                           recycleUse: true,
                           innerHTML: "window窗口3",
                           width: 600,
                           visible: false,
                           createWindowContent: function (elBodyInner, objData) { 
                               var elOpt = JueKit.Dom.createEl("div");
                               elOpt.className = "jueFormOpt";
                               elBodyInner.appendChild(elOpt);
                               var btnOK3 = new JueKit.UI.Button({ container: elOpt, text: '确定' });
                               var btnCancel = new JueKit.UI.Button({ container: elOpt, text: '取消' });

                               btnOK3.addHandler("click", function () {
                                   window3.close(1);
                                   alert(window3.get_dialogResult());
                               });
                               btnCancel.addHandler("click", function () {
                                   window3.close(0);
                                   alert(window3.get_dialogResult());
                               });
                           }
                       });
                       var btnOK23 = new JueKit.UI.Button({ container: 'window3', text: '打开窗口' });
                       btnOK23.addHandler("click", function () {
                           window3.showDialog();
                       });
                       var MyWindow = {};
                       MyWindow = JueKit.Type.createClass("MyWindow", JueKit.UI.Window, {
                           createWindowContent: function (elBodyInner, objData) {
                               this.elOpt = JueKit.Dom.createEl("div");
                               this.elOpt.className = "jueFormOpt";
                               elBodyInner.appendChild(this.elOpt);
                               this.btnOK56 = new JueKit.UI.Button({ container: this.elOpt, text: '确定' });
                               this.btnCancel1 = new JueKit.UI.Button({ container: this.elOpt, text: '取消' });

                               this.btnOK56.addHandler("click", function () {
                                   this.close(1);
                                   alert(this.get_dialogResult());
                               },this);
                               this.btnCancel1.addHandler("click", function () {
                                   this.close(0);
                                   alert(this.get_dialogResult());
                               },this);
                           } 
                       });

                       var myWindow = new MyWindow({
                           text: 'myWindow窗口',
                           recycleUse: true,
                           innerHTML: "myWindow窗口",
                           width: 600,
                           visible: false
                       });
                       var myWindowbtnOK = new JueKit.UI.Button({ container: 'window3', text: '打开myWindow窗口' });
                       myWindowbtnOK.addHandler("click", function () {
                           myWindow.showDialog();
                       });

                   </script> 
            </div>
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 // js创建 window和里面的内容
 var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600,
        visible: false,
        createWindowContent: function (elBodyInner, objData) { 
            var elOpt = JueKit.Dom.createEl("div");
            elOpt.className = "jueFormOpt";
            elBodyInner.appendChild(elOpt);
            var btnOK3 = new JueKit.UI.Button({ container: elOpt, text: '确定' });
            var btnCancel = new JueKit.UI.Button({ container: elOpt, text: '取消' });

            btnOK3.addHandler("click", function () {
                window3.close(1);
                alert(window3.get_dialogResult());
            });
            btnCancel.addHandler("click", function () {
                window3.close(0);
                alert(window3.get_dialogResult());
            });
        }
    });
    var btnOK23 = new JueKit.UI.Button({ container: 'window3', text: '打开窗口' });
    btnOK23.addHandler("click", function () {
        window3.showDialog();
    });
    
    
// js创建 window和继承window 和创建内容
    var MyWindow = {};
    MyWindow = JueKit.Type.createClass("MyWindow", JueKit.UI.Window, {
        createWindowContent: function (elBodyInner, objData) {
            this.elOpt = JueKit.Dom.createEl("div");
            this.elOpt.className = "jueFormOpt";
            elBodyInner.appendChild(this.elOpt);
            this.btnOK56 = new JueKit.UI.Button({ container: this.elOpt, text: '确定' });
            this.btnCancel1 = new JueKit.UI.Button({ container: this.elOpt, text: '取消' });

            this.btnOK56.addHandler("click", function () {
                this.close(1);
                alert(this.get_dialogResult());
            },this);
            this.btnCancel1.addHandler("click", function () {
                this.close(0);
                alert(this.get_dialogResult());
            },this);
        } 
    });

    var myWindow = new MyWindow({
        text: 'myWindow窗口',
        recycleUse: true,
        innerHTML: "myWindow窗口",
        width: 600,
        visible: false
    });
    var myWindowbtnOK = new JueKit.UI.Button({ container: 'window3', text: '打开myWindow窗口' });
    myWindowbtnOK.addHandler("click", function () {
        myWindow.showDialog();
    });
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
          <tr>
           <td>center</td>
           <td>left, top</td> 
           <td>窗口位置居中显示 left,top的值就 0到1之间</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    });
    window3.center(0.5,0.5)
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>maximize</td>
           <td>空</td> 
           <td>窗口最大化</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    });
    window3.maximize()
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
  <tr>
           <td>minimize</td>
           <td>空</td> 
           <td>窗口最小化</td>
         </tr>
         <tr>
            <td colspan="3"> 
<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    });
    window3.minimize()
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>restore</td>
           <td>空</td> 
           <td>恢复原始状态</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    });
    window3.restore()
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>set_text</td>
           <td>text</td> 
           <td>设置窗口的标题</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    });
    window3.set_text('window窗口4');
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>set_innerWidth</td>
           <td>width</td> 
           <td>设置窗口内容高度</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    });
    // 出现滚动条
    window3.set_innerWidth(1000);
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_windowBodyEl</td>
           <td>空</td> 
           <td>获得窗口存放内容的el</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    }); 
    var windowBodyEl = window3.get_windowBodyEl();
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr>
 <tr>
           <td>get_dialogResult</td>
           <td>空</td> 
           <td>获得窗口关闭的值</td>
         </tr>
         <tr>
            <td colspan="3">  
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var window3 = new JueKit.UI.Window({
        text: 'window窗口3',
        recycleUse: true,
        innerHTML: "window窗口3",
        width: 600
    }); 
    var dialogResult =window3.get_dialogResult();
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
          <h1 id="loadingwindow-groups">IFrameWnd组件</h1>
        </div>
            <h3 id="loadingwindow-groups-single">基本案例</h3> 
       <h5>1.js用法</h5>
    <p> 在页面上写一占位符  
  <div class="highlight">
        <code class="language-html">
           &lt;div id="iFrameWnd""&gt;&lt;/div&gt; 
         </code>
     </div>
    </p>
    <div id="iFrameWnd" class="bs-example">
       <script type="text/javascript">
           var formUrl = '/JueKitSample/Controls/JueKitUIWindow.aspx'; 
           var btnOKrrr = new JueKit.UI.Button({ container: 'iFrameWnd', text: '打开窗口' });
           btnOKrrr.addHandler("click", function () {
                 JueKit.UI.IFrameWnd.showDialog({
                   title: 'IFrame窗口',
                   url: formUrl,
                   width: 600,
                   height: 500
               });
           });
       </script> 
    </div>

<div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
     var formUrl = '/JueKitSample/Controls/JueKitUIWindow.aspx'; 
    var btnOK = new JueKit.UI.Button({ container: 'iFrameWnd', text: '打开窗口' });
    btnOK.addHandler("click", function () {
            JueKit.UI.IFrameWnd.showDialog({
            title: 'IFrame窗口',
            url: formUrl,
            width: 600,
            height: 500
        });
    });  
 &lt;/script&gt; 
</code>
</pre> 
</div>
 <h3 id="loadingwindow-groups-pre">属性</h3>
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
            <td>可选属性</td>
             <td colspan="3"> IFrameWnd组件继承于Window组件，所以IFrameWnd组件有Window组件所有属性</td>
            </tr>
         <tr>
           <td>title</td>
           <td>string</td>
           <td>""</td>
           <td>设置 IFrameWnd组件标题</td>
         </tr> 
        </tbody>
      </table>
    </div>
<h3 id="loadingwindow-groups-mether">方法</h3>
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
           <td>可选方法</td>  
           <td colspan="2">IFrameWnd组件继承于Window组件，所以IFrameWnd组件有Window组件所有方法</td>
         </tr> 
         <tr>
           <td>set_url</td>
           <td>url</td> 
           <td>设置IFrameWnd窗口的url</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var formUrl = '/JueKitSample/Controls/JueKitUIWindow.aspx'; 
    var btnOK = new JueKit.UI.Button({ container: 'iFrameWnd', text: '打开窗口' });
    btnOK.addHandler("click", function () {
            var iframewind =JueKit.UI.IFrameWnd.showDialog({
            title: 'IFrame窗口', 
            width: 600,
            height: 500
        });
        iframewind.set_url(formUrl)
    });  
     
 &lt;/script&gt; 
</code>
</pre> 
</div>
</td>   
 </tr> 
 <tr>
           <td>get_url</td>
           <td>空</td> 
           <td>获得IFrameWnd窗口的url</td>
         </tr>
         <tr>
            <td colspan="3"> 
              <div class="highlight">
<pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var formUrl = '/JueKitSample/Controls/JueKitUIWindow.aspx'; 
    var btnOK = new JueKit.UI.Button({ container: 'iFrameWnd', text: '打开窗口' });
    btnOK.addHandler("click", function () {
            var iframewind =JueKit.UI.IFrameWnd.showDialog({
            title: 'IFrame窗口', 
            url: formUrl,
            width: 600,
            height: 500
        });
        alert(iframewind.get_url())
    });  
     
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
 <jue:Window ID="Window1" runat="server" ClientVisible="false" RecycleUse="true"
            Text="window窗口" Width="600" LazyLoad="true">
            window窗口
 </jue:Window> 
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