<%@ Page Language="C#" AutoEventWireup="true" CodeFile="JueKitUIFormView.aspx.cs" Inherits="Controls_JueKitUITextBox" %>
 <%@ Register Src="../UserControls/Header.ascx" TagName="Header"  TagPrefix="uc1" %>
<%@ Register assembly="JueKit" namespace="JueKit.Web.UI.WebControls" tagprefix="jue" %>
<!DOCTYPE html>
<html>
<head id="Head2" runat="server">
  <title>JueKit FormView表单组件API</title>
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
                <a href="#btn-groups">FormView表单组件</a>
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
                <a href="#formItem-groups">FormItem 自定义表添加表单项</a>
                <ul class="nav">
                  <li>
                    <a href="#formItem-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#formItem-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#formItem-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#textBox-groups">TextBoxFormItem表单项</a>
                <ul class="nav">
                  <li>
                    <a href="#textBox-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#textBox-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#textBox-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#checkBox-groups">CheckBoxFormItem表单项</a>
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
              <li>
                <a href="#checkBoxlist-groups">CheckBoxListFormItem表单项</a>
                <ul class="nav">
                  <li>
                    <a href="#checkBoxlist-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#checkBoxlist-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#checkBoxlist-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#dropdownlist-groups">DropdownListFormItem表单项</a>
                <ul class="nav">
                  <li>
                    <a href="#dropdownlist-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#dropdownlist-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#dropdownlist-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#datepicker-groups">DatePickerFormItem表单项</a>
                <ul class="nav">
                  <li>
                    <a href="#datepicker-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#datepicker-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#datepicker-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#tree-groups">TreeFormItem表单项</a>
                <ul class="nav">
                  <li>
                    <a href="#tree-groups-single">基本案例</a>
                  </li>
                  <li>
                    <a href="#tree-groups-pre">属性</a>
                  </li>
                  <li>
                    <a href="#tree-groups-mether">方法</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9" role="main">
          <div class="bs-docs-section">
            <div class="page-header">
              <h1 id="btn-groups">FormView表单组件</h1>
            </div>
            <h3 id="btn-groups-single">基本案例</h3> 
            <h5>1.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form1""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form1" class="bs-example">
              <script type="text/javascript">
                  function rcpMain_Load() {

                  }
                  var fv = new JueKit.UI.FormView({ container: 'form1'});

                  fv.addItem(new JueKit.UI.TextBoxFormItem({
                      label: '用户名：'
                  }));
                  fv.addItem(new JueKit.UI.TextBoxFormItem({
                      label: '密码：',
                      textMode:2 
                  }));
                  fv.addItem(new JueKit.UI.TextBoxFormItem({
                      label: '邮件：'
                  }));
                  fv.addItem(new JueKit.UI.TextBoxFormItem({
                      label: 'QQ号：'
                  }));

                  var btn1 = new JueKit.UI.Button({ text: '确定' });
                  var btn2 = new JueKit.UI.Button({ text: '取消' });
                  fv.addOperationBtn(btn1);
                  fv.addOperationBtn(btn2);
 
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
       var fv = new JueKit.UI.FormView({ container: 'form1'});

        fv.addItem(new JueKit.UI.TextBoxFormItem({
            label: '用户名：'
        }));
        fv.addItem(new JueKit.UI.TextBoxFormItem({
            label: '密码：',
            textMode:2 
        }));
        fv.addItem(new JueKit.UI.TextBoxFormItem({
            label: '邮件：'
        }));
        fv.addItem(new JueKit.UI.TextBoxFormItem({
            label: 'QQ号：'
        }));

        var btn1 = new JueKit.UI.Button({ text: '确定' });
        var btn2 = new JueKit.UI.Button({ text: '取消' });
        fv.addOperationBtn(btn1);
        fv.addOperationBtn(btn2);
 
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
                    <td>FormView表单id,N表示 随机数</td>
                  </tr>
                  <tr>
                    <td>customCssCls</td>
                    <td>string</td>
                    <td>""</td>
                    <td>自定义FormView表单样式</td>
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
                    <td>addItem</td>
                    <td>formItem</td>
                    <td>添加表单项，列：fv.addItem(new JueKit.UI.TextBoxFormItem({
            label: '用户名：'
        })); 可先表单选项有：JueKit.UI.TextBoxFormItem，JueKit.UI.CheckBoxFormItem，JueKit.UI.CheckBoxListFormItem，JueKit.UI.DropdownListFormItem，JueKit.UI.DatePickerFormItem，JueKit.UI.TreeFormItem</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
     var fv = new JueKit.UI.FormView({ container: 'form1'});
      fv.addItem(new JueKit.UI.TextBoxFormItem({
            label: '用户名：'
        }));
 &lt;/script&gt; 
