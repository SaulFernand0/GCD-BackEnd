
const pool = require('../database');
const { transporter } = require('../libs/nodemailer');

const email = async(req, res)=>{
    try {
        const{ destinatario, titulo, mensaje, fecha } = req.body;
        await transporter.sendMail({
            from: '"UPeU Email" <saulolivasgaray@hotmail.com>', // sender address
            to: correo, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
          return res.status(200).json('correo enviado correctamente...!');
          
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

module.exports = {
    email
}