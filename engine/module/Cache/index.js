const cache = {
  url: {},
  image: {}
}

const isHitCache = (space, data) => {
  if (!cache[space]) {
    const err = new Error('Invalid Cache Space');
    err.name = 'InvalidCacheSpaceError';
    throw err;
  }

  if (cache[space][data]) return true;  // cache hit
  else {
    cache[space][data] = true;  // set cache
    return false;
  }
}

module.exports = {
  isHitCache
}