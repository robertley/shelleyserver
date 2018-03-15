const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');

const store = require('./store')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createEvent', (req, res) => {
  store
    .createEvent({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      image: req.body.image,
      city: req.body.city,
      cause: req.body.cause,
      link: req.body.link,
      contact: req.body.contact
    })
    .then(() => {
      //res.addHeader('Access-Control-Allow-Origin: *')
      res.sendStatus(200)
    })
})
app.get('/getEvents/NewYorkCity', (req, res) => {
    // store.getEvents({
    //   cityId: 1
    // })
    // .then(() => {
    //   res.send("hello world")
    // })  
    console.log("Grabbing events...")

    var connection = mysql.createConnection({
      host     : 
      user     : 
      password : 
      port     : 
    })

    connection.connect(function(err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return
      }
      console.log('Connected to database.')}
    )
    
    var sql = `SELECT * FROM shelleysite.events WHERE city = 1`
    console.log(sql)
    connection.query(sql, function (err, result) {
      if (err) throw err
      console.log("Succesfully grabbed events.")
      res.send(result)
    })

    connection.end()
})

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080')
})