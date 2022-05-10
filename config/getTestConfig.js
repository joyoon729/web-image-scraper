module.exports = () => {
  return {
    target: 'https://naver.com/',
    options: {
      depth: 1,
      wait: 500,
      'no-cache': true
    }
  }
}