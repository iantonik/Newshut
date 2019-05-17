const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");


module.exports = function (app) {
  app.get("/scrape", function (req, res) {
    axios.get("https://www.rawstory.com/").then(function (response) {

      let $ = cheerio.load(response.data);

      let results = [];

      // let articles = $('ul.slides');

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

      db.Article.create(results)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err);
        });


      res.send("Scrape Complete");

    });
  });

}





// module.exports = function (app){
//     app.get("/scrape", function(req, res) {
//         // First, we grab the body of the html with axios
//         axios.get("http://www.echojs.com/").then(function(response) {
//           // Then, we load that into cheerio and save it to $ for a shorthand selector
//           var $ = cheerio.load(response.data);

//           // Now, we grab every h2 within an article tag, and do the following:
//           $("article h2").each(function(i, element) {
//             // Save an empty result object
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//               .children("a")
//               .text();
//             result.link = $(this)
//               .children("a")
//               .attr("href");

//             // Create a new Article using the `result` object built from scraping
//             db.Article.create(result)
//               .then(function(dbArticle) {
//                 // View the added result in the console
//                 console.log(dbArticle);
//               })
//               .catch(function(err) {
//                 // If an error occurred, log it
//                 console.log(err);
//               });
//           });

//           // Send a message to the client
//           res.send("Scrape Complete");
//         });
//       });

// }

