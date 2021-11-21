const fs = require('fs');
const path = require('path');

function findEl(id) {
  const parsedData = getAllData();
  const el = parsedData.find((el) => el.id === id);

  return el;
}

function getAllData() {
  const arr = fs.readFileSync(path.resolve('./src/db/users.json'), {
    encoding: 'utf-8',
  });
  return JSON.parse(arr);
}

module.exports = { findEl, getAllData };
