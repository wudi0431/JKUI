/**
 * Copyright (c) 2007 Tulipmm.cn. All rights reserved.
 * @Author fossil
 */

// JueKIt.Browser
JueKit.Browser =
{
    isIE: false,
    isFirefox: false,
    isOpera: false,
    isSafari: false,
    name: "",
    version: "",
    __getBrowserInfo: function () {
        var agent = navigator.userAgent;
        if (agent.indexOf("MSIE") > -1) {
            this.isIE = true;
            this.name = "MSIE";
        }
        else if (agent.indexOf("Firefox") > -1) {
            this.isFirefox = true;
            this.name = "Firefox";
        }
        else if (agent.indexOf("Opera") > -1) {
            this.isOpera = true;
            this.name = "Opera";
        }
        else if (agent.indexOf("Chrome") > -1 || agent.indexOf("Safari") > -1) {
            this.isFirefox = true;
            this.name = "Chrome";
        }
        else if (agent.indexOf("Trident") > -1) {
            this.isFirefox = true;
            this.name = "rv";
        }
        else {
          
            return;
        }

        var nStart = agent.indexOf(this.name) + this.name.length + 1;
        this.version = parseFloat(agent.substring(nStart, nStart + 5).match(/\d+\.\d{1}/i)[0]);
        delete this.__getBrowserInfo;
    }
};
JueKit.Browser.__getBrowserInfo();
