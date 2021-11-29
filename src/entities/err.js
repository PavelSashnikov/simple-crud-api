class NotFoundErr extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'NotFoundErr';
    this.status = status;
    this.isCustom = true;
  }
}

class ValidateErr extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ValidateErr';
    this.status = status;
    this.isCustom = true;
  }
}

module.exports = { NotFoundErr, ValidateErr };
