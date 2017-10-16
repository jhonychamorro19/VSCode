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
        builder.Prompts.text(session, '¿Como te llamas?');
    },
    function (session, results) {
        session.dialogData.nombre = session.response;
        builder.Prompts.number(session, `Ok, ${session.dialogData.nombre}. ¿Cual es tu edad?`);
    },
    function (session, results) {
        session.dialogData.edad = session.response;
        builder.Prompts.time(session, '¿Qué hora es?');
    },
    function (session, results) {
        session.dialogData.hora = session.response;
        builder.Prompts.choice(session, '¿Que prefieres?', 'Mar|Montaña' );
    },
    function (session, results) {
        session.dialogData.preferencia = results.response.entity;
        builder.Prompts.confirm(session, '¿Quieres ver un resumen?');
    },
    function (session, results) {
        if (results.response) {
            session.endDialog(`Me contaste que tu nombre es **${session.dialogData.nombre}, tu edad es **${session.dialogData.edad}, la hora es **${session.dialogData.time} y que prefieres **${session.dialogData.preferencia}`);
        }
        else {

        }
    }    
]);