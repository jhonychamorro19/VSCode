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
    function (session) {
        builder.Prompts.text(session, '¿Como te llamas?');
    },
    function (session, results) {
        let msj = session.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/preguntarLugar');
    },
    function (session) {
        if (session.dialogData.lugar) {
            session.send(`Saludos por ${session.userData.lugar}`);
        }
        else {
            session.send(`Ya no me acuerdo del lugar`);
        }
    }
]);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Donde estas?');
    }, function (session, results) {
        session.dialogData.lugar = results.response;

        session.endDialog(`Saludos por ${session.dialogData.lugar} me acuerdo  en este dialgo)`)
    }
]);