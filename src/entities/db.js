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

  _trimArr(str) {
    return str?.replace(/['[\]\s]/g, '').split(',');
  }

  getElById(id) {
    if (!id) {
      return this.getDbElements();
    }

    if (!uuidv.validate(id)) {
      throw new ValidateErr(MESSAGE.noValidId, STATUS.notValid);
    }
    if (!this.db.has(id)) {
      throw new NotFoundErr(MESSAGE.notFound, STATUS.notFound);
    }

    return this.db.get(id);
  }

  getDbElements() {
    return [...this.db.values()];
  }

  set(obj) {
    obj.hobbies = this._trimArr(obj?.hobbies);
    if (!this._validatePerson(obj)) {
      throw new ValidateErr(MESSAGE.wrongParams, STATUS.notValid);
    }
    const id = uuidv.v4();

    this.db.set(id, { id, ...obj });
    return {...this.db.get(id)};
  }
}

module.exports = { DB };
