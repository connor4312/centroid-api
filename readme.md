#centroid-api

This is a simple API wrapper for Centroid.

## Usage

#### new Centroid(options)

Options:

 - **Required:** `api_key` - The "public" API key given to you by Centroid.
 - **Required:** `private_key` - The shorter, private key the Centroid issued to you.
 - `country` - One of `nl, gb, fr, be, de, se, dk, pl, ru, es, us, it` (current list as of the time of writing) which you are interested in.
 - `lang` - Language to query in. As of writing, it may be any of `nl, en, fr, de, se, dk, pl, ru, es, it`.

#### API Actions
All actions return a [q](https://github.com/kriskowal/q) promise object, which can be used like:

```js
var Centroid = new require('./index'),
    client = new Centroid({api_key:'someKey', private_key:'someSecret'});

client.persons.search({
    fullname: 'Connor Peet',
    set: 'popular'
}).then(function(results){
    console.log('We got results!');
    console.log(results);
}, function (err) {
    console.log('Oh no, an error!');
    throw err;
});
```

All of these return, in their resolved promise, an object generated from parsing the JSON returned by the Centroid API. Reference the documentation linked below for information about these responses.

##### Centroid.[getRate](http://api.centroidmedia.com/methods/global/getCurrentRate.html)(api)

 - `api` Should be the string of the Centroid API you want to get your usage from. Currently, `'persons'` would be the only valid value of this.

##### Centroid.[persons.sources](http://api.centroidmedia.com/methods/persons/getActiveSources.html)()
##### Centroid.[persons.categories](http://api.centroidmedia.com/methods/persons/getCategories.html)()
##### Centroid.[persons.popularSearches](http://api.centroidmedia.com/methods/persons/getPopularSources.html)()
##### Centroid.[persons.search](http://api.centroidmedia.com/methods/persons/search.html)(person)

 - `person` should be an object containing properties used to search. From the Centroid docs:
 	- `firstname` The firstname you want to search for. Either this or fullname is required.
 	- `lastname` The lastname you want to search for.
 	- `fullname` The fullname you want to search for. Either this or firstname is required.
 	- `source` Which sources to use for searching. Either this or set is required.
 	- `set` Which set to use for searching (can be popular or all, popular is the default). Either this or source is required.