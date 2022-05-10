const assert = require('assert');
const fs = require('fs');

fs.readFile('storage/searched-list.json', (err, data) => {
  if (err) return console.log(err);
  const list = JSON.parse(data);
  tmp = {};
  for (url in list) {
    for (img in list[url]['images']) {
      if (!tmp[img]) tmp[img] = 1;
      else tmp[img] += 1;
    }
  }

  for (url in tmp) {
    if (tmp[url] === 1) {
      delete tmp[url];
    }
  }

  console.log('1개 이상 저장된 이미지 리스트');
  console.log(tmp);
  console.assert(Object.keys(tmp).length === 0, '!!! 1개 이상 저장된 이미지가 존재합니다.')
})

