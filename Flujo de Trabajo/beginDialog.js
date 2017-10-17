var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿COMO TE LLAMAS?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}`);

        session.beginDialog('/preguntarLugar');
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, '¿DONDE ESTAS?');
    },
    function (session, results) {
        let lugar = results.response;
        session.endDialog(`Saludos por ${lugar}`);        
    }
]);