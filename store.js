var mysql = require('mysql')
var config = require('./config.json')

module.exports = {
  
  createEvent ({ title, description, location, date, image, city, cause, link, contact }) {

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
    
    var sql = `INSERT INTO ebdb.events (title, description, location, date, image, city, cause, link, contact)
              VALUES ('${title}', '${description}', '${location}', '${date}', '${image}', '${city}', '${cause}', '${link}', '${contact}');`
    console.log(sql)
    connection.query(sql, function (err, result) {
      if (err) throw err
      console.log("1 record inserted")
    })

    connection.end()

    return Promise.resolve()
  },

  // getEvents({ cityId }) {
  //   console.log("Grabbing events...")

  // var connection = mysql.createConnection({
  //   host     : config.host,
  //   user     : config.user,
  //   password : config.password,
  //   port     : config.port
  // })

  //   connection.connect(function(err) {
  //     if (err) {
  //       console.error('Database connection failed: ' + err.stack);
  //       return
  //     }
  //     console.log('Connected to database.')}
  //   )
    
  //   // var sql = `SELECT * FROM ebdb.test_table;`
  //   var sql = `SELECT * FROM shelleysite.events WHERE city = ${cityId}`
  //   console.log(sql)
  //   connection.query(sql, function (err, result) {
  //     if (err) throw err
  //     console.log("Succesfully grabbed events.")
  //   })

  //   connection.end()

  //   return Promise.resolve()
  // }
}
