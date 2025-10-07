const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
        
      try{
        //get email from req body
        const email = req.body.email;

      //chheck user for this email, email validation 
      const user = await User.findOne({email:email});
      if(!user){
            return res.json({
                  success:false,
                  message:"Your email is not registered with us"
            })
      }
      //generate token 
      const token = crypto.randomUUID();

      //update user by adding token and expiration time
         const updateDetails = await User.findOneAndUpdate(
                                                {email:email},
                                                {
                                                token:token,
                                                resetPasswordToken:Date.now() + 5*60*1000,
                                                 },
                                                {new:true});
console.log("DETAILS: ",updateDetails);
      //create url
      const url = `http://localhost:3000/update-password/${token}`

      //send mail containing the url
      await mailSender(email,
            "Password Reset Link",
            `Password Reset Link: ${url}`);
      
      //return response
          return res.json({
            success:true,
            message:"Email Sent Successfully, Please Check Your Email to Continue Further",
          })


      }catch(error){ 
            console.log(error);
            return res.status(500).json({
                  success:false,
                  messae:"Cannot reset password, please try again "
            })


      }
}
     





//resetPassword 
exports.resetPassword =async (req,res) => {
       try{
      //fetch data
      const {password, confirmPassword, token} = req.body;

      //validate data
      if(password !== confirmPassword){
            return res.status(401).json({
                  success:false,
                  message:"Password and Confirm Password Does not Match",
            })
      }
      //get userdetails from db using token
      const userDetails  = await User.findOne({token: token});

      //if no entry - invalid token
      if(!userDetails){
            return res.json({
                  success:false,
                  message:"Token is invalid",
            })
      }
      // token time check
      if(userDetails.resetPasswordExpires < Date.now() ){
            return res.status(403).json({
                  success:false,
                  message:"Token is Expired, please regenerate your token",
            })
      }
      // hash password
      const hashesPassword = await bcrypt.hash(password, 10);

      //update password
      await User.findOneAndUpdate(
           {token:token},
           {password:hashesPassword},
           {new:true},
           );

      //return response
      return res.status(200).json({
            success:true,
            message:"Password updated Successfully",
      })

       }catch(error){
            console.log(error);
            return res.json({
                  success:false,
                  message:"Some Error in Updating password",
                  error:error.message
            })
       }
}
    
