const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

// Public/frontend files are setup
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true })); // extended: true lets you send arrays/objects through form data
app.use(bodyParser.json());

// Setup API routes
require('./routes/api_routes')(app);

// Load index view
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

app.listen(port, () => console.log(`Listening on port ${port}`));