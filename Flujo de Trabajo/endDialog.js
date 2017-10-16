var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Como te llamas?');
    },
    function (session,results) {
        let msj = results.response;
        session.send(`Hola ${msj}`);

        session.beginDialog('/preguntarLugar');
    },
    function (session, results) {
        session.send(`Saludos por ${result.response}`);
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, '¿Donde estas?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);