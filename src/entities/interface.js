const Person = {
  name: (n) => n && typeof n === 'string',
  age: (a) => +a && typeof +a === 'number',
  hobbies: (h) =>
    h && Array.isArray(h) && h.every((el) => typeof el === 'string'),
};

module.exports = { Person };
