module.exports = (originalDict, newDict) => {
  if (typeof originalDict !== 'object' || typeof newDict !== 'object') {
    console.log(originalDict, newDict);
    throw new TypeError('originalDic or newDict is not object')
  }

  for (depthOfNew in newDict) {
    if (!originalDict[depthOfNew]) originalDict[depthOfNew] = {};
    for (depthOfOriginal in originalDict) {
      if (depthOfOriginal === depthOfNew) {
        originalDict[depthOfOriginal] = {
          ...newDict[depthOfNew],
          ...originalDict[depthOfOriginal]
        }
      }
    }
  }
}