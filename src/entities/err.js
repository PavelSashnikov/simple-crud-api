class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundErr';
  }
}

class ValidateErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidateErr';
  }
}

module.exports = { NotFoundErr, ValidateErr };
