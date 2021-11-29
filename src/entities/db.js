const uuidv = require('uuid');
const { MESSAGE, STATUS } = require('./constants');
const { NotFoundErr, ValidateErr } = require('./err');
const { Person } = require('./interface');

class DB {
  constructor() {
    this.db = new Map();
  }

  _validatePerson(obj) {
    for (const key in Person) {
      if (Person.hasOwnProperty(key)) {
        if (!Person[key](obj[key])) {
          return false;
        }
      }
    }
    return true;
  }

  getElById(id) {
    if (!id) {
      return this.getDbElements();
    }

    if (!uuidv.validate(id)) {
      throw new ValidateErr(`${MESSAGE.noValidId} (${id})`, STATUS.notValid);
    }
    if (!this.db.has(id)) {
      throw new NotFoundErr(`${MESSAGE.notFound} (${id})`, STATUS.notFound);
    }

    return this.db.get(id);
  }

  getDbElements() {
    return [...this.db.values()];
  }

  set(obj) {
    if (!this._validatePerson(obj)) {
      throw new ValidateErr(MESSAGE.wrongParams, STATUS.notValid);
    }
    const id = uuidv.v4();

    this.db.set(id, { id, ...obj });
    return { ...this.db.get(id) };
  }

  update(id, obj) {
    if (!uuidv.validate(id)) {
      throw new ValidateErr(`${MESSAGE.noValidId} (${id})`, STATUS.notValid);
    }
    if (!this.db.has(id)) {
      throw new NotFoundErr(`${MESSAGE.notFound} (${id})`, STATUS.notFound);
    }
    if (!this._validatePerson(obj)) {
      throw new ValidateErr(MESSAGE.wrongParams, STATUS.notValid);
    }

    this.db.set(id, { id, ...obj });
    return this.getElById(id);
  }

  remove(id) {
    if (!uuidv.validate(id)) {
      throw new ValidateErr(`${MESSAGE.noValidId} (${id})`, STATUS.notValid);
    }
    if (!this.db.has(id)) {
      throw new NotFoundErr(`${MESSAGE.notFound} (${id})`, STATUS.notFound);
    }
    this.db.delete(id);
  }
}

module.exports = { DB };
