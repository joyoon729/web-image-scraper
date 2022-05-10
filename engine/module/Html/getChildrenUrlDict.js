const config = require('../../../config');
const { isHitCache } = require('../Cache');

module.exports = (dom, depth) => {
  if (isNaN(depth)) throw new TypeError('depth must be a number');

  aTags = dom.querySelectorAll('a');
  const urls = aTags
    .filter(a => {
      // # anchor 갖는 링크 제외 
      // 외부 주소로 빠지는 링크 제외 ex) https://~
      // TARGET_URL로 빠지는 링크 제외
      const href = a.attrs.href;

      return (
        href &&
        !href.includes('#') &&
        href[0] === '/' &&
        href !== '/'
      );
    })
    .map(a => {
      return { href: a.attrs.href, text: a.innerText }
    })

  const urlDict = Object.fromEntries(
    urls
      .map(({ href, text }) => {
        const url = new URL(href, config.target).href;
        return [url, { checked: false, text, images: {} }]
      })
      .filter(entry => {
        // cache hit 아닐 경우만 urlDict에 추가
        return !isHitCache('url', entry[0])
      })
  )
  return { [depth + 1]: urlDict };
}
