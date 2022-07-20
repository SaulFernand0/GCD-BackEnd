
const pool = require('../database');
const { transporter } = require('../libs/nodemailer');

const readAllEmails = async(req, res)=>{
    try {
        const response = await pool.query('select *from correo');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const readEmail = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from correo where idcorreo=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const createEmail = async(req, res)=>{
    try {
        const{ destinatario, titulo, mensaje} = req.body;
        await pool.query('insert into correo(destinatario, titulo, mensaje) values($1,$2,$3)', [destinatario, titulo, mensaje]);
        transporter.sendMail({
            subject: titulo,
            text: mensaje,
            to: destinatario, 
            from: '✌️<jegarapi@gmail.com>'
        })
        return res.status(200).json(
            `Correo creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const delEmail = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from correo where idcorreo=$1', [id]);
        return res.status(200).json(
            `Correo ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

module.exports = {
    readAllEmails,
    readEmail,
    createEmail,
    delEmail
}
