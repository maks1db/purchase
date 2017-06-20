module.exports = beginDay;

function beginDay(date){
    if (!date){
        return undefined;
    }

    if (typeof(date) === 'number' || typeof(date) === 'string'){
        date = new Date(date);
    }  

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}