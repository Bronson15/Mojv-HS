
"use strict";


/* Overlay */

action.convertSVG = function () {
    showSVG('.svg', true);
};

action.loadjsfile = function (filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    fileref.async = true;
    if (fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    if (filename === 'js/themes.js') {
        fileref.onload = action.showThemes;
    } else if (filename === 'js/svg.js') {
        fileref.onload = action.convertSVG;
    }
};

/* Load Info */
/* 
   Obj-c doesn't like to keep order of dictionaries. I parse the dictionary, convert to JSON, then call function loadingTheme()
   in the index.html. It parses the JSON then calls this function. We pass thedict which is the JSON but also a string showing
   the order in which elements should show. Split the order by a space, then take the elements objects and append them to a new
   object "placed" so we can keep order. As a fall back we just use the order Obj-c gave us.
*/
action.loadTheme = function (thedict, order) {
    try {
        var dict = thedict;
        var elOrder = order.split(' ');
        var placed = {};
        action.savedElements.overlay = dict.Overlay;
        if (dict.Widget) {
            action.savedElements.widget = dict.Widget;
        }
        if (dict.Elements) {
            if(elOrder.length > 0){
                for (var i = 0; i < elOrder.length; i++) {
                    placed[elOrder[i]] = dict.Elements[elOrder[i]];
                }
                action.savedElements.placedElements = placed;
            }else{
                action.savedElements.placedElements = dict.Elements;
            }
        } else {
            action.savedElements.placedElements = '';
        }
        if (dict.IconName) {
            action.savedElements.iconName = dict.IconName;
        } else {
            action.savedElements.iconName = 'simply';
        }
        localStorage.setItem('placedElements', JSON.stringify(action.savedElements));
        dict = null;
        placed = null;
        window.location = location.href;
    } catch (err) {
        //alert("LBJS Error " + err);
    }
};