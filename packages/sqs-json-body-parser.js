module.exports = (opts = {}) => {
  const safeParse = rawBody => {
    let body = rawBody;

    try {
      body = JSON.parse(rawBody, opts.reviver);
    } catch (err) {
      if (opts.handleError && typeof opts.handleError === 'function') {
        body = opts.handleError(err, rawBody);
      }
    }

    return body;
  };

  return {
    before: (handler, next) => {
      const { event: { Records = [] } = { Records: [] } } = handler || {};

      Records.forEach(record => {
        // eslint-disable-next-line no-param-reassign
        record.body = safeParse(record.body);
      });

      next();
    }
  };
};

// const defaultReviver = (_key, value) => {
//   return value;
// };

// const defaultSafeParse = body => {
//   try {
//     return JSON.parse(body);
//   } catch (err) {
//     return body;
//   }
// };

// const sqsJsonBodyParserBefore = ({ reviver, safeParse }) => (handler, next) => {
//   const { event: { Records = [] } = { Records: [] } } = handler || {};

//   Records.forEach(record => {
//     // eslint-disable-next-line no-param-reassign
//     record.body = safeParse(record.body, reviver);
//   });

//   next();
// };

// const middleware = ({ reviver = defaultReviver, safeParse = defaultSafeParse } = {}) => ({
//   before: sqsJsonBodyParserBefore({
//     reviver,
//     safeParse
//   })
// });

// module.exports = middleware;
