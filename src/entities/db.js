const { STATUS, DB_PATH, MESSAGE } = require('./constants');
const { NotFoundErr } = require('./err');

class DB {
  constructor() {
    this.db = new Map();
  }

  getElById(id) {
    if (!id) {
      return this.getDbElements();
    }
    if (!this.db.has(id)) {
      throw new NotFoundErr(MESSAGE.notFound);
    }
    return this.db.get(id);
  }

  getDbElements() {
    return [...this.db.values()];
  }
}

module.exports = { DB };
