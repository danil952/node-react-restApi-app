const userRep = require('../repositories/userRep')

async function getUserByUsername(username)
{
    const user= await userRep.findByUsername(username)
    if(user==null)
    {
        return null;
    }
    else
    {
        return user;
    }
    
}

module.exports = { getUserByUsername }