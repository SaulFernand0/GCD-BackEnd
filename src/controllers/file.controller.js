const pool = require('../database');
const helpers = require('../libs/helpers');

const readAllFiles = async (req, res) => {
    try {
        const response = await pool.query('select *from archivos');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const readFile = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from archivos where idarchivo=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const createFile = async (req, res) => {
    try {
        const idusuario = req.user.idusuario
        if (!idusuario) {
            throw new Error('Invalid Token')
        }
        const file = req.file
        await pool.query('insert into archivos(nombre, tipo, url, idusuario) values($1,$2,$3,$4)', [file.originalname, file.mimetype, file.path,idusuario]);
        return res.status(200).json(
            `Archivo subido correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e.message || 'Internal Server error...!');
    }
}

const delFile = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from archivos where idarchivo=$1', [id]);
        return res.status(200).json(
            `Archivo eliminado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

module.exports = {
    readAllFiles,
    readFile,
    createFile,
    delFile
}