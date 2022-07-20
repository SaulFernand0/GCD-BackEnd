const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth:{
    user: 'jegarapi@gmail.com',
    pass: 'dporzpnyyjxgieaj'
  },

});

transporter.verify().then(data=> console.log(data)).catch(data=> console.log(data)) 

module.exports = {
  transporter
}
