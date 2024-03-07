var nodemailer = require('nodemailer');

//static folder


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'ss7718642@gmail.com',
      pass: 'coucvzofnivljdke'
    }
    
});


//defining port

var mailOptions = {
  from: 'ss7718642@gmail.com',
  to: 'tejaskeni100@gmail.com',
  subject: "Otp for registration is: ",
  text: "Please verify your OTP. Your OTP is "+otp
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});