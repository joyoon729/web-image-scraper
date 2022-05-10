module.exports = (config) => {
  const argv = process.argv.slice(2);
  try {
    if (process.env.NODE_ENV === 'test') return setupTestArgv();
    if (argv.length === 0) throw new InsufficientArgsError();

    config.target = getTarget(argv);
    config.options = { ...config.options, ...getOptions(argv) };
    return config
  } catch (err) {
    if (err instanceof InsufficientArgsError) console.log(err.hint);
    if (err instanceof InvalidTargetError) console.log(err.hint);
    if (err instanceof NegativeNumberError) console.log(err.hint);
    if (err instanceof UnexpectOptionError) console.log(err.hint);
  }
}

const getOptions = (argv) => {
  const options = argv.filter(arg => arg[0] === '-' && arg[1] === '-');
  const optionObject = Object.fromEntries(options.map(option => {
    let parsedOption = option.slice(2).split('=');
    if (parsedOption[1]) {
      return parsedOption
    } else {
      return [parsedOption[0], true]
    }
  }));
  isValidOptions(optionObject);
  return optionObject;
}

const isValidOptions = (options) => {
  for (let option in options) {
    switch (option) {
      case 'no-cache':
        break;
      case 'depth':
      case 'wait':
        if (!isNaN(options[option])) {
          if (options[option] < 0) throw new NegativeNumberError();
          else break;
        }
      default:
        throw new UnexpectOptionError();
    }
  }
}

const getTarget = (argv) => {
  let target;

  const candidates = argv.filter(arg => arg[0] !== '-' && arg[1] !== '-');
  if (candidates.length === 0) throw new InsufficientArgsError();

  for (let candi of candidates) {
    try { target = new URL(candi).href; } catch { }
  }
  if (!target) throw new InvalidTargetError();

  return target;
}

class InsufficientArgsError extends Error {
  constructor() {
    super('There must be at least one arguments.');
    this.name = 'InsufficientArgsError';
    this.hint = `
    Usage: node app.js [options?] <url_you_want_to_scrap>
    `
  }
}

class InvalidTargetError extends Error {
  constructor() {
    super('Target is not url format.');
    this.name = 'InvalidTargetError';
    this.hint = `
    Target url format: 'http(s)://<target_url>/'
    `
  }
}

class UnexpectOptionError extends Error {
  constructor() {
    super('There is unexpect option.');
    this.name = 'UnexpectOptionError';
    this.hint = `
    Available options:
      --depth=<number> : dig through found link up to <number> times.
      --wait=<number> : wait per <ms> milliseconds after each searching.
      --no-cache : search without cached data.
    `
  }
}

class NegativeNumberError extends Error {
  constructor() {
    super('Require only positive number.');
    this.name = 'NegativeNumberError';
    this.hint = `
    Require only positive number.
    `
  }
}