const request = require('supertest');
const uuidv = require('uuid');
const { STATUS } = require('../src/entities/constants');
require('dotenv').config();

describe('e2e API test', () => {
  const server = `http://localhost:${process.env.PORT || 3030}`;
  let testItemId;

  test('should be persons array', async () => {
    const response = await request(server).get('/person');
    expect(response.body).toEqual([]);
  });

  test('should create person', async () => {
    const person = {
      name: 'Vi',
      age: '23',
      hobbies: ['enduro', 'snowboadring'],
    };

    const response = await request(server)
      .post('/person')
      .send(person)
      .expect(201);

    person.id = response.body.id;
    testItemId = response.body.id;

    expect(uuidv.validate(response.body.id)).toBeTruthy();
    expect(response.body).toEqual(person);

    const newItem = await request(server).get(`/person/${testItemId}`);
    expect(newItem.body).toEqual(person);
  });

  test('should be err (invalid hobbies)', async () => {
    const person = {
      name: 'Vi',
      age: '23',
      hobbies: 'snowboadring',
    };

    await request(server).post('/person').send(person).expect(STATUS.notValid);
  });

  test('should be err (invalid age)', async () => {
    const person = {
      name: 'Vi',
      age: '2w',
      hobbies: ['snowboadring'],
    };

    await request(server).post('/person').send(person).expect(STATUS.notValid);
  });

  test('should person change', async () => {
    const person = {
      name: 'testName',
      age: '23',
      hobbies: ['snowboadring'],
    };
    const response = await request(server)
      .put(`/person/${testItemId}`)
      .send(person)
      .expect(200);

    person.id = testItemId;

    expect(response.body).toEqual(person);
  });

  test('should person remove', async () => {
    await request(server)
      .delete(`/person/${testItemId}`)
      .expect(STATUS.deleted);

    await request(server).get(`/person/${testItemId}`).expect(STATUS.notFound);
  });
});
