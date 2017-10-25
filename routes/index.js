/**
 * Arquivo de rotas / endpoints
 * Utiliza framework express
 */

var express = require('express');
var router = express.Router();

/**
 * Rota para view index.ejs
 * Controller rederiza a view passando-lhe a coleção de usuário encontrados pelo model
 *
 * Endpoint: https://dummy-blue-hunter.mybluemix.net/user/by-name/{name-part}
 *
 * @param {'/user/by-name/:strName'}
 * @param {function}
 * @return {}
 *
 */
router.get('/user/by-name/:strName', function(req, res) {
	var strName = req.params.strName;
	global.db.findName(strName, (e, docs) => {
		if(e) { return console.log(e);}
		res.render('index', {title: 'Pesquisa de Usuário', docs: docs, action: '/user/by-name/' + strName});
	});
});

/**
 * Rota para view booksearch.ejs
 * Controller rederiza a view passando-lhe a coleção de livros encontrados pelo model
 *
 * Endpoint: https://dummy-blue-hunter.mybluemix.net/book/by-title/{title-part}
 *
 * @param {'/book/by-title/:strTitle'}
 * @param {function}
 * @return {}
 *
 */
router.get('/book/by-title/:strTitle', function(req, res) {
	var strTitle = req.params.strTitle;
	global.db.findTitle(strTitle, (e, docs) => {
		if(e) { return console.log(e);}
		res.render('booksearch', {title: 'Pesquisa de Livros', docs: docs, action: '/book/by-title/' + strTitle});
	});
});

/**
 * Rota para view by-author.ejs
 * Controller rederiza a view passando-lhe a coleção de livros encontrados por author pelo Model
 *
 * Endpoint: /book/by-author/{author-part}
 *
 * @param {'/book/by-author/:strAuthor'}
 * @param {function}
 * @return {}
 *
 */
router.get('/book/by-author/:strAuthor', function(req, res) {
	var strAuthor = req.params.strAuthor;
	global.db.findAuthorTitles(strAuthor, (e, docs) => {
		if(e) { return console.log(e);}
		res.render('by-author', {title: 'Pesquisa por Autor', docs: docs, action: '/book/by-author'});
	});
});



/* Métodos adicionais não solicitados */
/**************************************/
/**
 * Rota para view index.ejs
 * Controller rederiza a view passando-lhe a coleção usuários cadastrados pelo Model
 *
 * @param {'/'}
 * @param {function}
 * @return {}
 *
 */
router.get('/', function(req, res) {
	global.db.findAll((e, docs) => {
		if (e) { return console.log(e);}
		res.render('index', {title:'Lista de Usuários', docs: docs, action:'/user/by-name'});
	});
});

/**
 * Rota para view new.ejs (Inclusão de usuário)
 * Controller rederiza a view passando-lhe campos vazios
 *
 * @param {'/new'}
 * @param {function}
 * @return {}
 *
 */
router.get('/new', function(req, res, next) {
	res.render('new', { title: 'Novo Usuário', doc: {'id':'', 'fullname':'', 'gender':'','age':'','email':'','phone':'','username':''}, action: '/new' });
});

/**
 * Rota para inclusão de usuário
 * Controller para inclusão usuário pelo Model
 *
 * @param {'/new'}
 * @param {function}
 * @return {}
 *
 */
router.post('/new', function(req, res) {

	var id = req.body.id;
	var fullname = req.body.fullname;
	var gender = req.body.gender;
	var age = parseInt(req.body.age);
	var email = req.body.email;
	var phone = req.body.phone;
	var username = req.body.username;
	global.db.insert({fullname, gender, age, email, phone, username}, (err, result) => {
		if (err) {return colsole.log(err);}
		res.redirect('/');
	});

});
/**
 * Rota para view new.ejs (Alteração de usuário)
 * Controller rederiza a view passando-lhe campos do registro do usuário encontrado pelo Model
 *
 * @param {'/edit/:id'}
 * @param {function}
 * @return {}
 *
 */
router.get('/edit/:id', function(req, res, next) {
	var id = req.params.id;
	global.db.findOne(id,(e, docs) => {
		if(e) {return console.log(e);}
		res.render('new', {title: 'Edição de Usuário', doc: docs[0], action: '/edit/' + docs[0]._id })
	});
});


/**
 * Rota para view index.ejs (POST)
 * Controoler rederiza a view passando-lhe a coleção de usuário encontrados pelo Model
 * 
 * @param {'/user/by-name'}
 * @param {function}
 * @return {}
 *
 */
router.post('/user/by-name', function(req, res) {
	var strName = req.body.user;
	global.db.findName(strName, (e, docs) => {
		if(e) { return console.log(e);}
		res.render('index', {title: 'Pesquisa de Usuário', docs: docs, action: '/user/by-name/' + strName});
	});
});
/**
 * Rota para view index.ejs
 * Controller rederiza a view passando-lhe a coleção de todos usuários ordenados pelo nome encontrados pelo Model
 *
 * @param {'/user/by-name'}
 * @param {function}
 * @return {}
 *
 */
router.get('/user/by-name', function(req, res) {
	global.db.findAll((e, docs) => {
		if(e) { return console.log(e);}
		res.render('index', {title: 'Pesquisa de Usuário', docs: docs, action: '/user/by-name'});
	});
});
/**
 * Rota para view index.ejs
 * Controller rederiza a view passando-lhe a coleção de usuário encontrados pelo Model
 * 
 * @param {'/user'}
 * @param {function}
 * @return {}
 *
 */