</code>
</pre>
                      </div> 
                    </td>
                  </tr>
                  <tr>
                    <td>addOperationBtn</td>
                    <td>btn</td>
                    <td>添加表单的按钮 列：var fv = new JueKit.UI.FormView({ container: 'form1'}); var btn1 = new JueKit.UI.Button({ text: '确定' });  fv.addOperationBtn(btn1);</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var fv = new JueKit.UI.FormView({ container: 'form1'}); 
  var btn1 = new JueKit.UI.Button({ text: '确定' });  
  fv.addOperationBtn(btn1);
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
              <h1 id="formItem-groups">FormItem自定义表添加表单项</h1>
            </div>
            <h3 id="formItem-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="formopt1""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="formopt1" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'formopt1' });

                  var items = new JueKit.UI.FormItem({ parent: fv, label: "自定义表：" });

                  var divchk = JueKit.Dom.createEl("div");
                  items.get_formEl().appendChild(divchk);
                  divchk.style.height = "48px";
                  divchk.innerHTML = '自定义表单项';
               

//                  fv.addItem(new JueKit.UI.TextBoxFormItem({
//                      label: '用户名：'
//                  }));
//                  fv.addItem(new JueKit.UI.TextBoxFormItem({
//                      label: '密码：',
//                      textMode: 2
//                  }));
//                  fv.addItem(new JueKit.UI.TextBoxFormItem({
//                      label: '邮件：'
//                  }));
//                  fv.addItem(new JueKit.UI.TextBoxFormItem({
//                      label: 'QQ号：'
//                  }));

//                  var btn1 = new JueKit.UI.Button({ text: '确定' });
//                  var btn2 = new JueKit.UI.Button({ text: '取消' });
//                  fv.addOperationBtn(btn1);
//                  fv.addOperationBtn(btn2);
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
     var fv = new JueKit.UI.FormView({ container: 'formopt1' }); 
    var items = new JueKit.UI.FormItem({ parent: fv, label: "自定义表：" }); 
    var divchk = JueKit.Dom.createEl("div");
    items.get_formEl().appendChild(divchk);
    divchk.style.height = "48px";
    divchk.innerHTML = '自定义表单项';
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="formItem-groups-pre">属性</h3>
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
                    <td>FormItem表单id,N表示 随机数</td>
                  </tr>
                  <tr>
                    <td>customCssCls</td>
                    <td>string</td>
                    <td>""</td>
                    <td>自定义FormItem表单样式</td>
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>FormItem表单的parent指的是个FormView对象  </td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="formItem-groups-mether">方法</h3>
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
                    <td>set_label</td>
                    <td>value</td>
                    <td> 设置FormItem表单的中的 label值</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
      var fv = new JueKit.UI.FormView({ container: 'formopt1' }); 
    var items = new JueKit.UI.FormItem({ parent: fv, label: "自定义表：" }); 
    var divchk = JueKit.Dom.createEl("div");
    items.get_formEl().appendChild(divchk);
    divchk.style.height = "48px";
    divchk.innerHTML = '自定义表单项';
    items.set_label('自定义表1');
 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
                  </tr>
                  <tr>
                    <td>get_label</td>
                    <td>空</td>
                    <td>获得FormItem表单的中的 label值</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'formopt1' }); 
    var items = new JueKit.UI.FormItem({ parent: fv, label: "自定义表：" }); 
    var divchk = JueKit.Dom.createEl("div");
    items.get_formEl().appendChild(divchk);
    divchk.style.height = "48px";
    divchk.innerHTML = '自定义表单项';
    alert(items.get_label());
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>get_formEl</td>
                    <td>空</td>
                    <td>获得FormItem表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var fv = new JueKit.UI.FormView({ container: 'formopt1' }); 
    var items = new JueKit.UI.FormItem({ parent: fv, label: "自定义表：" }); 
    var divchk = JueKit.Dom.createEl("div");
    items.get_formEl().appendChild(divchk);
    divchk.style.height = "48px";
    divchk.innerHTML = '自定义表单项';
    alert(items.get_formEl());
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
              <h1 id="textBox-groups">TextBoxFormItem表单项</h1>
            </div>
            <h3 id="textBox-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form2""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form2" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'form2' }); 
                  var textBox1 = new JueKit.UI.TextBoxFormItem({
                      parent: fv,
                      label: '用户名：'
                  });
                  var textBox2 = new JueKit.UI.TextBoxFormItem({
                      parent: fv,
                      label: '密码：',
                      textMode: 2
                  });
                  var textBox3 = new JueKit.UI.TextBoxFormItem({
                      parent: fv,
                      label: '邮件：'
                  }); 
