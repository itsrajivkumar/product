var amqp = require('amqplib/callback_api');
var model = require('../v1/models');
var sequelize = require('../v1/models/index');

//publisher  the data into  given qeueName
var publishser = (data, queueName) => {
 
    amqp.connect(process.env.RABBIT_URL, (err, conn) => {
        console.log("======Rabbit mq Publisher connected successfully===");
        conn.createChannel((err, ch) => {
            var queue = queueName;
            var message = data;
            console.log(data,queueName);
            ch.assertQueue(queue, { durable: false });
            ch.sendToQueue(queue, Buffer.from(message));
            console.log("Message sent");
        });
    });
}


//consumer for the product  object
var consumer = () => {
    amqp.connect(process.env.RABBIT_URL, (err, conn) => {
        console.log("======Rabbit mq  Consumer connected successfully===");
        conn.createChannel((err, ch) => {
            var queue = process.env.QUEUE_NAME;
            ch.assertQueue(queue, { durable: false });
            ch.consume(queue, function (msg) {
                if (msg != null) {
                    model.tbl_product.create({
                        productsDetails: JSON.parse(msg.content.toString())
                    }).then(
                        result => {
                            console.log("save data into  db")
                            console.log(msg.content.toString());
                            ch.ack(msg);
                        }), error => {
                            console.log(error);
                        }
                }
            })
        });
    });
}


//fileRepositoryConsumer for the fileRepository  object
var fileRepositoryConsumer = () => {
    amqp.connect(process.env.RABBIT_URL, (err, conn) => {
        console.log("======Rabbit mq  FileRepositoryConsumer connected successfully===");
        conn.createChannel((err, ch) => {
            var queue = process.env.FILE_REGISTRY_RABBIT_QUEUE;
            ch.assertQueue(queue, { durable: false });
            ch.consume(queue, async function (msg) {
                if (msg != null) {                
                    var fileRepositoryObj = JSON.parse(msg.content.toString());                  
                    try {
                        var result = await model.tbl_fileRegistry.create({
                            transportId :fileRepositoryObj.transportId,
                            processId: fileRepositoryObj.processId,
                            processName: fileRepositoryObj.processName,
                            applicationName: fileRepositoryObj.applicationName,
                            sourceDataName: fileRepositoryObj.sourceDataName,
                            sourceDataType: fileRepositoryObj.sourceDataType,
                            sourceDataEncryptionType: fileRepositoryObj.sourceDataEncryptionType,
                            sourceDataEncryptionPassword: fileRepositoryObj.sourceDataEncryptionPassword,
                            sourceDataEncryptionPrivateKeyFileName: fileRepositoryObj.sourceDataEncryptionPrivateKeyFileName,
                            sourceDataEncryptionPublicKeyFileName: fileRepositoryObj.sourceDataEncryptionPublicKeyFileName,
                            sourceDataHashProgram: fileRepositoryObj.sourceDataHashProgram,
                            outputDataName: fileRepositoryObj.outputDataName,
                            outputDataType: fileRepositoryObj.outputDataType,
                            outputDataEncyptionType: fileRepositoryObj.outputDataEncyptionType,
                            outputDataEncyptionPassword: fileRepositoryObj.outputDataEncyptionPassword,
                            outputDataEncyptionPrivateKeyFileName: fileRepositoryObj.outputDataEncyptionPrivateKeyFileName,
                            outputDataEncyptionPublicKeyFileName: fileRepositoryObj.outputDataEncyptionPublicKeyFileName,
                            outputDataHashProgram: fileRepositoryObj.outputDataHashProgram,
                            transformOutData: fileRepositoryObj.transformOutData,
                            processOwner: fileRepositoryObj.processOwner,
                            routeId: fileRepositoryObj.routeId,
                            locationId:fileRepositoryObj.locationId,                           
                            status: fileRepositoryObj.status,
                            processTimeStamp: fileRepositoryObj.processTimeStamp,
                            remarks: fileRepositoryObj.remarks

                        });                       
                        if (result.dataValues.fileRegistryId > 0) {
                            console.log("save file Repository with id",result.dataValues.fileRegistryId);
                            ch.ack(msg);
                        } else {
                            ch.ack(msg);
                            console.log("Unable to save the data on file RegsitoryId");
                        }
                    } catch (err) {
                        ch.ack(msg);
                        console.log("error while adding the fileRepository",err);
                    }
                }
            })
        });
    });
}
//transportLog Consumer for the transport  object
var transportLogConsumer = () => {
    amqp.connect(process.env.RABBIT_URL, (err, conn) => {
        console.log("======Rabbit mq  transportLogConsumer connected successfully===");
        conn.createChannel((err, ch) => {
            var queue = process.env.TRANSPORT_LOG_RABBIT_QUEUE;
            ch.assertQueue(queue, { durable: false });
            ch.consume(queue, async function (msg) {
                if (msg != null) {                
                    var transportLogObj = JSON.parse(msg.content.toString());                  
                    try {
                        var result = await model.tbl_transportLog.create({
                            transportId :transportLogObj.transportId,
                            processId: transportLogObj.processId,
                            processName: transportLogObj.processName,
                            applicationName: transportLogObj.applicationName,
                            sourceDataName: transportLogObj.sourceDataName,
                            sourceDataType: transportLogObj.sourceDataType,
                            sourceDataEncryptionType: transportLogObj.sourceDataEncryptionType,
                            sourceDataEncryptionPassword: transportLogObj.sourceDataEncryptionPassword,
                            sourceDataEncryptionPrivateKeyFileName: transportLogObj.sourceDataEncryptionPrivateKeyFileName,
                            sourceDataEncryptionPublicKeyFileName: transportLogObj.sourceDataEncryptionPublicKeyFileName,
                            sourceDataHashProgram: transportLogObj.sourceDataHashProgram,
                            outputDataName: transportLogObj.outputDataName,
                            outputDataType: transportLogObj.outputDataType,
                            outputDataEncyptionType: transportLogObj.outputDataEncyptionType,
                            outputDataEncyptionPassword: transportLogObj.outputDataEncyptionPassword,
                            outputDataEncyptionPrivateKeyFileName: transportLogObj.outputDataEncyptionPrivateKeyFileName,
                            outputDataEncyptionPublicKeyFileName: transportLogObj.outputDataEncyptionPublicKeyFileName,
                            outputDataHashProgram: transportLogObj.outputDataHashProgram,
                            transformOutData: transportLogObj.transformOutData,
                            processOwner: transportLogObj.processOwner, 
                            locationId:transportLogObj.locationId,                           
                            status: transportLogObj.status,
                            processTimeStamp: transportLogObj.processTimeStamp,
                            remarks: transportLogObj.remarks

                        });                       
                        if (result.dataValues.transportlogId > 0) {
                            console.log("save transportLog with id",result.dataValues.transportlogId);
                            ch.ack(msg);
                        } else {
                            ch.ack(msg);
                            console.log("Unable to save the data on transportLog");
                        }
                    } catch (err) {
                        console.log("error while adding the transportLog");
                    }
                }
            })
        });
    });
}


