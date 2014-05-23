/**
 * @author fossil
 */
JueKit.XmlDom =
{
    createDocument: null,

    __init: function () {
        if (document.implementation && document.implementation.createDocument && JueKit.Browser.isFirefox && JueKit.Browser.name!='rv') {
            JueKit.XmlDom.createDocument = function () {
                var oXmlDom = document.implementation.createDocument("", "", null);

                oXmlDom.parseError = {
                    valueOf: function () { return this.errorCode; },
                    toString: function () { return this.errorCode.toString() }
                };

                oXmlDom.__initError__();

                oXmlDom.addEventListener("load", function () {
                    this.__checkForErrors__();
                    this.__changeReadyState__(4);
                }, false);

                return oXmlDom;
            };
        }
        else {
            JueKit.XmlDom.createDocument = function () {
                var version = ['MSXML2.DOMDocument6.0', 'MSXML2.DOMDocument3.0', 'MSXML2.DOMDocument'];
                for (var i = 0; i < version.length; i++) {
                    try {
                        return new ActiveXObject(version[i]);
                    } catch (ex) { };
                }
            };

        };

        var oMozDocument = null;
        if (typeof XMLDocument != "undefined") {
            oMozDocument = XMLDocument;
        }
        else if (typeof Document != "undefined") {
            oMozDocument = Document;
        }

        //if(oMozDocument && !window.opera)
        if (oMozDocument) {
            oMozDocument.prototype.readyState = 0;
            try {
                if (oMozDocument.prototype.onreadystatechange) {
                    oMozDocument.prototype.onreadystatechange = null;
                }
            }
            catch (e)
            { }

            oMozDocument.prototype.__changeReadyState__ = function (iReadyState) {
                this.readyState = iReadyState;

                if (typeof this.onreadystatechange == "function") {
                    this.onreadystatechange();
                }
            };

            oMozDocument.prototype.__initError__ = function () {
                this.parseError.errorCode = 0;
                this.parseError.filepos = -1;
                this.parseError.line = -1;
                this.parseError.linepos = -1;
                this.parseError.reason = null;
                this.parseError.srcText = null;
                this.parseError.url = null;
            };

            oMozDocument.prototype.__checkForErrors__ = function () {
                if (this.documentElement.tagName == "parsererror") {
                    var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column (\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;

                    reError.test(this.xml);

                    this.parseError.errorCode = -999999;
                    this.parseError.reason = RegExp.$1;
                    this.parseError.url = RegExp.$2;
                    this.parseError.line = parseInt(RegExp.$3);
                    this.parseError.linepos = parseInt(RegExp.$4);
                    this.parseError.srcText = RegExp.$5;
                }
            };

            oMozDocument.prototype.loadXML = function (sXml) {
                this.__initError__();

                this.__changeReadyState__(1);


                var oParser = new DOMParser();
                var oXmlDom = oParser.parseFromString(sXml, "text/xml");

                while (this.firstChild) {
                    this.removeChild(this.firstChild);
                }


                for (var i = 0; i < oXmlDom.childNodes.length; i++) {
                    var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
                    this.appendChild(oNewNode);
                }

                this.__checkForErrors__();
                this.__changeReadyState__(4);
            };

            oMozDocument.prototype.__load__ = oMozDocument.prototype.load;

            oMozDocument.prototype.load = function (sURL) {
                this.__initError__();
                this.__changeReadyState__(1);
                this.__load__(sURL);
            };

            Node.prototype.getXML = function () {
                var oSerializer = new XMLSerializer();
                return oSerializer.serializeToString(this, "text/xml");
            };

            Node.prototype.getText = function () {
                var sText = "";
                for (var i = 0; i < this.childNodes.length; i++) {
                    if (this.childNodes[i].hasChildNodes()) {
                        sText += this.childNodes[i].text;
                    }
                    else {
                        sText += this.childNodes[i].nodeValue;
                    }
                }
                return sText;
            };

            if (JueKit.Browser.isFirefox) {
                Node.prototype.__defineGetter__("xml", function () {
                    var oSerializer = new XMLSerializer();
                    return oSerializer.serializeToString(this, "text/xml");
                });

                Node.prototype.__defineGetter__("text", function () {
                    var sText = "";
                    for (var i = 0; i < this.childNodes.length; i++) {
                        if (this.childNodes[i].hasChildNodes()) {
                            sText += this.childNodes[i].text;
                        }
                        else {
                            sText += this.childNodes[i].nodeValue;
                        }
                    }
                    return sText;
                });
            }
        }

    }
};
 

JueKit.XmlDom.__init();


JueKit.Xslt =
{
    transformToText: function (oXml /*:XMLDocument*/, oXslt /*:XMLDocument*/)/*:String*/
    {
        if (typeof XSLTProcessor != "undefined") {
            var oProcessor = new XSLTProcessor();
            oProcessor.importStylesheet(oXslt);

            var oResultDom = oProcessor.transformToDocument(oXml);
            var sResult = oResultDom.xml;

            if (sResult.indexOf("<transformiix:result") > -1) {
                sResult = sResult.substring(sResult.indexOf(">") + 1, sResult.lastIndexOf("<"));
            }
            return sResult;
        }
        else {
            return oXml.transformNode(oXslt);
        }
    }
};


JueKit.XPath =
{
    selectNodes: function (oRefNode, sXPath, oXmlNs) {
        if (typeof XPathEvaluator != "undefined") {
            oXmlNs = oXmlNs || {};
            var nsResolver = function (sPrefix) {
                return oXmlNs[sPrefix];
            };

            var oEvaluator = new XPathEvaluator();
            var oResult = oEvaluator.evaluate(sXPath, oRefNode, nsResolver,
                                            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                                            null);

            var aNodes = new Array;

            if (oResult != null) {
                var oElement = oResult.iterateNext();
                while (oElement) {
                    aNodes.push(oElement);
                    oElement = oResult.iterateNext();
                }
            }

            return aNodes;
        }
        else {
            if (oXmlNs) {
                var sXmlNs = "";
                for (var sProp in oXmlNs) {
                    sXmlNs += "xmlns:" + sProp + "=" + oXmlNs[sProp] + " ";
                }
                oRefNode.ownerDocument.setProperty("SelectionNamespaces", sXmlNs);
            }
            return oRefNode.selectNodes(sXPath);
        }
    },

    selectSingleNode: function (oRefNode, sXPath, oXmlNs) {
        if (typeof XPathEvaluator != "undefined") {
            oXmlNs = oXmlNs || {};
            sXPath = sXPath || {};

            var nsResolver = function (sPrefix) {
                return oXmlNs[sPrefix];
            };

            var oEvaluator = new XPathEvaluator();
            var oResult = oEvaluator.evaluate(sXPath, oRefNode, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

            if (oResult != null) {
                var value = "";
                if (oResult.singleNodeValue != null && oResult.singleNodeValue.firstChild != null) { 
                    value = oResult.singleNodeValue.firstChild.nodeValue;
                    if (value != "") {
                        return {
                            nodeTypedValue: value,
                            text: value
                        };

                    } else {
                        return {
                            nodeTypedValue: "",
                            text: ""
                        };
                    }

                } else {
                    return {
                        nodeTypedValue: "",
                        text: ""
                    };
                }
            }
            else {
                return null;
            }

        }
        else {
            if (oXmlNs) {
                var sXmlNs = "";
                for (var sProp in oXmlNs) {
                    sXmlNs += "xmlns:" + sProp + "=" + oXmlNs[sProp] + " ";
                }
                oRefNode.ownerDocument.setProperty("SelectionNamespaces", sXmlNs);
            }
            return oRefNode.selectSingleNode(sXPath);
        }
    }
};


JueKit.XMLSerializer =
{
    serializeToString: function (node) {
        var xml = "";

        switch (node.nodeType) {
            case 1: //element
                xml = "<" + node.tagName;

                for (var i = 0; i < node.attributes.length; i++) {
                    xml += " " + node.attributes[i].name + "=\"" + node.attributes[i].value + "\"";
                }

                xml += ">";

                for (var i = 0; i < node.childNodes.length; i++) {
                    xml += this.serializeToString(node.childNodes[i]);
                }

                xml += "</" + node.tagName + ">";
                break;

            case 3: //text node
                xml = node.nodeValue;
                break;
            case 4: //cdata
                xml = "<![CDATA[" + node.nodeValue + "]]>";
                break;
            case 7: //processing instruction
                xml = "<?" + node.nodevalue + "?>";
                break;
            case 8: //comment
                xml = "<!--" + node.nodevalue + "-->";
                break;
            case 9: //document
                for (var i = 0; i < node.childNodes.length; i++) {
                    xml += this.serializeToString(node.childNodes[i]);
                }
                break;

        }

        return xml;
    }
};