//                  var btn1 = new JueKit.UI.Button({ text: '确定' });
//                  var btn2 = new JueKit.UI.Button({ text: '取消' });
//                  fv.addOperationBtn(btn1);
//                  fv.addOperationBtn(btn2);
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form2' }); 
    var textBox1 = new JueKit.UI.TextBoxFormItem({
        parent: fv,
        label: '用户名：'
    });
    var textBox2 = new JueKit.UI.TextBoxFormItem({
        parent: fv,
        label: '密码：',
        textMode: 2
    });
    var textBox3 = new JueKit.UI.TextBoxFormItem({
        parent: fv,
        label: '邮件：'
    }); 
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="textBox-groups-pre">属性</h3>
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
                   <tr>
                    <td>JueKit.UI.TextBox属性</td>
                    <td colspan="3">里的属性和JueKit.UI.TextBox一样</td> 
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>TextBoxFormItem表单的parent指的是个FormView对象</td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="textBox-groups-mether">方法</h3>
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
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td> 设置TextBoxFormItem表单TextBox为只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form2' }); 
    var textBox1 = new JueKit.UI.TextBoxFormItem({
        parent: fv,
        label: '用户名：'
    });
  textBox1.set_readOnly(true);

 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
                  </tr> 
                  <tr>
                    <td>get_textBox</td>
                    <td>空</td>
                    <td>获得TextBoxFormItem表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var fv = new JueKit.UI.FormView({ container: 'form2' }); 
    var textBox1 = new JueKit.UI.TextBoxFormItem({
        parent: fv,
        label: '用户名：'
    });
  textBox1.get_textBox();
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
              <h1 id="checkBox-groups">CheckBoxFormItem表单项</h1>
            </div>
            <h3 id="checkBox-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form3""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form3" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'form3' });
                  var checkBox1 = new JueKit.UI.CheckBoxFormItem({
                      parent: fv,
                      label: '爱好：',
                      text:"eeeee"
                  });
                  var checkBox2 = new JueKit.UI.CheckBoxFormItem({
                      parent: fv, 
                      text: "eeeee"
                  });
                  var checkBox3 = new JueKit.UI.CheckBoxFormItem({
                      parent: fv, 
                     text:"eeeee"
                  });
                   
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form3' });
    var checkBox1 = new JueKit.UI.CheckBoxFormItem({
        parent: fv,
        label: '爱好：',
        text:"eeeee"
    });
    var checkBox2 = new JueKit.UI.CheckBoxFormItem({
        parent: fv, 
        text: "eeeee"
    });
    var checkBox3 = new JueKit.UI.CheckBoxFormItem({
        parent: fv, 
        text:"eeeee"
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
                   <tr>
                    <td>JueKit.UI.CheckBox属性</td>
                    <td colspan="3">里的属性和JueKit.UI.CheckBox一样</td> 
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>CheckBoxFormItem表单项的parent指的是个FormView对象</td>
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
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td> 设置CheckBoxFormItem表单TextBox为只读</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form3' });
    var checkBox1 = new JueKit.UI.CheckBoxFormItem({
        parent: fv,
        label: '爱好：',
        text:"eeeee"
    });
  checkBox1.set_readOnly(true);

 &lt;/script&gt; 
</code>
</pre>
                      </div>

                    </td>
                  </tr> 
                  <tr>
                    <td>get_checkBox</td>
                    <td>空</td>
                    <td>获得CheckBoxFormItem表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3">

                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var fv = new JueKit.UI.FormView({ container: 'form3' });
    var checkBox1 = new JueKit.UI.CheckBoxFormItem({
        parent: fv,
        label: '爱好：',
        text:"eeeee"
    });
  checkBox1.get_checkBox();
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
              <h1 id="checkBoxlist-groups">CheckBoxListFormItem表单项</h1>
            </div>
            <h3 id="checkBoxlist-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form4""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form4" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'form4' });
                  var checkBox1 = new JueKit.UI.CheckBoxListFormItem({
                      parent: fv,
                      label: '爱好：',
                      items: [
                          { text: '爱好1', value: 1 },
                          { text: '爱好2', value: 2 },
                          { text: '爱好3', value: 3 }
                      ]
                  }); 
                   
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form4' });
    var checkBox1 = new JueKit.UI.CheckBoxListFormItem({
        parent: fv,
        label: '爱好：',
        items: [
            { text: '爱好1', value: 1 },
            { text: '爱好2', value: 2 },
            { text: '爱好3', value: 3 }
        ]
    });             
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="checkBoxlist-groups-pre">属性</h3>
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
                   <tr>
                    <td>JueKit.UI.CheckBoxList属性</td>
                    <td colspan="3">里的属性和JueKit.UICheckBoxList一样</td> 
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>CheckBoxListFormItem表单项的parent指的是个FormView对象</td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="checkBoxlist-groups-mether">方法</h3>
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
                    <td>get_checkBoxList</td>
                    <td>空</td>
                    <td>获得CheckBoxListFormItem表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var fv = new JueKit.UI.FormView({ container: 'form4' });
    var checkBox1 = new JueKit.UI.CheckBoxListFormItem({
        parent: fv,
        label: '爱好：',
        items: [
            { text: '爱好1', value: 1 },
            { text: '爱好2', value: 2 },
            { text: '爱好3', value: 3 }
        ]
    });    
  checkBox1.get_checkBoxList();
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
              <h1 id="dropdownlist-groups">DropdownListFormItem表单项</h1>
            </div>
            <h3 id="dropdownlist-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form5""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form5" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'form5' });
                  var dropdownList = new JueKit.UI.DropdownListFormItem({
                      parent: fv,
                      label: "请选择：",
                      items: [{ text: "选择1",value:1 }, { text: "选择2",value:2}],
                      emptyText: "请选择"
                  }); 
                   
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
     var fv = new JueKit.UI.FormView({ container: 'form5' });
    var dropdownList = new JueKit.UI.DropdownListFormItem({
        parent: fv,
        label: "请选择：",
        items: [{ text: "选择1",value:1 }, { text: "选择2",value:2}],
        emptyText: "请选择"
    });           
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="dropdownlist-groups-pre">属性</h3>
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
                   <tr>
                    <td>JueKit.UI.DropdownList属性</td>
                    <td colspan="3">里的属性和JueKit.UI.DropdownList一样</td> 
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>DropdownList表单项的parent指的是个FormView对象</td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="dropdownlist-groups-mether">方法</h3>
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
                    <td>get_dropdownList</td>
                    <td>空</td>
                    <td>获得DropdownList表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var fv = new JueKit.UI.FormView({ container: 'form5' });
    var dropdownList = new JueKit.UI.DropdownListFormItem({
        parent: fv,
        label: "请选择：",
        items: [{ text: "选择1",value:1 }, { text: "选择2",value:2}],
        emptyText: "请选择"
    });   
  dropdownList.get_dropdownList();
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr> 
                  <tr>
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td>设置DropdownListFormItem框只读</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var fv = new JueKit.UI.FormView({ container: 'form5' });
    var dropdownList = new JueKit.UI.DropdownListFormItem({
        parent: fv,
        label: "请选择：",
        items: [{ text: "选择1",value:1 }, { text: "选择2",value:2}],
        emptyText: "请选择"
    });   
  dropdownList.set_readOnly(true);
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
              <h1 id="datepicker-groups">DatePickerFormItem表单项</h1>
            </div>
            <h3 id="datepicker-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form6""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form6" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'form6' });
                  var datePicker = new JueKit.UI.DatePickerFormItem({
                      parent: fv,
                      label: "生日：",
                      width: 200
                  }); 
                   
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form6' });
    var datePicker = new JueKit.UI.DatePickerFormItem({
        parent: fv,
        label: "生日：",
        width: 200
    });          
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="datepicker-groups-pre">属性</h3>
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
                   <tr>
                    <td>JueKit.UI.DatePicker属性</td>
                    <td colspan="3">里的属性和JueKit.UI.DatePicker一样</td> 
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>DatePickerFormItem表单项的parent指的是个FormView对象</td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="datepicker-groups-mether">方法</h3>
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
                    <td>get_datePicker</td>
                    <td>空</td>
                    <td>获得DatePickerFormItem表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
  var fv = new JueKit.UI.FormView({ container: 'form6' });
 var datePicker = new JueKit.UI.DatePickerFormItem({
    parent: fv,
    label: "生日：",
    width: 200
 });  
  datePicker.get_datePicker();
 &lt;/script&gt; 
