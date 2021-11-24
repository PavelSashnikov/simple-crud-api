const request = require('supertest');
const uuidv = require('uuid');
const { STATUS } = require('../src/entities/constants');
require('dotenv').config();

const server = `http://localhost:${process.env.PORT || 3030}`;
describe('API success', () => {
  let person;

  beforeEach(() => {
    person = {
      ...person,
      name: 'Vi',
      age: '23',
      hobbies: ['enduro', 'snowboadring'],
    };
  });

  test('should be persons array', async () => {
    const response = await request(server).get('/person');
    expect(response.body).toEqual([]);
  });

  test('should create person', async () => {
    const response = await request(server)
      .post('/person')
      .send(person)
      .expect(201);

    person.id = response.body.id;

    expect(uuidv.validate(response.body.id)).toBeTruthy();
    expect(response.body).toEqual(person);

    const newItem = await request(server).get(`/person/${person.id}`);
    expect(newItem.body).toEqual(person);
  });

  test('should person change', async () => {
    const response = await request(server)
      .put(`/person/${person.id}`)
      .send(person)
      .expect(200);

    expect(response.body).toEqual(person);
  });

  test('should person remove', async () => {
    await request(server).delete(`/person/${person.id}`).expect(STATUS.deleted);

    await request(server).get(`/person/${person.id}`).expect(STATUS.notFound);
  });
});

describe('API person err', () => {
  let person;
  beforeEach(() => {
    person = {
      name: 'Vi',
      age: '23',
      hobbies: ['snowboadring'],
    };
  });

  test('should be err (invalid age)', async () => {
    const response = await request(server)
      .post('/person')
      .send(person)
      .expect(201);

    person.age = 'string';
    const id = response.body.id;
    await request(server)
      .post(`/person/${id}`)
      .send(person)
      .expect(STATUS.notValid);
  });

  test('should be err (invalid id)', async () => {
    const response = await request(server).get('/person/123').send(person);
    expect(response.statusCode).toBe(STATUS.notValid);
  });
});

describe('API random flow', () => {
  let person;

  beforeEach(() => {
    person = {
      ...person,
      name: 'Vi',
      age: '23',
      hobbies: ['enduro', 'snowboadring'],
    };
  });

  test('should person remove', async () => {
    await request(server)
      .delete(`/person/${person.id}`)
      .expect(STATUS.notValid);
  });

  test('should create person and get new one', async () => {
    const response = await request(server)
      .post('/person')
      .send(person)
      .expect(201);

    person.id = response.body.id;

    expect(uuidv.validate(response.body.id)).toBeTruthy();
    expect(response.body).toEqual(person);

    const newItem = await request(server).get(`/person/${person.id}`);
    expect(newItem.body).toEqual(person);
  });

  test('should person remove', async () => {
    await request(server).delete(`/person/${person.id}`).expect(STATUS.deleted);

    await request(server).get(`/person/${person.id}`).expect(STATUS.notFound);
  });
});
