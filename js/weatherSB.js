/*jslint plusplus: true */
/*global
  injectedWeather,
  injectedSystem,
  options,
  translate,
  checkDiv,
  weather,
  action
*/
"use strict";

var globalWeather,
    weatherdivs = function () { //weather
    var weatherArray = ['temp', 'tempdeg', 'tempdegplus', 'rain', 'update', 'icon', 'condition'],
        tcf = (weather.celsius === 'C') ? 'c' : 'f',
        i,
        div,
        icon,
        value,
        prefix,
        suffix
    for (i = 0; i < weatherArray.length; i++) {
        div = checkDiv(weatherArray[i]);
        if (div) {
            switch (div.id) {
            case 'temp':
                value = weather.temperature
                break;
            case 'tempdeg':
                value = weather.temperature + '&deg;';
                break;
            case 'tempdegplus':
                value = weather.temperature + '&deg;' + tcf;
                break;
            case 'rain':
                value = weather.chanceofrain + "%";
                break;
            case 'update':
                value = weather.updateTimeString;
                break;
            case 'condition':
                value = translate[options.languages].condition[weather.conditionCode];
                break;
            case 'icon':
                icon = weather.conditionCode;
                value = icon;
                break;
            }
            if (div.id === 'icon') {
                if(icon === undefined){
                    icon = 28;
                }
                if(action.savedElements.iconName == undefined){
                    action.savedElements.iconName = "simply";
                }
                if (document.getElementById('iconDiv' + div.id).src != 'http://junesiphone.com/weather/IconSets/' + action.savedElements.iconName + '/' + icon + '.png') {
                    document.getElementById('iconDiv' + div.id).src = 'http://junesiphone.com/weather/IconSets/' + action.savedElements.iconName + '/' + icon + '.png';
                }
            } else {
                if (div.getAttribute('data-prefix') !== null) {
                    prefix = div.getAttribute('data-prefix');
                } else {
                    prefix = '';
                }
                if (div.getAttribute('data-suffix') !== null) {
                    suffix = div.getAttribute('data-suffix');
                } else {
                    suffix = '';
                }

                div.innerHTML = prefix + value + suffix;

            }
        }
    }
};

function weatherLoaded() {
    console.log("hi");
    try {
        weatherdivs();
    } catch (err) {
        document.getElementById('help').innerHTML += err;
    }
    setTimeout(weatherLoaded, 5000);
}

setTimeout(weatherLoaded, 2000);