/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKit.UI.Tree
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.Tree = JueKit.Type.createClass("JueKit.UI.Tree", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueTree",
    onInitProperty : function(objData)
    {
        if(objData.checkable !== undefined)
        {
            this._checkable = objData.checkable;
        }
        if(objData.topNodeVisible === undefined)
        {
            this._topNodeVisible = true;
        }
        else
        {
            this._topNodeVisible = objData.topNodeVisible;
        }
        
        JueKit.UI.Tree._base.onInitProperty.call(this, objData);
    },
    
    onInit : function(objData)
    {
        // 创建顶级结点
        // 如果有子节点的话，子节点会在顶级节点创建的时候被创建
        if(objData.topNode)
        {
            // 设置顶级节点的HTML元素引用。这里直接将元素对象赋值给id。
            objData.topNode.id = this._elTopNode;
            objData.topNode.container = this._el;
            // 创建节点，并保留最高节点的引用
            this._topNode = new JueKit.UI.TreeNode(objData.topNode);
            var el = JueKit.Dom.createEl("div", {className : this.cssCls + "NodeChild"});
            this._topNode._el.appendChild(el);
            this._topNode._elChildren = el;
            
            // 设置最高节点对树对象的引用
            // 注意，这里又有一个循环引用，待优化。
            this._topNode._tree = this;
            this._topNode._level = 0;
            
            this.set_topNodeVisible(this._topNodeVisible);
        }
    },
    
    createDom : function(objData)
    {
        this._el = JueKit.Dom.createEl("div", {className:this.cssCls});
        
        JueKit.UI.Tree._base.createDom.call(this, objData);
    },
    
    parseDom : function(objData)
    {
        // 获取顶级节点的元素引用
        this._elTopNode = JueKit.Dom.getChildElByIndex(this._el, 0);
    },

    bindDomEventHandlers : function(objData)
    {
        // 监听树的鼠标事件
        JueKit.Event.addHandler(this._el, "mousedown", this.__hTreeMousedown, this);
        JueKit.Event.addHandler(this._el, "click", this.__hTreeClick, this);
        JueKit.Event.addHandler(this._el, "dblclick", this.__hTreeDblClick, this);
    },

    __hTreeClick : function(evt)
    {
        JueKit.Event.stop(evt);
    },

    __hTreeMousedown : function(evt)
    {
        // 点击树的时候触发
        var el = JueKit.Event.srcEl(evt);
        // 从被点击的元素开始向上查找最近的一个目标元素
        // 当找到目标元素后，通过目标元素对数节点的引用
        while(el && el.tagName != "BODY")
        {
            if(JueKit.Dom.hasCssClass(el, this.cssCls + "NodeSwitch"))
            {
                // 当点击折叠/展开按钮时
                el = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                if(el && el._jueTreeNode)
                {
                    // 折叠/展开树节点
                    this.toggleNode(el._jueTreeNode);
                }
                JueKit.Event.stop(evt);
                return;
            }
            if(JueKit.Dom.hasCssClass(el, this.cssCls + "NodeChk"))
            {
                // 当点击折叠/展开按钮时
                el = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                if(el && el._jueTreeNode)
                {
                    // 选中/取消选中树节点
                    el._jueTreeNode.set_checked(!el._jueTreeNode._checked);
                }
                JueKit.Event.stop(evt);
                return;
            }
            if(JueKit.Dom.hasCssClass(el, this.cssCls + "NodeIcon")
                || JueKit.Dom.hasCssClass(el, this.cssCls + "NodeTextWrap"))
            {
                // 当点击树节点时
                el = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                if(el && el._jueTreeNode)
                {
                    // 设置树的当前节点为这个节点
                    this.set_currentNode(el._jueTreeNode);
                }
                this.fireEvent("click", {currentNode:el._jueTreeNode});
                JueKit.Event.stop(evt);
                return;
            }
            el = el.parentNode;
        }
    },
    
    __el_Contextmenu : function(evt)
    {
        var el = JueKit.Event.srcEl(evt);
        while(el && el.tagName != "BODY")
        {
            if(JueKit.Dom.hasCssClass(el, this.cssCls + "NodeIcon")
                || JueKit.Dom.hasCssClass(el, this.cssCls + "NodeTextWrap"))
            {
                el = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                if(el && el._jueTreeNode)
                {
                    var node = el._jueTreeNode;
                    
                    var args = {result:true, node:node, pointerX:JueKit.Event.pointerX(evt), pointerY:JueKit.Event.pointerY(evt)};
                    
                    this.onContextMenu && this.onContextMenu(args);
                    
                    this.fireEvent("contextMenu", args);
                    
                    if(!args.result)
                    {
                        evt._jueStop = true;
                        //JueKit.Event.stop(evt);
                    }
                    return false;
                }
                JueKit.Event.stop(evt);
                return;
            }
            el = el.parentNode;
        }
    },
    
    __hTreeDblClick : function(evt)
    {
        // 双击树的时候触发
        var el = JueKit.Event.srcEl(evt);
        while(el && el.tagName != "BODY")
        {
            if(JueKit.Dom.hasCssClass(el, this.cssCls + "Node"))
            {
                // 当双击树节点时
                el = el.parentNode;
                if(el && el._jueTreeNode)
                {
                    // 折叠/展开树节点
                    this.toggleNode(el._jueTreeNode);
                    // 设置树的当前节点为这个节点
                    this.set_currentNode(el._jueTreeNode);
                }
                JueKit.Event.stop(evt);
                return;
            }
            el = el.parentNode;
        }
    },

    toggleNode : function(node, recurse)
    {
        if(node.get_expanded())
        {
            // 如果节点的当前状态时展开的，折叠
            this.collapseNode(node, recurse);
        }
        else
        {
            // 否则展开
            this.expandNode(node, recurse);
        }
    },
    
    expandNode : function(node, recurse)
    {
        // 触发beforeExpand事件，这个事件在树节点展开前触发。
        // 可以处理这个事件以实现动态加载
        var args = {result:true, node:node};
        this.fireEvent("beforeExpand", args);

        if(!args.result)
        {
            // 如果设置了参数的result为false，不再展开
            return;
        }
        
        // 展开节点
        node.__expand();
        
        // 触发expand事件，这个事件在树节点展开后触发。
        this.fireEvent("expand", args);
    },
    
    collapseNode : function(node, recurse)
    {
        var args = {result:true, node:node};
        this.fireEvent("beforeCollapse", args);
    
        if(!args.result)
        {
            return;
        }
        
        node.__collapse();
        
        this.fireEvent("collapse", args);
    },
    
    removeNode : function(node)
    {
        if(node._parentNode)
        {
            node._parentNode.removeNode(node);
        }
    },
    
    get_topNode : function()
    {
        // 获取最高节点
        return this._topNode;
    },
    
    get_currentNode : function()
    {
        // 获取当前节点
        return this._currentNode;
    },
    
    set_currentNode : function(value)
    {
        if(this._currentNode == value) {
            if (value) {
                value.__set_isCurrent(true);
            }
            return;
        }
        
        var args = {currentNode : value, oldNode : this._currentNode, result : true};
        this.fireEvent("beforeChange", args);
        
        if(args.result == false)
        {
            return;
        }
        
        
        if(this._currentNode)
        {
            this._currentNode.__set_isCurrent(false);
        }
        // 设置当前树节点
        this._currentNode = value;
        if(value)
        {
            value.__set_isCurrent(true);
        }
        
        this.fireEvent("change", args);
    },
    
    findNodeByDataPath : function(path)
    {
        var arrIds = path.split("\\");
        var level = 1;
        var node = this._topNode;
        while(node && (level < arrIds.length))
        {
            node = node.findNodeByData(arrIds[level]);
            level ++;
        }
        return node;
    },
    
    set_handleContextMenu : function(value)
    {
        this._handleContextMenu = value;
        if(value)
        {
            JueKit.Event.addHandler(this._el, "contextmenu", this.__el_Contextmenu, this);
        }
        else
        {
            JueKit.Event.removeHandler(this._el, "contextmenu", this.__el_Contextmenu, this);
        }
    },
    
    set_width:function(){return;},
    set_height:function(){return;},
    
    get_topNodeVisible : function()
    {
        return this._topNodeVisible;
    },
    
    set_topNodeVisible : function(value)
    {
        this._topNodeVisible = !!value;
        var topNode = this.get_topNode();
        if(topNode && topNode._el && topNode._el.firstChild)
        {
            var el = JueKit.Dom.getFirstChild(topNode._el),
                elChild = JueKit.Dom.getNextEl(el),
                cssCls = this.cssCls + "TopNodeChild";
            if(this._topNodeVisible)
            {
                JueKit.Dom.show(el);
                JueKit.Dom.removeCssClass(elChild, cssCls);
            }
            else
            {
                JueKit.Dom.hide(el);
                JueKit.Dom.addCssClass(elChild, cssCls);
            }
        }
    },
    
    set_checkable : function(value)
    {
        this._checkable = value;
        this.get_topNode().set_checkable(value, true);
    },
    
    get_checkable : function()
    {
        return this._checkable;
    }
});

