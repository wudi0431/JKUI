<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUICheckBox.aspx.cs" Inherits="Controls_JueKitUITextBox" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html>
<html>
<head id="Head2" runat="server">
  <title>JueKit 选择框组件API</title>
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
                <a href="#btn-groups">选择框组件</a>
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
              <li>
                <a href="#checkBox-groups">多项选择框组件</a>
                <ul class="nav">
                  <li>
                    <a href="#checkBox-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#checkBox-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#checkBox-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9" role="main">
          <div class="bs-docs-section">
            <div class="page-header">
              <h1 id="btn-groups">选择框组件</h1>
            </div>
            <h3 id="btn-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
            <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
            <div class="bs-example">  
            <jue:CheckBox ID="CheckBox1" Text="001"  OnClientChange="checkBoxChange" runat="server"></jue:CheckBox>
            <jue:CheckBox ID="CheckBox2" Text="002"  OnClientChange="checkBoxChange" runat="server"></jue:CheckBox>
            <jue:CheckBox ID="CheckBox3" Text="003"  OnClientChange="checkBoxChange" runat="server"></jue:CheckBox> 
              <script type="text/javascript">
                  function rcpMain_Load(sender, args) {


                  } 
                  function checkBoxChange(sender, args) {
                      alert( "选中值是："+sender.get_text());
                  }
              </script>
            </div>
            <div class="highlight">
              <pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
   &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt; 
      &lt;jue:CheckBox ID="CheckBox1" Text="001"  OnClientChange="checkBoxChange" runat="server"&gt;&lt;/jue:CheckBox&gt;
      &lt;jue:CheckBox ID="CheckBox2" Text="002"  OnClientChange="checkBoxChange" runat="server"&gt;&lt;/jue:CheckBox&gt;
      &lt;jue:CheckBox ID="CheckBox3" Text="003"  OnClientChange="checkBoxChange" runat="server"&gt;&lt;/jue:CheckBox&gt; 
 &lt;/jue:RichClientPanel&gt;
 
</code>
</pre>
            </div>
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="checkBox1""&gt;&lt;/div&gt; </code>
              </div>
                <p>
                </p>
                <div ID="checkBox" class="bs-example">
                    <script type="text/javascript">

                  var checkBox1 = new JueKit.UI.CheckBox({
                      container: 'checkBox',
                      text: 'checkBox1'
                  });
                  var checkBox2 = new JueKit.UI.CheckBox({
                      container: 'checkBox',
                      text: 'checkBox2'
                  });
                  var checkBox3 = new JueKit.UI.CheckBox({
                      container: 'checkBox',
                      text: 'checkBox3'

                  });
                  checkBox1.addHandler("change", function () {
                      if (checkBox1.get_checked()) alert(checkBox1.get_text());
                  });
                  checkBox2.addHandler("change", function () {
                      if (checkBox2.get_checked()) alert(checkBox2.get_text());
                  });
                  checkBox3.addHandler("change", function () {
                      if (checkBox3.get_checked()) alert(checkBox3.get_text());
                  }); 
              </script>
                </div>
                <div class="highlight">
                    <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
       var checkBox1 = new JueKit.UI.CheckBox({
                 container: &#39;checkBox&#39;,
                 text: &#39;checkBox1&#39;
           });
           var checkBox2 = new JueKit.UI.CheckBox({
               container: &#39;checkBox&#39;,
               text: &#39;checkBox2&#39;
           });
           var checkBox3 = new JueKit.UI.CheckBox({
               container: &#39;checkBox&#39;,
               text: &#39;checkBox3&#39;

           });
           checkBox1.addHandler(&quot;change&quot;, function () {
               if (checkBox1.get_checked()) alert(checkBox1.get_text());
           });
           checkBox2.addHandler(&quot;change&quot;, function () {
               if (checkBox2.get_checked()) alert(checkBox2.get_text());
           });
           checkBox3.addHandler(&quot;change&quot;, function () {
               if (checkBox3.get_checked()) alert(checkBox3.get_text());
           }); 
 &lt;/script&gt; 
