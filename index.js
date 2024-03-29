const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://imagicstudio.co/contact", credentials: false }));
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })  

app.post('/api/contact', (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'temitope.hassan.2@gmail.com', // email
      pass: 'eypk ulsl hisg mlho', //password
  },
  tls:{
    rejectUnauthorized:false
  }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
    from: 'temitope.hassan.2@gmail.com', // sender address
    to: 'temitope.hassan.2@gmail.com', // list of receivers
    subject: 'iMagic Contact Form', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
    res.render('contact', {msg:'Email has been sent'});
  });
  });


  app.post('/api/quote', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.YOURDOMAIN.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'YOUREMAIL', // generated ethereal user
          pass: 'YOURPASSWORD'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <your@email.com>', // sender address
        to: 'RECEIVEREMAILS', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });
  

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});



