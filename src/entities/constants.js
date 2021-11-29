module.exports = {
  STATUS: {
    ok: 200,
    notValid: 400,
    notFound: 404,
    created: 201,
    deleted: 204,
    servErr: 500,
    notImpl: 501,
  },
  DB_PATH: ['person'],
  MESSAGE: {
    wrongPath: 'Wrong request',
    notFound: 'Not found',
    noValidId: 'Id is not valid',
    wrongParams: 'Wrong params',
  },
  CONTENT_TYPE: {
    json: { 'Content-Type': 'application/json' },
  },
};
