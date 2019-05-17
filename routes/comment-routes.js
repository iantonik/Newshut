var db = require("../models");

module.exports = function (app) {
    app.post("/article/:id", function (req, res) {
        db.Article.updateOne({'_id': req.params.id},{$push: {'comments': req.body}})
            .then(function (dbComment) {
                res.json(dbComment)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    app.delete("/del_art/:id", function(req, res){
        
        db.Article.findByIdAndRemove(req.params.id, function (err, deleted){
            if(err){
                res.send(err)
            } else {
                res.json(deleted)
            }
        })
    })

    // app.delete("/del_com/:id", function (req, res){
    //     db.Article.
    // })



}


