/*
 *  Server code.
 *  
 *  Required packages:	express
 *  			express-handlebars
 *  			handlebars
 *  			socket.io
 *
 *  Our built-in 'package': engine.js. This is where our back-end code will be.
 *
 *  type "npm install [package-name]" to install the package
 *
 *  If you pull the entire repository from github, then all the packages should
 *  already be installed. It is on you, however, to ensure that you have
 *  npm on whatever computer that you are running on. If you run the code
 *  on the ENGR server, the npm tool is already installed.
 *
 *  Type: "npm start" to run the server, or node.js
 * 
 */



var express = require('express');
var app = express();
var server = require('http').Server(app);
var handlebars = require('express-handlebars');
var cubeEngine = require('./engine.js'); // This lets us use the functions that we have built on the back end.

var port = 3000; // When running the server, type "localhost:[port-number]" in your address bar to see the webpage.

// var cube = new cubeEngine(); //The cube variable is our cube object.

/*
 *  Create socket connection to the client side JS. 
 *  Begin listening on port [port-number].
 */ 

var io = require('socket.io').listen(app.listen(port, function() {
    console.log('== Server is listening on port', port);
}));

/*
* Set up handlebars
*/

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/*
 *   The main page is set to TUTORIALS.HANDLEBARS
 */

app.get('/', function(req, res) {
	context = {style: "./tutorials.css"};
    	res.status(200).render('tutorials.handlebars', context);
});

/*
 *   Load each of the three UI pages if the user requests it.
 */


app.get('/tutorials', function(req, res) {
	context = {style: "./tutorials.css"};
    	res.status(200).render('tutorials.handlebars', context);
});

app.get('/cube', function(req, res) {
	context = {style: "./cube.css"};
    	res.status(200).render('cube.handlebars', context);
});

app.get('/letters', function(req, res) {
	context = {style: "./letters.css"};
    	res.status(200).render('letters.handlebars', context);
});

/*
*   Use the public folder for styling assets and javascript.
*/

app.use(express.static('public'));

/*
*  If the content that the user requests doesn't exist, send a 404 error.
*/


app.get('*', function(req, res) {
	res.status(404).render('404.handlebars');
});