// JueKit.UI.TreeNode
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.TreeNode = JueKit.Type.createClass("JueKit.UI.TreeNode", JueKit.UI.RichClientWebControl,
{
    cssCls : "jueTreeNode",
    onInitProperty : function(objData)
    {
        // 保留对父节点的引用
        this._parentNode = objData.parentNode;
        // 当前树节点代表的数据
        this._data = objData.data;
        
        this._childLoaded = objData.childLoaded;
        // 处理cssClass
//		if(objData.cssClass !== undefined)
//		{
//			this.cssCls = objData.cssClass;
//		}
//		
        if(objData.checkable !== undefined)
        {
            this._checkable = objData.checkable;
        }
        
        // 树节点的文本
        this._text = objData.text || "";
        
        // 调用基类方法
        JueKit.UI.TreeNode._base.onInitProperty.call(this, objData);
    },

    onInit : function(objData)
    {
        this.set_text(objData.text);
    
        // 在HTML元素中添加对treeNode对象的引用。
        // 这将造成循环引用，影响浏览器对象回收。
        if(this._el)
        {
            this._el._jueTreeNode = this;
        }
        
        // 如果有子节点的话，创建子节点对象
        if(objData.childNodes)
        {
            var nodeData;
            for(var i=0; i<objData.childNodes.length; i++)
            {
                nodeData = objData.childNodes[i];
                // 设置父节点引用
                nodeData.parentNode = this;
                // 创建对象
                new JueKit.UI.TreeNode(nodeData);
            }
        }
        
        if(this._text)
        {
            this._elTextWrap.title = this._text;
        }
    },
    
    createDom : function(objData)
    {
    /*
        var cssClass = this.cssCls;
        
        var cssClassNodeIcon = cssClass + "Icon";
        if(objData.iconCssClass)
        {
            cssClassNodeIcon += " " + objData.iconCssClass;
        }
        var html = "<div class='{0}'><table cellpadding='0' cellspacing='0 style='height:18px'><tr><td width='16'><div class='{0}Switch'></div></td><td>";	//<div class='{0}Body'>
        if(this._checkable)
        {
            html += "<a href='javascript:void(0);' class='{0}Chk'></a>";
        }
        html += "</td><td><div class='" + cssClassNodeIcon + "'></div></td><td><a class='{0}TextWrap' href='javascript:void(0);'><span class='{0}Text'><span class='{0}TextInner'>" + JueKit.String.HTMLEncode(this._text) + "</span></span></a></td></tr></table></div>";
        
        this._el = JueKit.Dom.createEl("div", {className : cssClass + (this._childLoaded ? "Leaf" : "Collapsed")}, JueKit.String.format(html, cssClass));
    */
        this._el = JueKit.UI.TreeNode.__getTreeNodeDom(this.cssCls, objData.iconCssClass, this._childLoaded, this._checkable);
        
        if(objData.parentNode)
        {
            // 如果指定了父节点，则将子节点添加到父节点中。
            objData.parentNode.appendChild(this);
        }
        else if(objData.container)
        {
            objData.container.appendChild(this._el);
        }
    },
    
    parseDom : function(objData)
    {
        //this._elSwitch = JueKit.Dom.getChildElByIndex(JueKit.Dom.getChildElByIndex(this._el, 0), 0);
        
        this._elNode = JueKit.Dom.getChildElByIndex(this._el, 0);
        this._elTable = JueKit.Dom.getChildElByIndex(this._elNode, 0);
        this._elChk = JueKit.Dom.getChildElByIndex(this._elTable.rows[0].cells[1], 0);
        this._elIcon = JueKit.Dom.getChildElByIndex(this._elTable.rows[0].cells[2], 0);
        this._elTextWrap = JueKit.Dom.getChildElByIndex(this._elTable.rows[0].cells[3], 0);
        this._elTextInner = this._elTextWrap.firstChild.firstChild;
        //this._elBody = JueKit.Dom.getChildElByIndex(this._elNode, 1);
        /*
        if(this._checkable)
        {
            this._elChk = JueKit.Dom.getChildElByIndex(this._elNode, 1);
            this._elIcon = JueKit.Dom.getNextEl(this._elChk);
            this._elTextInner = JueKit.Dom.getNextEl(this._elIcon).childNodes[0].childNodes[0];
        }
        else
        {
            this._elIcon = JueKit.Dom.getChildElByIndex(this._elNode, 1);
            this._elTextInner = JueKit.Dom.getNextEl(this._elIcon).childNodes[0].childNodes[0];
            //this._elTextInner = JueKit.Dom.getChildElByIndex(this._elBody, 1).childNodes[0].childNodes[0];
        }
        */
    },
    
    __setNodeLevel : function(level)
    {
        this._level = level;
        if(this._childNodes)
        {
            var childNode = this._childNodes.get_first();
            while(childNode)
            {
                childNode.__setNodeLevel(level + 1);
                childNode = childNode.get_next();
            }
        }
    },
    
    appendChild : function(node)
    {
        // 将树节点node添加为自己的子节点
        
        if(!this._childNodes)
        {
            this._childNodes = new JueKit.Collection.LinkedList();
        }
        this._childNodes.addLast(node);

        // 如果node元素的父元素是dd的话，表示已经是其他节点的字节点了
        if(node._el.parentNode && node._el.parentNode.className == node.cssCls + "Child")
        {
            // 连同dd一起把元素移过来。
            this._el.appendChild(node._el.parentNode);
        }
        else
        {
            // 否则，新建一个dd元素来容纳树节点
            if(!this._elChildren)
            {
                var cssClass = this.cssCls;
                var el = JueKit.Dom.createEl("div", {className : cssClass + "Child"});
                this._el.appendChild(el);
                this._elChildren = el;
            }
            this._elChildren.appendChild(node._el);
        }

        // 设置node的父节点引用
        node._parentNode = this;
        node.__setNodeLevel(this._level + 1);
        
        //this.__refreshNode();
    },

    get_tree : function()
    {
        // 获取树节点所在的树对象。
        // 注意并没有给每个树节点设置对Tree的引用。
        // 这样做有两个好处：
        // 1. 当树节点从一棵树移动到另一颗树的时候，不需要更新树节点以及子节点对树的引用
        // 2. 树节点相对较多，减少引用有助于减少内存占用。
        // 这里是以时间换空间，但树层次不会很多，查找时间不会很多。
        var node = this;
        while(node)
        {
            if(node._tree)
            {
                return node._tree;
            }
            node = node._parentNode;
        }
        return null;
    },
    
    findNodeByData : function(data)
    {
        // 根据节点的Data查找节点，
        // 这个方法将返回第一个匹配的节点
        if(this._childNodes)
        {
            var oNode = this._childNodes.get_first();
            while(oNode)
            {
                if(oNode._data == data)
                {
                    return oNode;
                }
                if(oNode._data.id&&oNode._data.id == data)
                {
                    return oNode;
                }
                oNode = oNode.get_next();
            }
        }
        return null;
    },

    expand : function(recurse)
    {
        this.get_tree().expandNode(this, recurse);
    },

    collapse : function(recurse)
    {
        this.get_tree().collapseNode(this, recurse);
    },

    toggle : function(recurse)
    {
        this.get_tree().toggleNode(this, recurse);
    },
    
    __refreshNode : function()
    {
        var cssClass = this.cssCls;
        var nodeCss;
        if(this._childLoaded && (!this._childNodes || this._childNodes.get_count()==0))
        {
            nodeCss = cssClass + "Leaf";
        }
        else if(this._expanded)
        {
            nodeCss = cssClass + "Expanded";
        }
        else
        {
            nodeCss = cssClass + "Collapsed";
        }
        
        if(nodeCss != this._el.className)
        {
            this._el.className = nodeCss;
        }
    },

    __expand : function()
    {
        this._expanded = true;
        this.__refreshNode();
    },

    __collapse : function()
    {
        this._expanded = false;
        this.__refreshNode();
    },

    removeNode : function(node)
    {
        if(!node)
        {
            return;
        }
        if(node.get_tree().get_currentNode() == node)
        {
            var cn = node.get_next();
            if(!cn)
            {
                cn = node.get_previous();
            }
            
            if(!cn)
            {
                cn = node._parentNode;
            }
        }
        this._childNodes.remove(node);
        JueKit.Dom.removeEl(node._el);
        delete node._parentNode;
        if(cn)
        {
            cn.get_tree().set_currentNode(cn);
        }
        this.__refreshNode();
    },
    
    clearChildNodes : function()
    {
        delete this._childNodes;
        
        if(this._elChildren)
        {
            this._elChildren.innerHTML = "";
        }
    },
    
    __set_isCurrent : function(value)
    {
        var cssClass = this.cssCls;
        if(value)
        {
            // 设置成当前文件夹
            JueKit.Dom.addCssClass(this._elNode, cssClass + "Current");
            //this._elNode.scrollIntoView();

            // 如果当前节点不在可视区域，把树滚动到这个节点可见
            var cssClass = "jueTree";
            var el = this._el;
            var ot = el.offsetTop;
            while(el && (el.className!=cssClass))
            {
                el = el.parentNode;
            }
            
            while(el && (el.offsetHeight==el.scrollHeight))
            {
                el = el.parentNode;
            }
            
            if(el)
            {
                var st = el.scrollTop;

//                if(ot < el.offsetHeight)
//                {
//                    return;
//                }
                
                ot -= el.offsetTop;
                
                if(ot <= st)
                {
                    el.scrollTop = ot;
                }
                else if(ot > (st + el.offsetHeight - this._el.offsetHeight))
                {
                    el.scrollTop = ot - el.offsetHeight + this._el.offsetHeight + 20;
                }
            }
        }
        else
        {
            JueKit.Dom.removeCssClass(this._elNode, cssClass + "Current");
        }
    },
    
    get_level : function()
    {
        return this._level;
    },
    
    get_parentNode : function()
    {
        return this._parentNode;
    },
    
    get_firstChild : function()
    {
        if(this._childNodes)
        {
            return this._childNodes.get_first();
        }
    },
    
    get_lastChild : function()
    {
        if(this._childNodes)
        {
            return this._childNodes.get_last();
        }
    },

    get_expanded : function()
    {
        return this._expanded;
    },
    
    get_data : function()
    {
        return this._data;
    },
    
    set_data : function(value)
    {
        this._data = value;
    },
    
    get_text : function()
    {
        return this._text;
    },
    
    set_text : function(value)
    {
        this._text = value;
        this._elTextInner.innerHTML = JueKit.String.HTMLEncode(value);
        this._elTextWrap.title = value;
    },
    
    get_childLoaded : function()
    {
        return this._childLoaded;
    },
    
    set_childLoaded : function(value)
    {
        this._childLoaded = value;
    },
    
    set_checkable : function(value, recursive)
    {
        if(this._checkable != value)
        {
            this._checkable = value;
            if(value)
            {
                if(this._elChk)
                {
                    JueKit.Dom.show(this._elChk);
                }
                else
                {
                    this._elChk = JueKit.Dom.createEl("a", {className : this.cssCls + "Chk", href:"javascript:void;"});
                    this._elTable.rows[0].cells[1].appendChild(this._elChk);
                    //this._elNode.insertBefore(this._elChk, this._elIcon);
                    //this._elBody.appendChild(this._elChk, JueKit.Dom.getChildElByIndex(this._elBody, 0));
                }
            }
            else if(this._elChk)
            {
                JueKit.Dom.hide(this._elChk);
            }
        }
        
        if(recursive && this._childNodes)
        {
            var childNode = this._childNodes.get_first();
            while(childNode)
            {
                childNode.set_checkable(value, true);
                childNode = childNode.get_next();
            }
        }
        
    },
    
    get_checked : function()
    {
        return this._checked;
    },
    
    set_checked : function(value, recursive)
    {
        value = !!value;
        
        if(this._checkable && (this._checked != value))
        {
            this._checked = value;
            if(value)
            {
                JueKit.Dom.addCssClass(this._elChk, this.cssCls + "Chked");
            }
            else
            {
                JueKit.Dom.removeCssClass(this._elChk, this.cssCls + "Chked");
            }
        }
        
        this.get_tree().fireEvent("nodeCheck", {node:this, checked:value});
        
        if(recursive && this._childNodes)
        {
            var childNode = this._childNodes.get_first();
            while(childNode)
            {
                childNode.set_checked(value, true);
                childNode = childNode.get_next();
            }
        }
    },

    set_iconCssClass : function(cssCls)
    {
        this._elIcon.className = this.cssCls + "Icon " + cssCls;
    }
});