router.get('/user', function(req, res) {
	global.db.findAll((e, docs) => {
		if(e) { return console.log(e);}
		res.render('index', {title: 'Pesquisa de Usuário', docs: docs, action: '/user/by-name'});
	});
});
/**
 * Rota para alteração de usuario
 * Controller para alteração de usuário pelo Model
 * 
 * @param {'/edit/:id'}
 * @param {function}
 * @return {}
 *
 */
router.post('/edit/:id', function(req, res) {
	var _id = req.params.id;
	var id = req.body.id;
	var fullname = req.body.fullname;
	var gender = req.body.gender;
	var age = parseInt(req.body.age);
	var email = req.body.email;
	var phone = req.body.phone;
	var username = req.body.username;
	global.db.update(_id, {id, fullname, gender, age, email, phone, username}, (e, result) => {
		if (e) { return console.log(e);}
		res.redirect('/');
	});
});
/**
 * Rota para exclusão de usuário
 * Controller para exclusão de usuario pelo Model
 * 
 * @param {'/delete/:id'}
 * @param {function}
 * @return {}
 *
 */
router.get('/delete/:id', function(req, res) {
	var id = req.params.id;
	global.db.deleteOne(id, (e, r) => {
		if (e) {return console.log(e);}
		res.redirect('/');
	});
});

/**
 * Rota para view by-author.ejs (POST)
 * Controller rederiza a view passando-lhe a coleção de todos os livros por author encontrados pelo Model
 * 
 * @param {'/book/by-author'}
 * @param {function}
 * @return {}
 *
 */
router.post('/book/by-author', function(req, res) {
	var strAuthor = req.body.author;
	global.db.findAuthorTitles(strAuthor, (e, docs) => {
		if(e) { return console.log(e);}
		res.render('by-author', {title: 'Pesquisa por Autor', docs: docs, action: '/book/by-author'});
	});
});

/**
 * Rota para view by-author.ejs
 * Controller rederiza a view passando-lhe a coleção de todos os livros por author encontrados pelo Model
 * 
 * @param {'/book/by-author'}
 * @param {function}
 * @return {}
 *
 */
router.get('/book/by-author', function(req, res) {
	global.db.findAuthor((e, docs) => {
		if(e) { return console.log(e);}
		res.render('by-author', {title: 'Pesquisa por Autor', docs: docs, action: '/book/by-author'});
	});
});

/**
 * Rota para view by-author.ejs
 * Controller rederiza a view passando-lhe a coleção de todos os livros por author encontrados pelo Model
 * 
 * @param {'/book'}
 * @param {function}
 * @return {}
 *
 */
 router.get('/book', function(req, res) {
	global.db.findAuthor((e, docs) => {
		if(e) { return console.log(e);}
		res.render('by-author', {title: 'Pesquisa por Autor', docs: docs, action: '/book/by-author'});
	});
});

/**
 * Rota para view booknew.ejs
 * Controller reenderiza a view passando-lhe os campos vazios do Form books
 * 
 * @param {'/book/new'}
 * @param {function}
 * @return {}
 *
 */
router.get('/book/new', function(req, res, next) {
	res.render('booknew', { title: 'Novo Título', doc: {'id':'', 'title':'', 'author':'','yearPublished':'','price':'','rating':''}, action: '/book/new' });
});

/**
 * Rota para view booknew.ejs (POS)
 * Controller para inclusão de livros pelo Model
 * 
 * @param {'/book/new'}
 * @param {function}
 * @return {}
 *
 */
router.post('/book/new', function(req, res) {

	var id = req.body.id;
	var title = req.body.title;
	var author = req.body.author;
	var yearPublished = parseInt(req.body.yearPublished);
	var price = req.body.price;
	var rating = req.body.rating;
	global.db.insertBook({id, title, author, yearPublished, price, rating}, (err, result) => {
		if (err) {return colsole.log(err);}
		res.redirect('/book/by-author');
	});
});

/**
 * Rota para view booknew.ejs
 * Controller renderiza a view passando-lhe os campos do registro do usuário encontrado pelo Model
 * 
 * @param {'/book/edit/:id'}
 * @param {function}
 * @return {}
 *
 */
router.get('/book/edit/:id', function(req, res, next) {
	var id = req.params.id;
	global.db.findOneBook(id,(e, docs) => {
		if(e) {return console.log(e);}
		res.render('booknew', {title: 'Edição de Titulo', doc: docs[0], action: '/book/edit/' + docs[0]._id });
	});
});

/**
 * Rota para view booknew.ejs
 * Controller para atualização do registro do usuário pelo Model
 * 
 * @param {'/book/edit/:id'}
 * @param {function}
 * @return {}
 *
 */
router.post('/book/edit/:id', function(req, res) {
	var _id = req.params.id;
	var id = req.body.id;
	var title = req.body.title;
	var author = req.body.author;
	var yearPublished = parseInt(req.body.yearPublished);
	var price = req.body.price;
	var rating = req.body.rating;

	global.db.updateBook(_id, {id, title, author, yearPublished, price, rating}, (e, result) => {
		if (e) { return console.log(e);}
		res.redirect('/book/by-author');
	});
});

/**
 * Rota para exclusão de livros
 * Controller para exclusão de livro pelo Model
 * 
 * @param {'/book/delete/:id'}
 * @param {function}
 * @return {}
 *
 */
router.get('/book/delete/:id', function(req, res) {
	var id = req.params.id;
	global.db.deleteOneBook(id, (e, r) => {
		if (e) {return console.log(e);}
		res.redirect('/book/by-author');
	});
});

/* Torna o módulo disponível para outros módulos por meio do require() */
module.exports = router;