const request = require('./request');

module.exports = {
  getStudent: opt => request(Object.assign({}, { url: '/api/get-student' }, opt)),
  getSchoolGroupByCountry: opt => request(Object.assign({}, { url: '/api/get-school-group-by-country' }, opt)),
  createSchool: opt => request(Object.assign({}, {
    url: '/api/school/create',
    method: 'POST'
  }, opt)),
};