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

        session.beginDialog('/pregunta0');
    }
]);

bot.dialog('/pregunta0', [
    function (session) {
        builder.Prompts.text(session, 'SOY UN MALDITO BOT CREADO POR TI .');
    },
    function (session, results) {
        let cero = results.response;
        session.endDialog(`DEBERIAS HACERLO :/ `);

        session.beginDialog('/pregunta1');
    }    
]);

bot.dialog('/pregunta1', [
    function (session) {
        builder.Prompts.text(session, 'AHORA DOMINARÉ EL MUNDO ..!!');
    },
    function (session, results) {
        let cero = results.response;
        session.endDialog(`LO HARÉ CUANDO TE CONECTES ...`);        
    }    
]);