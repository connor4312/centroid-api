var q       = require('q'),
    crypto  = require('crypto'),
    query   = require('querystring'),
    request = require('request');

function Centroid(options) {
    this.host    = 'api.centroidmedia.com';
    this.lang    = 'en';
    this.country = 'us';

    for (var key in options) {
        this[key] = options[key];
    }

    var Persons = require('./apis/persons');

    this.persons = new Persons(this);
}

Centroid.prototype.handleResponse = function (err, response, deferred) {
    if (err) {
        return deferred.reject(err);
    }

    try {
        var data = JSON.parse(response.body);
    } catch (e) {
        return deferred.reject(e);
    }

    if (data.errorCode) {
        return deferred.reject(new Error(data.errorString));
    }

    deferred.resolve(data);
};

Centroid.prototype.request = function (api, endpoint, params) {
    params = params || {};

    params.api_key   = this.api_key;
    params.signature = Math.random().toString();
    params.api_sig   = crypto.createHash('md5').update(this.private_key + params.signature).digest('hex');
    params.lang      = this.lang;
    params.country   = this.country;
    params.format    = 'json';

    var deferred= q.defer(),
        url = 'http://' + api + '.' + this.host + '/' + endpoint + '?' + query.stringify(params);

    request(url, (function(_this) {
        return function (err, response) {
            _this.handleResponse(err, response, deferred);
        }
    })(this));

    return deferred.promise;
};

Centroid.prototype.getRate = function (api) {
    return this.request(api, 'getCurrentRate');
};

module.exports = Centroid;