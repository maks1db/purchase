const className = (...agrgs) => {

    let first = agrgs[0], obj = {}, str = ''; 

    if (typeof(first) === 'string'){
        str = first;

        if (agrgs) obj = agrgs[1];
    }
    else{
        obj = agrgs[0];
    }    

    if (obj){
        Object.keys(obj).forEach(x => {
            if (obj[x]){
                str += ' ' + x;
            }
        });
    }   
    return str;
};

export default className;