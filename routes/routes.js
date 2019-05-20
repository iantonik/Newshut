const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");


module.exports = function (app) {
  app.get("/", function (req, res) {
    axios.get("https://www.rawstory.com/").then(function (response) {

      let $ = cheerio.load(response.data);

      let results = [];

      $('ul.slides li').each(function (i, element) {
        let title = $(element).find('h2.gdl-slider-title').text();
        let link = $(element).find('a').attr('href');
        let image = $(element).find('img').attr('src')

        results.push({
          title: title,
          link: link,
          image: image
        });
      });

      db.Article.find({}).then(function (dbArticles) {
        res.render("index", { scrapedArticles: results, savedArticles: dbArticles });
      })
        .catch(function (err) {
          res.json(err);
        })

    });
  });


  app.post("/save-article", function (req, res) {
    let article = req.body;

    db.Article.create(article)
      .then(function (dbArticle) {
        console.log(dbArticle);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  app.delete("/del_com/:id", function (req, res) {
    let articleId = req.body.articleId;
    let commentId = req.params.id;
    var result = db.Article.updateOne(
      { '_id': articleId },
      { '$pull': { 'comments': { '_id': commentId } } },
      { safe: true },
      function removeCommentCb(err, obj) {
        console.log(obj);
      }
    );
  })

  app.delete("/del_art/:id", function(req, res){
    db.Article.findByIdAndRemove(req.params.id, function (err, deleted){
        if(err){
            res.send(err)
        } else {
            res.json(deleted)
        }
    });
});

app.post("/article/:id", function (req, res) {
  db.Article.updateOne(
      {'_id': req.params.id},
      {$push: {'comments': req.body}}
  ).then(function (dbComment) {
          res.json(dbComment)
      })
      .catch(function (err) {
          // If an error occurred, send it to the client
          res.json(err);
      });
});
};
