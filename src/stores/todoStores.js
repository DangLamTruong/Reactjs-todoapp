import { makeObservable, observable, action } from 'mobx';

class CountStore {
  count = 1;
  count2 = 2;
  constructor() {
    makeObservable(this, {
        count: observable,
        up: action,
        down: action,
        changeCount:action,
        resetCount:action,
    });
  }
  up() {
        this.count = this.count + this.count2;
        this.resetCount();
  }
  down() {
    this.count = this.count - this.count2;
    this.resetCount();
  }
  changeCount(value) {
    this.count = this.count + value;
  }
  resetCount() {
    if(this.count > 10 || this.count < -10) return this.count = 0;
  }
  get Count() {
    return this.count;
  }
};

const countStore = new CountStore();
export default countStore;