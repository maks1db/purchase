class Bind {
    constructor(obj){
        this.obj = obj;
    }

    byName(name, event){
        return {
            value: this.obj.state[name],
            onChange: (e, value) => this.obj.setState({[name]: e ? e.target.value : value}, event)
        };
    }
}

module.exports = (obj) => new Bind(obj);