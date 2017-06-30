const addZero = require('./addZeroDate');

function dateToString(date, dateParts='dateTime'){

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
    return (enableDate? `${z(date.getDate())}.${z(date.getMonth() + 1)}.${date.getFullYear()} ` : '') +
        (enableTime? `${z(date.getHours())}:${z(date.getMinutes())}:${z(date.getSeconds())}` : '');
}

module.exports = dateToString;