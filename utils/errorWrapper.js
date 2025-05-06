module.exports.errorWrapper = (fn) => (req, res, next) => fn(req, res).catch(next);
