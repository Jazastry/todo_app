module.exports = function() {
    class ErrorHandler {
        writeLog(err) {
            console.log('ERR HANDLER : ', err)
        }
    }

    return new ErrorHandler();
}
