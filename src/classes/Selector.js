const isTrueObject = (obj) =>
  obj instanceof Object && !Array.isArray(obj) && typeof obj !== 'function';

class Selector {
  constructor(fields, validKeys) {
    this.store = new Set();
    this.validKeys = null;

    if (validKeys && validKeys.length > 0 && validKeys instanceof Array) this.allowOnly(validKeys);
    else throw new Error('validKeys: Must Pass String Array Of Length At Least 1');

    if (typeof fields === 'string') this.addToStoreViaArray(fields.split(' '));
    else if (Array.isArray(fields)) this.addToStoreViaArray(fields);
    else if (isTrueObject(fields)) this.addToStoreViaObject(fields);
    else
      throw new Error(
        "fields must be either 'space-seprated-keys' | 'Array of string' | key-value: <string, boolean>"
      );
  }

  get value() {
    return [...this.store.values()];
  }

  get validValue() {
    if (!this.validKeys) return [];
    return [...this.validKeys.values()];
  }

  addToStoreViaArray(fields) {
    if (!this.validKeys) fields.forEach((key) => this.add(key));
  }

  addToStoreViaObject(fields) {
    for (const key in fields) this.add(key);
  }

  add(key) {
    if (typeof key !== 'string') throw new TypeError('Key Of Type String Required');
    if (!this.validKeys) {
      this.store.add(key);
      return;
    }
    if (this.validKeys.has(key)) this.store.add(key);
  }

  remove(key) {
    if (typeof key !== 'string') throw new TypeError('Key Of Type String Required');
    this.store.delete(key);
    return this;
  }

  has(key) {
    if (typeof key !== 'string') throw new TypeError('Key Of Type String Required');
    return this.store.has(key);
  }

  allowOnly(keys) {
    if (!(keys instanceof Array)) throw new TypeError('Input Required Of Type String Array');
    this.validKeys = new Set(keys);
  }
}

export default Selector;
