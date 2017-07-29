module.exports = dateFromString;

function dateFromString(value){
    if (!value){
        return undefined;
    }
    const s = value.split(" ");

    const date = s[0].split(".");

    let time;
    if (s.length> 0)
        time = s[1].split(":");
    else{
        time = [0,0,0];
    }

    return new Date(date[2], parseInt(date[1] -1), date[0], time[0], time[1], time[2]);
}