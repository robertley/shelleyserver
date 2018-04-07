const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');

const store = require('./store')
var cors = require('cors')
var config = require('./config.json')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())
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
      contact: req.body.contact,
      isPosted: req.body.isPosted
    })
    .then(() => {
      res.sendStatus(200)
    })
})
app.post('/adminEditEvent', (req, res) => {
  store
    .adminEditEvent({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      image: req.body.image,
      city: req.body.city,
      cause: req.body.cause,
      link: req.body.link,
      contact: req.body.contact,
      id: req.body.id
    })
    .then(() => {
      res.sendStatus(200)
    })
})
app.get('/getEvents/', (req, res) => {

    var cityId = req.headers.cityid
    var upcoming = req.headers.upcoming
    var admin = req.headers.admin
    console.log(cityId)
    console.log(upcoming)
    console.log(admin)
    console.log("Grabbing events...")

    var connection = mysql.createConnection({
      host     : config.host,
      user     : config.user,
      password : config.password,
      port     : config.port
    })

    connection.connect(function(err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return
      }
      console.log('Connected to database.')}
    )
    
    // var sql = `SELECT * FROM shelleysite.events WHERE city = 1`
    if (admin === "true") {
      var sql = `SELECT * FROM ebdb.events WHERE city = ${cityId} AND is_posted = 0`
    }
    else if (upcoming === "true") {
      var sql = `SELECT * FROM ebdb.events WHERE city = ${cityId} AND date >= CURDATE() AND is_posted = 1 ORDER BY date DESC;`
    }
    else {
      var sql = `SELECT * FROM ebdb.events WHERE city = ${cityId} AND is_posted = 1;`
    }
    console.log(sql)
    connection.query(sql, function (err, result) {
      if (err) throw err
      console.log("Succesfully grabbed events.")
      res.send(result.reverse())
    })

    connection.end()
})

app.get('/getEventById/', (req, res) => {

  console.log(req.headers)

  var eventId = req.headers.eventid
  console.log(`Grabbing event with id ${eventId}...`)

  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    port     : config.port
  })

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return
    }
    console.log('Connected to database.')}
  )
  
  var sql = `SELECT * FROM ebdb.events WHERE id = ${eventId};`

  console.log(sql)
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(`Succesfully grabbed event with id ${eventId}.`)
    res.send(result)
  })

  connection.end()
})

app.get('/signinadmin/', (req, res) => {

  var password = req.headers.password
  console.log(`Attempting signin with password: ${password}...`)
  if (password === "shelleysite")
    res.send({signedIn: true, token: "a93ifnv592podjg20dfn5k"})
  else
    res.send({signedIn: false})
})

app.get('/checksigninadmin/', (req, res) => {

  var token = req.headers.token
  console.log(`Checking signin with password: ${token}...`)
  if (token === "a93ifnv592podjg20dfn5k")
    res.send({signedIn: true, token: "a93ifnv592podjg20dfn5k"})
  else
    res.send({signedIn: false})
})

app.get('/getAdminInfo/', (req, res) => {

  console.log(`Grabbing Admin Info`)

  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    port     : config.port
  })

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return
    }
    console.log('Connected to database.')}
  )
  
  var counts = []

  var sql = `SELECT COUNT(*) AS count FROM ebdb.events WHERE city = '1' AND is_posted = 0 UNION
            SELECT COUNT(*) AS count FROM ebdb.events WHERE city = '2' AND is_posted = 0;`

  console.log(sql)
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(`Succesfully grabbed counts from cities.`)
    console.log(result)
    res.send(result)
  })
  connection.end()
})

app.get('/approveEvent/', (req, res) => {

  var eventId = req.headers.eventid
  console.log(`Approving event with id = ${eventId}`)

  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    port     : config.port
  })

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return
    }
    console.log('Connected to database.')}
  )

  var sql = `UPDATE ebdb.events SET is_posted='1' WHERE id='${eventId}';`


  console.log(sql)
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(`Succesfully approved event.`)
    console.log(result)
    res.send(result)
  })
  connection.end()
})
app.get('/deleteEvent/', (req, res) => {

  var eventId = req.headers.eventid
  console.log(`Deleting event with id = ${eventId}`)

  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    port     : config.port
  })

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return
    }
    console.log('Connected to database.')}
  )

  var sql = `DELETE FROM ebdb.events WHERE id='${eventId}';`

  console.log(sql)
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(`Succesfully deleted event.`)
    console.log(result)
    res.send(result)
  })
  connection.end()
})
app.listen(8081, () => {
  console.log('Server running on http://localhost:8081')
})