</code>
</pre>
                      </div>
                    </td>
                  </tr> 
                  <tr>
                    <td>set_readOnly</td>
                    <td>boolean</td>
                    <td>设置DatePickerFormItem框只读</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
 var fv = new JueKit.UI.FormView({ container: 'form6' });
 var datePicker = new JueKit.UI.DatePickerFormItem({
    parent: fv,
    label: "生日：",
    width: 200
 });   
  datePicker.set_readOnly(true);
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
              <h1 id="tree-groups">TreeFormItem表单项</h1>
            </div>
            <h3 id="tree-groups-single">基本案例</h3> 
            <h5>2.js用法</h5>
            <p>
              在页面上写一占位符
              <div class="highlight">
                <code class="language-html">&lt;div id="form7""&gt;&lt;/div&gt; </code>
              </div>
            </p>
            <div id="form7" class="bs-example">
              <script type="text/javascript">
                  var fv = new JueKit.UI.FormView({ container: 'form7' });
                  var treeForm = new JueKit.UI.TreeFormItem({
                      parent: fv,
                      label: "选项：",
                      topNode: {
                          text: "根节点",
                          childNodes: [
                              { text: "节点1", data: { attrName: "sourceName" }, childLoaded: false },
                              { text: "节点2", data: { attrName: "sourceName1" }, childLoaded: true }
                          ]
                      }
                  }); 
                   
              </script>
            </div>

            <div class="highlight">
              <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
    var fv = new JueKit.UI.FormView({ container: 'form7' });
    var treeForm = new JueKit.UI.TreeFormItem({
        parent: fv,
        label: "选项：",
        topNode: {
            text: "根节点",
            childNodes: [
                { text: "节点1", data: { attrName: "sourceName" }, childLoaded: false },
                { text: "节点2", data: { attrName: "sourceName1" }, childLoaded: true }
            ]
        }
    });           
 &lt;/script&gt; 
