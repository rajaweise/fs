var expect = require("chai").expect;
var request = require("request");
var fs = require("fs");
var HTTPStatus = require('http-status');

var urlRoot = "http://localhost:3000/";
var contestEntry = {
    name: 'Wildlife.wmv',
    path: './content/Wildlife.wmv'
};

describe('Walking Skeleton', function() {
    describe('Entering Contest Entries', function() {
        var url = urlRoot;
        it('can store contest entry into the db', function () {
            fs.createReadStream(contestEntry.path).pipe(request.post(url));
        });
        it('returns a 200 status code', function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(HTTPStatus.OK);
                done();
            });
        });
    });
    describe('Returning Contest Entries', function() {
        var url = urlRoot + contestEntry.name;
        it('can return contest entry from the db', function() {
            request.get(url)
                .on('response', function (error, response, body) {

                });
        });
        it('returns a 200 status code', function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(HTTPStatus.OK);
                done();
            });
        });
    });
});