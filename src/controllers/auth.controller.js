const pool = require('../database')
const jwt = require('jsonwebtoken');
const helpers = require('../libs/helpers'); 
const bcrypt = require('bcrypt');
const refreshTokens = [];
const secret = "dad-secret-access-token";
const refreshTokenSecret = "dad-secret-refresh-access-token";
const login = async (req, res)=>{
    try {
       const {username, password} = req.body;
       //console.log(pass);
       const response = await pool.query('SELECT * FROM usuario where username = $1', [username]);      
       if(response.rows.length!=0){           
           const passold = response.rows[0].password;
           if(await bcrypt.compare(password, passold)){
                const usuario = {
                    idusuario : response.rows[0].idusuario,                    
                    username : response.rows[0].username
                }
                const accessToken = jwt.sign({usuario}, secret, {expiresIn:'7200s'});
                const refreshToken = jwt.sign({usuario}, refreshTokenSecret);
                refreshTokens.push(refreshToken);
                return res.status(200).json({
                    accessToken,
                    refreshToken
                });
           }else{
                return res.status(403).json({
                    message: 'Username o Password incorrectos...!'
                });
           }           
       }
       return res.status(403).json({
           message: 'Username o Password incorrectos...!'
       });
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Error al validar usuario...!'});
    }    
};

const token = async (req, res)=>{
    try {
        const { token } = req.body;
        if(!token){
            return res.sendStatus(401);
        }
        if(!refreshTokens.includes(token)){
            return res.sendStatus(403);
        }
        jwt.verify(token, refreshTokenSecret, (err, user)=>{
            if(err){
                return res.sendStatus(403);
            }
        });
    } catch (e) {
        console.log(e);
        
    }
};

const signIn = async ( req, res ) => {
    try {
        const { username, password } = req.body;
        const response = await pool.query('SELECT * FROM fc_validar_usuario2($1)', [username]);      
        const salida = await pool.query('SELECT * FROM fc_obtener_empleado_salida($1)', [response.rows[0].idempleado]);
        if(response.rows.length!=0){           
            const passold = response.rows[0].password;
            if(await bcrypt.compare(password, passold)){
                const usuario = {
                    idempleado : response.rows[0].idempleado,
                    idusuario : response.rows[0].idusuario,
                    nombres : response.rows[0].nombres+' '+response.rows[0].apellidos,
                    username : response.rows[0].username,
                    rol : response.rows[0].nombre,
                    salida: salida.rows.length > 0
                        ? salida.rows[0].idsalida
                        : null,
                    idzona: salida.rows.length > 0
                        ? salida.rows[0].idzona
                        : null,
                    zona: salida.rows.length > 0
                        ? salida.rows[0].zona
                        : null,
                }
                const accessToken = jwt.sign({usuario}, secret, {expiresIn:'7200s'});
                const refreshToken = jwt.sign({usuario}, refreshTokenSecret);
                refreshTokens.push(refreshToken);
                return res.status(200).json({
                    accessToken,
                    refreshToken
                });
            } else {
                return res.status(403).json({
                    message: 'Username o Password incorrectos...!'
                });
            }           
        }
        return res.status(403).json({
            message: 'Username o Password incorrectos...!'
        });
    } catch (error) {
        
    }
}


module.exports = {
    login,
    token,
    signIn
}