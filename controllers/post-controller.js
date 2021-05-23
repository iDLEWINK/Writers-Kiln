const db = require(`../models/db.js`);
const Post = require(`../models/post-model.js`);
const User = require(`../models/user-model.js`);
const ObjectId = require(`mongodb`).ObjectID;

const multer = require(`multer`);
const path = require('path');
const fs = require(`fs`);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/images`);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const postController = {

    getCreatePost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        res.render(`create-post`);
    },

    uploadPostImage: function(req, res, next) {
        return upload.single('media')(req, res, function () {
            next()
        });
    },

    postCreatePost: function (req, res) {

        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        var post = {
            title: req.body.title,
            userID: req.session.userID,
            tags: new Array()
        };

        // Tags
        var rawTags = req.body.tags.toLowerCase().split(" ");
        for(var i = 0; i < rawTags.length; i++) {
            if(rawTags[i] != "")
                post.tags.push(rawTags[i]);
        }

        //GenContent
        if(req.body.genContent) {
            post.general = req.body.genContent;
        }

        //PlotContent
        if(req.body.plotContent || req.body.charContent || req.body.settingContent) {
            post.plot = req.body.plotContent;
            post.characters = req.body.charContent;
            post.setting = req.body.settingContent;
        }

        //MediaContent
        if (req.file) {

            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');

            post.media = {
                data: Buffer.from(encode_image, 'base64'),
                contentType: req.file.mimetype
            }
        };

        db.insertOne(Post, post, function(result) {
            console.log("ID IS THIS: " + result._id);
            if (result)
                res.redirect(`/post/` + result._id);
        });
    },

    getEditPost: function (req, res) {
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                if(result.plot || result.characters || result.setting) {
                    res.locals.story = true;
                }
                res.render(`edit-post`, result);
            } else {
                // TODO: add page not found page?
            }
        });
    },

    postEditPost: function (req, res) {
        var post = {
            title: req.body.title,
            tags: new Array()
        };

        console.log(`TITLE IS: ` + req.body.title);

        // Tags
        var rawTags = req.body.tags.toLowerCase().split(" ");
        for(var i = 0; i < rawTags.length; i++) {
            if(rawTags[i] != "")
                post.tags.push(rawTags[i]);
        }

        console.log(`TAGS ARE: ` + rawTags);

        //GenContent
        if(req.body.genContent) {
            post.general = req.body.genContent;
        }

        //PlotContent
        if(req.body.plotContent || req.body.charContent || req.body.settingContent) {
            post.plot = req.body.plotContent;
            post.characters = req.body.charContent;
            post.setting = req.body.settingContent;
        }

        //MediaContent
        if (req.file) {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');

            post.media = {
                data: Buffer.from(encode_image, 'base64'),
                contentType: req.file.mimetype
            }
        }

        db.updateOne(Post, {_id: new ObjectId(req.params.postID)}, {$set: post}, function(result){
            if(result) {
                res.redirect(`/post/` + req.params.postID);
            } else {
                console.log(`Page not found`);
            }
        });
    },

    getDeletePost: function(req, res) {
        db.deleteOne(Post, {_id: new ObjectId(req.params.postID)}, function(result){
            if (result) {
                res.redirect(`/feed`);
            } else {
                ;
                // page not found
            }
        });
    },

    getPost: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }
        db.findOne (Post, {_id: new ObjectId(req.params.postID)}, function(result) {
            if (result) {
                res.locals.post = result;

                db.findOne(User, {_id: new ObjectId(result.userID)}, function (result) {
                    res.locals.post.username = result.username;
                    res.render(`post`);
                });
            } else {
                // TODO: add page not found page?
            }
        });
    },

    updatePostUpvote: function(req, res) {
        if(req.session.userID) {
            db.findOne(Post, {_id: new ObjectId(req.query.postID)}, function(result) {

                var status = {};

                var postID = req.query.postID;
                var userID = req.session.userID;

                if (result.upvotes.includes(userID)) { //upvote is activated
                    status.upvote = true;

                    //decrease upvote counter
                    db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {upvotes: userID}}, function(){});
                } else { //upvote is not activated
                    status.upvote = false;

                    if (result.downvotes.includes(userID)) { //downvote is activated
                        status.downvote = true;

                        //increase upvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {upvotes: userID}}, function(){});

                        //decrease downvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {downvotes: userID}}, function(){});
                    } else { //downvote is not activated
                        status.downvote = false;

                        //increase upvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {upvotes: userID}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    updatePostDownvote: function(req, res) {
        if(req.session.userID) {
            db.findOne(Post, {_id: new ObjectId(req.query.postID)}, function(result) {

                var status = {};

                var postID = req.query.postID;
                var userID = req.session.userID;

                if (result.downvotes.includes(userID)) { //downvote is activated
                    status.downvote = true;

                    //decrease downvote counter
                    db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {downvotes: userID}}, function(){});
                } else { //downvote is not activated
                    status.downvote = false;

                    if (result.upvotes.includes(userID)) { //upvote is activated
                        status.upvote = true;

                        //increase downvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {downvotes: userID}}, function(){});

                        //decrease upvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$pull: {upvotes: userID}}, function(){});
                    } else { //upvote is not activated
                        status.upvote = false;

                        //increase downvote counter
                        db.updateOne(Post, {_id: new ObjectId(postID)}, {$push: {downvotes: userID}}, function(){});
                    }
                }
                res.send(status);
            });
        }
    },

    checkPostVotes: function(req, res) {

        if (req.session.userID) {
            var query = {
                $or: [
                    {upvotes: {$in: [req.session.userID]}},
                    {downvotes: {$in: [req.session.userID]}}
                ]
            }

            if (req.query.postID) {
                query._id = new ObjectId(req.query.postID);
            }

            db.findMany(Post, query, function(result) {
                var userID = req.session.userID;
                var upvotes = [];
                var downvotes = [];

                for (var i = 0; i < result.length; i++) {
                    if (result[i].upvotes.includes(userID)) {
                        upvotes.push(result[i]);
                    } else if (result[i].downvotes.includes(userID)) {
                        downvotes.push(result[i]);
                    }
                }
                res.send({upvotes: upvotes, downvotes: downvotes})
            });
        }
    }
}

module.exports = postController;
