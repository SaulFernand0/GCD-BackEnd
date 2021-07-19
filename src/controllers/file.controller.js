const pool = require('../database');
const helpers = require('../libs/helpers');


const readAllFiles = async(req, res)=>{
    try {
        const response = await pool.query('select *from archivos');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const readFile = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from archivos where idarchivo=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const createFile = async(req, res)=>{
    try {
        const{ nombre, tipo, url, idusuario} = req.body;
        await pool.query('insert into archivos(nombre, tipo, url, idusuario) values($1,$2,$3,$4)', [nombre, tipo, url, idusuario]);
        return res.status(200).json(
            `Archivo ${ username } subido correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

const delFile = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from archivo where idarchivo=$1', [id]);
        return res.status(200).json(
            `Archivo ${ id } eliminado correctamente...!`);
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