const { getDom, getChildrenUrlDict, getImgDict } = require('./module/Html');
const getNotDuplicatedImgDict = require('./module/ScrapDict/getNotDuplicatedImgDict')
const { loadProgress, generateHtml, saveProgress } = require('./module/Storage');
const exitHandler = require('./module/ExitHandler');
const { updateScrapDict } = require('./module/ScrapDict');
const config = require('../config');

let scrapDict = {};

const sleep = ms => new Promise(res => setTimeout(res, ms))

const traversal = async (url, depth = 0) => {
  if (depth > config.options.depth) return;

  console.log(`검색 중\t> depth ${depth} ) ${url}`)
  const dom = await getDom(url);

  const imgDict = getImgDict(dom);
  const childrenUrlDict = getChildrenUrlDict(dom, depth);

  const notDuplicatedImgDict = getNotDuplicatedImgDict(scrapDict, imgDict);
  scrapDict[depth][url]['images'] = notDuplicatedImgDict;

  updateScrapDict(scrapDict, childrenUrlDict);

  depth++;
  for (url in scrapDict[depth]) {
    if (!scrapDict[depth][url]['checked']) {
      scrapDict[depth][url]['checked'] = true;  // 검색 했음을 marking
      await traversal(url, depth);
      await sleep(config.options.wait);
    }
  }
}

module.exports = async () => {
  // bind exit handler
  process.on('SIGINT', exitHandler.bind(null, { dict: scrapDict }));
  process.on('SIGUSR1', exitHandler.bind(null, { dict: scrapDict }));
  process.on('SIGUSR2', exitHandler.bind(null, { dict: scrapDict }));
  process.on('uncaughtException', exitHandler.bind(null, { dict: scrapDict }));

  console.log(`준비\t> Host: ${config.target}\tMaximum Depth: ${config.options.depth}`)

  if (!config.options['no-cache']) {
    try {
      updateScrapDict(scrapDict, await loadProgress());
      console.log('준비\t> 기존 저장된 리스트를 불러옵니다.')
    } catch (err) {
      console.log(err);
    }
  }

  try {
    if (!scrapDict[0]) scrapDict[0] = { [config.target]: { checked: true, text: 'Home', images: {} } }
    await traversal(config.target);
  } catch (err) {
    console.log(err);
  }

  // write scrapped images to html
  delete scrapDict[parseInt(config.target) + 1]
  saveProgress(scrapDict);
  generateHtml(scrapDict);
  console.log('완료\t> 전체 리스트로 HTML을 생성합니다.')
}