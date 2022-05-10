const axios = require('axios');
const { parse } = require('node-html-parser');

module.exports = async (url) => {
  const { data } = await axios({
    method: 'get',
    url
  })
  const dom = parse(data)

  return dom;
}