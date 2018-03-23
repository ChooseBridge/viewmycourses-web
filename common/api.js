const request = require('./request');

function makeApi(defaultOpt, opt) {
  return request(Object.assign({}, defaultOpt, opt))
}

module.exports = {
  /**
   * 获取所有用户
   * @param opt
   */
  getStudent: opt => makeApi({
    url: '/api/get-student'
  }, opt),

  /**
   * 获取用户信息
   * @param opt
   */
  getStudentMessage: opt => makeApi({
    url: '/api/get-student-message',
  }, opt),

  /**
   * 根据国家获取学校
   * @param opt
   */
  getSchoolGroupByCountry: opt => makeApi({
    url: '/api/get-school-group-by-country'
  }, opt),

  /**
   * 获取所有国家
   * @param opt
   */
  getAllCountry: opt => makeApi({
    url: '/open-api/geo/get-all-countrys'
  }, opt),

  /**
   * 根据国家获取省/州
   * @param opt
   */
  getProvinceByCountry: opt => makeApi({
    type: 'POST',
    url: '/open-api/geo/get-province-by-country'
  }, opt),

  /**
   * 根据省/州获取城市
   * @param opt
   */
  getCityByProvince: opt => makeApi({
    type: 'POST',
    url: '/open-api/geo/get-city-by-province',
  }, opt),

  /**
   * 创建学校
   * @param opt
   */
  createSchool: opt => makeApi({
    type: 'POST',
    url: '/api/school/create',
  }, opt),

  /**
   * 获取学校详细信息
   */
  getSchoolDetail: opt => makeApi({
    url: '/open-api/get-school-detail',
  }, opt),

  /**
   * 根据条件获取学校
   * @param opt 参数包括（关键字，国家，省/州，城市Id）
   */
  getSchoolByCondition: opt => makeApi({
    url: '/api/get-school-by-condition'
  }, opt),

  /**
   * 根据学校获取学院信息
   * @param opt
   */
  getCollegeBySchool: opt => makeApi({
    type: 'POST',
    url: '/api/get-college-by-school',
  }, opt),

  /**
   * 创建学校评价
   * @param opt
   */
  createSchoolRate: opt => makeApi({
    type: 'POST',
    url: '/api/school-rate/create',
  }, opt),

  /**
   * 创建教授
   * @param opt
   */
  createProfessor: opt => makeApi({
    type: 'POST',
    url: '/api/professor/create',
  }, opt),

  /**
   * 获取教授详细信息
   * @param opt
   */
  getProfessorDetail: opt => makeApi({
    url: '/open-api/get-professor-detail',
  }, opt),

  /**
   * 创建教授评价
   * @param opt
   */
  createProfessorRate: opt => makeApi({
    type: 'POST',
    url: '/api/professor-rate/create',
  }, opt),

  /**
   * 根据条件获取教授信息
   * @param opt
   */
  getProfessorByCondition: opt => makeApi({
    url: '/api/get-professor-by-condition',
  }, opt),

  /**
   * 给教授点赞
   * @param opt
   */
  thumbsUpProfessor: opt => makeApi({
    url: '/api/thumbs-up-professor',
  }, opt),

  /**
   * 给教授的点评点赞
   * @param opt
   */
  thumbsUpProfessorRate: opt => makeApi({
    url: '/api/thumbs-up-professor-rate',
  }, opt),

  /**
   * 给教授的点评点踩
   * @param opt
   */
  thumbsDownProfessorRate: opt => makeApi({
    url: '/api/thumbs-down-professor-rate',
  }, opt),

  /**
   * 给学校的点评点赞
   * @param opt
   */
  thumbsUpSchoolRate: opt => makeApi({
    url: '/api/thumbs-up-school-rate',
  }, opt),

  /**
   * 给学校的点评点踩
   * @param opt
   */
  thumbsDownSchoolRate: opt => makeApi({
    url: '/api/thumbs-down-school-rate',
  }, opt),

};