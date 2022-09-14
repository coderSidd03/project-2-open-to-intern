const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');


const app = express();

app.use(bodyParser.json());


app.use('/', route);

mongoose.connect("mongodb+srv://DipaliBohara:80761668@cluster0.4wyyohq.mongodb.net/dipaliProject2"
, {
   useNewUrlParser: true 
}
).then( () => {console.log("MongoDb is connected")})
.catch( err => console.log(err))


app.listen(process.env.PORT || 3000, () => {
    console.log('express app started on the port ' + (process.env.PORT || 3000))
});