const { checkNull } = require("./common")

class Success {
    status;
    keyword;
    message;
    data;
    count;
    totalElements
    constructor(status, message, data, total) {
        this.status = status;
        this.keyword = 'SUCCESS';
        this.message = message;
        if (checkNull(data)) {
            this.data = data;
        }
        this.count = Array.isArray(data) ? data.length : "";

        if (checkNull(total)) {
            this.totalElements = total ?? 0
        }
    }
}


class Failure {
    status
    message
    error
    keyword
    constructor(message, error) {
        this.keyword = 'FAILED'
        this.status = false
        this.message = message ?? 'Internal server error'
        this.error = checkNull(error) ? error : ''
    }
}


module.exports = { Success, Failure }