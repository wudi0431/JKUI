<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Header.ascx.cs" Inherits="Controls_header" %> 
<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="/JueKitSample/Default.aspx" class="navbar-brand">JueKit</a>
    </div>
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <li>
          <a href="/JueKitSample/Default.aspx">基础</a>
        </li>
        <li>
          <a href="#">核心</a>
        </li>
        <li>
          <a href="#">事件</a>
        </li>
          <li class="dropdown"> 
              <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">JueKitUI组件<b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li>
                  <a href="/JueKitSample/Controls/JueKitUIButton.aspx">Button按钮组件</a>
                </li>
                <li>
                  <a href="/JueKitSample/Controls/JueKitUITextBox.aspx">TextBox文本框组件</a>
                </li> 
                 <li>
                  <a href="/JueKitSample/Controls/JueKitUICheckBox.aspx">Cheacbox选择框组件</a>
                </li>
                <li>
                  <a href="/JueKitSample/Controls/JueKitUIRadioBox.aspx">RadioBox选择框组件</a>
                </li>
                <li>
                  <a href="/JueKitSample/Controls/JueKitUIFormView.aspx">FormView表单组件</a>
                </li>
                 <li>
                  <a href="/JueKitSample/Controls/JueKitUIToolbar.aspx">Toolbar组件</a>
                </li>
                 <li>
                  <a href="/JueKitSample/Controls/JueKitUIOutlookBar.aspx">OutlookBar组件</a>
                </li>
                <li>
                  <a href="/JueKitSample/Controls/JueKitUIPanel.aspx">Panel组件</a>
                </li>
                <li>
                  <a href="/JueKitSample/Controls/JueKitUIWindow.aspx">Window组件</a>
                </li>
                <li>
                  <a href="/JueKitSample/Controls/JueKitUITabset.aspx">Tabset组件</a>
                </li>
              </ul>
            </li> 
           <li>
          <a href="#">JueKitUI扩展</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="#">关于JueKit</a>
        </li>
      </ul>
    </nav>
  </div>
</header> 