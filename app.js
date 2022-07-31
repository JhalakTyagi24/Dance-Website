
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose'); // 1. We have require mongoose in our code
const bodyparser = require("body-parser"); // body-parser is a type of middleware. body-parser install krne k baad humne use require karliya hai 
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); // 2. here we want to create a database of name contactDance
const port = 8000; // 3. Here we have set a port for mongoose

//3. DEFINE MONGOOSE SCHEMA i.e hum ab schema bnaanyenge 
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });

// 4. Ab schema ban chuka hai ab hum ise model mein compile karenge
var Contact = mongoose.model('Contact' , ContactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

//5. ab humre contact par postrequest karne k liye hum ye menthod likhenge niche wala -
app.post('/contact', (req, res)=>{
    // const params = { } // saare postparamenters ko lena hai yaha par
    // res.status(200).render('contact.pug', params); // fir finally unhe database mein save karna hai
    var myData = new Contact(req.body); //6. koi bhi ab agar postrewuest marega to , here it is written k jo bhi request aari hai usme se content extract kr k ek naya contact object bnalo
    myData.save().then(()=>{ //7. ab save isko save karlega lekin sath mein ye promise return karega
    res.send("This item has been saved to the database") // 8. here we have throw statement if it is succesfull
    }).catch(()=>{
    res.status(400).send("item was not saved to the database") //9. If it face any error than it will be shown to client
    });
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

// agar hum express ki madad se post karna chahte hai , post request maarkr database mein save karna chahte hai jo bhi aapki "body" ya "request.body" hai usko , uske liye hume ek module install karna padega or wo hai "body-parser" i.e do "npm install body-parser"  