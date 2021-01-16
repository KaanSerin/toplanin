const nodemailer = require('nodemailer');

exports.sendMail = async (emailTo, subject, route, token) => {
  console.log(process.env.EMAIL);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: emailTo,
    subject: subject,
    text: 'Confirm Your Account!',
    html: `<a href="http://localhost:3000/complete?token=${token}">Click to confirm your account</a>`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
