const nodeMailer = require('nodemailer');
const { mail } = require('../configs');

const transporter = nodeMailer.createTransport({
  port: mail.PORT_MAIL,
  host: mail.HOST_MAIL,
  auth: {
    user: mail.USER_MAIL,
    pass: mail.PASS_MAIL,
  },
  secure: mail.SECURE_MAIL, // upgrades later with STARTTLS -- change this based on the PORT
});

const sendMail = (mailData) => {
  const mailExample = {
    from: 'youremail@gmail.com',
    to: mailData.email,
    subject: "Backend-node",
    text: "123456",
    html: `<b>abc</b>: ${mailData.code}`
  }

  mailData.from = mail.SENDER_MAIL;
  transporter.sendMail(mailExample, (error, info) => {
    if (error) {
      console.log("[Error Send Mail]", error);
    }
  });
};


module.exports = sendMail;
