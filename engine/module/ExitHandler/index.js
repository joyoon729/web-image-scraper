const { generateHtml, saveProgress } = require('../Storage');
const config = require('../../../config');

module.exports = async ({ dict }) => {
  delete dict[parseInt(config.options.depth) + 1]
  saveProgress(dict);
  generateHtml(dict);

  console.log('\n중지\t> 현재까지 검색된 리스트로 HTML을 생성합니다.')
  process.exit();
}