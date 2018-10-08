const axios = require("axios");

const ICD_API_URL = "http://api-icd-10-triomed.loelsonk.usermd.net/api/find?q=";
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=demo-lukaszLOLXD";

// Documentation http://reduxblog.herokuapp.com/

module.exports.fetchPosts = function() {
  return axios
    .get(`${ROOT_URL}/posts${API_KEY}`)
    .then(response => response.data);
};

/**
 * {
    title: description
    categories: field,
    content: comment
  }
 */
module.exports.createPost = function(values) {
  return axios
    .post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(response => response.data);
};
module.exports.fetchPost = function(id) {
  return axios
    .get(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(response => response.data);
};

module.exports.deletePost = function(id) {
  return axios
    .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(response => response.data);
};

// Add here ICD10
module.exports.fetchIcd10 = function(value) {
  return axios.get(`${ICD_API_URL}${value}`).then(response => response.data);
};
