const engine = require('./engine');
const config = require('./config');

const main = () => {
  engine(config)
}

main();


/**
 * TODO:
 * - [ ] scrapDict depth 별로 나눌 필요 있음. depth arg 증가시킬 때 skip 하지 않게.
 * - [ ] url caching
 */