const nodemailer = require('nodemailer')
const Mailgen  =require('mailgen')



/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "userName" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user:'kushwaharaja415@gmail.com',
      pass:'xqxdhfqlltvpbuqa'
    }
  });

  let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

exports.registerMail = async (req, res) => {
    const { userName, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: userName,
            intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from :'securesally@gmail.com',
        to: userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}