const { createTokenForUser , 
    validateToken} = require('../service/auth');
function checkForAuthenticationCookie(cookieName){

    return (req,res,next)=>{
       const tokenCookieValue = req.cookies[cookieName]
       if(!tokenCookieValue){
        return next();
       }
try{
       const userPayload = validateToken(tokenCookieValue)
    req.user = userPayload ;
   return next() ;
    }
      
       
       catch(error){ 
        console.error('Token validation error:', error);
            // Optionally, you might want to clear the invalid token cookie here
            // res.clearCookie(cookieName);
            // Send an error response
            return res.status(401).send('Unauthorized');
       }
       

    }
}

module.exports = {
    checkForAuthenticationCookie,
}