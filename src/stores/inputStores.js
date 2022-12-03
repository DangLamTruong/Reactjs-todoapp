import { makeObservable, observable, action } from 'mobx';

class NameStore {
    name = "";
    value = "";
    constructor () {
        makeObservable(this, {
            name: observable,
            value: observable,
            submit: action,
            inputValue: action,
        });
    }
    submit() {
        this.name = this.value;
    }
    inputValue(value) {
        this.value = value;
    }
    get Name() {
        return this.name;
    }
} 

const nameStore =  new NameStore();
export default nameStore;