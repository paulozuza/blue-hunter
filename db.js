/**
 * Módulo de Models users/books
 */

/**
 * Cria a conexão com DB (mongoDB 2.2.33)
 * Torna-a (conexao) global (conn) para uso em outros módulos
 *
 */
var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/blue-hunter")
			.then(conn => global.conn = conn)
			.catch(err => console.log(err))

/**
 * Model retorna coleção usuários que atendem a um filtro
 *
 * Endpoint: https://dummy-blue-hunter.mybluemix.net/user/by-name/{name-part}
 *
 * @return {users}
 *
 */
var ObjectName = require("mongodb").ObjectId;
function findName(strName, callback) {
	global.conn.collection('users').createIndex( { "fullname": "text" } )
	global.conn.collection('users').find({"fullname" : {$regex : ".*"+strName+".*"}}).toArray(callback);
}

/**
 * Model retorna coleção de livros que atendem a um filtro
 *
 * Endpoint: https://dummy-blue-hunter.mybluemix.net/book/by-title/{title-part}
 *
 * @return {books}
 *
 */
function findTitle(strTitle, callback) {
	global.conn.collection('books').createIndex( { "title": "text" } )
	global.conn.collection('books').find({"title" : {$regex : ".*"+strTitle+".*"}}).toArray(callback);
}

/**
 * Model retorna coleção livros de um determinado autor
 *
 * Endpoint: /book/by-author/{author-part}
 *
 * @return {books}
 *
 */
function findAuthorTitles(strAuthor, callback) {
	global.conn.collection('books').createIndex( { "author": "text" } )
	global.conn.collection('books').find({"author" : {$regex : ".*"+strAuthor+".*"}}).toArray(callback);
}



/* Models adicionais não solicitados */
/**************************************/
/**
 * Model retorna coleção users
 *
 * @return {users}
 *
 */
 function findAll(callback){  
        global.conn.collection("users").find({}).sort({fullname: 1}).toArray(callback);
};

/**
 * Model inclusão de usuário
 *
 * @return {}
 *
 */
function insert(user, callback) {
	global.conn.collection("users").insert(user, callback);
};

/**
 * Model retorna usuario espefífico
 *
 * @return {users}
 *
 */
var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback) {
	global.conn.collection("users").find(new ObjectId(id)).toArray(callback);
};

/**
 * Model atualiza registro de usuário
 *
 * @return {}
 *
 */
function update(id, user, callback) {
	global.conn.collection('users').updateOne({_id:new ObjectId(id)}, user, callback);
}

/**
 * Model exclusão de usuário
 *
 * @return {users}
 *
 */
function deleteOne(id, callback) {
	global.conn.collection('users').deleteOne({_id: new ObjectId(id)}, callback);
}

/**
 * Model inclusão de livro
 *
 * @return {}
 *
 */
function insertBook(book, callback) {
	global.conn.collection("books").insert(book, callback);
};

/**
 * Model retorna coleção de todos os livros ordenada por autor
 *
 * @return {users}
 *
 */
function findAuthor(callback){  
    global.conn.collection("books").find({}).sort({author: 1}).toArray(callback);
};

/**
 * Model retorna registro de um livro (id) em particular
 *
 * @return {}
 *
 */
var ObjectId2 = require("mongodb").ObjectId;
function findOneBook(id, callback) {
	global.conn.collection("books").find(new ObjectId2(id)).toArray(callback);
};

/**
 * Model atualiza registro de livro
 *
 * @return {}
 *
 */
function updateBook(id, user, callback) {
	global.conn.collection('books').updateOne({_id:new ObjectId(id)}, user, callback);
}

/**
 * Model deletar livro
 *
 * @return {}
 *
 */
function deleteOneBook(id, callback) {
	global.conn.collection('books').deleteOne({_id: new ObjectId(id)}, callback);
}

/* Torna o módulo disponível para outros módulos por meio do require() */
module.exports = { findAll, insert, findOne, update, deleteOne, findName, findAuthor, findAuthorTitles, insertBook, findOneBook, updateBook, deleteOneBook  }
