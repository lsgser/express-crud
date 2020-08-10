const mysql = require('mysql')
const { host,dbUser,dbName,dbPassword } = require('./config');

const dbConn = mysql.createConnection({
	host:host,
	user:dbUser,
	password:dbPassword,
	database:dbName
})

dbConn.connect(function(err){
	if(err) throw err
})

module.exports = dbConn