</code>
</pre>
                </div>
                <h3 ID="btn-groups-pre">
                    属性</h3>
                <p>
                    可选属性</p>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style="width: 100px;">
                                    名称</th>
                                <th style="width: 100px;">
                                    类型</th>
                                <th style="width: 50px;">
                                    默认值</th>
                                <th>
                                    描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    id</td>
                                <td>
                                    string</td>
                                <td>
                                    _jctl_N</td>
                                <td>
                                    选择框id,N表示 随机数</td>
                            </tr>
                            <tr>
                                <td>
                                    value</td>
                                <td>
                                    string</td>
                                <td>
                                    &quot;&quot;</td>
                                <td>
                                    选择框value默认值</td>
                            </tr>
                            <tr>
                                <td>
                                    text</td>
                                <td>
                                    string</td>
                                <td>
                                    &quot;&quot;</td>
                                <td>
                                    设置选择框显示文本值</td>
                            </tr>
                            <tr>
                                <td>
                                    valueColName</td>
                                <td>
                                    string</td>
                                <td>
                                    &quot;&quot;</td>
                                <td>
                                    设置选择框的值 和 datagrid的 列名称一致</td>
                            </tr>
                            <tr>
                                <td>
                                    checked</td>
                                <td>
                                    boolean</td>
                                <td>
                                    false</td>
                                <td>
                                    设置选择框是否被选中，true:选择框被选中，false:表示不被选中</td>
                            </tr>
                            <tr>
                                <td>
                                    readOnly</td>
                                <td>
                                    boolean</td>
                                <td>
                                    false</td>
                                <td>
                                    设置选择框是否只读，true:选择框只读，false:表示可编辑</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 ID="btn-groups-mether">
                    方法</h3>
                <p>
                    可选方法</p>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style="width: 100px;">
                                    名称</th>
                                <th style="width: 100px;">
                                    参数</th>
                                <th>
                                    描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    set_value</td>
                                <td>
                                    value</td>
                                <td>
                                    设置选择框value值</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
    var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });   
    btnOK.set_value(&quot;1&quot;); 
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_text</td>
                                <td>
                                    text</td>
                                <td>
                                    设置选择框显示文本的值</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });    
  btnOK.set_text(&#39;显示&#39;);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_checked</td>
                                <td>
                                    boolean</td>
                                <td>
                                    设置选择框是否被选中的值</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });    
  btnOK.set_checked(true);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_readOnly</td>
                                <td>
                                    boolean</td>
                                <td>
                                    设置选择框只读</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });    
  btnOK.set_readOnly(true);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_textColName</td>
                                <td>
                                    name</td>
                                <td>
                                    设置选择框的值 和 datagrid的 列名称一致</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });    
  btnOK.set_textColName(&quot;datagridNanme&quot;);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    get_value</td>
                                <td>
                                    空</td>
                                <td>
                                    获得选择框值</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, value: &#39;0&#39;, text: &#39;隐藏&#39; });    
  var btnOKvalue = btnOK.get_value();
  alert(btnOKvalue);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    get_checked</td>
                                <td>
                                    空</td>
                                <td>
                                    获得选择框s是否被选中</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });    
  var btnOKtextMode = btnOK.get_checked();
  alert(btnOKtextMode);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    get_readOnly</td>
                                <td>
                                    空</td>
                                <td>
                                    获得选择框是否只读</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnOK = new JueKit.UI.CheckBox({ container: &#39;Div1&#39;, text: &#39;隐藏&#39; });    
  var btnOKreadOnly = btnOK.get_readOnly();
  alert(btnOKreadOnly);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    onUpdateCtlData</td>
                                <td>
                                    dataSource</td>
                                <td>
                                    当数据源发生改变时，更新控件</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var btnDiv4 = new JueKit.UI.CheckBox({ container: &#39;Div4&#39;, text: &#39;当数据源发生改变时，更新控件&#39; });
     btnDiv4.onUpdateCtlData(dataSource);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    onUpdateData</td>
                                <td>
                                    dataSource</td>
                                <td>
                                    当控件数据发生改变时，更改数据源</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
 var btnDiv4 = new JueKit.UI.CheckBox({ container: &#39;Div4&#39;, text: &#39;当控件数据发生改变时，更改数据源&#39; });
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
            </p>
          </div>
          <div class="bs-docs-section">
            <div class="page-header">
              <h1 id="checkBox-groups">多项选择框组件</h1>
            </div>
            <h3 id="checkBox-groups-single">基本案例</h3>
            <h5>1.页面用法</h5>
            <p>把 ClientResourceManager和 RichClientPanel 加到页面中</p>
            <div class="bs-example">  
            <jue:CheckBoxList ID="CheckBoxList1"  runat="server"></jue:CheckBoxList> 
              <script type="text/javascript">
                  function rcpMain_Load(sender, args) { 
                      var checkBoxList1 = JueKit.theRcp.findControl("CheckBoxList1");
                      checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: 'CheckBox0', value: 0 }));
                      checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: 'CheckBox1', value: 1 }));
                      checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: 'CheckBox2', value: 2 }));

                      checkBoxList1.addHandler("change", function () {
                          alert(checkBoxList1.getSelectItemText());
                      });

                  } 
              </script>
            </div>
            <div class="highlight">
              <pre>
