var fs = require("fs");
const path = require('path');
var response = require('responses/response');

class LogService {

    static log(severity, componentName, info, remarks) {

        var folderName = process.env.LOG_PATH;
        let status = fs.existsSync(folderName);
        if (!status) {
            fs.mkdirSync(folderName);
        }

        var d = new Date();
        var date = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString();
        var logDate = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + " " + d.getHours().toString() + ":" + d.getMinutes().toString() + ":" + d.getSeconds().toString() + ":" + d.getMilliseconds().toString();
        var logfile_name = process.env.LOG_PATH + date + process.env.SYSTEM_NAME + process.env.DEVELOPMENT_CONTEXT + '.log';
        var logData = "\n" + logDate + "|" + severity + "|" + componentName + "|" + info + "|" + remarks;
        fs.appendFile(logfile_name, logData, function (err) {
            if (err) throw err;

        });
    }
}

LogService.severityInfo = 'Info';
LogService.severityCritical = 'Critical';
LogService.severityHigh = 'High';
LogService.severityMedium = 'Medium';
LogService.severityLow = 'Low';

module.exports = LogService;