class Bind {
    constructor(obj, useTarget = true){
        this.obj = obj;
        this.useTarget = useTarget;
    }

    withEventName(eventName, name, event){
        return {
            value: this.obj.state[name],
            [eventName]: (e, value) => {
                let val = this.useTarget ? e.target.value : value;
                this.obj.setState({[name]: val}, event);
            }
        };
    }

    checked(name,event){
        return {
            //if get number in state
            checked: this.obj.state[name] ? true : false ,
            onCheck: (e, value) => {
                this.obj.setState({[name]: this.useTarget ? e.target.value : value}, event);
            }
        };  
    }

    autocomplete(name,event){
        return {
            //if get number in state
            value: this.obj.state[name],
            searchText: this.obj.state[name],
            onUpdateInput:(val)=> this.obj.setState({[name]: val}, event),
            onChange: (e, value) => {
                this.obj.setState({[name]: this.useTarget ? e.target.value : value}, event);
            }
        };  
    }

    byName(name, event){
        return {
            value: this.obj.state[name],
            onChange: (e, value) => {
                this.obj.setState({[name]: this.useTarget ? e.target.value : value}, event);
            }
        };
    }

    byFunc(name, obj){
        let objMain = {value: this.obj.state[name]};
        objMain[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
        return objMain;
    }
}

module.exports = (obj, useTarget) => new Bind(obj, useTarget);