<code class="language-html">
 &lt;jue:ClientResourceManager ID="ClientResourceManager1" runat="server"&gt;&lt;jue:ClientResourceManager&gt;
   &lt;jue:RichClientPanel ID="RichClientPanel1" runat="server" OnClientLoad="rcpMain_Load"&gt; 
        &lt;jue:CheckBoxList ID="CheckBoxList2"  runat="server"&gt; &lt;/jue:CheckBoxList&gt;
 &lt;/jue:RichClientPanel&gt;
    &lt;script type="text/javascript"&gt;
        function rcpMain_Load(sender, args) {
            var checkBoxList1 = JueKit.theRcp.findControl("CheckBoxList1");
            checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: 'CheckBox0', value: 0 }));
            checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: 'CheckBox1', value: 1 }));
            checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: 'CheckBox2', value: 2 }));

            checkBoxList1.addHandler("change", function () {
                alert(checkBoxList1.getSelectItemText());
            });

        } 
        &lt;/script&gt;
</code>
</pre>
            </div>
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="CheckBoxListjs""&gt;&lt;/div&gt; </code>
              </div>
                <p>
                </p>
                <div ID="CheckBoxListjs" class="bs-example">
                    <script type="text/javascript">
 
                
                  var checkBoxList1 = new JueKit.UI.CheckBoxList({
                      container: 'CheckBoxListjs',
                      items: [
                          { text: 'CheckBox0', value: 0 },
                          { text: 'CheckBox1', value: 1 },
                          { text: 'CheckBox2', value: 2 } 
                      ]
                  });

                  
                  checkBoxList1.addHandler("change", function () {
                      alert(checkBoxList1.getSelectItemText());
                  }); 

              </script>
                </div>
                <div class="highlight">
                    <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
      var checkBoxList1 = new JueKit.UI.CheckBoxList({
            container: &#39;CheckBoxListjs&#39;,
            items: [
            { text: &#39;CheckBox0&#39;, value: 0 },
            { text: &#39;CheckBox1&#39;, value: 1 },
            { text: &#39;CheckBox2&#39;, value: 2 } 
            ]
        });  
        checkBoxList1.addHandler(&quot;change&quot;, function () {
            alert(checkBoxList1.getSelectItemText());
        });
 &lt;/script&gt; 
</code>
</pre>
                </div>
                <h3 ID="checkBox-groups-pre">
                    属性</h3>
                <p>
                    可选属性</p>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style="width: 100px;">
                                    名称</th>
                                <th style="width: 100px;">
                                    类型</th>
                                <th style="width: 50px;">
                                    默认值</th>
                                <th>
                                    描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    id</td>
                                <td>
                                    string</td>
                                <td>
                                    _jctl_N</td>
                                <td>
                                    多选择框id,N表示 随机数</td>
                            </tr>
                            <tr>
                                <td>
                                    items</td>
                                <td>
                                    Object</td>
                                <td>
                                    []</td>
                                <td>
                                    多项选择框里面的选项 例如：items: [ { text: &#39;CheckBox0&#39;, value: 0 }, { text: &#39;CheckBox1&#39;, 
                                    value: 1 }, { text: &#39;CheckBox2&#39;, value: 2 } ]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    selectedText</td>
                                <td>
                                    string</td>
                                <td>
                                    &quot;&quot;</td>
                                <td>
                                    多项选择框默认选中显示文本值</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 ID="checkBox-groups-mether">
                    方法</h3>
                <p>
                    可选方法</p>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style="width: 100px;">
                                    名称</th>
                                <th style="width: 100px;">
                                    参数</th>
                                <th>
                                    描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    set_selectedIndex</td>
                                <td>
                                    index,boolean</td>
                                <td>
                                    多项选择设置那个文本被选中，index:文本所在索引，boolean :是否被选中</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
   var checkBoxList1 = new JueKit.UI.CheckBoxList({
            container: &#39;CheckBoxListjs&#39;,
            items: [
            { text: &#39;CheckBox0&#39;, value: 0 },
            { text: &#39;CheckBox1&#39;, value: 1 },
            { text: &#39;CheckBox2&#39;, value: 2 } 
            ]
        });   
    checkBoxList1.set_selectedIndex(0,true); 
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_selectedText</td>
                                <td>
                                    text,boolean</td>
                                <td>
                                    多项选择设置那个文本被选中，text:文本值，boolean :是否被选中</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var checkBoxList1 = new JueKit.UI.CheckBoxList({
            container: &#39;CheckBoxListjs&#39;,
            items: [
            { text: &#39;CheckBox0&#39;, value: 0 },
            { text: &#39;CheckBox1&#39;, value: 1 },
            { text: &#39;CheckBox2&#39;, value: 2 } 
            ]
        });   
    checkBoxList1.set_selectedText(&#39;CheckBox0&#39;,true); 
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_direction</td>
                                <td>
                                    number</td>
                                <td>
                                    设置多项选择排列方式，1:horizon水平，2：vertical垂直</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
 var checkBoxList1 = new JueKit.UI.CheckBoxList({
            container: &#39;CheckBoxListjs&#39;,
            items: [
            { text: &#39;CheckBox0&#39;, value: 0 },
            { text: &#39;CheckBox1&#39;, value: 1 },
            { text: &#39;CheckBox2&#39;, value: 2 } 
            ]
        });   
    checkBoxList1.set_direction(2); 
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    set_readOnly</td>
                                <td>
                                    boolean</td>
                                <td>
                                    设置多项选择框只读</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
 var checkBoxList1 = new JueKit.UI.CheckBoxList({
            container: &#39;CheckBoxListjs&#39;,
            items: [
            { text: &#39;CheckBox0&#39;, value: 0 },
            { text: &#39;CheckBox1&#39;, value: 1 },
            { text: &#39;CheckBox2&#39;, value: 2 } 
            ]
        });   
    
  checkBoxList1.set_readOnly(true);
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    addItem</td>
                                <td>
                                    object</td>
                                <td>
                                    添加多选框里面选项</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
  var checkBoxList1 = new JueKit.UI.CheckBoxList({
            container: &#39;CheckBoxListjs&#39;
        });    
  checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: &#39;CheckBox0&#39;, value: 0 }));
  checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: &#39;CheckBox1&#39;, value: 1 }));
  checkBoxList1.addItem(new JueKit.UI.CheckBox({ text: &#39;CheckBox2&#39;, value: 2 }));
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    removeItem</td>
                                <td>
                                    Item</td>
                                <td>
                                    删除多选框里面选项</td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="highlight">
                                        <pre>
<code class="language-html"> 
 &lt;script type=&quot;text/javascript&quot;&gt;
   var checkBoxList1 = new JueKit.UI.CheckBoxList({
        container: &#39;CheckBoxListjs&#39;,
        items: [
            { text: &#39;CheckBox0&#39;, value: 0 },
            { text: &#39;CheckBox1&#39;, value: 1 },
            { text: &#39;CheckBox2&#39;, value: 2 } 
        ]
    });  
    // 先获得所有的checkBox 
    var item1 = checkBoxList1.get_items();
     //删除 所指定的 item1.getAt(0) 的  checkBox的索引
    checkBoxList1.removeItem(item1.getAt(0));
 &lt;/script&gt; 
</code>
</pre>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </p>
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