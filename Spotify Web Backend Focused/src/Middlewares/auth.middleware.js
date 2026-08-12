const jwt = require('jsonwebtoken');
async function authArtist(req,res,next){
    const token = req.cookies.token;
    if ( !token){
        return res.status(401).json({ Message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token, procces.env.JWT_SECRET)
        if(decoded.role !==  "artist"){
            return res.status(403).json({message:"You Don't have Acess"})

        }
        next()

    }catch(err){
        console.log(err);
        return res.status(401).json({Message:"Unauthorized"})
        

    }

}

module.exports = (authArtist);