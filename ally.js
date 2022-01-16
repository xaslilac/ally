// Ally Selector and Toolkit;
// v0.6.130;

// Copyright 2010 McKayla Washburn;
// Development started on August 30th 2010;
// This toolkit has been tested in Chrome 6, Opera 10.5, and Firefox 3.6;
// If compatibility is your first priority you may want to consider Dojo at http://www.dojotoolkit.org/;
// Other browser's and previous versions of these browser are not guarenteed to work correctly;
// This toolkit DOES NOT work in Internet Explorer;

var ally = new Object();
ally.local = localStorage;
ally.version = 0.6;
ally.build = 130;
ally.fs = new Object();
ally.Initial = function () {
    if (document.readyState == "complete") {
        if (ally.onload) {
            ally.onload();
        }
        ally.browser();
        ally.os();
        clearInterval(ally.InitialInterval);
    }
};
ally.InitialInterval = setInterval('ally.Initial();', 50);
ally.get = function (selector) {
    if (selector) {
        ally.selector = selector;
        if (ally.selector.indexOf(':') != -1) {
            numberstart = ally.selector.indexOf(':');
            numberlength = ally.selector.length - numberstart - 1;
            if (numberlength == 1) {
                ally.elementnum = ally.selector[numberstart + 1];
                ally.selector = ally.selector.replace(':' + ally.elementnum, '');
            }
            if (numberlength == 2) {
                ally.elementnum = ally.selector[numberstart + 1] + ally.selector[numberstart + 2];
                ally.selector = ally.selector.replace(':' + ally.elementnum, '');
            }
            if (numberlength == 3) {
                ally.elementnum = ally.selector[numberstart + 1] + ally.selector[numberstart + 2] + ally.selector[numberstart + 3];
                ally.selector = ally.selector.replace(':' + ally.elementnum, '');
            }
            ally.elementnum = parseFloat(ally.elementnum);
        } else {
            ally.elementnum = 0;
        }
        if (ally.selector.indexOf('.') == 0) {
            ally.selector = ally.selector.replace('.', '');
            ally.element = document.getElementsByClassName(ally.selector)[ally.elementnum];
            ally.selector = "." + ally.selector;
        } else if (ally.selector.indexOf('#') == 0) {
            ally.selector = ally.selector.replace('#', '');
            ally.element = document.getElementById(ally.selector);
            ally.selector = "#" + ally.selector;
        } else if (ally.selector.indexOf('*') == 0) {
            ally.element = document.getElementsByTagName('body')[0];
        } else {
            ally.element = document.getElementsByTagName(ally.selector)[ally.elementnum];
        }
        return ally;
    } else {
        return ally;
    }
};
ally.add = function (type, selector) {
    if (type) {
        ally.NewElement = document.createElement(type);
        ally.element.appendChild(ally.NewElement);
        if (selector) {
            if (selector.indexOf('#') != -1) {
                selector = selector.replace('#', '');
                ally.NewElement.id = selector;
            }
            if (selector.indexOf('.') != -1) {
                selector = selector.replace('.', '');
                ally.NewElement.className = " " + selector;
            }
        }
    } else {
        var parenttype = ally.element.tagName;
        if (parenttype == "BODY") {
            ally.NewElement = document.createElement('div');
        }
        if (parenttype == "DIV") {
            ally.NewElement = document.createElement('p');
        }
        if (parenttype == "P" || parenttype == "A" || parenttype == "SPAN") {
            ally.NewElement = document.createElement('span');
        }
        ally.element.appendChild(ally.NewElement);
    }
};
ally.remove = function () {
    if (ally.element) {
        parent = ally.element.parentNode;
        parent.removeChild(ally.element);
    } else {
        return "No element defined";
    }
};
ally.html = function (html) {
    if (html) {
        ally.element.innerHTML = html;
        return ally.element.innerHTML;
    } else {
        return ally.element.innerHTML;
    }
};
ally.value = function (value) {
    if (ally.element) {
        if (value) {
            ally.element.value = value;
            return ally.element.value;
        } else {
            return ally.element.value;
        }
    } else {
        return "No element to read."
    }
};
ally.empty = function () {
    if (ally.element) {
        ally.element.innerHTML = '';
        return ally.element.innerHTML;
    } else {
        return "No element to empty."
    }
};
ally.attr = function (attribute, value) {
    if (ally.element) {
        if (attribute) {
            if (value) {
                if (value != 'remove') {
                    ally.element.setAttribute(attribute, value);
                    return ally.element.getAttribute(attribute);
                } else {
                    ally.element.removeAttribute(attribute);
                }
            } else {
                return ally.element.getAttribute(attribute);
            }
        } else {
            return "Please define an attribute to read.";
        }
    } else {
        return "No element to read.";
    }
};
ally.storeAs = function (key) {
    if (ally.element) {
        if (key) {
            if (!ally.element.value) {
                ally.local.setItem(key, ally.element.innerHTML);
                return ally.local.getItem(key);
            } else {
                ally.local.setItem(key, ally.element.value);
                return ally.local.getItem(key);
            }
        } else {
            return "Please define a key to store the HTML as.";
        }
    } else {
        return "No element to read.";
    }
};
ally.css = function (property, value) {
    if (ally.element) {
        if (property) {
            if (value) {
                if (value != 'remove') {
                    ally.element.style.setProperty(property, value);
                    return ally.element.style.getPropertyValue(property);
                } else {
                    ally.element.style.removeProperty(property);
                }
            } else {
                return ally.element.style.getPropertyValue(property);
            }
        }
    } else {
        return "No element to read.";
    }
};
ally.animate = function (property, value) {
    if (ally.element) {
        if (property) {
            if (value) {
                ally.fs.animate = new Object();
                ally.fs.animate.calledProperty = property;
                ally.fs.animate.calledValue = value;
                if (ally.element.style.getPropertyValue(property)) {
                    ally.fs.animate.originalvalue = parseFloat(ally.element.style.getPropertyValue(property));
                } else {
                    ally.fs.animate.originalvalue = 0;
                }
                ally.fs.animate.unit = value.replace(parseFloat(value), '');
                ally.fs.animate.value = parseFloat(value);
                if (ally.fs.animate.originalvalue < ally.fs.animate.value) {
                    ally.fs.animate.distanceperframe = (ally.fs.animate.value - ally.fs.animate.originalvalue) / 60;
                    ally.fs.animate.newvalue = Math.round(ally.fs.animate.originalvalue) + Math.round(ally.fs.animate.distanceperframe);
                    ally.element.style.setProperty(property, ally.fs.animate.newvalue + ally.fs.animate.unit);
                    setTimeout('ally.animate(ally.fs.animate.calledProperty,ally.fs.animate.calledValue)', 10);
                } else if (ally.fs.animate.originalvalue > ally.fs.animate.value) {
                    ally.fs.animate.distanceperframe = (ally.fs.animate.value + ally.fs.animate.originalvalue) / 60;
                    ally.fs.animate.newvalue = Math.round(ally.fs.animate.originalvalue) - Math.round(ally.fs.animate.distanceperframe);
                    ally.element.style.setProperty(property, ally.fs.animate.newvalue + ally.fs.animate.unit);
                    setTimeout('ally.animate(ally.fs.animate.calledProperty,ally.fs.animate.calledValue)', 10);
                }
            } else {
                return "This is for animating CSS changes. If you want t retrieve a CSS value then please use ally.css.";
            }
        } else {
            return "Please define a property.";
        }
    } else {
        return "No element to read.";
    }
};
ally.addClass = function (class) {
    if (ally.element) {
        if (class) {
            ally.element.className = ally.element.className + " " + class;
            return ally.element.className;
        } else {
            return "Please define a class.";
        }
    } else {
        return "No element to read."
    }
};
ally.removeClass = function (class) {
    if (class) {
        ally.element.className = ally.element.className.replace(class, '');
        return ally.element.className;
    } else {
        return "Please define a class.";
    }
};
ally.open = function (url, method, async) {
    if (!url) {
        return "Please specify a file URL";
    }
    if (!method) {
        method = "GET";
    }
    if (!async) {
        async = false;
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval('ally.openHTML();', 500);
};
ally.openHTML = function () {
    if (ally.XML.status == 200) {
        if (ally.element) {
            ally.element.innerHTML = ally.XML.responseText;
        }
        clearInterval(ally.XMLInterval);
    } else if (ally.XML.status == 404) {
        if (ally.element) {
            ally.element.innerHTML = "Sorry. :( We couldn't load the file you wanted. (" + ally.XML.status + ')';
        }
        clearInterval(ally.XMLInterval);
    } else {
        if (ally.element) {
            ally.element.innerHTML = "Loading..";
        }
    }
};
ally.script = function (url, method, async) {
    if (!url) {
        return "Please specify a file URL";
    }
    if (!method) {
        method = "GET";
    }
    if (!async) {
        async = false;
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval('ally.openScript();', 500);
};
ally.openScript = function () {
    if (ally.XML.status == 200) {
        eval(ally.XML.responseText);
        clearInterval(ally.XMLInterval);
    } else if (ally.XML.status == 404) {
        alert("This page was trying to load a script but it didn't load correctly. If something doesn't work, then refresh the page and hope you don't get this error again.");
        clearInterval(ally.XMLInterval);
    }
};
ally.retrieve = function (url, method, async) {
    if (!url) {
        return "Please specify a file URL";
    }
    if (!method) {
        method = "GET";
    }
    if (!async) {
        async = false;
    }
    ally.XML = new XMLHttpRequest();
    ally.XML.open(method, url, async);
    ally.XML.send();
    ally.XMLInterval = setInterval('ally.openOther();', 500);
    return ally.XML;
};
ally.openOther = function () {
    if (ally.XML.status == 200) {
        clearInterval(ally.XMLInterval);
    } else if (ally.XML.status == 404) {
        alert("This page was trying to load something but it didn't load correctly. If something doesn't work, then refresh the page and hope you don't get this error again.");
        clearInterval(ally.XMLInterval);
    }
};
ally.time = function (useAMPM) {
    d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    ampm = '';
    if (hours == 0) {
        hours = 24;
    }
    if (hours < 12 && useAMPM) {
        ampm = ' AM';
    }
    if (hours > 12 && useAMPM) {
        hours = hours - 12;
        ampm = ' PM';
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ampm;
};
ally.date = function () {
    day = new Date().getDay();
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    month = new Date().getMonth();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    date = new Date().getDate();
    year = new Date().getFullYear();
    return days[day] + ', ' + months[month] + ' ' + date + ' ' + year;
};
ally.browser = function () {
    UA = navigator.userAgent;
    Chrome = UA.indexOf('Chrome');
    Firefox = UA.indexOf('Firefox');
    Opera = UA.indexOf('Opera');
    Safari = UA.indexOf('Safari');
    IE = UA.indexOf('MSIE');
    Version = UA.indexOf('Version');
    if (Chrome != -1) {
        ally.chrome = UA[Chrome + 7] + UA[Chrome + 8] + UA[Chrome + 9] + UA[Chrome + 10] + UA[Chrome + 11] + UA[Chrome + 12] + UA[Chrome + 13] + UA[Chrome + 14] + UA[Chrome + 15] + UA[Chrome + 16];
        return "Chrome " + ally.chrome;
    }
    if (Firefox != -1) {
        ally.firefox = UA[Firefox + 8] + UA[Firefox + 9] + UA[Firefox + 10];
        return "Firefox " + ally.firefox;
    }
    if (Opera != -1) {
        ally.opera = UA[Version + 8] + UA[Version + 9] + UA[Version + 10] + UA[Version + 11];
        return "Opera " + ally.opera;
    }
    if (UA.indexOf('Safari') != -1 && UA.indexOf('Chrome') == -1) {
        ally.safari = UA[Version + 8] + UA[Version + 9] + UA[Version + 10];
        return "Safari " + ally.safari;
    }
    if (IE != -1) {
        ally.ie = UA[IE + 5];
        return "Internet Explorer" + ally.ie;
    }
};
ally.os = function () {
    UA = navigator.userAgent;
    Windows = UA.indexOf('Windows NT');
    Mac = UA.indexOf('Mac OS X');
    iPhone = UA.indexOf('iPhone OS');
    if (Windows != -1) {
        ally.windows = UA[Windows + 11] + UA[Windows + 12] + UA[Windows + 13];
        return "Windows " + ally.windows;
    }
    if (Mac != -1 && iPhone == -1) {
        ally.mac = UA[Mac + 9] + UA[Mac + 10] + UA[Mac + 11] + UA[Mac + 12] + UA[Mac + 13] + UA[Mac + 14];
        return "Mac OS X " + ally.mac;
    }
    if (iPhone != -1) {
        ally.iPhone = UA[iPhone + 10] + UA[iPhone + 11] + UA[iPhone + 12];
        return "iPhone OS" + ally.iPhone;
    }
};
ally.timeOnPage = 0;
setInterval('ally.timeOnPage++;', 1000);