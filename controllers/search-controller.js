const db = require(`../models/db.js`);
const User = require(`../models/user-model.js`);
const Post = require(`../models/post-model.js`);
const ObjectId = require(`mongodb`).ObjectID;

const searchController = {

    getPosts: function(req, res, next) {

        var query = {};

        if (req.query.keyword) {
            query.$or = [
                {title: {$regex: req.query.keyword, $options: `$i`}},
                {general: {$regex: req.query.keyword, $options: `$i`}},
                {plot: {$regex: req.query.keyword, $options: `$i`}},
                {characters: {$regex: req.query.keyword, $options: `$i`}},
                {setting: {$regex: req.query.keyword, $options: `$i`}},
            ]
        }

        if (req.query.username) {
            query.username = req.query.username;
        }

        if (req.query.tags) {
            var tags = [];
            var rawTags = req.query.tags.toLowerCase().split(" ");
            for(var i = 0; i < rawTags.length; i++) {
                if(rawTags[i] != "")
                    tags.push(rawTags[i]);
            }
            query.tags = {$in: Object.values(tags)};
        }

        db.findMany(Post, query, function(result) {
            res.locals.matched_posts = result;

            res.locals.matched_posts.forEach(function (post) {
                db.findOne(User, {_id: new ObjectId(post.userID)}, function (result) {
                    if (result) {
                        post.username = result.username;
                    }
                });
            });

            next();
        });
    },

    getUsers: function(req, res, next) {

        var query = {
            $or: []
        };

        if (req.query.keyword) {
            query.$or.push({fullname: {$regex: req.query.keyword, $options: `$i`}});
            query.$or.push({username: {$regex: req.query.keyword, $options: `$i`}});
        }

        if (req.query.username) {
            query.$or.push({username: {$regex: req.query.username, $options: `$i`}});
        }

        if (query.$or.length == 0) {
            query.$or.push({});
        }

        db.findMany(User, query, function(result) {
            res.locals.matched_users = result;
            next();
        });
    },

    getTags: function(req, res, next) {
        var query = {};
        var tags = [];

        if (req.query.keyword) {
            var rawTags = req.query.keyword.toLowerCase().split(" ");
            for(var i = 0; i < rawTags.length; i++) {
                if(rawTags[i] != "")
                    tags.push(rawTags[i]);
            }
        }

        if (req.query.tags) {
            var rawTags = req.query.tags.toLowerCase().split(" ");
            for(var i = 0; i < rawTags.length; i++) {
                if(rawTags[i] != "")
                    tags.push(rawTags[i]);
            }
        }

        query.tags = {$in: Object.values(tags)};

        if (tags.length == 0) {
            query = {};
        }

        db.findMany(Post, query, function(result) {

            var result_tags = [];

            for (var i = 0; i < result.length; i++) {
                result_tags = result_tags.concat(result[i].tags);
            }

            result_tags.sort();

            var unique_tags = [];
            var previous;
            for (var i = 0; i < result_tags.length; i++) {
                if (result_tags[i] != previous) {
                    unique_tags.push(result_tags[i]);
                }
                previous = result_tags[i];
            }

            filtered_tags = unique_tags.filter(function(tag) {
                return tags.includes(tag);
            });

            if (tags.length == 0) {
                res.locals.matched_tags = unique_tags;
            } else {
                res.locals.matched_tags = filtered_tags;
            }

            next();
        });
    },

    getSearchResults: function(req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.locals.search_query = "Keyword: " + req.query.keyword;

        if (req.query.username) {
            res.locals.search_query += " Username: " + req.query.username;
        }

        if (req.query.tags) {
            res.locals.search_query += " Tags: " + req.query.tags;
        }

        res.render(`search-results`);
    },

    getAdvancedSearch: function (req, res) {
        if (req.session.username) {
            res.locals.username = req.session.username;
        }

        res.render(`advanced-search`);
    }
}

module.exports = searchController;
