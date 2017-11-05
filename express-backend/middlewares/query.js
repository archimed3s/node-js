export function query(req, res, next) {
  // ToDo: Here should be query parsing
  // and set to prop
  req.parsedQueries = {};
  next();
};