<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIRadioBox.aspx.cs" Inherits="Controls_JueKitUITextBox" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html>
<html>
<head id="Head2" runat="server">
  <title>JueKit RadioBox选择框组件API</title>
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
                <a href="#btn-groups">RadioBox单选择框组件</a>
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
                <a href="#checkBox-groups">RadioBox多项选择框组件</a>
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
              <h1 id="btn-groups">RadioBox单选择框组件</h1>
            </div>
            <h3 id="btn-groups-single">基本案例</h3> 
            <h5>1.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="radioBox""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="radioBox" class="bs-example">
              <script type="text/javascript">
                  function rcpMain_Load() {
  
                  }  
                  var radioBox1 = new JueKit.UI.RadioBox({
                      container: 'radioBox',
                      text: 'radioBox1',
                      name: "radioBox"
                  });
                  var radioBox2 = new JueKit.UI.RadioBox({
                      container: 'radioBox',
                      text: 'radioBox2',
                      name: "radioBox"
                  });
                  radioBox1.addHandler("change", function () {
                      if (radioBox1.get_checked()) alert(radioBox1.get_text());
                  });
                  radioBox2.addHandler("change", function () {
                      if (radioBox2.get_checked()) alert(radioBox2.get_text());
                  });
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
        var radioBox1 = new JueKit.UI.RadioBox({
            container: 'radioBox',
            text: 'radioBox1',
            name: "radioBox"
        });
        var radioBox2 = new JueKit.UI.RadioBox({
            container: 'radioBox',
            text: 'radioBox2',
            name: "radioBox"
        });
        radioBox1.addHandler("change", function () {
            if (radioBox1.get_checked()) alert(radioBox1.get_text());
        });
        radioBox2.addHandler("change", function () {
            if (radioBox2.get_checked()) alert(radioBox2.get_text());
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
                    <td>选择框id,N表示 随机数</td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>string</td>
                    <td>""</td>
                    <td>选择框value默认值</td>
                  </tr>
                  <tr>
                    <td>text</td>
                    <td>string</td>
                    <td>""</td>
                    <td>设置选择框显示文本值</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>""</td>
                    <td>设置选择框的name值</td>
                  </tr>
                  <tr>
                    <td>checked</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>设置选择框是否被选中，true:选择框被选中，false:表示不被选中</td>
                  </tr>
                  <tr>
                    <td>readOnly</td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>设置选择框是否只读，true:选择框只读，false:表示可编辑</td>
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
                    <td>设置选择框value值</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });   
    btnOK.set_value("1"); 
 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
                  </tr>
                  <tr>
                    <td>set_text</td>
                    <td>text</td>
                    <td>设置选择框显示文本的值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });    
  btnOK.set_text('显示');
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>set_checked</td>
                    <td>boolean</td>
                    <td>设置选择框是否被选中的值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });    
  btnOK.set_checked(true);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td>设置选择框只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });    
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
                    <td>设置选择框的值 和 datagrid的 列名称一致</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });    
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
                    <td>获得选择框值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', value: '0', text: '隐藏' });    
  var btnOKvalue = btnOK.get_value();
  alert(btnOKvalue);
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>get_checked</td>
                    <td>空</td>
                    <td>获得选择框s是否被选中</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });    
  var btnOKtextMode = btnOK.get_checked();
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
                    <td>获得选择框是否只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var btnOK = new JueKit.UI.RadioBox({ container: 'Div1', text: '隐藏' });    
  var btnOKreadOnly = btnOK.get_readOnly();
  alert(btnOKreadOnly);
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
              <h1 id="checkBox-groups">RadioBox多项选择框组件</h1>
            </div>
            <h3 id="checkBox-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="radioBoxListjs""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="radioBoxListjs" class="bs-example">
              <script type="text/javascript">

                  var radioBoxList1 = new JueKit.UI.RadioBoxList({
                      container: 'radioBoxListjs',
                      items: [
                          { text: 'CheckBox0', value: 0, name: "RadioBoxListjs1" },
                          { text: 'CheckBox1', value: 1, name: "RadioBoxListjs1" },
                          { text: 'CheckBox2', value: 2, name: "RadioBoxListjs1" } 
                      ]
                  });


                  radioBoxList1.addHandler("change", function () {
                      alert(radioBoxList1.getSelectItemText());
                  });

//                  var item1 = checkBoxList1.get_items();

