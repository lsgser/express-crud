const express = require('express');
const app = express()
const { port } = require('./config');

app.use(express.json())
app.use(express.urlencoded({
	extended:true
}))

const bookC = require('./controllers/bookController');
const indexC = require('./controllers/indexController')
//homepage route
app.get('/',indexC.home)

/*****************************************
			Book routes
*****************************************/

//Add a new book
app.post('/book',bookC.newBook)

//Show all books
app.get('/books',bookC.showBooks)

//Show a single book
app.get('/book/:id',bookC.showBook)

//Edit or Update a book
app.put('/book',bookC.editBook)

//Delete a book
app.delete('/book',bookC.deleteBook)

//set port
app.listen(port,function(){
	console.log('Node is running on port '+port)
})

module.exports = app;
