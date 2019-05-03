/*jslint plusplus: true */
/*global
  alert,
  readDict,
  action,
  clockrefresh,
  cycript
*/
"use strict";

options.seconds = false;
options.disableweather = false;
options.disableoverlay = false;
options.clockrefresh = 1000;
options.languages = (window.navigator.language.length >= 2) ? window.navigator.language.split('-')[0] : 'en';

var translate = {
    en: {
        weekday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        sday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        smonth: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        condition: ["Tornado", "Tropical Storm", "Hurricane", "Thunderstorm", "Thunderstorm", "Snow", "Sleet", "Sleet", "Freezing Drizzle", "Drizzle", "Freezing Rain", "Showers", "Showers", "Flurries", "Snow", "Snow", "Snow", "Hail", "Sleet", "Dust", "Fog", "Haze", "Smoky", "Blustery", "Windy", "Cold", "Cloudy", "Cloudy", "Cloudy", "Cloudy", "Cloudy", "Clear", "Sunny", "Fair", "Fair", "Sleet", "Hot", "Thunderstorms", "Thunderstorms", "Thunderstorms", "Showers", "Heavy Snow", "Light Snow", "Heavy Snow", "Partly Cloudy", "Thunderstorm", "Snow", "Thunderstorm", "blank"]
    }
};

try {
    if (!translate[options.languages]) {
        options.languages = 'en';
    }
} catch (err) {
    //alert("setup err" + err);
}
if (options.seconds === true) {
    options.clockrefresh = 1000;
}

function convertTOWord(num) {
    var onesText = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        tensText = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
        aboveText = ['', ' thousand ', ' million ', ' billion ', ' trillion ', ' quadrillion ', ' quintillion ', ' sextillion '],
        generatedArray = [],
        converted = '',
        i = 0;
    while (num) {
        generatedArray.push(num % 1000);
        num = parseInt(num / 1000, 10);
    }
    while (generatedArray.length) {
        converted = (function (a) {
            var x = Math.floor(a / 100),
                y = Math.floor(a / 10) % 10,
                z = a % 10;
            return (x > 0 ? onesText[x] + ' hundred ' : '') +
                (y >= 2 ? tensText[y] + ' ' + onesText[z] : onesText[10 * y + z]);
        })(generatedArray.shift()) + aboveText[i++] + converted;
    }
    return converted;
}

function checkDiv(div) { //check if element is placed
    var keys = Object.keys(action.savedElements.placedElements),
        loc = keys.indexOf(div);
    if (loc !== -1) {
        return document.getElementById(keys[loc]);
    }
    return;
}
