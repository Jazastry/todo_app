try {
    var events = require('./modules/events.js');
    var errorHandler = require('./modules/error_handler.js');
    events.loadEvents().then(() => {

    });
} catch (er) {
    console.error('build.js');
    console.error(er);
}
