const express = require('express');
const app = express();
const router = require('./router/appRouting');

const hostname = '127.0.0.1';
const port = 3000;

// Use static files middleware
app.use('/public',express.static('public'));

// use ejs Template Engine
app.set('view engine', 'ejs');

// Application Routing
router.mapRoutes(app);

app.listen(port,hostname, () => {
    console.log(`Server is Started at http://${hostname}:${port}`);
});
