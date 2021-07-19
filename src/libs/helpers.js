const bcrypt = require('bcrypt');
const helpers ={};

helpers.encryptPassword = async (password)=>{
    const hash = await bcrypt.hash(password, 10);
    return hash;
};
helpers.matchPassword = async (pass, savepass)=>{
    try {
        const salt = await bcrypt.compare(pass, savepass);
        return salt;
    } catch (e) {
        console.log(e);
    } 
};
module.exports = helpers;