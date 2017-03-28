var nodemailer = require('nodemailer')
var gutil      = require('gulp-util')

module.exports = function(req, res) {
    // create reusable transporter object using the default SMTP transport

    var transporter = nodemailer.createTransport('smtps://william.hitchcock1%40gmail.com:omusofgnvqpvezqd@smtp.gmail.com')

    // setup e-mail data
    var mailOptions = {
        from: '"' + req.query.name + '" <contact@willhitchcock.me>',
        replyTo: req.query.email,
        to: 'hi@willhitchcock.me',
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
                    '}')
            }, 3000)
            return gutil.log(gutil.colors.red(error));
        }
        setTimeout(function() {
            res.send('{' +
                '"status":"success",' +
                '"message":"Message sent!",' +
                '"icon":"check_circle"' +
                '}')
        }, 3000)
        gutil.log(gutil.colors.green('Message sent: ') + info.response);
    })
}