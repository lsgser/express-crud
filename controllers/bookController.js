const db = require('../db')

// Add a new book
exports.newBook = function(req,res){
	let name = req.body.name
	let author = req.body.author

	//validation
	if (!name || !author){
		return res.status(400).send({error:true,message:'Please provide book name and author'})
	}

	//insert to db
	db.query("INSERT INTO books (name,author) VALUES (?,?)",[name,author],function(error,results,fields){
		if (error) throw error;
		return res.status(200).send({error:false,data:results,message:'Book successfully added'})
	})		
}

// Get or Show all books
exports.showBooks = function(req,res){
	db.query("SELECT * FROM books",function(error,results,fields){
		if(error) throw error
		
		let msg = ""
		
		if (results === undefined || results.length == 0){
			msg = "Book table is empty"
		}else{
			msg = "All books retrived"
		}
		return res.status(200).send({data:results,message:msg})	
	})
}

//Retrieve a single book
exports.showBook = function(req,res){
	let id = req.params.id
	
	if (!id){
		return res.status(400).send({error:true,message:'Please provide book id'})
	}	

	db.query("SELECT * FROM books WHERE id = ?",id,function(error,results,fields){
		if(error) throw error

		let msg = ""

		if(results===undefined || results.length == 0){
			msg = "Book not found"
			return res.status(404).send({message:msg})
		}else{
			msg = "Book retrieved"
		}
		
		return res.status(200).send({data:results[0],message:msg})	
	})
}

//Update an existing book
exports.editBook = function(req,res){
	let id = req.body.id
	let name = req.body.name
	let author = req.body.author

	if(!id){
		return res.status(400).send({error:true,message:'Please provide a user id'})
	}else{
		if(name || author){
			db.query("UPDATE books SET name = ?, author = ? WHERE id = ?",[name,author,id],function(error,results,fields){
				if (error) throw error
				
				let msg = ""
				if(results.changedRows===0){
					msg = "Book not found or book data is the same"
				}else{
					msg = "Book updated"
				}
				
				return res.status(200).send({error:false,data:results,message:msg})			
			})
		}else{
			return res.status(400).send({error:true,message:'Name and author fields are both empty'})
		}	
	}
}

exports.deleteBook = function(req,res){
	let id = req.body.id
	
	if(!id){
		return res.status(400).send({error:true,message:'Book ID is invalid'})
	}else{
		db.query("DELETE FROM books WHERE id=?",id,function(error,results,fields){	
			if (error) throw error
			
			return res.status(200).send({error:false,data:results,message:'Book deleted'})							
		})
	}
}
