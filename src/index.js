const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');


const app = express();

app.use(bodyParser.json());


app.use('/', route);


app.listen(process.env.PORT || 3000, () => {
    console.log('express app started on the port ' + (process.env.PORT || 3000))
});