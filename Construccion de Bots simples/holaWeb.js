var restify = require('restify');
var builder = require('botbuilder');

//Levantar el restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function (){
    console.log('%s listen to %s', server.name, server.url);
});

//Las credenciales pueden quedar en blanco
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

//Bot universal
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//Dialogo
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Como te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);
    }
]);

/*
primero instalar restify
npm install restify -save
*/
