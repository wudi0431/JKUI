/*
 * JavaScript Integration Framework
 * License LGPL(您可以在任何地方免费使用,但请不要吝啬您对框架本身的改进)
 * http://www.xidea.org/project/jsi/
 * 
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General 
 * Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) 
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more 
 * details.
 *
 */

/**
 * 导入指定元素（脚本、函数、类、变量）至指定目标,默认方式为同步导入，默认目标为全局对象（Global == window(html)）。
 * <p>导入步骤：</p>
 * <ul>
 *   <li>若元素未装载或依赖未装载，且为异步装载模式，先缓存需要的脚本资源</li>
 *   <li>若元素未装载或依赖未装载，且为同步非阻塞装载模式，打印预装载脚本（当前script标签的其他脚本<b>可能</b>继续运行，浏览器不同表现略有不同）;
 *    并且等待预装载脚本执行之后继续以下步骤</li>
 *   <li>若元素未装载或依赖未装载，装载之</li>
 *   <li>将该元素声明为指定目标的属性(默认目标为全局对象，这时相当于声明了全局变量)</li>
 * </ul>
 * <p><b>全局对象的特殊性:</b></p>
 * <p>全局对象的属性同时也是全局变量，可以在任何地方直接使用，
 * 也就是说：
 * $import函数调用时，默认（未指定target）导入成全局对象属性，等价于声明了一个全局变量。</p>
 * <p><i>第二个参数只是为优化设计，补保证准确行为，如果发现类库已经导入，则不必延迟或者异步，直接将元素值或引用复制到目标</i></p>
 * <i><b>该方法为最终用户设计（页面上的脚本）,不推荐类库开发者（托管脚本）使用该函数,除非确实需要（如需要动态导入时）。
 * 类库开发者可在包中定义脚本依赖完成类似功能。</b></i>
 * @public
 * @param <string> path (package.ObjectName|package.ClassName|package.*| abstractScriptPath) 
 * @param <boolean|Function> callbackOrLazyLoad 可选参数,默认为null,如果其值为函数，表示异步导入模式；如果其值为真，表示延迟同步导入模式，否则为即时同步导入（默认如此）。
 * @param <Object> target 可选参数，指定导入容器。当第三个参数为有效对象时，导入的元素将赋值成其属性；当第三个参数未指定时(arguments.length<3)，target为全局变量容器,这种情况等价于直接声明的全局变量。
 * @return <void|Object> 异步导入、同步无阻塞导入无返回值，同步导入时单个元素返回元素本身，多个返回target对象（默认为全局变量）
 */
