<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUITextBox.aspx.cs" Inherits="Controls_JueKitUITextBox" %>
<%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html>
<html>
<head id="Head2" runat="server">
  <title>JueKit 文本框组件API</title>
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
                <a href="#btn-groups">文本框组件</a>
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
              <h1 id="btn-groups">文本框组件</h1>
            </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
            <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
            <div class="bs-example">
              单行文本框：
              <jue:TextBox ID="TextBox1" Text="000" TextMode="0" Width="500"   runat="server"></jue:TextBox>
              <br/>
              多行文本框：
              <jue:TextBox ID="TextBox2" Text="000" TextMode="1"   Width="500" Height="50" runat="server"></jue:TextBox>
              <br/>
              密   码  框：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <jue:TextBox ID="TextBox3" Text="000" TextMode="2" runat="server"></jue:TextBox>
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
 单行文本框：&lt;jue:TextBox ID="TextBox1" Text="000" TextMode="0" Width="500"   runat="server"&gt;&lt;/jue:TextBox&gt;&lt;br/&gt; 
 多行文本框：&lt;jue:TextBox ID="TextBox2" Text="000" TextMode="1"  Width="500" Height="50"   runat="server"&gt;&lt;/jue:TextBox&gt;&lt;br/&gt; 
密   码  框：&lt;jue:TextBox ID="TextBox4" Text="000" TextMode="2" runat="server"&gt; &lt;/jue:TextBox&gt; 
     &lt;/jue:RichClientPanel&gt;
 
</code>
</pre>
            </div>
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="text1""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="text" class="bs-example">
              <script type="text/javascript">
           var TextBox1 = new JueKit.UI.TextBox({
               container: 'text',
               value: 'text1'
           });
           var TextBox2 = new JueKit.UI.TextBox({
               container: 'text',
               value: 'text2',
               textMode:1
           });
           var TextBox3 = new JueKit.UI.TextBox({
               container: 'text',
               value: 'text2',
               textMode: 2
           });
       </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
        var TextBox1 = new JueKit.UI.TextBox({
               container: 'text',
               value: 'text1'
           });
           var TextBox2 = new JueKit.UI.TextBox({
               container: 'text',
               value: 'text2',
               textMode:1
           });
           var TextBox3 = new JueKit.UI.TextBox({
               container: 'text',
               value: 'text2',
               textMode: 2
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
                    <td>文本框id,N表示 随机数</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>string</td>
                    <td>""</td>
                    <td>文本框默认值</td>
                  </tr>
                  <tr>
                    <td>textMode</td>
                    <td>nunber</td>
                    <td>0</td>
                    <td>设置文本框是类型，0：表示text框，1：表示textarea框，2：表示password框</td>
                  </tr>
                  <tr>
                    <td>valueColName</td>
                    <td>string</td>
                    <td>""</td>
                    <td>设置文本框的值 和 datagrid的 列名称一致</td>
                  </tr>
                  <tr>
                    <td>selectOnFocus</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>设置文本框是否获得焦点，true:文本框获得焦点，false:表示不获得焦点</td>
                  </tr>
                  <tr>
                    <td>readOnly</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>设置文本框是否只读，true:文本框只读，false:表示可编辑</td>
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
                    <td>set_value</td>
                    <td>value</td>
                    <td>设置文本框值</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });  
       
  btnOK.set_value("显示"); 
 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
                  </tr>
                  <tr>
                    <td>set_width</td>
                    <td>width</td>
                    <td>设置文本框宽度</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  btnOK.set_width(300);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>set_size</td>
                    <td>size</td>
                    <td>设置文本框size的值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  btnOK.set_size(10);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td>设置文本框只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  btnOK.set_readOnly(true);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>set_textColName</td>
                    <td>name</td>
                    <td>设置文本框的值 和 datagrid的 列名称一致</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  btnOK.set_textColName("datagridNanme");
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>get_value</td>
                    <td>空</td>
                    <td>获得文本框值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  var btnOKvalue = btnOK.get_value();
  alert(btnOKvalue);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>get_textMode</td>
                    <td>空</td>
                    <td>获得文本框类型</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  var btnOKtextMode = btnOK.get_textMode();
  alert(btnOKtextMode);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr> 
                   <tr>
                    <td>get_readOnly</td>
                    <td>空</td>
                    <td>获得文本框是否只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.TextBox({ container: 'Div1', value: '隐藏' });    
  var btnOKreadOnly = btnOK.get_readOnly();
  alert(btnOKreadOnly);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>focus</td>
                    <td>空</td>
                    <td>设置文本框获得焦点</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var btnDiv3 = new JueKit.UI.TextBox({ container: 'Div3', value: '设置文本框获得焦点' });
       btnDiv3.focus();
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>onUpdateCtlData</td>
                    <td>dataSource</td>
                    <td>当数据源发生改变时，更新控件</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnDiv4 = new JueKit.UI.TextBox({ container: 'Div4', value: '当数据源发生改变时，更新控件' });
     btnDiv4.onUpdateCtlData(dataSource);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>onUpdateData</td>
                    <td>dataSource</td>
                    <td> 当控件数据发生改变时，更改数据源</td>
                  </tr>
                  <tr>
                    <td colspan="3">  
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var btnDiv4 = new JueKit.UI.TextBox({ container: 'Div4', value: '当控件数据发生改变时，更改数据源' });
     btnDiv4.onUpdateData(dataSource);
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
  <script >hljs.initHighlightingOnLoad();</script>
  <script src="../bootstrap/js/application.js" type="text/javascript"></script>
</body>
</html>