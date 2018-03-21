const request = require('./request');

module.exports = {
  getStudent: opt => request(Object.assign({}, { url: '/api/get-student' }, opt)),
  getSchoolGroupByCountry: opt => request(Object.assign({}, { url: '/api/get-school-group-by-country' }, opt)),
  createSchool: opt => request(Object.assign({}, {
    url: '/api/school/create',
    type: 'POST'
  }, opt)),

  getAllCountry: opt => request(Object.assign({}, {
    url: '/open-api/geo/get-all-countrys'
  }, opt)),

  /**
   *
   * @param countryId
   */
  getProvinceByCountry: ({ countryId }) => request({
    type: 'POST',
    url: '/open-api/geo/get-province-by-country',
    body: {
      country_id: countryId
    }
  }),

  getCityByProvince: ({ provinceId }) => request({
    type: 'POST',
    url: '/open-api/geo/get-city-by-province',
    body: {
      province_id: provinceId
    }
  }),

  /**
   * 获取学校详细信息
   * @param schoolId 学校id
   */
  getSchoolDetail: ({schoolId}) =>  request({
    type: 'GET',
    url: '/api/get-school-detail',
    body: {
      school_id: schoolId
    }
  }),

};