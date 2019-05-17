var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            res.render("index", { article: dbArticle, comments: dbArticle.comments });
        })
            .catch(function (err) {
                res.json(err);
            })
    })



    app.get("/all", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            res.json(dbArticle)
        })
            .catch(function (err) {
                res.json(err);
            })
    })
}