//transportLog Consumer for the transport  object
var boomiLogConsumer = () => {
    amqp.connect(process.env.RABBIT_URL, (err, conn) => {
        console.log("======Rabbit mq  boomiLog consumer connected successfully===");
        conn.createChannel((err, ch) => {
            var queue = process.env.BOOMI_LOG_RABBIT_QUEUE;
            ch.assertQueue(queue, { durable: false });
            ch.consume(queue, async function (msg) {
                if (msg != null) {                
                    var boomiLogObj = JSON.parse(msg.content.toString());                            
                    try {
                        var result = await model.tbl_boomiLog.create({
                            transportId :boomiLogObj.transportId,
                            processId: boomiLogObj.processId,
                            processName: boomiLogObj.processName,
                            applicationName: boomiLogObj.applicationName,
                            sourceDataName: boomiLogObj.sourceDataName,
                            sourceDataType: boomiLogObj.sourceDataType,
                            sourceDataEncryptionType: boomiLogObj.sourceDataEncryptionType,
                            sourceDataEncryptionPassword: boomiLogObj.sourceDataEncryptionPassword,
                            sourceDataEncryptionPrivateKeyFileName: boomiLogObj.sourceDataEncryptionPrivateKeyFileName,
                            sourceDataEncryptionPublicKeyFileName: boomiLogObj.sourceDataEncryptionPublicKeyFileName,
                            sourceDataHashProgram: boomiLogObj.sourceDataHashProgram,
                            outputDataName: boomiLogObj.outputDataName,
                            outputDataType: boomiLogObj.outputDataType,
                            outputDataEncyptionType: boomiLogObj.outputDataEncyptionType,
                            outputDataEncyptionPassword: boomiLogObj.outputDataEncyptionPassword,
                            outputDataEncyptionPrivateKeyFileName: boomiLogObj.outputDataEncyptionPrivateKeyFileName,
                            outputDataEncyptionPublicKeyFileName: boomiLogObj.outputDataEncyptionPublicKeyFileName,
                            outputDataHashProgram: boomiLogObj.outputDataHashProgram,
                            transformOutData: boomiLogObj.transformOutData,
                            processOwner: boomiLogObj.processOwner, 
                            locationId:boomiLogObj.locationId,                           
                            status: boomiLogObj.status,
                            processTimeStamp: boomiLogObj.processTimeStamp,
                            remarks: boomiLogObj.remarks

                        });                       
                        if (result.dataValues.boomiLogId > 0) {
                            console.log("save boomiLog with id",result.dataValues.boomiLogId);
                            ch.ack(msg);
                        } else {
                            ch.ack(msg);
                            console.log("Unable to save the data on boomiLog");
                        }
                    } catch (err) {
                        console.log("error while adding the boomiLog",err);
                    }
                }
            })
        });
    });
}

module.exports = {
    publishser,
    consumer,
    fileRepositoryConsumer,
    transportLogConsumer,
    boomiLogConsumer
}
