const request = require('./request');

function makeApi(defaultOpt, opt) {
  return request(Object.assign({}, defaultOpt, opt))
}

module.exports = {
  /**
   *
   * @param opt
   */

  getStudent: opt => makeApi({ url: '/api/get-student' }, opt),

  /**
   *
   * @param opt
   */
  getSchoolGroupByCountry: opt => makeApi({ url: '/api/get-school-group-by-country' }, opt),

  /**
   *
   * @param opt
   */
  createSchool: opt => makeApi({
    url: '/api/school/create',
    type: 'POST'
  }, opt),

  getAllCountry: opt => makeApi({
    url: '/open-api/geo/get-all-countrys'
  }, opt),

  getProvinceByCountry: opt => makeApi({
    type: 'POST',
    url: '/open-api/geo/get-province-by-country'
  }, opt),

  getCityByProvince: opt => makeApi({
    type: 'POST',
    url: '/open-api/geo/get-city-by-province',
  }, opt),

  /**
   * 获取学校详细信息
   */
  getSchoolDetail: opt => makeApi({
    url: '/api/get-school-detail',
  }, opt),

  /**
   * 根据条件获取学校
   * @param opt 参数包括（关键字，国家，省/州，城市Id）
   */
  getSchoolByCondition: opt => makeApi({ url: '/api/get-school-by-condition' }, opt),

  /**
   * 创建教授
   * @param opt
   */
  createProfessor: opt => makeApi({
    url: '/api/professor/create',
    type: 'POST'
  }, opt),

  /**
   * 根据学校获取学院信息
   * @param opt
   */
  getCollegeBySchool: opt => makeApi({
    url: '/api/get-college-by-school',
    type: 'POST'
  }, opt),

  /**
   * 创建学校评价
   * @param opt
   */
  createSchoolRate: opt => makeApi({
    url: '/api/school-rate/create',
    type: 'POST'
  }, opt),

};