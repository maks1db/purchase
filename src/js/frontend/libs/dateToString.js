const addZero = require('./addZeroDate');

function dateToString(date, dateParts='dateTime', dateDelimiter = '.'){

    if (!date){
        return '';
    }
    if (typeof(date) === 'number' || typeof(date) === 'string'){
        date = new Date(date);
    }    

    let enableDate = true, enableTime = true;

    if (dateParts === 'time'){
        enableDate = false;
    }

    if (dateParts === 'date'){
        enableTime = false;
    }
    const z = addZero;
    return ((enableDate? (dateDelimiter !== '.' ?
     `${date.getFullYear()}${dateDelimiter}${z(date.getMonth() + 1)}${dateDelimiter}${z(date.getDate())} ` :
     `${z(date.getDate())}${dateDelimiter}${z(date.getMonth() + 1)}${dateDelimiter}${date.getFullYear()} `) : '') +
        (enableTime? `${z(date.getHours())}:${z(date.getMinutes())}:${z(date.getSeconds())}` : '')).trim();
}

module.exports = dateToString;