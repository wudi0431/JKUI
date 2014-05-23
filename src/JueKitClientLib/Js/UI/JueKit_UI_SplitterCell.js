/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */
 
 // JueKit.UI.SplitterCell
JueKit.Type.registerNamespace("JueKit.UI");

JueKit.UI.SplitterCell = JueKit.Type.createClass("JueKit.UI.SplitterCell", JueKit.UI.RichClientWebControl,
{
    isContainer: true,
    cssCls: "jueSplitterCell",
    onInitProperty: function (objData) {
        this._autoSize = objData.autoSize;
        JueKit.UI.SplitterCell._base.onInitProperty.call(this, objData);
    },

    createDom: function (objData) {
        this._el = JueKit.Dom.createEl("div", { className: this.cssCls });

        if (objData.parent._direction == JueKit.UI.Direction.vertical) {
            if (objData.width) {
                this._el.style.width = objData.width + "px";

            }
            if (objData.height) {
                this._el.style.height = objData.height;
             
               
            } else {
                this._el.style.height = "100%";
            }

        }
        else {
            if (objData.height) {
                this._el.style.height = objData.height + "px";

            }

        }

        JueKit.UI.Splitter._base.createDom.call(this, objData);
    },

    getElInner: function () {
        return this._el;
    },

    set_width: function (value) {
        JueKit.UI.Splitter._base.set_width.call(this, value); 
        if (this._parent._direction == JueKit.UI.Direction.vertical) {
             var iEversion = JueKit.Browser.version;
             this._el.style.height = "100%";
            
            if ( JueKit.Browser.isIE && iEversion >= "9") {
                this._el.style.overflow = "hidden";
                 
            } else if (JueKit.Browser.isFirefox) {
                this._el.style.overflow = "visible";
            }
             
        }
    }
});
