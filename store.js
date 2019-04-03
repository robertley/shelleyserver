var mysql = require('mysql')
var config = require('./config.json')

module.exports = {
  
  createEvent ({ title, description, location, startDate, endDate, image, city, cause, link, contact, isPosted }) {

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
    
    var sql = `INSERT INTO studentact.events (title, description, location, start_date, end_date, image, city, cause, link, contact, is_posted)
              VALUES ('${title}', '${description}', '${location}', date_add('${startDate}', interval 4 hour), date_add('${endDate}', interval 4 hour), '${image}', '${city}', '${cause}', '${link}', '${contact}', '${isPosted}');`
    console.log(sql)
    connection.query(sql, function (err, result) {
      if (err) throw err
      console.log("1 record inserted")
    })

    connection.end()

    return Promise.resolve()
  },

  adminEditEvent ({ title, description, location, date, untilDate, image, city, cause, link, contact, id }) {

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
    
    var sql = `UPDATE studentact.events SET is_posted='1', title='${title}', description='${description}', location='${location}', start_date=date_add('${date}', interval 4 hour), end_date=date_add('${untilDate}', interval 4 hour), image='${image}', city='${city}', cause='${cause}', link='${link}', contact='${contact}'
              WHERE id='${id}';`
    console.log(sql)
    connection.query(sql, function (err, result) {
      if (err) throw err
      console.log("1 record updated")
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
