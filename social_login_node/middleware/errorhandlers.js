exports.notFound = function notFound(req, res, next) {
    res.json({
        'result': 'false',
        'status': '404',
        'message': '페이지를 찾지 못하였습니다.'
    })
}

exports.error = function error(err, req, res, next) {
    console.log(err);
    res.json({
        'result': 'false',
        'status': '404',
        'message': '에러'
    })
}