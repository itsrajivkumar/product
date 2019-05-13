var amqp = require('amqplib/callback_api');
var model = require('../v1/models');
var sequelize = require('../v1/models/index');

var publishser = (data) => {
    amqp.connect(process.env.RABBIT_URL, (err, conn) => {
        console.log("======Rabbit mq Publisher connected successfully===");
        conn.createChannel((err, ch) => {
            var queue = process.env.QUEUE_NAME;
            var message = data;
            ch.assertQueue(queue, { durable: false });
            ch.sendToQueue(queue, Buffer.from(message));
            console.log("Message sent");
        });
    });
}

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


module.exports = {
    publishser,
    consumer
}
