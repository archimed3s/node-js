export function cookie(req, res, next) {
  // ToDo: Here should be cookie parsing
  // and set to prop
  req.parsedCookies = {};
  next();
};