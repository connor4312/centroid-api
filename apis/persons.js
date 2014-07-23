function Persons (centroid) {
    this.centroid = centroid;
}

Persons.prototype.request = function (endpoint, params) {
    return this.centroid.request('persons', endpoint, params);
};

Persons.prototype.search = function (params) {
    return this.request('search', params);
};

Persons.prototype.sources = function () {
    return this.request('getActiveSources');
};

Persons.prototype.categories = function () {
    return this.request('getCategories');
};


Persons.prototype.popularSearches = function () {
    return this.request('getPopularSources');
};

module.exports = Persons;