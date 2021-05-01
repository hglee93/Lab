exports.logger = function(req, res, next) {
    console.log(req.url);
    next();
}