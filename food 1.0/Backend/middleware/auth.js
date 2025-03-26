import jwt from "jsonwebtoken"



const authMiddleware = async (req,res,next)=>{
const {token } = req.headers;
if(!token){
    return res.json({success:false,message:"No Authorized! Login again "})
}
try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token ID:", token_decode.id); 
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token" }); // Use 401 status
  }

}




export  default authMiddleware; 