</code>
</pre>
            </div>
            <h3 id="tree-groups-pre">属性</h3>
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
                   <tr>
                    <td>JueKit.UI.Tree属性</td>
                    <td colspan="3">里的属性和JueKit.UI.Tree一样</td> 
                  </tr>
                  <tr>
                    <td>parent</td>
                    <td>string</td>
                    <td>""</td>
                    <td>TreeFormItem表单项的parent指的是个FormView对象</td>
                  </tr>  
                </tbody>
              </table>
            </div>
            <h3 id="tree-groups-mether">方法</h3>
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
                    <td>get_tree</td>
                    <td>空</td>
                    <td>获得TreeFormItem表单的中的element对象</td>
                  </tr>
                  <tr>
                    <td colspan="3"> 
                      <div class="highlight">
                        <pre>
<code class="language-html"> 
 &lt;script type="text/javascript"&gt;
var fv = new JueKit.UI.FormView({ container: 'form7' });
    var treeForm = new JueKit.UI.TreeFormItem({
        parent: fv,
        label: "选项：",
        topNode: {
            text: "根节点",
            childNodes: [
                { text: "节点1", data: { attrName: "sourceName" }, childLoaded: false },
                { text: "节点2", data: { attrName: "sourceName1" }, childLoaded: true }
            ]
        }
    });   
  treeForm.get_tree();
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