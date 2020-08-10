const dotenv = require('dotenv')
dotenv.config();

module.exports = {
	dbDriver: process.env.DB_DRIVER,
	dbName: process.env.DB_NAME,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	host: process.env.HOST,
	port: process.env.PORT
}
