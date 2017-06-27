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

    byName(name, event){
        return {
            value: this.obj.state[name],
            onChange: (e, value) => {
                this.obj.setState({[name]: this.useTarget ? e.target.value : value}, event);
            }
        };
    }
}

module.exports = (obj, useTarget) => new Bind(obj, useTarget);