const fs = require('fs');

/**
 *
 * @param {string} path - the path to the json file used as database
 * @param {boolean} isStatic - define if the file must be statically or dynamically
 * @param {object|int} delay - add a fake delay to the request
 */
module.exports = function germaine(path, { isStatic, delay } = {}) {
  let database;

  // Check that the path is defined
  if (typeof path !== 'string') {
    throw new Error('germaine error: you must provide the path to the file used as database.');

  }


  // Check that the path is a string
  if (typeof path !== 'string') {
    throw new Error('germaine error: the path must be a string.');
  }

  // Compute delay correctly
  delay = typeof delay === 'object'
    ? delay
    : { min: delay || 0, max: delay || 0 };

  // Try to read the file a first time
  try {
    database = JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(err);
  }

  return ({ url }, res) => {

    if (url.includes('?')) {
      url = url.split('?')[0];
    }

    // If the api should not be static, we must read the file at each call
    if (isStatic !== false) {
      try {
        database = JSON.parse(fs.readFileSync(path, 'utf8'));
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error: {
            message: 'germaine error : cannot read the file ' + path,
            status: 500,
            name: 'general error',
          },
        });
      }
    }

    // This function resolves the right database segment from the url path
    const resolveDataFromPath = (string = '') => {
      const path = string.split('/');
      let res    = Object.assign({}, database);

      path.map(s => {
        res = (res && res[s]
            ? res[s]
            : undefined
        );
      });
      return res;
    };

    // Get a random number, used to simulated latency
    const getRandom = (min, max) => (Math.random() * (max - min) + min);

    // Clean the url
    url = url.replace(/\/$/, '').replace(/^\/+/g, '');
    url = url.substring(url.indexOf('/') + 1);

    // Get results from the path
    const result = resolveDataFromPath(url);

    // Resolve the results
    if (result) {
      setTimeout(() => {
        res.json(result);
      }, getRandom(delay.min, delay.max));
    } else {
      res.status(404).json({
        error: {
          message: 'Sorry, we didn\'t find this. What\'s it called again? 404?',
          status: 404,
          name: 'not found',
        },
      });
    }

  };
};

