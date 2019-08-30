const path = require('path');
const fs = require('fs');
// Get the body-parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let mapRoutes = (app) => {
    // home page
    app.get('/',(request,response) => {
        response.sendFile(path.join(__dirname, '..' , 'views','index.html'));
    });

    // About page
    app.get('/about',(request,response) => {
        response.sendFile(path.join(__dirname,'..' , 'views','about.html'));
    });

    // profile page
    app.get('/profile',(request,response) => {
        response.sendFile(path.join(__dirname,'..' , 'views','profile.html'));
    });

    // profile page with query Parameters
    app.get('/profile/:id',(request,response) => {
        // get the profile id from the client
        let profileId = Number.parseInt(request.params.id);

        // read the profiles from profiles.json
        fs.readFile(path.join(__dirname , '..' , 'database' , 'profiles.json'),'utf8',(err , data) => {
            if (err) throw err;
            let profiles = JSON.parse(data);

            // filter the profile with given id
            let selectedProfile = profiles.find(function(profile) {
                return profile.id === profileId;
            });
            console.log(selectedProfile);
        });
        response.sendFile(path.join(__dirname,'..' , 'views','profile.html'));
    });

    // Services page with Query Strings
    app.get('/services',(request,response) => {
        let query = request.query;
        console.log(query);
        response.sendFile(path.join(__dirname,'..' , 'views','services.html'));
    });

    // contact page
    app.get('/contact',(request,response) => {
        response.sendFile(path.join(__dirname,'..' , 'views','contact.html'));
    });

    // Contact Form Submission
    app.post('/feedback', urlencodedParser , (request,response) => {
        let contactForm = request.body;
        console.log(contactForm);
        response.render(path.join(__dirname,'..' , 'views','contact-success.ejs') , {contactForm : contactForm});
    });

    // 404 page
    app.use((request,response) => {
        response.sendFile(path.join(__dirname,'..' , 'views','404.html'));
    });
};

module.exports = {
    mapRoutes
};