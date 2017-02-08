var express = require('express');
var app = express();

var fs = require("fs");

var multer = require('multer');
var upload = multer({dest: './uploads/'});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fanspotWalkingSkeletonDb');
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
    app.listen(3000);
}
