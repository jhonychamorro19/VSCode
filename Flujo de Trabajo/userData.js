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

bot.dialog('/', [
    function (session, results, next) {
        if (!session.userData.nombre) {            
            builder.Prompts.text(session, '¿Como te llamas?');
        }
        else {
            next();
        }
    },
    function (session, results) {
        if (results, response) {
            let msj = results.response;
            session.userData.nombre = msj;
        }

        session.send(`Hola ${session.userData.nombre}!`);
    }
]);