//                  checkBoxList1.removeItem(item1.getAt(0));

              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var radioBoxList1 = new JueKit.UI.RadioBoxList({
        container: 'radioBoxListjs',
        items: [
            { text: 'CheckBox0', value: 0, name: "RadioBoxListjs1" },
            { text: 'CheckBox1', value: 1, name: "RadioBoxListjs1" },
            { text: 'CheckBox2', value: 2, name: "RadioBoxListjs1" } 
        ]
    }); 
    radioBoxList1.addHandler("change", function () {
        alert(radioBoxList1.getSelectItemText());
    });
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="checkBox-groups-pre">属性</h3>
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
                    <td>RadioBoxList多选择框id,N表示 随机数</td>
                  </tr>
                  <tr>
                    <td>items</td>
                    <td>Object</td>
                    <td>[]</td>
                    <td>RadioBoxList多项选择框里面的选项 例如：items: [
                            { text: 'CheckBox0', value: 0 ,name: "RadioBoxListjs1"},
                            { text: 'CheckBox1', value: 1 ,name: "RadioBoxListjs1"},
                            { text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"} 
                            ] </td>
                  </tr>
                  <tr>
                    <td>selectedText</td>
                    <td>string</td>
                    <td>""</td>
                    <td>RadioBoxList多项选择框默认选中显示文本值</td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="checkBox-groups-mether">方法</h3>
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
                    <td>set_selectedIndex</td>
                    <td>index</td>
                    <td>多项选择设置那个文本被选中，index:文本所在索引</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var checkBoxList1 = new JueKit.UI.RadioBoxList({
            container: 'CheckBoxListjs',
            items: [
            { text: 'CheckBox0', value: 0 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox1', value: 1 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"} 
            ]
        });   
    checkBoxList1.set_selectedIndex(0); 
 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
                  </tr>
                  <tr>
                    <td>set_selectedText</td>
                    <td>text</td>
                    <td>RadioBoxList多项选择设置那个文本被选中，text:文本值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var checkBoxList1 = new JueKit.UI.RadioBoxList({
            container: 'CheckBoxListjs',
            items: [
            { text: 'CheckBox0', value: 0,name: "RadioBoxListjs1" },
            { text: 'CheckBox1', value: 1 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"} 
            ]
        });   
    checkBoxList1.set_selectedText('CheckBox0'); 
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>set_direction</td>
                    <td>number</td>
                    <td>设置RadioBoxList多项选择排列方式，1:horizon水平，2：vertical垂直</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var checkBoxList1 = new JueKit.UI.RadioBoxList({
            container: 'CheckBoxListjs',
            items: [
            { text: 'CheckBox0', value: 0 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox1', value: 1,name: "RadioBoxListjs1" },
            { text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"} 
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
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td>设置RadioBoxList多项选择框只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var checkBoxList1 = new JueKit.UI.RadioBoxList({
            container: 'CheckBoxListjs',
            items: [
            { text: 'CheckBox0', value: 0 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox1', value: 1 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"} 
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
                    <td>addItem</td>
                    <td>object</td>
                    <td>RadioBoxList添加多选框里面选项</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var radioBoxList1 = new JueKit.UI.RadioBoxList({
            container: 'CheckBoxListjs'
        });    
  radioBoxList1.addItem(new JueKit.UI.RadioBox({ text: 'CheckBox0', value: 0,name: "RadioBoxListjs1" }));
  radioBoxList1.addItem(new JueKit.UI.RadioBox({ text: 'CheckBox1', value: 1 ,name: "RadioBoxListjs1"}));
  radioBoxList1.addItem(new JueKit.UI.RadioBox({ text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"}));
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>removeItem</td>
                    <td>Item</td>
                    <td>RadioBoxList删除多选框里面选项</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
   var radioBoxList1 = new JueKit.UI.RadioBoxList({
        container: 'CheckBoxListjs',
        items: [
            { text: 'CheckBox0', value: 0 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox1', value: 1 ,name: "RadioBoxListjs1"},
            { text: 'CheckBox2', value: 2 ,name: "RadioBoxListjs1"} 
        ]
    });  
    // 先获得所有的checkBox 
    var item1 = radioBoxList1.get_items();
     //删除 所指定的 item1.getAt(0) 的  radioBox的索引
    radioBoxList1.removeItem(item1.getAt(0));
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