JueKit.Type.extend(JueKit.UI.TreeNode.prototype, JueKit.Collection.LinkedListNode.prototype);

JueKit.UI.TreeNode.__treeNodeDomCache = {};
JueKit.UI.TreeNode.__getTreeNodeDom = function(cssClass, iconCssClass, childLoaded, checkable)
{
    var el = this.__treeNodeDomCache[cssClass];
    if(!el)
    {
        var html = "<div class='{0}'><table cellpadding='0' cellspacing='0 style='height:18px'><tr><td width='16'><div class='{0}Switch'></div></td><td><a href='javascript:void;' class='{0}Chk'></a></td><td><div class='{0}Icon'></div></td><td><a class='{0}TextWrap' href='javascript:void;'><span class='{0}Text'><span class='{0}TextInner'></span></span></a></td></tr></table></div>";

        el = JueKit.Dom.createEl("div", {className : cssClass + (childLoaded ? "Leaf" : "Collapsed")}, JueKit.String.format(html, cssClass));
        this.__treeNodeDomCache[cssClass] = el;
    }
    
    el = el.cloneNode(true);
    el.className = cssClass + (childLoaded ? "Leaf" : "Collapsed");
    if(iconCssClass)
    {
        el.firstChild.firstChild.rows[0].cells[2].firstChild.className += " " + iconCssClass;
    }
    if(!checkable)
    {
        JueKit.Dom.hide(el.firstChild.firstChild.rows[0].cells[1].firstChild);
    }
    
    return el;
};
