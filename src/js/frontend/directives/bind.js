class Bind {
    constructor(obj){
        this.obj = obj;
    }

    byName(name){
        return {
            value: this.obj.state[name],
            onChange: (e, value) => this.obj.setState({[name]: e ? e.target.value : value})
        };
    }
}

module.exports = (obj) => new Bind(obj);