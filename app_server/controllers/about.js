var fs = require('fs');
var aboutData = JSON.parse(fs.readFileSync('./data/about.json', 'utf8'));

/* GET about view */
const about = (req, res) => {
    res.render('about', { title: "Travlr Getaways", aboutData});
};

module.exports = {
    about
}