const bcryptjs = require('bcryptjs');
const helpers ={};

helpers.encryptPassword = async (password)=>{
    const hash = await bcryptjs.hash(password, 10);
    return hash;
};
helpers.matchPassword = async (pass, savepass)=>{
    try {
        const salt = await bcryptjs.compare(pass, savepass);
        return salt;
    } catch (e) {
        console.log(e);
    } 
};
module.exports = helpers;