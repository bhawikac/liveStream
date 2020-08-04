
var _Environments = {
    production: { BASE_URL: 'https://wexer.exerp.com//', API_KEY: '1234123412341234', API_SECRET: '573572796441127398913495789868468206481' },
    test: { BASE_URL: 'https://wexer.exerp.com//', API_KEY: '1234123412341234', API_SECRET: '573572796441127398913495789868468206481' },
    development: { BASE_URL: "https://ff-int.api.wexer.com/", API_KEY: '1234123412341234', API_SECRET: '573572796441127398913495789868468206481' },
}

function getEnvironment() {
    var platform =    'development' //getPlatform();

return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment 
