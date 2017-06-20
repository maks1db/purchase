const addZero = require("./addZeroDate");

const secondsToTime = function (value) {

    let sec = value.toFixed(0);
    let min = sec / 60;
    min = min - (min % 1);

    sec -= min * 60;

    let h = 0;
    if (min >= 60) {
        h = min / 60;
        h = h - (h % 1);
    }

   // function format(value) {
   //     return ("" + value).length == 1 ? "0" + value : value;
   // }

    return addZero(min) + ":" + addZero(sec);
};

module.exports = secondsToTime;