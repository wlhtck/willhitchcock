var express = require('express');
var nodemailer = require('nodemailer');
var williamJHitchcock = express();
//default port to 8000 for dev
var PORT = process.env.PORT || 8000;

console.log(__dirname);
//serve static files
williamJHitchcock.use(express.static(__dirname + '/public/'));

//send email
williamJHitchcock.get('/contact', function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://william.hitchcock1%40gmail.com:qedvhkuorcxrerkz@smtp.gmail.com');

    console.log(req.query);

    // setup e-mail data
    var mailOptions = {
        from: '"' + req.query.name + '" <me@williamjhitchcock.com>',
        replyTo: req.query.email,
        to: 'me@williamjhitchcock.com',
        subject: req.query.sub,
        text: req.query.msg
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            setTimeout(function() {
                res.send('{' +
                    '"status":"error",' +
                    '"message":"An error occured, your message may not have been sent!",' +
                    '"icon":"error"' +
                    '}');
            }, 3000);
            return console.log(error);
        }
        setTimeout(function() {
            res.send('{' +
                '"status":"success",' +
                '"message":"Message sent!",' +
                '"icon":"check_circle"' +
                '}');
        }, 3000);
        console.log('Message sent: ' + info.response);
    });
});

var server = williamJHitchcock.listen(PORT, function() {
    console.log('Listening on port ' + PORT)
});