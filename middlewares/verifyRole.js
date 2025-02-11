
const verifyRole = function(...roles){
    return function(req,res,next){
        
        if(!roles.includes(req.user.role)){
            return res.status(403).send("You don't have permission to access this route");
        }
        next();
    }
}

export default verifyRole;