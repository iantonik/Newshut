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

}
