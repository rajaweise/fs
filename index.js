var express = require('express');
var app = express();

var fs = require("fs");

var multer = require('multer');
var upload = multer({dest: './uploads/'});

var mongoose = require('mongoose');

var serverEnvironment = 'Development';
if (serverEnvironment === 'Development') {
    var mongoDbUri = 'mongodb://localhost/fanspotWalkingSkeletonDb';
} else if (serverEnvironment === 'Deployment') {
    var mongoDbUri = 'mongodb://public:da13DA!#@ds029745.mlab.com:29745/heroku_8v18bc3z';
}
mongoose.connect(mongoDbUri);
var conn = mongoose.connection;

var gfs;

var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

var HTTPStatus = require('http-status');

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {
    console.log("we're connected to mongoDB");

    gfs = Grid(conn.db);

    app.get("/", function(req, res) {
       res.status(HTTPStatus.OK); 
    });
//use a reference to the uploaded documents with a different collection for contest entries and uploads
    app.post("/", upload.single('file'), function (req, res, next) {
        var writestream = gfs.createWriteStream({
            filename: req.file.originalname
        });
        var stream = fs.createReadStream("./uploads/" + req.file.filename);
        stream.pipe(writestream).on('finish', function() {
            res.status(HTTPStatus.OK);
            console.log('good job!');
            fs.unlink("./uploads/" + req.file.filename);
        });
    });

    app.get("/file/:filename", function (req, res) {
        var readstream = gfs.createReadStream({filename: req.params.filename});
        readstream.on("error", function (err) {
            console.log(err);
            res.send("No video found with that title");
        });
        readstream.pipe(res);
        console.log(res);
    });

    app.get("delete/:filename", function (req, res) {
         gfs.exist({filename: req.params.filename}, function (err, found) {
            if(err) return res.send(console.log("Error occured"));
            if(found){
                gfs.remove({filename: req.params.filename}, function (err) {
                    if(err) return res.send("error occured");
                    res.send("Image deleted!");
                });
            }
        });
    });
});

app.use(express.static('./public'));

if (!module.parent) {
        if (serverEnvironment === 'Development') {
            app.listen(3000);
        } else if (serverEnvironment === 'Deployment') {
            app.listen(443);
        }
}
