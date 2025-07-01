var fs = require('fs');
var contactData = JSON.parse(fs.readFileSync('./data/contact.json', 'utf8'));

/* GET contact view */
const contact = (req, res) => {
    res.render('contact', { title: "Travlr Getaways", contactData});
};

module.exports = {
    contact
}