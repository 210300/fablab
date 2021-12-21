const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karmatshew471@gmail.com",
    pass: "karma*1234",
  },
});

module.exports.sendResetEmail = async (email, token) => {
   // change first part to your domain
  var url = "http://localhost:1111/user/reset-password?token=" + token;
  await smtpTransport.sendMail({
    from: "karmatshew471@gmail.com",
    to: email,
    subject: "RESET YOUR PASSWORD",
    text: `Click on this link to reset your password ${url}`,
    html: `<h3> Click on this link to reset your password : ${url} </h3>`,
  });
};

module.exports.sendVerifyEmail = async (email, token) => {
  // change first part to your domain
  var url = "http://localhost:1111/user/verifyemail?token=" + token;
  console.log(url)
  await smtpTransport.sendMail({
    from: "karmatshew471@gmail.com",
    to: email,
    subject: "VERIFY Your EMAIL",
    text: `Click on this link to verify ${url}`,
    html: `<h3> Click on this link to verify your email : ${url} </h3>`,
  });
};
