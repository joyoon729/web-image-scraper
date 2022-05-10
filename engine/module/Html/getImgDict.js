module.exports = (dom) => {
  const imgs = dom.querySelectorAll('img');
  const imgSrcArr = imgs.map(img => img.attrs.src.split('?')[0]);
  const imgDict = Object.fromEntries(imgSrcArr.map(src => [src, true]))
  return imgDict;
}