var express = require('express')
var http = require('http')
var path = require('path')
var nodemailer = require('nodemailer')



var app = express();
var server = http.Server(app);
var port = 500;


app.set("port", port)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'page/mail.html')))


//Routing
app.get("/", function (req, response) {
  response.sendFile(path.join(__dirname, "page/index.html"))
})

// app.post("/send_email", function (req, response) {

//   var from = req.body.from;
//   var to = req.body.to;
//   var subject = req.body.subject;
//   var message = req.body.message;


//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'm.noman.m.nasir@gmail.com',
//       pass: 'sgug arsm cimb rcyw'
//     }
//   })

  // const mailOptions = {
  //   from,
  //   to,
  //   subject,
  //   text: message
  // };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error)
//     }
//     else {
//       console.log("Email set successfully" + info.response)
//       // ({ message: 'Email sent successfully' + info.response});
//     }
//     response.redirect("/")
//   });
// });
app.post("/send_email", function (req, response) {
  var fullName = req.body.fullName;
  var to = req.body.to;
  var phoneNumber = req.body.phoneNumber;
  var subject = req.body.subject;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'm.noman.m.nasir@gmail.com',
      pass: 'ugge nzsm mgng aqhp'
    }
  });

  const mailOptions = {
    fullName: fullName,
    // userEmail: userEmail,
    to: to,
    subject: subject,
    text: `Full Name: ${fullName}\nEmail: ${to}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully" + info.response);
      response.redirect("/");
    }
  });
  const adminMailOptions = {
    from: to,
    to: "m.noman.m.nasir@gmail.com",
    subject: subject,
    text: `Full Name: ${fullName}\nEmail: ${to}\nMessage: ${message}`
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully to admin" + info.response);
      response.redirect("/");
    }
  });
});

// app.post('/send_email', (req, res) => {
//   const { from, to, subject, message } = req.body;

// const mailOptions = {
//   from,
//   to,
//   subject,
//   text: message
// };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send({ message: 'Error sending email' });
//     }
//     res.send({ message: 'Email sent successfully' });
//   });
// });


server.listen(port, function () {
  console.log("Server is running on port:" + port)
})