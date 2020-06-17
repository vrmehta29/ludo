var express = require('express');
// var fortune = require('./lib/fortune.js')
var app = express();
app.set('port', process.env.PORT || 3000);

// set up handlebars view engine
// Default layout is main as defined in /views/layouts/main.handlebars
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

let user = "User"

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home', {user: user}); 
});
app.get('/game', function(req, res){
    res.render('game');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

