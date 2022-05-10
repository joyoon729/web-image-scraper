module.exports = (scrapDict, imgDict) => {
  let notDuplicatedDict = {};
  for (img in imgDict) {
    if (isNotDuplicated(scrapDict, img)) {
      notDuplicatedDict[img] = true;
    }
  }
  return notDuplicatedDict;
}

const isNotDuplicated = (scrapDict, img) => {
  for (depth in scrapDict) {
    for (url in scrapDict[depth]) {
      if (scrapDict[depth][url]['images'][img]) return false;
    }
  }
  return true;
}