var $import = function(freeEval){
    /*
     * 无上下文的执行指定脚本
     * 为了避免滥用eval造成的问题
     */
    //$JSI.freeEval = freeEval;
    /*
     * 已加载的包集合
     * @private
     */
    var packageMap = {};
    var cachedScripts = {};
    var scriptBase = $JSI.scriptBase;
    //var jsDotPostfixRegexp = /\..*$/;
    //var varNameRegexp = /([^,]+)/g;
    //var fileSeparatorRegexp = /\//g;
    //var parentPackageRegexp = /\.?[^\.]+$/;
    var sharedHttpRequest = null;
    //TODO 需要优化
    var lazyTaskList = [];
    var lazyScript ="<script src='data:text/javascript,$JSI.runLazyTask()'></script>";
    if("$debug"){
        var proxyPrefix = "data:text/javascript,";
        //if(this.ActiveXObject){
            proxyPrefix ="http://ue.baidu.com/proxy/?s="
        //}
    }
    $JSI.runLazyTask = function(item){
        if(item){
            lazyTaskList.push(item);
            document.write(lazyScript);
        }else{
            item = lazyTaskList.shift();
            item && item();
        }
    }
    if(!scriptBase){
        scriptBase = document.getElementsByTagName('script');
        $JSI.scriptBase = scriptBase = scriptBase[scriptBase.length-1].src.replace(/[^\/]*$/,'');
    }
    
    /**
     * 获取脚本缓存。
     * @private
     * @static
     * @param <string>pkg 包名
     * @param <string>file 文件名
     */
    $JSI.getCacheScript = function(pkg,file){
        var d = cachedScripts[pkg];
        //if(d)alert(pkg+"?"+file)
        return d?d[file||'']:null;
    };
    /**
     * 添加脚本缓存。
     * @private
     * @static
     * @param <string>key 文件相对路径
     * @param <string|Function>value 缓存函数或文本
     */
    $JSI.addCacheScript = function(pkg,file2dataMap,value){
        if(cachedScripts[pkg]){
        　    pkg = cachedScripts[pkg];
            if(value == null){
                for(var n in file2dataMap){
                    pkg[n] = file2dataMap[n];
                }
            }else{
                pkg[file2dataMap] = value;
            }
        }else {
            if(value == null){
                cachedScripts[pkg] = file2dataMap;
            }else{
            　　(cachedScripts[pkg] = {})[file2dataMap] = value;
            }
        }
    };
    //模拟XMLHttpRequest对象
    if(this.ActiveXObject ){
        lazyScript =lazyScript.replace(/'.*'/,scriptBase+"resource/lazy-trigger.js");
        if(!this.XMLHttpRequest ){
            var xmlHttpRequstActiveIds = [
                "Microsoft.XMLHTTP"//IE5的，最早的XHR实现
                ,"MSXML2.XMLHTTP"
                //,"MSXML2.XMLHTTP.3.0"//应该等价于MSXML2.XMLHTTP
                //,"Msxml2.XMLHTTP.4.0"
                ,"Msxml2.XMLHTTP.5.0"  //office 的
                //,"Msxml2.XMLHTTP.6.0"
                ];
            var xmlHttpRequstActiveId
            /**
             * 统一的 XMLHttpRequest 构造器（对于ie，做一个有返回值的构造器（这时new操作返回该返回值），返回他支持的AxtiveX控件）
             * 关于 XMLHttpRequest对象的详细信息请参考
             * <ul>
             *   <li><a href="http://www.w3.org/TR/XMLHttpRequest/">W3C XMLHttpRequest</a></li>
             *   <li><a href="http://www.ikown.com/manual/xmlhttp/index.htm">中文参考</a></li>
             *   <li><a href="http://msdn2.microsoft.com/en-us/library/ms762757(VS.85).aspx">MSXML</a></li>
             * </ul>
             * <br><br><i>JSDOC ： 对于FF等有内置 XMLHttpRequest 对象的浏览器，jsdoc解析时会报错。请直接参看上述链接文档，不必理会jsdoc的解析结果。</i>
             * @constructor
             */
            this.XMLHttpRequest = function(){
                if(xmlHttpRequstActiveId){
                    return new ActiveXObject(xmlHttpRequstActiveId);
                }else{
                    var i=xmlHttpRequstActiveIds.length;
                    while(i --){
                        try{
                              var impl = new ActiveXObject(xmlHttpRequstActiveId = xmlHttpRequstActiveIds[i]);
                              xmlHttpRequstActiveIds = null;
                              return impl;
                        }catch (e){}
                    }
                }
            };
        }
    }
    /**
     * 包信息数据结构类.
     * 在包目录下，有个包初始化脚本（__package__.js），在包的构造中执行这段脚本，执行中，this指向当前包对象
     * @public
     * @constructor
     * @implicit
     * @param name 包名（必须为真实存在的包）
     */
    function Package(name,pscript){
        /*
         * 注册包
         */
        /**
         * 包名 
         * @private
         * @readonly
         * @typeof string
         * @id Package.this.name
         */
        packageMap[this.name = name] = this;

        /**
         * 包脚本路径目录 
         * @private
         * @readonly
         * @typeof string
         * @owner Package.this
         */
        this.scriptBase = scriptBase+(name.replace(/\./g,'/'))+ '/';
        /**
         * 包脚本依赖  
         * 起初作为一个数组对象临时存储 依赖信息。
         * <code>
         * {[thisPath1,targetPath1,beforeLoad],...}</code>
         * initialize成员方法调用后。
         * 将变成一个依赖表、且计算完全部包内匹配
         * <code>
         * {thisPath1:
         *   [dependence1,[objectX,dependence2]...]
         * ,...}</code>
         * 
         * @private
         * @readonly
         * @typeof object
         * @owner Package.this
         */
        this.dependenceMap = [];
        /**
         * 脚本装载器表{scriptPath:ScriptLoader}
         * @private
         * @readonly
         * @typeof object
         * @owner Package.this
         */
        this.loaderMap = {};
        /**
         * 脚本->对象表{scriptPath:objectName}
         * object名为类名或包名 如<code>YAHOO</code>
         * @private
         * @typeof object
         * @readonly
         * @owner Package.this
         */
        this.scriptObjectMap = {};
        /**
         * 对象->脚本表{objectName:scriptPath}
         * object名为全名 如<code>YAHOO.ui.Color</code>
         * @private
         * @readonly
         * @typeof object
         * @owner Package.this
         */
        this.objectScriptMap = {};
        /**
         * 存储顶级对象的表.
         * 比如yahoo ui 的objectMap = {YAHOO:?}
         * prototype 的objectMap = {$:?,$A:? ....}
         * @private
         * @readonly
         * @typeof object
         * @owner Package.this
         */
        this.objectMap = {};

        try{
            if(pscript instanceof Function){
                pscript.call(this);
            }else{
                freeEval.call(this,pscript);
            }
        }catch(e){
            $log.info("eval error:",name,pscript,e);
            throw e;
        }
        //this.initialize();
    }


    Package.prototype = {
        /**
         * 包内文本加载函数
         * 为方便后续扩展
         * @owner Package.prototype
         * @private
         */
        loadText : function (fileName){
            return loadTextByURL(this.scriptBase+ fileName);
        },
    
        /**
         * 设置具体实现包名。
         * 比如，我们可以给prototype库一个统一的包，
         * 但是我们的内容都放在具体的实现版本里，
         * 我们可以通过该设置（setImplementation(this.name+".v1.5");）来指定默认的具体实现版本。
         * <i>该成员函数只在包定义文件（__package__.js）中调用 </i>
         * @public
         * @owner Package.prototype
         * @param pkgPath {String} 指定实现包名，全路径(ID(.ID)*)或相对路径（"." 开始的为本包下的相对路径）
         */
        setImplementation : function(pkgPath){
            if(pkgPath.charAt(0) == '.'){
                if(pkgPath.charAt(1) == '.'){
                    pkgPath = this.name +'.'+ pkgPath;
                    while(pkgPath.length>(pkgPath = pkgPath.replace(/\w+\.\.\.\//,'')).length);
                }else{
                    pkgPath = this.name + pkgPath;
                }
            }
            this.implementation = pkgPath;
        },
            
        /**
         * 添加脚本及其声明的对象（函数、方法名）。
         * 需要指定脚本位置（必须在当前包目录中），元素名(可用数组，同时指定多个)。
         * <i>该成员函数只在包定义文件（__package__.js）中调用 </i>
         * @owner Package.prototype
         * @public
         * @param <string>scriptPath 指定脚本路径
         * @param <string|Array>objectNames[opt] 字符串或其数组
         * @param <string|Array>beforeLoadDependences[opt] 装在前依赖
         * @param <string|Array>afterLoadDependences[opt] 装在后依赖
         */
        addScript :  function(scriptPath, objectNames, beforeLoadDependences, afterLoadDependences){
            var objects = this.scriptObjectMap[scriptPath];
            if(objects){
                var previousObject = objects[objects.length-1];
            }else{
                objects = (this.scriptObjectMap[scriptPath] = []);
            }
            //empty script
            if(objectNames == null || objectNames.length == 0){
                return;
            }
            if(objectNames instanceof Array){
                for(var i = 0;i<objectNames.length;i++){
                    var object = objectNames[i];
                    this.objectScriptMap[object] = scriptPath;
                    object = object.replace(/\..*$/,'');
                    if(previousObject != object){
                        objects.push(previousObject = object);
                    }
                }
            }else{
                this.objectScriptMap[objectNames] = scriptPath;
                objectNames = objectNames.replace(/\..*$/,'');
                if(previousObject != objectNames){
                    objects.push(objectNames);
                }
            }
            beforeLoadDependences && this.addDependence(scriptPath,　beforeLoadDependences, true);
            afterLoadDependences && this.addDependence(scriptPath,　afterLoadDependences, false);
        },
    
        /**
         * 添加脚本依赖。
         * 需要指定当前脚本文件或者脚本元素位置（必须在当前包目录中）、
         * 被依赖的脚本文件或者脚本元素位置(当前包中的脚本，或者通过抽象路径指定其他包中的脚本)、
         * 是否需要执行前导入(装载期依赖)。
         * <i>该成员函数只在包定义文件（__package__.js）中调用 </i>
         * @owner Package.prototype
         * @public
         * @param thisPath 本包中当前脚本文件或者脚本元素，使用*可表示当前该包中已添加全部脚本文件（将逐一添加同样的依赖）。
         * @param targetPath 依赖的脚本文件抽象路径（可不包括最后的版本包）或者脚本元素抽象路径
         * @param beforeLoad 可选参数(默认为true) 是否需要执行前导入(装载期依赖)
         */
        addDependence : function(thisPath,targetPath,beforeLoad){
            //TODO:可编译优化,进优化的脚本可以直接删除此运行时优化
            if(beforeLoad ){
                thisPath = this.objectScriptMap[thisPath] || thisPath;
            }
            if(targetPath instanceof Array){
                var i = targetPath.length;
                while(i--){
                    this.dependenceMap.push([thisPath,targetPath[i],beforeLoad]);
                }
            }else{
                this.dependenceMap.push([thisPath,targetPath,beforeLoad]);
            }
            
        },
    
        /**
         * @owner Package.prototype
         * @private
         * @param
         */
        initialize : function(){
            this.initialize = null;
            //cache attributes
            var thisObjectScriptMap = this.objectScriptMap;
            var thisScriptObjectMap = this.scriptObjectMap;
            var list = this.dependenceMap;
            var map = {};
            var i = list.length;
            while(i--){
                var dep = list[i];
                var thisPath = dep[0];
                var targetPath = dep[1];
                var beforeLoad = dep[2];
                
    
                //循环内无赋值变量声明应特别小心。函数变量
                var targetPackage = this;
                var thisObjectName = null;
                var targetObjectName = null;
                //var samePackage = 0;
                var distinctPackage = 0;
                var allSource = "*" == thisPath;
                var allTarget = targetPath.indexOf("*")+1;
                
                if (allSource || allTarget) {
                    var targetFileMap;
                    if (allSource) {
                        var thisFileMap = thisScriptObjectMap;
                    } else {
                        var thisFileName = thisObjectScriptMap[thisPath];
                        if (thisFileName) {
                            thisObjectName = thisPath;
                        } else {
                            thisFileName = thisPath;
                        }
                        (thisFileMap = {})[ thisFileName ]= 0;
                    }
                    if (allTarget) {
                        if (allTarget>1) {
                            targetPackage = realPackage(findPackageByPath(targetPath));
                            distinctPackage = 1;
                        } else {
                            //samePackage = true;
                        }
                        targetFileMap = targetPackage.scriptObjectMap;
                    } else {
                        var targetFileName = thisObjectScriptMap[targetPath];
                        if(targetFileName){
                            //samePackage boolean hack
                            //samePackage = 
                            targetObjectName = targetPath;
                        }else if(thisScriptObjectMap[targetPath]){
                            //samePackage boolean hack
                            //samePackage = 
                            targetFileName = targetPath;
                            //targetObjectName = null;
                        }else{
                            distinctPackage = 1;
                            targetPackage = findPackageByPath(targetPath);
                            targetPath = targetPath.substring(targetPackage.name.length + 1);
                            targetPackage = realPackage(targetPackage);
                            //targetObjectName = null;
                            var targetFileName = targetPackage.objectScriptMap[targetPath];
                            if (targetFileName) {
                                targetObjectName = targetPath;
                            } else {
                                targetFileName = targetPath;
                            }
                        }
                        (targetFileMap = {})[ targetFileName ]= 0;
                    }
                    for (var targetFileName in targetFileMap) {
                        var dep = new Dependence(targetPackage, targetFileName, targetObjectName,
                                beforeLoad);
                        for (var thisFileName in thisFileMap) {
                            if (distinctPackage || thisFileName != targetFileName) {
                                (map[thisFileName] || (map[thisFileName] = [])).push(
                                  thisObjectName?[thisObjectName,dep]:dep
                                );
                            }
                        }
                    }
                } else {
                    var thisFileName = thisObjectScriptMap[thisPath];
                    var targetFileName = thisObjectScriptMap[targetPath];
                    if (thisFileName) {//is object
                        thisObjectName = thisPath;
                    } else {
                        thisFileName = thisPath;
                    }
                    if(targetFileName){
                        targetObjectName = targetPath;
                    }else if(thisScriptObjectMap[targetPath]){
                        targetFileName = targetPath;
                    }else{
                        targetPackage = findPackageByPath(targetPath);
                        targetPath = targetPath.substr(targetPackage.name.length + 1);
                        targetPackage = realPackage(targetPackage);
                        var targetFileName = targetPackage.objectScriptMap[targetPath];
                        if (targetFileName) {
                            targetObjectName = targetPath;
                        } else {
                            targetFileName = targetPath;
                        }
                    }
                    var dep = new Dependence(targetPackage, targetFileName, targetObjectName, beforeLoad);
                    (map[thisFileName] || (map[thisFileName] = [])).push(
                          thisObjectName?[thisObjectName,dep]:dep
                    );
                }
    
            }
            this.dependenceMap = map;
        },
    
        /**
         * 创建一个新的类加载器，加载指定脚本
         * @owner Package.prototype
         * @private
         * @param scriptPath 指定的脚本文件名
         * @param object 需要装载的对象 * 代表全部元素
         */
        loadScript : function(fileName,object){
            var loader = this.loaderMap[fileName];
            try{
                if(!loader){
                    $log.debug("load script path:",this.scriptBase ,fileName);
                    if(this.scriptObjectMap[fileName]){
                        //不敢确认是否需要延迟到这里再行初始化操作
                        if(this.initialize){
                            this.initialize();
                        }
                        loader = new ScriptLoader(this,fileName);
                    }else{
                        //TODO: try parent
                        //throw new Error('script not found')
                    }
                }
                if(loader.initialize){
                    $log.debug("object loader initialize:",this.scriptBase ,fileName);
                    loader.initialize(object);
                }
            }catch(e){
                $log.error("eval error:",
                        this.scriptBase,
                        fileName,
                        e
                );
                throw e;
            }
        }
    }
    
    /*
     * 依赖定义
     * @friend
     * @param url 文件url
     * @return <string> 结果文本
     */
    function Dependence(targetPackage, targetFileName, thisObjectName, beforeLoad,names){
        this.beforeLoad = beforeLoad;
        //this.data = [targetPackage, targetFileName, thisObjectName];
        this.data = arguments;
        /*
         * 装载依赖
         */
        this.load = function(vars,loadData){
            if(!names){
                if(thisObjectName){
                    names = [thisObjectName.replace(/\..*$/,'')];
                }else{
                    names = targetPackage.scriptObjectMap[targetFileName];
                }
            }
            if(loadData){
                targetPackage.loadScript(targetFileName,thisObjectName);
                var objectMap = targetPackage.objectMap;
                var i = names.length;
                while(i--){
                    var name = names[i];
                    vars.push(name);
                    vars[name] = objectMap[name];
                }
            }else{//fill names
                vars.push.apply(vars,names)
            }
        }
    }
    /*
     * 加载指定文本，找不到文件(404)返回null
     * @friend
     * @param url 文件url
     * @return <string> 结果文本
     */
    function loadTextByURL(url){
        //$log.info(url);
        var req = sharedHttpRequest || new XMLHttpRequest();
        sharedHttpRequest = null;
        req.open("GET",url,false);
        try{
            //for ie file 404 will throw exception 
            req.send(null);
            if(req.status >= 200 && req.status < 300 || req.status == 304 || !req.status){
                //return  req.responseText;
                return req.responseText;
            }else{
                $log.debug("load faild:",url,"status:",req.status);
            }
        }catch(e){
            $log.debug(e);
        }finally{
            req.abort();
            sharedHttpRequest = req;
        }
    };
    /*
     * 获取指定实现包(不存在则加载之)
     * @intenal
     * @param <string>name 包名
     * @param <boolean>exact 准确名，不需可上溯探测父包
     */
    function realPackage(pkg){
        while(pkg.implementation){
            pkg = findPackage(pkg.implementation,true);
        }
        return pkg;
    }
    
    /*
     * 获取指定包,抽象包也行(不存在则加载之)
     * TODO:可编译优化 cacheAllPackage,不必探测空包
     * @intenal
     * @param <string>name 包名
     * @param <boolean>exact 准确名，不需可上溯探测父包
     */
    function findPackage(name,exact){
        do{
            if(packageMap[name]){
                return packageMap[name];
            }
            if(packageMap[name] === undefined){
                var pscript = $JSI.getCacheScript(name) ||
                    loadTextByURL(scriptBase+(name.replace(/\.|$/g,'/'))+ '__package__.js');
                if(pscript){
                    return new Package(name,pscript);
                }
                //注册空包，避免重复探测
                packageMap[name] = null;
            }
            if(exact){
                break;
            }
        }while(name = name.replace(/\.?[^\.]+$/,''));
    }
    /*
     * 获取指定对象路径的对应包
     */
    function findPackageByPath(path){
        var p = path.lastIndexOf('/');
        if(p>0){
            return findPackage(path.substr(0,p).replace(/\//g,'.'),true);
        }else if((p = path.indexOf(':'))>0){
            return findPackage(path.substr(0,p),true);
        }else{
            return findPackage(path.replace(/\.?[^\.]+$/,''));
        }
    }



    /**
     * 脚本装载器.
     * @constructor
     * @protected
     * @implicit
     * @param <Package> pkg 包对象
     * @param <string> fileName 脚本名 
     */
    function ScriptLoader(pkg,fileName){
        //alert(pkg.name+"/"+name)
        
        /**
         * 脚本名，可在托管脚本顶层上下文（非函数内）访问，<code>this&#46;name</code>
         * @friend
         * @owner ScriptLoader
         * @typeof string 
         */
        this.name = fileName;

        /**
         * 脚本目录，可在托管脚本顶层上下文（非函数内）访问，<code>this&#46;scriptBase</code>
         * @friend
         * @owner ScriptLoader
         * @typeof string 
         */
        this.scriptBase = pkg.scriptBase;
        /**
         * 脚本的装在后依赖集合
         * 脚本依赖键为0
         * 对象依赖的键为对象名称
         * 其与initialize共存亡
         * @friend
         * @id ScriptLoader.prototype.dependenceMap
         * @typeof Object 
         */
        //this.dependenceMap = null;
        
        var loader = prepareScriptLoad(pkg,this)
        if(loader){
            return  loader;
        }
        doScriptLoad(pkg,this);
    };
    /*
     * 前期准备，初始化装载单元的依赖表，包括依赖变量申明，装载前依赖的装载注入
     * @private
     */
    function prepareScriptLoad(pkg,loader){
        var deps = pkg.dependenceMap[loader.name];
        var varText = 'this.hook=function(n){return eval(n)}';
        var vars = [];
        var i = deps && deps.length;
        while(i--){
            var dep = deps[i];
            var key =  dep[0] || 0;
            if(key){
                dep = dep[1];
            }
            if(dep.beforeLoad){//直接装载（只是装载到缓存对象，没有进入装载单元），无需记录
                //这里貌似有死循环的危险
                dep.load(vars,1);
                if(dep = pkg.loaderMap[loader.name]){
                    return dep;
                }
            }else{//记录依赖，以待装载
                dep.load(vars);
                if(map){
                    if(map[key]){
                        map[key].push(dep);
                    }else{
                        map[key] = [dep]
                    }
                }else{
                    //函数内只有一次赋值（申明后置，也就你JavaScript够狠！！ ）
                    var map = loader.dependenceMap = {};
                    loader.initialize = scriptLoaderInitialize;
                    map[key] = [dep]
                }
            }
        }
        if(vars.length){
            loader.varMap = vars;
            varText += ';var '+vars.join(',').replace(/([^,]+)/g,'$1 = this.varMap.$1');
        }
        loader.varText = varText;
    }
    

    /*
     * 装载脚本
     * 这里没有依赖装载，装载前依赖装载在prepareScriptLoad中完成，装载后依赖在ScriptLoader.initialize中完成。
     * @private 
     */
    function doScriptLoad(pkg,loader){
        var pkgName = pkg.name;
        var name = loader.name;
        var cachedScript = $JSI.getCacheScript(pkgName,name);
        pkg.loaderMap[name] = loader;
        try{
            if(cachedScript instanceof Function){
                $JSI.addCacheScript(pkgName,name,'')
                return cachedScript.call(loader);
            }else{
                return freeEval.call(loader,'eval(this.varText);'+(cachedScript || pkg.loadText(name)))
            }
        }catch(e){
            $log.error("eval error",loader.scriptBase , name);
            throw e;
        }finally{
            delete loader.varMap ;
            delete loader.varText ;
            var names = pkg.scriptObjectMap[name];
            var index = names.length;
            var objectMap = pkg.objectMap;
            //此处优化不知有无作用
            if(index == 1){
                objectMap[names = names[0]] = loader.hook(names);
            }else{
                var values = loader.hook('['+names.join(',')+']');
                while(index--){
                    objectMap[names[index]] = values[index];
                }
            }
        }
    }
    /*
     * 初始化制定对象，未指定代表全部对象，即当前转载单元的全部对象
     * @private
     */
    function scriptLoaderInitialize(object){
        //也一定不存在。D存I存，D亡I亡
        var dependenceMap = this.dependenceMap;
        var vars = [];
        var name = this.name;
        var dependenceList = dependenceMap[0];
        if(dependenceList){
            //一定要用delete，彻底清除
            delete dependenceMap[0];
            var i = dependenceList.length;
            while(i--){
                var dep = dependenceList[i];
                //alert("ScriptLoader#initialize:"+name+"/"+dep.getNames())
                dep.load(vars,1);
            }
        }
        //这里进行了展开优化，有点冗余
        if(object){//装载对象
            if(dependenceList = dependenceMap[object]){
                //一定要用delete，彻底清除
                delete dependenceMap[object];
                var i = dependenceList.length;
                while(i--){
                    var dep = dependenceList[i];
                    dep.load(vars,1);
                }
            }
            //谨慎，这里的i上面已经声明，不过，他们只有两种可能，undefined和0
            for(var i in dependenceMap){
                  break;
            }
            if(!i){
                //initialize 不能delete
                this.dependenceMap = this.initialize = null;
            }
        }else{//装载脚本
            for(var object in dependenceMap){
                var dependenceList = dependenceMap[object];
                delete dependenceMap[object];
                var i = dependenceList.length;
                while(i--){
                    var dep = dependenceList[i];
                    dep.load(vars,1);
                }
            }
            //initialize 不能delete
            this.dependenceMap = this.initialize = null;
        }
        if(vars.length){
            this.varMap = vars;
            vars = vars.join(',')
            this.hook(vars.replace(/([^,]+)/g,'$1 = this.varMap.$1'));
            this.varMap = null;
        }
    }
    

    /*
     * 缓存清单计算
     */
    function appendCacheFiles(map,pkg,file,object){
        pkg.initialize && pkg.initialize();
        var fullPath = pkg.scriptBase + file;
        var data = map[fullPath];
        var loader = pkg.loaderMap[file];
        if(data){//无需再与装载系统同步
            if(data[0]){
                return;
            }else{
                if(object){
                    if(data[object]){
                        //已经装载了
                        return;
                    }else{
                        data[object] = 1;
                    }
                }else{
                    //完全装载了
                    data[0] = 1;
                }
            }
        }else{//未装载，先用实际装载的信息填充之
            map[fullPath] = data = {}
            //更新该装载节点状态
            data[object||0] = 1;
            //表示缓存库已经存在
            data[1] = loader || $JSI.getCacheScript(pkg.name,file);
        }
        if(loader){
            //dependenceMap 再下一个分支中声明了，怪异的js：（
            if(deps = loader.dependenceMap){
                //deps[0]是绝对不可能存在的！！
                if(object){
                    var deps = deps[object];
                    var i = deps && deps.length;
                    while(i--){
                        var dep = deps[i].data;
                        appendCacheFiles(map,dep[0],dep[1],dep[2])
                    }
                }
                for(object in deps){
                    var deps2 = deps[object];
                    while(i--){
                        var dep = deps2[i].data;
                        appendCacheFiles(map,dep[0],dep[1],dep[2])
                    }
                }
            }else{
                //没有依赖，标识为全部装载完成
                data[0] = 1;
                //同时完成该节点
                //return;
            }
        }else{
            var deps = pkg.dependenceMap[file];
            var i = deps && deps.length;
            while(i--){
                var dep = deps[i];
                var key = dep[0];
                if(key){
                    if(object && key != object){
                        continue;
                    }
                    dep = dep[1];
                }
                dep = dep.data;
                appendCacheFiles(map,dep[0],dep[1],dep[2])
            }
        }
    }
    

    function doObjectImport(pkg,objectName,target){
        //do load
        pkg.loadScript(pkg.objectScriptMap[objectName],objectName,true);
        var pos2obj = objectName.indexOf('.');
        if(pos2obj>0){
            objectName = objectName.substr(0,pos2obj)
        }
        //p 为对象,节省个变量
        pos2obj = pkg.objectMap[objectName];
        return target?target[objectName]=pos2obj:pos2obj;
    }
    function doScriptImport(pkg,fileName,target){
        pkg.loadScript(fileName);
        var objectNames = pkg.scriptObjectMap[fileName];
        if(target){
            for(var i = 0; i<objectNames.length;i++){
                target[objectNames[i]]=pkg.objectMap[objectNames[i]];
            }
        }
    }
    /*
     * @param path (package.ObjectName|package:|package.*)
     * @param <boolean|Function> callbackOrLazyLoad 可选参数(默认为全局变量,所以说,这种情况等价于直接声明的全局变量)，指定导入容器。
     * @param target 可选参数(默认为this,不过对于非对象成员函数调用时,this == window == global context,所以说,这种情况等价于直接声明的全局变量)，指定导入容器。
     * @return <void|object|package>
     */
    return function(path,callbackOrLazyLoad,target){
        if(/\:$/.test(path)){
            return realPackage(findPackageByPath(path));
        }
        if(callbackOrLazyLoad){
            var map = {};
            var importArguments = arguments;
            //hack for null;
            importArguments[1] = 0;
            if(/\*$/.test(path)){
                var pkg = realPackage(findPackageByPath(path));
                for(var file in pkg.scriptObjectMap){
                    appendCacheFiles(map,pkg,file);
                }
            }else {
                var pkg = findPackageByPath(path);
                var file = path.substr(pkg.name.length+1)
                pkg = realPackage(pkg);
                
                if(path.lastIndexOf('/')>0){
                    appendCacheFiles(map,pkg,file);;
                }else{
                    appendCacheFiles(map,pkg,pkg.objectScriptMap[file],file);;
                }
            }
            
            if(callbackOrLazyLoad instanceof Function){
                callbackOrLazyLoad($import.apply(this,importArguments));
            }else{
                for(var file in map){
                    if(!map[file][1]){
                        if("$debug"){
                            var content = loadTextByURL(file);
                            var pkg = file.substr(scriptBase.length).split('/');
                            file = pkg.pop();
                            content = '$JSI.addCacheScript("'+pkg.join('.')+'","'+file+'",function(){eval(this.varText);'+content+'\n})';
                            content = proxyPrefix+encodeURIComponent(content);//.replace("'","&#34;");
                            document.write("<script src=\""+content+"\"></script>");
                        }else{
                            document.write("<script src='"+file.replace(/\.js$/,'__preload__.js')+"'></script>");
                        }
                        
                    }
                }
                $JSI.runLazyTask(function(){
                        $import.apply(this,importArguments)
                    });
            }
        }else{
            if(arguments.length <3){
                target = target || this;
            }
            var p = path.lastIndexOf('/');
            if(p>0){
                var pkg2obj = findPackage(path.substr(0,p).replace(/\//g,'.'));
                var objectName = path.substr(pkg2obj.name.length+1);
                doScriptImport(realPackage(pkg2obj),objectName,pkg2obj = target);
            }else{
                var pkg2obj = findPackageByPath(path);
                var objectName = path.substr(pkg2obj.name.length+1);
                pkg2obj = realPackage(pkg2obj);
                if(objectName){
                    if(objectName == '*'){
                        for(var fileName in pkg2obj.scriptObjectMap){
                            doScriptImport(pkg2obj,fileName,target);
                        }
                        //reuse pkg2obj variable
                        pkg2obj =  target;
                    }else{
                        //reuse pkg2obj variable
                        pkg2obj =  doObjectImport(pkg2obj,objectName,target);
                    }
                }
            }
            return pkg2obj;
        }
    }
}(
    function(){
            eval(arguments[0]);
    }
);
