// Ally Toolkit;
// v0.7.74;

// Copyright 2010 McKayla Washburn;
// Development started on August 30th 2010;
// This toolkit has been tested in Internet Explorer 9, Safari 4, Chrome 6, Opera 10.5, and Firefox 3.6;
// Other browser's and previous versions of these browser are not guarenteed to work correctly;

var ally = new Object();
ally.storage = localStorage;
ally.version = 0.7;
ally.build = 74;
ally.fs = new Object();
ally.Initial = function () {
    if (document.readyState == "complete") {
        if (ally.onload) {
            ally.onload();
        }
        clearInterval(ally.InitialInterval);
    }
};
ally.InitialInterval = setInterval('ally.Initial();', 50);
ally.config = new Object;
ally.config.useSizzle;
ally.get = function (selector) {
    if (selector) {
        ally.selector = selector;
        ally.fs.selector = new Object;
        if (ally.selector.lastIndexOf(':') != -1) {
            ally.fs.selector.numberstart = ally.selector.lastIndexOf(':');
            ally.fs.selector.numberlength = ally.selector.length - ally.fs.selector.numberstart - 1;
            if (ally.fs.selector.numberlength == 1) {
                ally.fs.selector.elementnumber = ally.selector[ally.fs.selector.numberstart + 1];
                ally.selector = ally.selector.replace(':' + ally.fs.selector.elementnumber, '');
            }
            if (ally.fs.selector.numberlength == 2) {
                ally.fs.selector.elementnumber = ally.selector[ally.fs.selector.numberstart + 1] + ally.selector[ally.fs.selector.numberstart + 2];
                ally.selector = ally.selector.replace(':' + ally.fs.selector.elementnumber, '');
            }
            if (ally.fs.selector.numberlength == 3) {
                ally.fs.selector.elementnumber = ally.selector[ally.fs.selector.numberstart + 1] + ally.selector[ally.fs.selector.numberstart + 2] + ally.selector[ally.fs.selector.numberstart + 3];
                ally.selector = ally.selector.replace(':' + ally.fs.selector.elementnumber, '');
            }
            ally.fs.selector.elementnumber = parseFloat(ally.fs.selector.elementnumber);
        } else {
            ally.fs.selector.elementnumber = 0;
        }
        if (!ally.config.useSizzle) {
            ally.elementarray = document.querySelectorAll(ally.selector);
            ally.element = document.querySelectorAll(ally.selector)[ally.fs.selector.elementnumber];
        } else if (ally.config.useSizzle) {
            ally.element = Sizzle(ally.selector)[ally.fs.selector.elementnumber];
        }
        return ally;
    } else {
        return ally;
    }
};
ally.add = function (type, selector) {
    ally.fs.add = new Object();
    if (type) {
        ally.NewElement = document.createElement(type);
        ally.element.appendChild(ally.NewElement);
        if (selector) {
            if (selector.indexOf('#') != -1) {
                ally.fs.add.selector = selector.replace('#', '');
                ally.NewElement.id = ally.fs.add.selector;
            }
            if (selector.indexOf('.') != -1) {
                ally.fs.add.selector = selector.replace('.', '');
                ally.NewElement.className = " " + ally.fs.add.selector;
            }
        }
    } else {
        ally.fs.add.parenttype = ally.element.tagName;
        if (ally.fs.add.parenttype == "BODY") {
            ally.NewElement = document.createElement('div');
        }
        if (ally.fs.add.parenttype == "DIV") {
            ally.NewElement = document.createElement('p');
        }
        if (ally.fs.add.parenttype == "P" || ally.fs.add.parenttype == "A" || ally.fs.add.parenttype == "SPAN") {
            ally.NewElement = document.createElement('span');
        }
        ally.element.appendChild(ally.NewElement);
    }
};
ally.remove = function () {
    if (ally.element) {
        ally.fs.remove = new Object();
        ally.fs.remove.parent = ally.element.parentNode;
        ally.fs.remove.parent.removeChild(ally.element);
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
                ally.storage.setItem(key, ally.element.innerHTML);
                return ally.storage.getItem(key);
            } else {
                ally.storage.setItem(key, ally.element.value);
                return ally.storage.getItem(key);
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
        return "No element to read."
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
                    ally.fs.animate.distanceperframe = (ally.fs.animate.value - ally.fs.animate.originalvalue) / 60 + 1;
                    ally.fs.animate.newvalue = Math.round(ally.fs.animate.originalvalue) + Math.round(ally.fs.animate.distanceperframe);
                    ally.element.style.setProperty(property, ally.fs.animate.newvalue + ally.fs.animate.unit);
                    setTimeout('ally.animate(ally.fs.animate.calledProperty,ally.fs.animate.calledValue)', 10);
                } else if (ally.fs.animate.originalvalue > ally.fs.animate.value) {
                    ally.fs.animate.distanceperframe = (ally.fs.animate.value + ally.fs.animate.originalvalue) / 60 + 1;
                    ally.fs.animate.newvalue = Math.round(ally.fs.animate.originalvalue) - Math.round(ally.fs.animate.distanceperframe);
                    ally.element.style.setProperty(property, ally.fs.animate.newvalue + ally.fs.animate.unit);
                    setTimeout('ally.animate(ally.fs.animate.calledProperty,ally.fs.animate.calledValue)', 10);
                }
            } else {
                return "This is for animating CSS changes. If you want t retrieve a CSS value then please use ally.css.";
            }
        } else {
            return "Please define a property."
        }
    } else {
        return "No element to read."
    }
};
ally.addClass = function (newclass) {
    if (ally.element) {
        if (newclass) {
            ally.element.className = ally.element.className + " " + newclass;
            return ally.element.className;
        } else {
            return "Please define a class.";
        }
    } else {
        return "No element to read."
    }
};
ally.removeClass = function (newclass) {
    if (newclass) {
        ally.element.className = ally.element.className.replace(newclass, '');
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
    ally.fs.time = new Object;
    ally.fs.time.d = new Date();
    ally.fs.time.hours = ally.fs.time.d.getHours();
    ally.fs.time.minutes = ally.fs.time.d.getMinutes();
    ally.fs.time.ampm = '';
    if (ally.fs.time.hours == 0) {
        ally.fs.time.hours = 24;
    }
    if (ally.fs.time.hours < 12 && useAMPM) {
        ally.fs.time.ampm = ' AM';
    }
    if (ally.fs.time.hours > 12 && useAMPM) {
        ally.fs.time.hours = ally.fs.time.hours - 12;
        ally.fs.time.ampm = ' PM';
    }
    if (ally.fs.time.minutes < 10) {
        ally.fs.time.minutes = "0" + ally.fs.time.minutes;
    }
    return ally.fs.time.hours + ":" + ally.fs.time.minutes + ally.fs.time.ampm;
};
ally.date = function () {
    ally.fs.date = new Object;
    ally.fs.date.d = new Date();
    ally.fs.date.day = ally.fs.date.d.getDay();
    ally.fs.date.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    ally.fs.date.month = ally.fs.date.d.getMonth();
    ally.fs.date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    ally.fs.date.date = ally.fs.date.d.getDate();
    ally.fs.date.year = ally.fs.date.d.getFullYear();
    return ally.fs.date.days[ally.fs.date.day] + ', ' + ally.fs.date.months[ally.fs.date.month] + ' ' + ally.fs.date.date + ' ' + ally.fs.date.year;
};
ally.ua = navigator.userAgent;
ally.chrome = ally.ua.indexOf('Chrome');
ally.firefox = ally.ua.indexOf('Firefox');
ally.opera = ally.ua.indexOf('Opera');
ally.safari = ally.ua.indexOf('Safari');
ally.ie = ally.ua.indexOf('MSIE');
ally.browerversion = ally.ua.indexOf('Version');
if (ally.chrome != -1) {
    ally.chrome = ally.ua[ally.chrome + 7] + ally.ua[ally.chrome + 8] + ally.ua[ally.chrome + 9] + ally.ua[ally.chrome + 10] + ally.ua[ally.chrome + 11] + ally.ua[ally.chrome + 12] + ally.ua[ally.chrome + 13] + ally.ua[ally.chrome + 14] + ally.ua[ally.chrome + 15] + ally.ua[ally.chrome + 16];
}
if (ally.firefox != -1) {
    ally.firefox = ally.ua[ally.firefox + 8] + ally.ua[ally.firefox + 9] + ally.ua[ally.firefox + 10];
}
if (ally.opera != -1) {
    ally.opera = ally.ua[ally.browserversion + 8] + ally.ua[ally.browserversion + 9] + ally.ua[ally.browserversion + 10] + ally.ua[ally.browserversion + 11];
}
if (ally.safari != -1 && ally.chrome == -1) {
    ally.safari = ally.ua[ally.browserversion + 8] + ally.ua[ally.browserversion + 9] + ally.ua[ally.browserversion + 10];
}
if (ally.ie != -1) {
    ally.ie = ally.ua[ally.ie + 5];
}
ally.windows = ally.ua.indexOf('Windows NT');
ally.mac = ally.ua.indexOf('Mac OS X');
ally.iPhone = ally.ua.indexOf('iPhone OS');
ally.iPad = ally.ua.indexOf('iPad');
ally.iPadVersion = ally.ua.indexOf('CPU OS');
if (ally.windows != -1) {
    ally.windows = ally.ua[ally.windows + 11] + ally.ua[ally.windows + 12] + ally.ua[ally.windows + 13];
}
if (ally.mac != -1 && ally.iPhone == -1 && ally.iPad == -1) {
    ally.mac = ally.ua[ally.mac + 9] + ally.ua[ally.mac + 10] + ally.ua[ally.mac + 11] + ally.ua[ally.mac + 12] + ally.ua[ally.mac + 13] + ally.ua[ally.mac + 14];
}
if (ally.iPhone != -1) {
    ally.iPhone = ally.ua[ally.iPhone + 10] + ally.ua[ally.iPhone + 11] + ally.ua[ally.iPhone + 12];
}
if (ally.iPad != -1) {
    ally.iPad = ally.ua[ally.iPadVersion + 7] + ally.ua[ally.iPadVersion + 8] + ally.ua[ally.iPadVersion + 9];
}
ally.timeOnPage = 0;
setInterval('ally.timeOnPage++;', 1000);
