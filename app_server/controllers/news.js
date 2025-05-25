var fs = require('fs');
var sidebar = JSON.parse(fs.readFileSync('./data/news/sidebar.json', 'utf8'));
var content = JSON.parse(fs.readFileSync('./data/news/content.json', 'utf8'));

/* GET news view */
const news = (req, res) => {
    res.render('news', { title: "Travlr Getaways", sidebar, content});
};

module.exports = {
    news
}